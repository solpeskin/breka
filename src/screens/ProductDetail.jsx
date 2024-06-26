import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useGetProductByIdQuery, useGetProductsCartQuery, useGetSavedProductsQuery, usePostProductsCartMutation, usePostSavedProductsMutation } from '../services/shopService';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { addCartItem, setCartItems } from '../features/cart/cartSlice';
import { setSavedProducts } from '../features/shop/shopSlice';

import ButtonBlack from '../components/ButtonBlack';

const ProductDetail = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerPostSavedProducts] = usePostSavedProductsMutation();
  const [triggerPostProductCart] = usePostProductsCartMutation();

  const { localId } = useSelector(state => state.auth.value);
  const { items } = useSelector(state => state.cart.value);
  const id = useSelector((state) => state.shop.value.itemIdSelected);
  const savedProducts = useSelector((state) => state.shop.value.savedProducts);

  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const { data: savedProductsFirebase, isSuccess } = useGetSavedProductsQuery(localId);
  const { data: firebaseCartItems, isSuccess: success } = useGetProductsCartQuery(localId);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  //actualizar estado global de items carrito
  useEffect(() => {
    if (success && firebaseCartItems && firebaseCartItems.cartList) {
      dispatch(setCartItems(firebaseCartItems.cartList));
    }
  }, [isSuccess, firebaseCartItems]);

  //c/vez que se modifique el carrito, actualizar firebase
  useEffect(() => {
    if (!isInitialLoad) {
      triggerPostProductCart({ cartList: items, localId });
    }
  }, [isInitialLoad, items]);
  
  // actualizar estado global de savedProducts
  useEffect(() => {
    if (isSuccess && savedProductsFirebase) {
      dispatch(setSavedProducts(savedProductsFirebase.savedProducts));
    } 
    setIsInitialLoad(false);
  }, [isSuccess, savedProductsFirebase]);

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!isModalVisible) {
      setSelectedSize(null);
    }
  }, [isModalVisible]);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
    if (selectedSize) {
      const newP = { ...product, quantity: 1, selectedSize };
      dispatch(addCartItem(newP));
      toggleModal();
    }
  };

  const handleSaveProduct = () => {
    let newSavedProducts = [];
    
    if (savedProducts.includes(id)) {
      newSavedProducts = savedProducts.filter(productId => productId !== id);
    } else {
      newSavedProducts = [...savedProducts, id];
    }
    
    dispatch(setSavedProducts(newSavedProducts));
    triggerPostSavedProducts({savedProducts: newSavedProducts, localId });
  };  
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {product ? (
        <>
          <Pressable style={styles.arrow} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={35} color="white" />
          </Pressable>
          <FlatList
            data={product.images}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
            keyExtractor={(item) => item}
          />
          <View style={styles.info}>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.text}>{product.name.toUpperCase()}</Text>
                <Text style={styles.text}>${product.price} ARS</Text>
              </View>
              <View style={[styles.color, { backgroundColor: product.color }]} />
            </View>
            <View style={styles.buttons}>
              <Pressable style={styles.addButton} onPress={toggleModal}>
                <Text style={styles.buttonText}>ADD</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleSaveProduct}>
                {
                  savedProducts.includes(id) ? <Ionicons name="bookmark" size={15} color="black" />
                  : <MaterialIcons name="bookmark-outline" size={15} color="black" />
                }
              </Pressable>
            </View>
          </View>
        </>
      ) : null}
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        onBackdropPress={toggleModal}
        backdropOpacity={0.5}
      >
        <View style={styles.contentContainer}>
          <ScrollView>
            <Text style={styles.subtitle}>SIZE</Text>
            <View style={styles.eachContainer}>
              {product.size.map((sizeObj) => {
                const size = Object.keys(sizeObj)[0];
                const stock = sizeObj[size];
                return (
                  <Pressable
                    key={size}
                    onPress={() => stock > 0 && handleSizeSelection(size)}
                    style={[
                      styles.eachBox,
                      { width: 30, backgroundColor: 'white', borderColor: stock === 0 ? 'gray' : 'black' },
                      selectedSize === size && { backgroundColor: 'black' },
                    ]}
                    disabled={stock === 0}
                  >
                    <Text style={[selectedSize === size ? { color: 'white' } : { color: 'black' }, stock === 0 && { color: 'gray' }]}>{size}</Text>
                  </Pressable>
                );
              })}
            </View>
            <ButtonBlack style={styles.addToCartButton} onPress={addToCart} title={"ADD TO CART"} />
            {!selectedSize && <Text style={styles.error}>*SELECT SIZE</Text>}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'black',
  },
  arrow: {
    position: 'absolute',
    zIndex: 1,
    top: 50,
    left: 20,
  },
  image: {
    width: width,
    height: height - 170,
  },
  info: {
    width: '100%',
    height: 130,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  color: {
    height: 20,
    width: 20,
    borderWidth: 0.5,
  },
  text: {
    fontSize: 11,
    fontWeight: '300',
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  addButton: {
    width: '80%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '300',
  },
  saveButton: {
    width: '17%',
    height: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 16,
    height: '30%',
    borderTopWidth: 0.5,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
  },
  eachContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  eachBox: {
    height: 30,
    marginHorizontal: 5,
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  addToCartButton: {
    width: 110,
    marginHorizontal: 5,
    marginTop: 20,
  },
  error: {
    fontSize: 10,
    margin: 5,
  },
});

export default ProductDetail;

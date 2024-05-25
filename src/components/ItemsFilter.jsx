import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const ItemsFilter = ({ isVisible, toggleModal, filterState, products, resetFilters }) => {
  const { selectedColors, setSelectedColors, selectedSizes, setSelectedSizes, selectedMaterials, setSelectedMaterials } = filterState;

  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const colorOptions = Array.from(new Set(products.map((prod) => prod.color)));
  const materialOptions = Array.from(new Set(products.map((prod) => prod.material)));

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        onBackdropPress={toggleModal}
        backdropOpacity={0.5}
      >
        <View style={styles.contentContainer}>
          <ScrollView>
            <Text style={styles.subtitle}>COLORS</Text>
            <View style={styles.eachContainer}>
              {colorOptions.map((color) => (
                <Pressable
                  key={color}
                  onPress={() => toggleSelection(color, selectedColors, setSelectedColors)}
                  style={[
                    styles.eachBox,
                    { backgroundColor: color.toLowerCase(), width: 30 },
                    selectedColors.includes(color) && { borderWidth: 1.3 },
                  ]}
                />
              ))}
            </View>
            
            <Text style={styles.subtitle}>SIZE</Text>
            <View style={styles.eachContainer}>
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <Pressable
                  key={size}
                  onPress={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
                  style={[
                    styles.eachBox,
                    { width: 30 },
                    selectedSizes.includes(size) && { backgroundColor: 'black' },
                  ]}
                >
                  <Text style={selectedSizes.includes(size) ? { color: 'white' } : { color: 'black' }}>{size}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.subtitle}>MATERIALS</Text>
            <View style={styles.eachContainer}>
              {materialOptions.map((material) => (
                <Pressable
                  key={material}
                  onPress={() => toggleSelection(material, selectedMaterials, setSelectedMaterials)}
                  style={[
                    styles.eachBox,
                    { paddingHorizontal: 5 },
                    selectedMaterials.includes(material) && { backgroundColor: 'black' },
                  ]}
                >
                  <Text style={selectedMaterials.includes(material) ? { color: 'white' } : { color: 'black' }}>{material.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>

            <TouchableOpacity onPress={resetFilters} style={styles.resetFilters}>
              <Text style={{color: "white"}}>RESET FILTERS</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 16,
    height: '50%',
    borderTopWidth: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
  },
  eachContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: "wrap",
  },
  eachBox: {
    height: 30,
    marginHorizontal: 5,
    borderWidth: 0.4,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5
  },
  resetFilters: {
    height: 30,
    width: 110,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20
  }
});

export default ItemsFilter;

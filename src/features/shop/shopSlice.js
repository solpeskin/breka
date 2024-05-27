import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: "shop",
    initialState: {
        value: {
            categorySelected: "",
            itemIdSelected: "",
            savedProducts: []
        }
    },
    reducers: {
        setCategorySelected: (state, action) => { //action suele ser la variable que modifica al state
            state.value.categorySelected = action.payload //modificamos el valor previamente establecido en initialState
        },
        setItemIdSelected: (state, action) => { 
            state.value.itemIdSelected = action.payload 
        },
        setSavedProducts: (state, {payload}) => { 
            state.value.savedProducts.push(payload);
        },
        removeSavedProduct: (state, { payload }) => { 
            state.value.savedProducts = state.value.savedProducts.filter(productId => productId !== payload);
        },
        resetSavedProduct: (state) => { 
            state.value.savedProducts = []
        },
    }
})

export const {setCategorySelected, setItemIdSelected, setSavedProducts, removeSavedProduct, resetSavedProduct} = shopSlice.actions
export default shopSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: "shop",
    initialState: {
        value: {
            categorySelected: "",
            itemIdSelected: ""
        }
    },
    reducers: {
        setCategorySelected: (state, action) => { //action suele ser la variable que modifica al state
            state.value.categorySelected = action.payload //modificamos el valor previamente establecido en initialState
        },
        setItemIdSelected: (state, action) => { 
            state.value.itemIdSelected = action.payload 
        },
    }
})

export const {setCategorySelected, setItemIdSelected} = shopSlice.actions
export default shopSlice.reducer
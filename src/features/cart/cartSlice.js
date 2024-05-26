import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: "userIdLogged",
            updatedAt: new Date().toLocaleString(),
            total: null,
            items: [],
        },
    },
    reducers: {
        addCartItem: (state, { payload }) => {
            const existingItemIndex = state.value.items.findIndex(
                (item) => item.id === payload.id && item.selectedSize === payload.selectedSize
            );

            if (existingItemIndex !== -1) {
                state.value.items[existingItemIndex].quantity += payload.quantity;
            } else {
                state.value.items.push(payload);
            }

            state.value.total = state.value.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            state.value.updatedAt = new Date().toLocaleString();
        },
        removeCartItem: (state, { payload }) => {
            const updatedItems = state.value.items.filter(
                item => !(item.id === payload.id && item.selectedSize === payload.selectedSize)
            );

            const total = updatedItems.reduce(
                (acc, currentItem) => (acc += parseFloat(currentItem.price) * currentItem.quantity),
                0
            );

            state.value = {
                ...state.value,
                items: updatedItems,
                total,
                updatedAt: new Date().toLocaleString(),
            };
        },
        setCartItems: (state, {payload}) => {
            state.value.items = payload
            state.value.total = payload.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    },
});

export const { addCartItem, removeCartItem, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;

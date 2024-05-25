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
            const productRepeated = state.value.items.find(
                (item) => item.id === payload.id && item.selectedSize === payload.selectedSize
            );
            if (productRepeated) {
                const itemsUpdated = state.value.items.map((item) => {
                    if (item.id === payload.id && item.selectedSize === payload.selectedSize) {
                        item.quantity += payload.quantity;
                        return item;
                    }
                    return item;
                });
                const total = itemsUpdated.reduce(
                    (acc, currentItem) =>
                        (acc += parseFloat(currentItem.price) * currentItem.quantity),
                    0
                );
                state.value = {
                    ...state.value,
                    items: itemsUpdated,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };
            } else {
                state.value.items.push(payload);
                const total = state.value.items.reduce(
                    (acc, currentItem) =>
                        (acc += parseFloat(currentItem.price) * currentItem.quantity),
                    0
                );
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                };
            }
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
    },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
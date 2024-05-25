import {configureStore} from "@reduxjs/toolkit"
import shopReducer from "../features/shop/shopSlice"
import authReducer from "../features/user/userSlice"
import cartReducer from "../features/cart/cartSlice"
import { shopApi } from "../services/shopService"
import { authApi } from "../services/authService"
import { setupListeners } from "@reduxjs/toolkit/query"

const store = configureStore({
    reducer: {
        shop: shopReducer,
        auth: authReducer,
        cart: cartReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(shopApi.middleware)
            .concat(authApi.middleware)

})

setupListeners(store.dispatch)

export default store
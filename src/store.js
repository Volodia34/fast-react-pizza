
import userReducer from './features/user/userSlice.js'
import cartReducer from './features/cart/cartSlice.js'
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
})

export default store
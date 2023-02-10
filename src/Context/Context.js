import React, { createContext, useContext, useReducer } from 'react';
import { authReducer } from './authReducer';
import { productReducer } from './productReducer';
import { cartReducer } from './CartReducer';
import { wishlistReducer } from './WishlistReducer';

const RootContext = createContext();

const Context = ({children}) => {

    const [authState, authDispatch] = useReducer(authReducer, {
        user: {},
        isAuth: false,
        aToken: "",
        rToken: ""
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        products: [],
        category: [],
        color: [],
        type: "",
        brand: [],
        size: [],
        searchQuery: "",
    })

    const [cartState, cartDispatch] = useReducer(cartReducer, {
        cart: []
    })

    const [wishlistState, wishlistDispatch] = useReducer(wishlistReducer, {
        wishlist: []
    })

    return (
        <RootContext.Provider value={{authState, authDispatch, productState, productDispatch, cartState, cartDispatch, wishlistState, wishlistDispatch}}>
            {children}
        </RootContext.Provider>
    )
}

export default Context

export const RootState = () => {
    return useContext(RootContext);
}
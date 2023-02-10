export const cartReducer = (state, action) => {
    const { product } = action.payload
    switch(action.type){
        case "GET_CART_ITEMS":
            return {
                cart: action.payload.cart
            }
        case "ADD_TO_CART":
            const cartItem = state.cart.filter(c => c.product.productid === product.productid)[0]
            if(cartItem === undefined){
                return {
                    cart: [
                        ...state.cart,
                        {
                            product,
                            quantity: product.quantity ? product.quantity : 1,
                            cartItemid: action.payload.cartItemid
                        }
                    ]
                }
            }
            else {
                return {
                    cart: state.cart.map(item =>
                        item.cartItemid === cartItem.cartItemid
                          ? {
                              ...item,
                              quantity: product.quantity
                                ? item.quantity + product.quantity
                                : item.quantity + 1
                            }
                          : item
                      )
                }
            }
        case "DECREASE_CART_ITEM_QUANTITY":
            const cartItems = state.cart.filter(c => c.product.productid === product.productid)[0]
            return {
                    cart: state.cart.map(item =>
                    item.cartItemid === cartItems.cartItemid
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                    )
                }
        case "DELETE_CART_ITEM":
            const remainingItems = (cartItems, product) =>
                cartItems.filter(cartItem => cartItem.cartItemId !== product.cartItemId);
            return {
                cart: remainingItems(state.cart, product)
            };
        case "DELETE_ALL_FROM_CART":
            return { 
                cart: state.cart.filter(c => false)
            }
        default:
            return state
    }
}
export const wishlistReducer = (state, action) => {
    const { product, wishlistItemid } = action.payload;
    switch(action.type){
        case "GET_WISHLIST_ITEMS":
            return {
                wishlist: action.payload.wishlist
            }
        case "ADD_TO_WISHLIST":
            const wishlistItem = state.wishlist.filter(c => c.product.productid === product.productid)[0]
            if(wishlistItem === undefined){
                return {
                    wishlist: [
                        ...state.wishlist,
                        {
                            product,
                            quantity: 1,
                            wishlistItemid: action.payload.wishlistItemid
                        }
                    ]
                }
            }
            else {
                return {
                    wishlist: [...state.wishlist]
                }
            }
        case "DELETE_FROM_WISHLIST":
            const remainingItems = (wishlistItems, product) =>
                wishlistItems.filter(wishlistItem => wishlistItem.product.productid !== product.productid);
            return {
                wishlist: remainingItems(state.wishlist, product)
            };
        case "DELETE_ALL_FROM_WISHLIST":
            return { 
                wishlist: state.wishlist.filter(c => false)
            }
        default:
            return state
    }

}
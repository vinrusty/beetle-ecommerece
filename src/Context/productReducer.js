export const productReducer = (state, action) => {
    switch(action.type){
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload.product
            }
        case "FILTER_BY_PRICE":
            return {...state }
        case "FILTER_BY_BRAND":
            if(state.brand.includes(action.payload.brand)){
                return {
                    ...state,
                    brand: state.brand.filter((c) => c !== action.payload.brand)
                }
            }
            else{
                return {
                    ...state,
                    brand: [...state.brand, action.payload.brand]
                }
            }
        case "FILTER_BY_TYPE":
            return {...state, type: action.payload.type}
        case "FILTER_BY_CATEGORY":
            if(state.category.includes(action.payload.category)){
                return {
                    ...state,
                    category: state.category.filter((c) => c !== action.payload.category)
                }
            }
            else{
                return {
                    ...state,
                    category: [...state.category, action.payload.category]
                }
            }
        case "FILTER_BY_COLOR":
            if(state.color.includes(action.payload.color)){
                return {
                    ...state,
                    color: state.color.filter((c) => c !== action.payload.color)
                }
            }
            else{
                return {
                    ...state,
                    color: [...state.color, action.payload.color]
                }
            }
        case "FILTER_BY_SIZE":
            if(state.size.includes(action.payload.size)){
                return {
                    ...state,
                    size: state.size.filter((c) => c !== action.payload.size)
                }
            }
            else{
                return {
                    ...state,
                    size: [...state.brand, action.payload.size]
                }
            }
        case "FILTER_BY_SEARCH":
            return {...state, searchQuery: action.payload.searchQuery}
        default:
            return state
    }
}
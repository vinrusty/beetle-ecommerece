export const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                aToken: action.payload.aToken,
                rToken: action.payload.rToken,
                isAuth: action.payload.user ? true : false,
            }
        case "REGISTER":
            return {
                ...state,
                user: action.payload.user,
                isAuth: false,
            }
        case "LOGOUT":
            return {
                ...state,
                user: {},
                aToken: "",
                rToken: "",
                isAuth: false,
            }
        case "REFRESH":
            return {
                ...state,
                aToken: action.payload.aToken,
                rToken: action.payload.rToken
            }
        default:
            return state
    }
}
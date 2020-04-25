export default (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
        return {
            ...state,
            activeCustomer: action.payload
        }
        case 'SIGN_UP':
        return {
            ...state,
            activeCustomer: action.payload
        }
        case 'AUTH_SUCCESS':
        return {
            ...state,
            activeCustomer:  action.payload
        }
        case 'AUTH_FAIL':
        return {
            ...state,
            activeCustomer:  null
        }
        case 'SIGN_OUT':
        return {
            ...state,
            activeCustomer:  null
        }
        case 'UPDATE_CUSTOMER':
        return {
            ...state,
            activeCustomer:  {...action.payload}
        }
        case 'AUTH_SCREEN':
        return {
            ...state,
            authScreen: !state.authScreen
        }
        case 'AUTH_ERROR':
        return {
            ...state,
            error:  true
        }
        default:
            return state
    }
}
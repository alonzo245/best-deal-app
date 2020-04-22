export default (state, action) => {
    switch (action.type) {
        /**
         * GET_CART
         */
        case 'GET_CART':
            return { ...state, cart: action.payload }
        /**
         * REMOVE_PRODUCT
         */
        case 'REMOVE_PRODUCT':
            return { ...state, cart: action.payload }
        /**
         * ADD_PRODUCT
         */
        case 'ADD_PRODUCT':
            return { ...state, cart: action.payload }
        /**
         * ADD_QUANTITY
         */
        case 'ADD_QUANTITY': {
            return { ...state, cart: action.payload }
        }
        /**
         * REDUCE_QUANTITY
         */
        case 'REDUCE_QUANTITY': {
            return { ...state, cart: action.payload }
        }
        /**
         * CART_ERROR
         */
        case 'CART_ERROR':
            return { ...state, cart: action.payload }
        default:
            return state
    }
}
export default (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
        return {
            ...state,
            activeCustomer: action.payload
        }
        default:
            return state
    }
}
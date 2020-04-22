export default (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU':
            return {
                ...state,
                showMenu: !state.showMenu
            }
        case 'TOGGLE_MODAL':
            return {
                ...state,
                showModal: !action.payload.showModal,
                currentModal: action.payload.currentModal
            }
        case 'ALERT_TOP':
            return {
                ...state,
                alertTop: true,
                alertTopTitle: action.payload.title, 
                alertTopColor: action.payload.color,
            }
        case 'HIDE_ALERT_TOP':
            return {
                ...state,
                alertTop: false
            }
        case 'ANIMATE_CART':
            return {
                ...state,
                animateCart:  action.payload
            }
        default:
            return state
    }
}
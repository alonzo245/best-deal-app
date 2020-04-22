import React, { createContext, useReducer } from 'react'
import AppReducer from '../reducers/GlobalReducer'
import { freezPageScroll } from '../../Utils/Utils'
//Initiallization
const initialState = {
    showMenu: false,
    showModal: false,
    alertTop: false,
    alertTopTitle: '',
    alertTopColor: '',
    currentModal: null,
    animateCart: false
}

//Create context
export const GlobalContext = createContext(initialState)

//Provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    //Actions
    function toggleModal(modalName = null) {
        if (!modalName) return false
        freezPageScroll()

        dispatch({
            type: 'TOGGLE_MODAL',
            payload: {
                showModal: state.showModal,
                currentModal: modalName
            }
        })
    }

    function activateAlertTop(settings) {
        if (!settings) return null
        dispatch({
            type: 'ALERT_TOP',
            payload: settings
        })
    }
    function hideAlertTop() {
        dispatch({
            type: 'HIDE_ALERT_TOP'
        })
    }

    function toggleMenu() {
        freezPageScroll();
        dispatch({
            type: 'TOGGLE_MENU',
            payload: state.showMenu
        })
    }

    function handleAnimateCart() {
        dispatch({
            type: 'ANIMATE_CART',
            payload: true
        })

        setTimeout(() => {
            dispatch({
                type: 'ANIMATE_CART',
                payload: false
            })
        }, 300);
    }

    return (<GlobalContext.Provider value={{
        showMenu: state.showMenu,
        showModal: state.showModal,
        currentModal: state.currentModal,
        alertTop: state.alertTop,
        alertTopTitle: state.alertTopTitle,
        alertTopColor: state.alertTopColor,
        toggleMenu,
        toggleModal,
        handleAnimateCart,
        hideAlertTop,
        activateAlertTop,
        animateCart: state.animateCart
    }}>
        {children}
    </GlobalContext.Provider>)
}
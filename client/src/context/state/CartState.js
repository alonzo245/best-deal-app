import React, { createContext, useReducer } from 'react'
import AppReducer from '../reducers/CartReducer'
import { client, authHeaders } from '../../Utils/Client'

//Initiallization
const initialState = {
    cart: [],
    cartProductsCount: 0,
    error: null,
    loading: true
}

//Create context
export const CartContext = createContext(initialState)

//Provider
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    ////////////////////////////////////////
    const updateCart = async (cart = []) => {
        try {
            const customer = JSON.parse(localStorage.getItem('customer'))
            if (!customer) return Promise.resolve()

            //update db if logged in
            return await client
                .patch(`/cart/`, { cart }, authHeaders(customer))

        } catch (err) {
            console.error(err)
        }
    }

    //Actions
    async function getCart(activeCustomer) {
        try {
            if(!activeCustomer) return []

            let lsCustomer = JSON.parse(localStorage.getItem('customer'))
            let cart = []
            let lsCart = JSON.parse(localStorage.getItem('cart')) || []

            if (activeCustomer) {
                // check db cart
                const response = await client.get(`/cart/`,
                    authHeaders(lsCustomer))
                if (Array.isArray(response.data.cart)) {
                    await client.post(`/cart/`, { cart: [...lsCart] }, authHeaders(activeCustomer))
                    cart = lsCart
                }
            } else {
                cart = !lsCart ? [] : lsCart
            }

            dispatch({
                type: 'GET_CART',
                payload: cart
            })

        } catch (err) {
            console.error(err)
        }
    }

    async function addProduct(newProduct) {
        let updatedCart = []
        const productExist = state.cart.some(product => product.productId === newProduct.productId)
        if (productExist) {
            updatedCart = state.cart.map(product => {
                if (product.productId === newProduct.productId) {
                    return { ...product, quantity: ++product.quantity }
                }
                return product
            })
        } else {
            updatedCart = [...state.cart, { ...newProduct, quantity: 1 }]
        }

        localStorage.setItem('cart', JSON.stringify([...updatedCart]))

        dispatch({
            type: 'ADD_PRODUCT',
            payload: [...updatedCart]
        })

        // save to db
        await updateCart([...updatedCart])
    }

    /**
     * Remove Product
     */
    async function removeProduct(productId) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let updatedCart = cart.filter(product => product.productId !== productId)

        // update local storage
        localStorage.setItem('cart', JSON.stringify([...updatedCart]))

        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: [...updatedCart]
        })

        // save to db
        await updateCart([...updatedCart])
    }

    async function addQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let updatedCart = cart.map(product => {
            if (product.productId === productId) {
                product.quantity++
            }
            return product
        })
        localStorage.setItem('cart', JSON.stringify([...updatedCart]))

        dispatch({
            type: 'ADD_QUANTITY',
            payload: [...updatedCart]
        })

        // save to db
        await updateCart([...updatedCart])
    }

    async function removeQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let updatedCart = cart.map(product => {
            if (product.quantity < 2) return product
            if (product.productId === productId) {
                product.quantity--
            }
            return product
        })
        localStorage.setItem('cart', JSON.stringify([...updatedCart]))

        dispatch({
            type: 'REDUCE_QUANTITY',
            payload: [...updatedCart]
        })

        // save to db
        await updateCart([...updatedCart])
    }

    async function resetCart() {
        localStorage.setItem('cart', JSON.stringify([]))

        dispatch({
            type: 'GET_CART',
            payload: []
        })

        // save to db
        await updateCart([])
    }


    return (<CartContext.Provider value={{
        cart: state.cart,
        loading: state.loading,
        error: state.error,
        resetCart,
        getCart,
        addProduct,
        removeProduct,
        addQuantity,
        removeQuantity
    }}>
        {children}
    </CartContext.Provider>)
}
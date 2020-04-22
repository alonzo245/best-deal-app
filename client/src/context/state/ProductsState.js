import React, { createContext, useReducer } from 'react'
import AppReducer from '../reducers/ProdcutsReducer'
import { client } from '../../Utils/Client'


//Initiallization
const initialState = {
    sliderProducts: [],
    hotProducts: [],
    categoryPageProducts: [],
    categories: [],
    hasModeToLoad: true,
    page: 1,
    currentPageCategory: null,
    product: null,
    error: null,
    loading: false
}

//Create context
export const ProductsContext = createContext(initialState)

//Provider
export const ProductsProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState)
    //Actions
    async function getProduct(routeProductName) {
        try {
            const response = await client.get(`/product/${routeProductName}`)

            dispatch({
                type: 'GET_PRODUCT',
                payload: response.data
            })
        } catch (error) {

        }
    }

    // function setFilterCategory(category = null) {
    //     if (!category) return
    //     // console.log('SET_FILTER_CATEGORY', category)
    //     dispatch({
    //         type: 'SET_FILTER_CATEGORY',
    //         payload: category
    //     })
    // }

    function setPageCategory(categoryRoute) {

        let category = state.categories.length === 0 ? [] : state.categories
            .filter(category => category.route === categoryRoute)[0]

        console.log('^^^^^^^^^^^^^^^^^^', category)
        dispatch({
            type: 'SET_PAGE_CATEGORY',
            payload: category
        })
    }

    const sortFilter = (order = null) => {
        let sortedProducts = [...state.categoryPageProducts.sort((a, b) => {
            switch (order) {
                case 'low':
                    return a.price - b.price
                case 'high':
                    return b.price - a.price
                default:
                    return a.id - b.id
            }
        })]
        dispatch({
            type: 'SET_CATEGORY_PAGE_PRODUCTS',
            payload: sortedProducts
        })

    }

    function resetProducts() {
        dispatch({
            type: 'SET_PAGE',
            payload: 1
        })
        dispatch({
            type: 'HAS_MORE_TO_LOAD',
            payload: true
        })
        dispatch({
            type: 'SET_CATEGORY_PAGE_PRODUCTS',
            payload: []
        })
    }

    async function getHotProducts() {
        try {
            const response = await client.get('/product/hot')
            dispatch({
                type: 'SET_HOT_PRODUCTS',
                payload: response.data
            })
        } catch (err) {
            console.error(err)
        }
    }

    async function getSliderProducts() {
        try {
            const response = await client.get('/product/slider')

            dispatch({
                type: 'SET_SLIDER_PRODUCTS',
                payload: response.data
            })
        } catch (err) {
            console.error(err)
        }


    }

    function setPage(page) {
        dispatch({
            type: 'SET_PAGE',
            payload: page
        })
    }

    async function getProducts(routeCategory = null) {
        console.log('***************', state.currentPageCategory)
        try {
            if (!state.currentPageCategory) return

            dispatch({
                type: 'LOADING',
                payload: true
            })
            const items = 3

            const response = await client.get(`/product/by-category?categoryId=${state.currentPageCategory.categoryId}&items=${items}&page=${state.page}`)
            let data = response.data
            let result = data.products.map(product => ({ ...product, id: product._id }))

            if (!data.hasMore) {
                dispatch({
                    type: 'HAS_MORE_TO_LOAD',
                    payload: false
                })
            }
            let updateProducts = [...state.categoryPageProducts].concat(...result)

            dispatch({
                type: 'SET_CATEGORY_PAGE_PRODUCTS',
                payload: updateProducts
            })

        } catch (error) {
            console.error(error)
        }

    }

    async function getCategories(routeCategory = null) {
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        try {
            const response = await client.get('/category')

            dispatch({
                type: 'GET_CATEGORIES',
                payload: response.data.categories
            })

        } catch (error) {

        }
    }

    return (<ProductsContext.Provider value={{
        sliderProducts: state.sliderProducts,
        hotProducts: state.hotProducts,
        categoryPageProducts: state.categoryPageProducts,
        loading: state.loading,
        page: state.page,
        hasModeToLoad: state.hasModeToLoad,
        error: state.error,
        product: state.product,
        categories: state.categories,
        currentPageCategory: state.currentPageCategory,
        sortFilter,
        setPageCategory,
        getCategories,
        getProducts,
        getSliderProducts,
        getHotProducts,
        getProduct,
        resetProducts,
        setPage
    }}> {children} </ProductsContext.Provider>)
}

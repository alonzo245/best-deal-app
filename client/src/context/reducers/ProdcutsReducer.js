export default (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: action.payload
            }
        case 'SET_PAGE_CATEGORY':
            return {
                ...state,
                currentPageCategory: action.payload
            }
        case 'HAS_MORE_TO_LOAD':
            return {
                ...state,
                loading: false,
                hasModeToLoad: action.payload
            }
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'SET_CATEGORY_PAGE_PRODUCTS':
            return {
                ...state,
                loading: false,
                categoryPageProducts: action.payload
            }
        case 'SET_SLIDER_PRODUCTS':
            return {
                ...state,
                loading: false,
                sliderProducts: action.payload
            }
        case 'SET_HOT_PRODUCTS':
            return {
                ...state,
                loading: false,
                hotProducts: action.payload
            }
        case 'GET_PRODUCT':
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case 'CART_ERROR':
            return {
                ...state,
                categoryPageProducts: action.payload
            }
        default:
            return state
    }
}
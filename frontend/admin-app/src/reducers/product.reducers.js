import { productConstants } from "../actions/constants"

const initState = {
    error: null,
    message: "",
    loading: false,
    success: false,
    products: []
}

const productReducer = (state = initState, action) => {
    if (action.type === productConstants.GET_PRODUCT_REQUEST) {
        state = {
            ...state,
            loading: true,
        }
    }

    if (action.type === productConstants.GET_PRODUCT_SUCCESS) {
        state = {
            ...state,
            loading: false,
            success: true,
            products: action.payload.products,
        }
    }

    if (action.type === productConstants.GET_PRODUCT_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    if (action.type === productConstants.ADD_PRODUCT_REQUEST) {
        state = {
            ...state,
            loading: true,
        }
    }

    if (action.type === productConstants.ADD_PRODUCT_SUCCESS) {
        // console.log('action.payload.product', action.payload.product)
        // const product = action.payload.product
        // const updateProduct = builNewCategories(product.parentId, state.categories, product)
        // const updateProduct = state.products.push(action.payload.product)

        // console.log('updateProduct', updateProduct)
        
        state = {
            ...state,
            loading: false,
            success: true,
            message: action.payload.message,
            products: [
                ...state.products,
                action.payload.product
            ],
        }

        // state.categories.push(action.payload.category)
    }

    if (action.type === productConstants.ADD_PRODUCT_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    return state
}

export default productReducer
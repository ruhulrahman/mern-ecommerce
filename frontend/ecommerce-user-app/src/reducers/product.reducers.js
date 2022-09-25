import { productConstants } from "../actions/constants"

const initState = {
    error: null,
    message: "",
    loading: false,
    success: false,
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under25k: [],
        under30k: [],
        above50k: [],
    },
    pageFetchRequest: false,
    page: {}
}

const productReducer = (state = initState, action) => {
    console.log('action.payload', action.payload)
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

    if (action.type === productConstants.GET_PRODUCT_BY_SLUG) {
        console.log('action.payload', action.payload)
        state = {
            ...state,
            loading: false,
            success: true,
            products: action.payload.products,
            productsByPrice: action.payload.productsByPrice,
        }
    }

    if (action.type === productConstants.GET_PRODUCT_PAGE_REQUEST) {
        state = {
            ...state,
            pageFetchRequest: true,
        }
    }

    if (action.type === productConstants.GET_PRODUCT_PAGE_SUCCESS) {
        state = {
            ...state,
            pageFetchRequest: false,
            success: true,
            page: action.payload.page,
        }
    }

    if (action.type === productConstants.GET_PRODUCT_PAGE_FAILURE) {
        state = {
            ...state,
            pageFetchRequest: false,
            error: action.payload.error,
        }
    }
    return state
}

export default productReducer
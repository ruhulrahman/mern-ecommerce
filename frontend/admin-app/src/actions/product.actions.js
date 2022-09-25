import RestApi from "../helpers/axios"
import { productConstants } from "./constants"

export const getProduct = () => {
    return async (dispatch) => {
        dispatch({ type: productConstants.GET_PRODUCT_REQUEST })
        const res = await RestApi.get('/product/getProduct')
        if (res.status === 201) {
            console.log('res.data with status', res.data)
            dispatch({
                type: productConstants.GET_PRODUCT_SUCCESS,
                payload: {
                    products: res.data.data
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: productConstants.GET_PRODUCT_FAILURE,
                    error: res.data.error
                })
            } 
        }
    }
}

export const addProduct = (formData) => {
    return async (dispatch) => {
        dispatch({ type: productConstants.ADD_PRODUCT_REQUEST })
        const res = await RestApi.post('/product/create', formData)
        if (res.status === 201) {
            console.log('res.data', res.data)
            dispatch({
                type: productConstants.ADD_PRODUCT_SUCCESS,
                payload: {
                    message: res.data.message,
                    product: res.data.data,
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: productConstants.ADD_PRODUCT_FAILURE,
                    error: res.data.error
                })
            } 
        }
    }
}

export const getPages = (payload) => {
    const { categoryId, type } = payload
    return async (dispatch) => {
        // dispatch({ type: pageConstants.GET_PAGE_REQUEST })
        const res = await RestApi.get(`/page/${categoryId}/${type}`)
        console.log('res.data', res.data)
        if (res.status === 200) {
            // dispatch({
            //     type: pageConstants.GET_PAGE_SUCCESS,
            //     payload: {
            //         message: res.data.message,
            //         page: res.data.data,
            //     }
            // })
        } else {
            if (res.status === 400) {
                // dispatch({
                //     type: pageConstants.GET_PAGE_FAILURE,
                //     payload: {
                //         error: res.data.error
                //     }
                // })
            } 
        }
    }
}
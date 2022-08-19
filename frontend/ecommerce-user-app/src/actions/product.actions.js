import RestApi from "../helpers/axios"
import { productConstants } from "./constants"

export const getProductsBySlug = (slug) => {
    return async (dispatch) => {
        // dispatch({ type: productConstants.GET_PRODUCT_REQUEST })
        const res = await RestApi.get(`/product/${slug}`)
        if (res.status === 200) {
            console.log('res.data', res.data)
            dispatch({
                type: productConstants.GET_PRODUCT_BY_SLUG,
                payload: {
                    products: res.data.products,
                    productsByPrice: res.data.productsByPrice
                }
            })
        } else {
            // if (res.status === 400) {
            //     dispatch({
            //         type: productConstants.GET_PRODUCT_FAILURE,
            //         error: res.data.error
            //     })
            // } 
        }
    }
}
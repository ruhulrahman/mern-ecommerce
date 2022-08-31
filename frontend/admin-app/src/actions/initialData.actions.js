import RestApi from "../helpers/axios"
import { productConstants, categoryConstants } from "./constants"

export const getInitialData = () => {
    return async (dispatch) => {
        const res = await RestApi.get('/admin/initialData')
        if (res.status === 200) {
            // console.log('res.data with status', res.data)
            dispatch({
                type: productConstants.GET_PRODUCT_SUCCESS,
                payload: {
                    products: res.data.products
                }
            })

            dispatch({
                type: categoryConstants.GET_CATEGORY_SUCCESS,
                payload: {
                    categories: res.data.categories
                }
            })
        }
    }
}
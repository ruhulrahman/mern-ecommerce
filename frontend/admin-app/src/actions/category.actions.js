import RestApi from "../helpers/axios"
import { categoryConstants } from "./constants"
import { getInitialData } from "./initialData.actions"

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_CATEGORY_REQUEST })
        const res = await RestApi.get('/category/getCategory')
        if (res.status === 201) {
            // console.log('res.data with status', res.data)
            dispatch({
                type: categoryConstants.GET_CATEGORY_SUCCESS,
                payload: {
                    categories: res.data.data
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: categoryConstants.GET_CATEGORY_FAILURE,
                    error: res.data.error
                })
            } 
        }
    }
}

export const addCategory = (formData) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.ADD_CATEGORY_REQUEST })
        const res = await RestApi.post('/category/create', formData)
        if (res.status === 201) {
            // console.log('res.data with status', res.data)
            dispatch({
                type: categoryConstants.ADD_CATEGORY_SUCCESS,
                payload: {
                    message: res.data.message,
                    category: res.data.data,
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: categoryConstants.ADD_CATEGORY_FAILURE,
                    error: res.data.error
                })
            } 
        }
    }
}

export const updateCategory = (formData) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST })
        const res = await RestApi.post('/category/update', formData)
        console.log('res.data', res.data)
        if (res.status === 200) {
            dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS })
            dispatch(getInitialData())
            // return true
        } else {
            if (res.status === 400) {
                dispatch({ type: categoryConstants.UPDATE_CATEGORY_FAILURE })
                // return false
            } 
        }
    }
}

export const deleteCategoryData = (checkedIds) => {
    return async () => {
        console.log('Action - checkedIds', checkedIds)
        const res = await RestApi.post('/category/delete', { categoryIds: checkedIds})
        console.log('res.data', res.data)
        if (res.status === 200) {
            return true
        } else {
            if (res.status === 400) {
                return false
            } 
        }
    }
}
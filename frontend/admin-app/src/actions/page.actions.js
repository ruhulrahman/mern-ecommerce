import RestApi from "../helpers/axios"
import { pageConstants } from "./constants"

export const addPage = (formData) => {
    return async (dispatch) => {
        dispatch({ type: pageConstants.ADD_PAGE_REQUEST })
        const res = await RestApi.post('/page/create', formData)
        console.log('res.data', res.data)
        if (res.status === 201) {
            dispatch({
                type: pageConstants.ADD_PAGE_SUCCESS,
                payload: {
                    message: res.data.message,
                    page: res.data.data,
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: pageConstants.ADD_PAGE_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            } 
        }
    }
}

// export const getPages = (formData) => {
//     return async (dispatch) => {
//         dispatch({ type: pageConstants.GET_PAGE_REQUEST })
//         const res = await RestApi.get('/page/getPage')
//         console.log('res.data', res.data)
//         if (res.status === 200) {
//             dispatch({
//                 type: pageConstants.GET_PAGE_SUCCESS,
//                 payload: {
//                     message: res.data.message,
//                     page: res.data.data,
//                 }
//             })
//         } else {
//             if (res.status === 400) {
//                 dispatch({
//                     type: pageConstants.GET_PAGE_FAILURE,
//                     payload: {
//                         error: res.data.error
//                     }
//                 })
//             } 
//         }
//     }
// }
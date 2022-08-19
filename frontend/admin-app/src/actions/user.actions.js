// import React from "react"
import RestApi from "../helpers/axios"
import { userConstants } from "./constants"

export const signup = (user) => {
    
    return async (dispatch) => {

        dispatch({ type: userConstants.USER_REGISTER_REQUEST })

        const res = await RestApi.post('/admin/signup', user)
        if (res.status === 201) {
            const message = res.data.message
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    message
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    error: res.data.error
                })
            }
        }
    }
}
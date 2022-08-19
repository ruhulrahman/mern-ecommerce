// import React from "react"
import RestApi from "../helpers/axios"
import { authConstants } from "./constants"

export const login = (user) => {
    
    
    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST })

        const res = await RestApi.post('/admin/signin', user)
        // const res = await RestApi.get('/category/getCategory')
        console.log('res', res)
        // console.log('res.data.user', res.data.user)
        if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token: res.data.token,
                    user: res.data.user,
                }
            })
        } else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    error: res.data.error
                })
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        if (token) {
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user,
                }
            })
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    error: 'User need to login'
                }
            })
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        const res = await RestApi.post('/admin/logout')
        if (res.status === 200) {
            localStorage.clear()
            dispatch({ 
                type: authConstants.LOGOUT_SUCCESS,
                message: res.data.message,
            })
        } else {
            dispatch({ 
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}
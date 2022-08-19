import { userConstants } from "../actions/constants"

const initState = {
    error: null,
    message: "",
    loading: false,
    success: false,
}

const userReducer =  (state = initState, action) => {
    if (action.type === userConstants.USER_REGISTER_REQUEST) {
        state = {
            ...state,
            loading: true,
        }
    }

    if (action.type === userConstants.USER_REGISTER_SUCCESS) {
        state = {
            ...state,
            loading: false,
            success: true,
            message: action.payload.message,
        }
    }

    if (action.type === userConstants.USER_REGISTER_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    return state
}

export default userReducer
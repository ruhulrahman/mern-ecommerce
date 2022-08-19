import { authConstants } from "../actions/constants"

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: '',
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: '',
}

const authReducer =  (state = initState, action) => {
    // switch(action.type) {
    //     case authConstants.LOGIN_REQUEST:
    //         state = {
    //             ...state,
    //             ...action.payload
    //         }
    //     break
    // }
    if (action.type === authConstants.LOGIN_REQUEST) {
        state = {
            ...state,
            authenticating: true,
        }
    }

    if (action.type === authConstants.LOGIN_SUCCESS) {
        state = {
            ...state,
            token: action.payload.token,
            user: action.payload.user,
            authenticate: true,
            authenticating: false,
        }
    }

    if (action.type === authConstants.LOGOUT_REQUEST) {
        state = {
            ...initState,
            loading: true
        }
    }

    if (action.type === authConstants.LOGOUT_SUCCESS) {
        state = {
            ...initState,
            loading: false,
            message: action.message,
        }
    }

    if (action.type === authConstants.LOGOUT_FAILURE) {
        state = {
            ...initState,
            loading: false,
            error: action.payload.error,
        }
    }

    return state
}

export default authReducer
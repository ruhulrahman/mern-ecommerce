import { pageConstants } from "../actions/constants"

const initState = {
    error: null,
    message: "",
    loading: false,
    success: false,
    pages: []
}

const pageReducer = (state = initState, action) => {

    if (action.type === pageConstants.ADD_PAGE_REQUEST) {
        state = {
            ...state,
            loading: true,
            success: false,
        }
    } else if (action.type === pageConstants.ADD_PAGE_SUCCESS) {
        state = {
            ...state,
            loading: false,
            success: true,
            message: action.payload.message,
            pages: [
                ...state.pages,
                action.payload.page
            ],
        }

    } else if (action.type === pageConstants.ADD_PAGE_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    if (action.type === pageConstants.GET_PAGE_REQUEST) {
        state = {
            ...state,
            loading: true,
            success: false,
        }
    } else if (action.type === pageConstants.GET_PAGE_SUCCESS) {
        state = {
            ...state,
            loading: false,
            success: true,
            pages: action.payload.page,
        }

    } else if (action.type === pageConstants.GET_PAGE_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    return state
}

export default pageReducer
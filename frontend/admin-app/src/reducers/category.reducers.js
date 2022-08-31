import { categoryConstants } from "../actions/constants"

const initState = {
    error: null,
    message: "",
    loading: false,
    success: false,
    categories: []
}

const builNewCategories = (parentId, categories, category) => {
    let myCategories = []

    // console.log('category-reducer', category)

    if (!parentId) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: [],
            }
        ]
    }

    categories.forEach(item => {
        if (item._id === parentId) {
            myCategories.push({
                ...item,
                children: item.children ? builNewCategories(parentId, [...item.children, {
                    _id: category._id,
                    name: category.name,
                    parentId: category.parentId,
                    slug: category.slug,
                    type: category.type,
                    children: category.children,
                }], category) : []
            })

        } else {
            myCategories.push({
                ...item,
                children: item.children ? builNewCategories(parentId, item.children, category) : []
            })
        }
    })

    return myCategories
}

const categoryReducer = (state = initState, action) => {

    if (action.type === categoryConstants.GET_CATEGORY_REQUEST) {
        state = {
            ...state,
            loading: true,
        }
    } else if (action.type === categoryConstants.GET_CATEGORY_SUCCESS) {
        state = {
            ...state,
            loading: false,
            success: true,
            categories: action.payload.categories,
        }
    } else if (action.type === categoryConstants.GET_CATEGORY_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    if (action.type === categoryConstants.ADD_CATEGORY_REQUEST) {
        state = {
            ...state,
            loading: true,
        }
    } else if (action.type === categoryConstants.ADD_CATEGORY_SUCCESS) {
        const category = action.payload.category
        const updateCategory = builNewCategories(category.parentId, state.categories, category)
        state = {
            ...state,
            loading: false,
            success: true,
            message: action.payload.message,
            categories: updateCategory,
        }

        // state.categories.push(action.payload.category)
    } else if (action.type === categoryConstants.ADD_CATEGORY_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    if (action.type === categoryConstants.UPDATE_CATEGORY_REQUEST) {
        state = {
            ...state,
            loading: true,
        }
    } else if (action.type === categoryConstants.UPDATE_CATEGORY_SUCCESS) {
        state = {
            ...state,
            loading: false,
        }
    } else if (action.type === categoryConstants.UPDATE_CATEGORY_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    if (action.type === categoryConstants.DELETE_CATEGORY_REQUEST) {
        state = {
            ...state,
            loading: true,
        }
    } else if (action.type === categoryConstants.DELETE_CATEGORY_SUCCESS) {
        state = {
            ...state,
            loading: false,
        }
    } else if (action.type === categoryConstants.DELETE_CATEGORY_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error,
        }
    }

    return state
}

export default categoryReducer
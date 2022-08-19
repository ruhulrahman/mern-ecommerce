import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import categoryReducer from "./category.reducers";
import orderReducer from "./order.reducers";
import productReducer from "./product.reducers";
import userReducer from "./user.reducers";

export default combineReducers({
    auth: authReducers,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
})
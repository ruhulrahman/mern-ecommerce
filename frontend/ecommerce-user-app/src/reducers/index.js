import { combineReducers } from "redux";
import categoryReducer from "./category.reducers";
import orderReducer from "./order.reducers";
import productReducer from "./product.reducers";

export default combineReducers({
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
})
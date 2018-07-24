import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import invest from "./reducer";

export default combineReducers({
    routing: routerReducer,
    invest
});

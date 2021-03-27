import { createStore } from "redux";
import reducer from "./reducer";
// import { combineReducers } from "redux";

const store = createStore(reducer);

export default store;

import { createStore, combineReducers } from "redux";
import userDataReducer from "./userData";

const rootReducer = combineReducers({
  userData: userDataReducer,
});

const store = createStore(rootReducer);

export default store;

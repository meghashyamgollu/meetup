import { loginReducer } from "./Login/loginReducer";
import { createStore } from "redux";

export const store = createStore(loginReducer, 0); // add your reducers here


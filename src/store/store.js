import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducers = {
    login : reducer
}

const store = configureStore({
    reducer : rootReducers
})

export default store
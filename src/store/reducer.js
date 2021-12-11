import { createSlice } from "@reduxjs/toolkit";

const connect = createSlice({
    name: "connect",
    initialState: [
        {
            isLogin: false
        }
    ],
    reducers: {
        login: (state, action) => {
            console.log("asas=====")
            state[0].isLogin = !state[0].isLogin
        }
    }
})

const {reducer , actions} = connect;
export const {login} = actions
export default reducer
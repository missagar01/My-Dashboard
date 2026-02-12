import { configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from "./slice/loginSlice";
import settingReducer from './slice/settingSlice'

const store = configureStore({
    reducer: {
        login: loginSliceReducer,
        settings: settingReducer
    }
})

export default store;
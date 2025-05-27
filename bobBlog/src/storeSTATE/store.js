import {configureStore} from "@reduxjs/toolkit";
import  authReducer from "../storeSTATE/authSlice.js"

const store =configureStore({
 reducer:{
            authReducer
 }

})

export default  store;
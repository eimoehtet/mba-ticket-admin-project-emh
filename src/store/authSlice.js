import { createSlice } from "@reduxjs/toolkit";
const AuthSlice=createSlice({
    name:'auth',
    initialState:{
        token:null,
        isLoggedIn:false

    },
    reducers:{
        login(state,action){
            state.token=action.payload;
            state.isLoggedIn=true;
        },
        logout(state){
            state.token=null;
            state.isLoggedIn=false;
        }
    }
});
export const authActions=AuthSlice.actions;
export default AuthSlice;
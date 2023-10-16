import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser:null,
        // _id:"6223356252ffdde4a05e8e3b",
        // users:[],
        // type:null,
        type:"in",
        isFetching:false,
        error:false
    },
    reducers: {

        loginStart: (state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
            const amount = action.payload.amount;
            console.log(action.payload.amount);
            if(amount){
                state.type= "in";
            }else{
                state.type="co";
            }
        },
        loginFailure:(state)=>{
            state.isFetching =false;
            state.error =true;
        },

        logout:(state)=>{
            state.currentUser=null;
        },


        // get all user
        getuserStart: (state) => {
            state.isFetching = true;
            state.error = false;

        },
        getuserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;

            // console.log(action.payload);
            // console.log(state.products);


        },
        getuserFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
     
       
    },
});

export const { loginStart,loginSuccess,loginFailure,logout ,getuserFailure,getuserStart,getuserSuccess} = userSlice.actions;
export default userSlice.reducer;

     
import { loginFailure,loginStart,loginSuccess } from "./userRedux";
import {publicRequest} from "../requestMethods"
import { useSelector } from "react-redux";


export const logincompany = async (dispatch ,user )=>{

    dispatch (loginStart());
    try{
        
        const res = await publicRequest.post("/auth/companylogin",user);

       
        //  console.log(res);
        
        dispatch(loginSuccess(res.data));

    }catch(err){
        dispatch(loginFailure(err));
    }
};



export const logininvestor = async (dispatch ,user )=>{

    dispatch (loginStart());
    try{
        const res = await publicRequest.post("/auth/investorlogin",user);
        
        dispatch(loginSuccess(res.data));

    }catch(err){
        // console.log(err);
        dispatch(loginFailure(err));
    }
};
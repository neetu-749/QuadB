import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { logincompany, logininvestor } from '../../Redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from "../../Redux/userRedux";
import { publicRequest } from "../../requestMethods";
import Header from "../../Components/Header/Header";

// import { devURL, mailformat } from "../../../utils";

const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

export default function CompanyLogin() {
  const { register, handleSubmit } = useForm();
  const [loader, isLoading] = useState(false);
  const navigate = useNavigate();
  const location=useLocation();
  const [isDisabledLogin, setDisabledLogin] = useState(true);
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "username" && e.target.value.length >= 0) {
      formValues.username = e.target.value;
    } else if (e.target.name === "password" && e.target.value.length >= 0) {
      formValues.password = e.target.value;
    }
    if (formValues.username !== "" && formValues.password !== "")
      setDisabledLogin(false);
    else setDisabledLogin(true);
  };

  const onSubmit = async(val) => {
    if (val.username === "") {
      toast.error("Please enter your email address!.");
      isLoading(false);
    } else if (!val.username==="") {
      toast.error("You have entered username.");
      isLoading(false);
    } else if (val.password === "") {
      toast.error("Please enter your password.");
      isLoading(false);
    } else {
        setDisabledLogin(true)
        dispatch (loginStart());
    try{
        
        const res = await publicRequest.post("/auth/companylogin",{username:val.username,password:val.password});
        toast.success("Login Successfull");
        dispatch(loginSuccess(res.data));
        // toast.success("Login Successfull");

    }catch(err){
        toast.error("Invalid Credentials");
        dispatch(loginFailure(err));
    }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
      <Header></Header>
        <div className="min-h-full font-nunito relative flex items-center justify-center sm:mt-24 mt-8 sm:px-6 lg:px-8">
          <div className="max-w-xl w-full bg-white p-4 shadow-lg rounded-xl border-2 space-y-8 sm:mx-0 mx-6">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Welcome back
              </h2>
            </div>
            <input type="hidden" name="remember" value="true" />
            <div className=" space-y-4">
              <div>
                <label htmlFor="username" className="font-light">
                Your Company Username<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  {...register("username")}
                  name="username"
                  onInput={handleChange}
                  onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(onSubmit)();
                      }
                    }}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your Company Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="font-light">
                  Your password<span style={{ color: "red" }}>*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("password")}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Your password"
                    onInput={handleChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(onSubmit)();
                      }
                    }}
                  ></input>
                  <button
                    className="absolute left-full -translate-x-full p-2 z-20"
                    data-test="show-password"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword((val) => !val);
                    }}
                    
                  >
                    {!showPassword ? (
                      <AiOutlineEye size="1.2rem" />
                    ) : (
                      <AiOutlineEyeInvisible size="1.2rem" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  {" "}
                  Remember me{" "}
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium"
                  style={{ color: "#246eaa" }}
                >
                  {" "}
                  <u>Forgot your password?</u>{" "}
                </Link>
              </div>
            </div>

            <div className="mb-28">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-themeColor hover:bg-bg-themeHover"
                style={
                  !isDisabledLogin
                    ? { backgroundColor: "gray" }
                    : { backgroundColor: "gray", opacity: "50%" }
                }
                disabled={isDisabledLogin}
              >
               <>Login</>
              </button>
            </div>
            <div className="text-center border-t-2 border-solid border-gray-300 ">
              <div className="mt-1">
                New to Lets'groww?{" "}
                <span style={{ color: "#246eaa" }}>
                  {" "}
                  <Link to="/SignUp">
                    <u>Sign up</u>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

export default function Otp() {
  const error = useSelector((state) => state.error);
  const { register, handleSubmit } = useForm();
  const [loader, isLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDisabledLogin, setDisabledLogin] = useState(true);
  const initialValues = { otp: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.currentUser);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user?.currentUser?.verifed) {
      navigate("/home");
    }
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "otp") {
      formValues.otp = e.target.value;
    }
    if (formValues.otp !== "")
      setDisabledLogin(false);
    else setDisabledLogin(true);
  };

  const userid = useSelector(state => state.user?.currentUser?._id);
  const type = useSelector(state => state.user?.type);

  const onSubmit = async (val) => {
    // console.log(val);
    if (val.otp === "") {
      toast.error("Please enter your Otp");
      isLoading(false);
    } else {
      isLoading(true);
      setDisabledLogin(true);
      try {
        const res = await publicRequest.post("/auth/otp",
          {
            userid: user._id,
            otp: formValues.otp,
            type: type,
          });
        toast.success("verified Successfully.");
        dispatch(loginSuccess(res.data));
        toast.success("Login Successfully.");
        navigate("/home")
      } catch (err) {
        console.log(err);
        toast.error("Invalid otp");
        dispatch(loginFailure(err));
      }
      isLoading(false);
      setDisabledLogin(false);

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
                Verify Yourself
              </h2>
            </div>
            <input type="hidden" name="remember" value="true" />
            <div className=" space-y-4">

              <div>
                <label htmlFor="otp" className="font-light">
                  Your Otp<span style={{ color: "red" }}>*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("otp")}
                    name="otp"
                    type={showPassword ? "text" : "password"}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Your otp "
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

                


            <div className="mb-28">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-themeColor hover:bg-bg-themeHover"
                style={
                  !isDisabledLogin
                    ? { backgroundColor: "#246eaa" }
                    : { backgroundColor: "#246eaa", opacity: "50%" }
                }
                disabled={isDisabledLogin}
              >
                <>Login</>
              </button>
            </div>
            <label htmlFor="otp" className="font-light">
                    Your Otp is send to your email(dont't forget to check spam folder)
            </label>              
          </div>
        </div>
      </div>
    </form>
  );
}

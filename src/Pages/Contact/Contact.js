import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";


export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const token = localStorage.getItem("swToken");
  const [loader, isLoading] = useState(false);
  const navigate = useNavigate();
  const [isDisabledLogin, setDisabledLogin] = useState(true);
  const initialValues = { full_name: "", email: "", message: "" };
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    reset(formValues);
  }, [formValues]);

  const handleChange = (e) => {
    if (e.target.name === "full_name" && e.target.value.length >= 0) {
      formValues.full_name = e.target.value;
    } else if (e.target.name === "email" && e.target.value.length >= 0) {
      formValues.email = e.target.value;
    } else if (e.target.name === "message" && e.target.value.length >= 0) {
      formValues.message = e.target.value;
    }
    if (
      formValues.full_name !== "" &&
      formValues.email !== "" &&
      formValues.message !== ""
    )
      setDisabledLogin(false);
    else setDisabledLogin(true);
  };

  const onSubmit = (val, e) => {
    if (val.full_name === "") {
      toast.error("Please enter name.");
      isLoading(false);
    } else if (val.email === "") {
      toast.error("Please enter your email.");
      isLoading(false);
    } else if (val.message === "") {
      toast.error("Please enter your message.");
      isLoading(false);
    } else {
      isLoading(true);
     
          toast.success(
            "Thank you for reaching out. We will process your query and get back to you in next 48 hours!"
          );
        reset(initialValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Header></Header>
        <div className="mb-20 min-h-full relative flex items-center justify-center sm:px-6 lg:px-8 sm:mt-24 mt-8 font-nunito">
          <div className="max-w-xl w-full bg-white p-4 shadow-lg rounded-xl border-2 space-y-8 sm:mx-0 mx-6">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Contact us
              </h2>
            </div>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="full_name" className="font-light">
                  Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  {...register("full_name")}
                  name="full_name"
                  onInput={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your name here"
                  value={register.full_name}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="font-light">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  {...register("email")}
                  name="email"
                  onInput={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email id here."
                  value={register.email}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="message" className="font-light">
                  Message<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  {...register("message")}
                  value={register.message}
                  name="message"
                  onInput={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  cols="40"
                  rows="5"
                  placeholder="Enter your message here."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center">
              <p>
                or directly contact us via{" "}
                <a href="mailto:letsgroww2001@gmail.com" className="underline">
                letsgroww2001@gmail.com
                </a>
              </p>
            </div>

            <div className="mb-28">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-themeColor hover:bg-themeHover"
                // style={{ backgroundColor: "#246eaa " }}
                style={
                  !isDisabledLogin
                    ? { backgroundColor: "gray" }
                    : { backgroundColor: "gray", opacity: "50%" }
                }
                disabled={isDisabledLogin}
              >
                {!loader && <>Submit</>}
              </button>
            </div>
          </div>
        </div>
        <Footer ></Footer>
      </div>
    </form>
  );
}

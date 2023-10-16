import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  const userLogin = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <footer>
        <div
          className="p-8 text-white"
          style={{ background: "rgb(83 90 96)", fontFamily: "Noto Sans" }}
        >
          <span className="font-nunito">
            <div className="sm:flex mb-5 max-w-screen-xl mx-auto">
              <div className="sm:w-1/2 md:w-1/2 h-auto">
                <div className="text-orange mb-6 font-semibold">
                  <a className="flex title-font font-medium items-center justify-start text-white">
                    <img src="/Images/logo.jpeg" className="w-10 h-10" alt="" />
                  </a>
                  <p className="mt-2 text-lg text-white">
                    Let's groww !
                  </p>
                </div>
              </div>
              <div className="sm:w-1/2 md:w-1/4 h-auto sm:mt-0 mt-8">
                <div className="text-green-dark mb-3 font-bold text-lg">
                  Quick Links
                  <hr className="w-48 h-15" />
                </div>
                <div className="list-reset leading-normal text-sm space-y-4">
                  <div className="hover:text-green-dark text-grey-darker ">
                    <Link to="/Contact" className="hover:font-semibold" data-test="contact">
                      Contact us
                    </Link>
                    {/* <br />
                    <Link to="/AboutUs" className="hover:font-semibold" data-test="about">
                      About us
                    </Link>
                    <br /> */}
                  </div>
                </div>
              </div>
              <div className="sm:w-1/2 md:w-1/4 h-auto sm:mt-0 mt-8 ">
                <div className=" mb-3 font-bold text-lg">
                  Know more
                  <hr className="w-48 h-15" />
                </div>
                <div className="list-reset leading-normal text-sm space-y-4">
                  <div className="hover:text-themeColor-light text-grey-darker ">
                    {/* <Link to="/privacy-policy" className="hover:font-semibold" data-test="privacy">
                      Privacy Policy
                    </Link> */}
                    {/* <br /> */}
                    <Link
                      to="/terms-and-conditions"
                      className="hover:font-semibold"
                      data-test="terms"
                    >
                      Terms and conditions
                    </Link>
                  </div>
                </div>
              </div>
              <div className="sm:w-1/2 md:w-1/4 h-auto sm:mt-0 mt-8  sm:text-end text-start">
                <div className="text-green-light mb-6 font-bold text-lg">
                  Ready to get started ?
                </div>
                <div className="list-reset leading-normal text-sm space-y-4">
                  
                    <Link
                      to={userLogin ? "/home" : "/SignUp"}
                      className="relative bg-white py-5 px-8 w-32 lg:p-2 text-md text-base font-bold rounded-xl items-center"
                      style={{ color: "#0280BB" }}
                    >
                      {userLogin ? " Home " : "Sing Up"}
                    </Link>
               
                </div>
              </div>
            </div>
            <hr className="max-w-screen-xl mx-auto" />
            <div className="max-w-screen-xl mx-auto md:flex flex-wrap pt-2 text-sm text-white-400">
              <div className="flex-1 lg:order-2 inline-flex flex-wrap items-center mx-auto w-full">
                <p className="mx-auto flex flex-wrap mt-2">
                  <span className="text-md font-bold mt-2 ml-2">
                    Copyright © 2023, All rights reserved by Lets'groww Pvt. Ltd.
                  </span>
                </p>
              </div>
            </div>
          </span>
        </div>
      </footer>
    </div>
  );
}

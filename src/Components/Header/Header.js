import "../styles/common.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { logout } from '../../Redux/userRedux'
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const logoutHandler = () => {
    const page = location.pathname;
    // if (page === "/chat") {
    //   navigate("/login");
    //   alert("are you sure to logout...");
    // } else {
      dispatch(logout());
      navigate("/login");

    // }
    // console.log(page);

  };

  const isCurrentURL = (url) => {
    return location.pathname.toLowerCase() === url.toLowerCase();
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const [isOpen, setIsOpen] = useState(false);

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 150
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };
  return (
    < >

      {/* <div className="loginNav absolute 2xl:w-9/12 xl:w-9/12 lg:w-10/12 md:w-10/12 w-screen h-screen"></div> */}

      <nav
        style={{ fontFamily: "Noto Sans" }}
        className="bg-themeColor lg:bg-themeColor  md:bg-themeColor relative header-section"
      >
        <div className=" max-w-screen-xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <Link
                to="/"
                className=" font-bold text-white flex items-center gap-2"
              >
              
                <img src="/Images/logo.jpeg" className="h-10 w-10" alt="" />
                Lets's Groww !
              </Link>
            </div>
            <div className="hidden md:block font-nunito md:basis-3/4">
              <div className="flex justify-end">
                <div className="flex  items-right">
                  <ul className="flex text-white items-center gap-6 text-lg lg:text-xl">
                    <li className="">
                      <Link
                        to={userLogin ? "/chat" : "/login"}
                        className=" font-bold rounded items-center"
                      >
                        Chats
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="/Contact"
                        className="  font-bold rounded items-center"
                      >
                        Contact Us
                      </Link>
                    </li>
                    {userLogin && (<li className="">
                      <Link
                        className="  font-bold rounded items-center"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </li>)}

                    {!userLogin && (
                      <div>

                        <li className="">
                          <Link
                            to="/Login"
                            className="relative px-2 md:px-3  lg:px-4  font-bold rounded items-center"
                          >
                            Login
                          </Link>
                        </li>

                      </div>
                    )}
                    <li>

                      <Link
                        to={userLogin ? "/home" : "/SignUp"}
                        className="relative xl:block bg-white lg:block md:block hidden text-themeColor py-1 px-2 w-32 lg:p-2 font-bold rounded-xl text-center hover:bg-themeColor hover:text-white"
                      >
                        {userLogin ? "Home" : "Register"}
                      </Link>

                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex md:hidden font-nunito justify-end basis-3/4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-end p-2 rounded-md text-gray-400 hover:text-sky-800 hover:bg-themeHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                style={{ backgroundColor: "#ffffff" }}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden font-nunito text-center" id="mobile-menu">
              <div
                ref={ref}
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                style={{ backgroundColor: "gray" }}
              >
                <ul className=" text-white">
                  
                  <li className="">
                    <Link to="/chat">
                      <button className="relative py-3 px-2 md:px-3 lg:px-4 text-lg lg:text-base font-bold rounded items-center">
                        Chats
                      </button>
                    </Link>
                  </li>
               
                  <li className="">
                    <Link to="/Contact">
                      <button className="relative py-3 px-2 md:px-3 lg:px-4 text-lg lg:text-base font-bold rounded items-center">
                        Contact us
                      </button>
                    </Link>
                  </li>

                  {!userLogin && (
                    <li className="">
                      <Link to="/Login">
                        <button className="relative py-3 px-2 md:px-3 lg:px-4 text-lg lg:text-base font-bold rounded items-center">
                          Login
                        </button>
                      </Link>
                    </li>
                  )}
                  {userLogin && (
                    <li className="">
                      <Link to="/login">

                        <button className="relative py-3 px-2 md:px-3 lg:px-4 text-lg lg:text-base font-bold rounded items-center"
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                        </Link >

                    </li>
                  )}
                  <li>
                    <div className="xl:mt-4 lg:mt-4 md:mt-5 mr-4">
                      <Link to={userLogin ? "/home" : "/SignUp"}>
                        <button
                          type="button"
                          style={{ backgroundColor: "white" }}
                          className="relative text-black py-3 px-2 w-56 md:px-3 lg:px-4 text-md lg:text-base font-bold rounded-xl items-center"
                        >
                          {userLogin ? "Home" : "Register"}
                        </button>
                      </Link>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </>
  );
}

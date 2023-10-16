import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "../../Components/Header/Header";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../Firebase/Firebase';
import { publicRequest } from "../../requestMethods";

const storage = getStorage(app);

const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const options = ["Male", "Female", "Technical", "digital marketing", "finance", "Travel", "Education", "Automobile"];

export default function Investorregister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loader, isLoading] = useState(false);
    const [showPasswordChecker, setShowPasswordChecker] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("")
    const [gender, setGender] = useState("");
    const [investedbefore, setinvestedbefore] = useState("")
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordCorrections, setPasswordCorrections] = useState({
        isLength: false,
        isUpper: false,
        isLower: false,
        isSymbol: false,
    });

    useEffect(() => {
        if (
            localStorage.getItem("swToken") &&
            localStorage.getItem("swToken") != ""
        ) {
            //   navigate("/Dashboard");
        }
    }, []);
    const mailformat = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const passwordVerify = (e) => {
        const lower = /(?=.*[a-z])/;
        const upper = /(?=.*[A-Z])/;
        const length = /(?=.{8,})/;
        const symbol = /(?=.*[!@#$%^&*])/;
        let pass = e.target.value;
        if (pass.match(lower))
            setPasswordCorrections((val) => ({ ...val, isLower: true }));
        else setPasswordCorrections((val) => ({ ...val, isLower: false }));
        if (pass.match(upper))
            setPasswordCorrections((val) => ({ ...val, isUpper: true }));
        else setPasswordCorrections((val) => ({ ...val, isUpper: false }));
        if (pass.match(length))
            setPasswordCorrections((val) => ({ ...val, isLength: true }));
        else setPasswordCorrections((val) => ({ ...val, isLength: false }));
        if (pass.match(symbol))
            setPasswordCorrections((val) => ({ ...val, isSymbol: true }));
        else setPasswordCorrections((val) => ({ ...val, isSymbol: false }));
    };

    const onSubmit = (formValues) => {
        console.log(formValues)
        formValues.password = password;
        var passwordformat =
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:\-]).{8,}/;
        isLoading(true);
        if (formValues.username === "") {
            toast.error("Please enter you username");
            isLoading(false);
        } else if (formValues.email === "") {
            toast.error("Please enter your email address.");
            isLoading(false);
        } else if (!formValues.email.match(mailformat)) {
            toast.error("You have entered an invalid email address!.");
            isLoading(false);
          } else if (formValues.password === "") {
            toast.error("Please enter your password.");
            isLoading(false);
        } else if (formValues.password.length < 8) {
            toast.error("Password should be atleast 8 character.");
            isLoading(false);
        } else if (!formValues.password.match(passwordformat)) {
            toast.error(
                "Password should be must contain at least one number and one uppercase and lowercase letter with at least one special character!."
            );
            isLoading(false);
        } else if (formValues.repassword === "") {
            toast.error("Please confirm your password.");
            isLoading(false);
        } else if (formValues.password !== formValues.repassword) {
            toast.error("Your entered password is mismatch.");
            isLoading(false);
        } else if (formValues.gender === "") {
            toast.error("Please select your gender.");
            isLoading(false);
        }else if (!options.includes(formValues.gender)) {
            toast.error("Please choose a gender from the provided countries");
            isLoading(false);
        }else if (formValues.amount.type === Number) {  
            toast.error("Please select amount");
            isLoading(false);
        } else if (!options.includes(formValues.category)) {
            toast.error("Please choose a category from the provided countries");
            isLoading(false);
        }else if (formValues.investedbefore === "") {
            toast.error("Please Fill all details");
            isLoading(false);
        } else if (formValues.termcondition === false) {
            toast.error("Please accept terms & conditions.");
            isLoading(false);
        }else if(!image){
            toast.error("Please upload your profile image.");
            isLoading(false);
        } 
        else { 

            const fileName = new Date().getTime() + image.name;
    
    
            const storageRef = ref(storage, fileName);
            // console.log(fileName);
            const uploadTask = uploadBytesResumable(storageRef, image);
    
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                    }
                },
                (error) => {
                    toast.error("Something went wrong");
                    console.log(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {                 
                       setUrl(downloadURL);
                      
                    }).then(
                            async ()=>{
                            console.log("yes i am here");
                            try{
                
                                    const res = await publicRequest.post("/auth/investorregister",{
                                        username: formValues.username,
                                        email: formValues.email,
                                        profileImg: url,
                                        password:formValues.password,
                                        category: category,
                                        amount: formValues.amount,
                                        gender:gender[0],
                                        investedbefore:investedbefore,
                                    });
                                 
                                    console.log(res.status);
                                  if(res.status === 200){
                                    toast.success("Registered Successfully");
                                     navigate("/investorlogin");
                                    
                                    }
                                    
                                    // setData(res.data);
                
                            }catch(err){
                                toast.error("error while registering");
                                console.log(err);
                            };
                        }
                    )
                }
            );
      
            
        }
    };

    const handleChange = (event) => {
        // console.log(event);
        setGender(event.target.value);
    };
    const handleChangeinvestedbefore= (event) => {
        setinvestedbefore(event.target.value);
    }
    const handlecategory = (event) => {
      
        setCategory(event.target.value);
    };
    const handleimage = (e) => {

        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="h-screen flex flex-col overflow-x-hidden font-nunito">
                <div className="">
                    <Header />
                </div>
                <div className=" grid grid-cols-12 justify-items-center justify-center flex-1 items-center py-8">
                    <div className="md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10 col-start-2 col-end-12 w-full px-8 mt-4  bg-white py-8 shadow-lg rounded-xl border-2">
                        <h1 className="text-center text-3xl font-extrabold text-gray-900 pb-4">
                            Sign up
                        </h1>

                        <div className="text-left  grid gap-3 text-base">
                            <div>
                                <label htmlFor="username" className="font-medium">
                                    Username<span style={{ color: "red" }}>*</span>
                                </label>
                                <input
                                    {...register("username", { required: true })}
                                    style={errors.username ? { border_color: "red" } : {}}
                                    name="username"
                                    className="appearance-none text-sm rounded-none font-medium relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md :outline-none :ring-indigo-500 :border-indigo-500 :z-10 mt-2"
                                    placeholder="user123"
                                />
                            </div>
                            <div className="text-left  grid gap-3 text-base">
                                <div>
                                    <label htmlFor="email" className="font-medium">
                                        Email<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        {...register("email", { required: true })}
                                        style={errors.email ? { border_color: "red" } : {}}
                                        name="email"
                                        className="appearance-none text-sm rounded-none font-medium relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md :outline-none :ring-indigo-500 :border-indigo-500 :z-10 mt-2"
                                        placeholder="user123@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender" className="font-medium">
                                        Gender<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div>
                                        <input
                                            {...register("gender", { required: true })}
                                            style={errors.gender ? { border_color: "red" } : {}}
                                            list="list"
                                            placeholder="Enter the gender"
                                            data-test="gender"
                                            value={gender}
                                            autoComplete="off"
                                            className="appearance-none text-sm rounded-none font-medium relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md :outline-none :ring-indigo-500 :border-indigo-500 :z-10 mt-2"
                                            onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <datalist id="list" name="gender">
                                        <option
                                            className="px-5 py-3 text-lg"
                                            value="Male"
                                        ></option>
                                        <option
                                            className="px-5 py-3 text-lg"
                                            value="Female"
                                        ></option>

                                    </datalist>
                                </div>
                                <div>
                                    <label htmlFor="category" className="font-medium">
                                        category<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div>
                                        <input
                                            {...register("category", { required: true })}
                                            style={errors.category ? { border_color: "red" } : {}}
                                            list="clist"
                                            placeholder="Enter the category"
                                            data-test="category"
                                            value={category}
                                            autoComplete="on"
                                            className="appearance-none text-sm rounded-none font-medium relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md :outline-none :ring-indigo-500 :border-indigo-500 :z-10 mt-2"
                                            onChange={handlecategory}
                                            required
                                        ></input>
                                    </div>
                                    <datalist id="clist" name="category">
                                        <option
                                            className="px-5 py-3 text-lg"
                                            value="Technical"
                                        ></option>
                                        <option
                                            className="px-5 py-3 text-lg"
                                            value="Automobile"
                                        ></option>
                                        <option
                                            className="px-5 py-3 text-lg"
                                            value="Education"
                                        ></option>
                                        <option
                                            className="px-5 py-3 text-lg"
                                            value="Travel"
                                        ></option>
                                        <option
                                            className="px-5 py-3 text-lg"
                                            value="finance"
                                        ></option>
                                        <option
                                            className="px-5 py-3 text-lg"
                                            value="digital marketing"
                                        ></option>

                                    </datalist>
                                </div>
                                <div className="relative">
                                    <label htmlFor="password" className="font-medium relative">
                                        Password<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="appearance-none text-sm rounded-none font-medium relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md :outline-none :ring-indigo-500 :border-indigo-500 :z-10 mt-2"
                                            placeholder="Password"
                                            onClick={() => {
                                                setShowPasswordChecker(true);
                                            }}
                                            onBlur={() => setShowPasswordChecker(false)}
                                            onChange={(e) => {
                                                passwordVerify(e);
                                                setPassword(e.target.value);
                                            }}
                                        />
                                        <button
                                            className="absolute left-full -translate-x-full p-2 z-20 mt-2"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowPassword((val) => !val);
                                            }}
                                            data-test="show-password"
                                        >
                                            {!showPassword ? (
                                                <AiOutlineEye size="1.2rem" />
                                            ) : (
                                                <AiOutlineEyeInvisible size="1.2rem" />
                                            )}
                                        </button>
                                    </div>
                                    <div
                                        className={`absolute w-max z-10 inset-x-full top-1/3 p-1 rounded bg-slate-50 drop-shadow-lg ml-4 ${showPasswordChecker ? "block" : "hidden"
                                            }`}
                                    >
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmpassword" className="font-medium">
                                        Confirm password<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            {...register("repassword", { required: true })}
                                            style={errors.repassword ? { border_color: "red" } : {}}
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="repassword"
                                            className="appearance-none rounded-none text-sm font-medium relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md :outline-none :ring-indigo-500 :border-indigo-500 :z-10 mt-2"
                                            placeholder="Confirm Password"
                                        />
                                        <button
                                            className="absolute left-full -translate-x-full p-2 z-20 mt-2"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowConfirmPassword((val) => !val);
                                            }}
                                            data-test="show-repassword"
                                        >
                                            {!showConfirmPassword ? (
                                                <AiOutlineEye size="1.2rem" />
                                            ) : (
                                                <AiOutlineEyeInvisible size="1.2rem" />
                                            )}
                                        </button>
                                    </div>

                                    <diV className="mt-5 mb-5">
                                    <label htmlFor="logo" className="mr-5 font-medium relative">
                                        Profile Image<span style={{ color: "red" }}>*</span>
                                    </label>
                                        <input 
                                        type="file" name="image" onChange={handleimage} ></input>
                                    </diV>

                                    <div>
                                        <label htmlFor="amount" className="font-medium">
                                            amount<span style={{ color: "red" }}>*</span>
                                        </label>
                                        <input
                                            {...register("amount", { required: true })}
                                            style={errors.amount ? { border_color: "red" } : {}}
                                            type="number"
                                            name="amount"
                                            className="appearance-none rounded-none text-sm font-medium relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md :outline-none :ring-indigo-500 :border-indigo-500 :z-10 mt-2"
                                            placeholder="Enter approx amount you want to invest"
                                        />
                                    </div>
                                    <div>
                                       
                                        <select htmlFor="investedbefore"
                                            value={investedbefore}
                                            label="investedbefore"
                                            onInput={handleChangeinvestedbefore}
                                            {...register("investedbefore", { required: true })}
                                            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor-500 focus:border-themeColor-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-themeColor-500 dark:focus:border-themeColor-500">
                                            <option value={""} selected>Have you invested before</option>
                                            <option value={false}>No</option>
                                            <option value={true}>Yes</option>

                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 ">
                                <input
                                    {...register("termcondition")}
                                    name="termcondition"
                                    type="checkbox"
                                    value=""
                                    className="h-4 w-4 text-indigo-600 :ring-indigo-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="rememberme"
                                    className="text-center text-sm text-grey-dark"
                                >
                                    By signing up, you agree to the{" "}
                                    <Link to="/terms-and-conditions" className="text-themeColor-600">
                                        <u>Terms of service and Privacy policy</u>
                                    </Link>
                                    <span style={{ color: "red" }}>*</span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-2 text-center py-2  rounded bg-green text-white :outline-none my-1 bg-themeColor hover:bg-themeHover"
                                // style={{ backgroundColor: "#5c6e64" }}
                                style={{ backgroundColor: "gray" }}
                            >
                                {loader && (
                                    <svg
                                        role="status"
                                        className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-themeColor-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                )}
                                {!loader && <>Create Account</>}
                            </button>
                        </div>
                        <div className="text-grey-dark text-center mt-6 border-t-2 border-solid border-gray-300">
                            <div className="mt-1">
                                Already have an account? &nbsp;
                                <span style={{ color: "#246eaa" }}>
                                    <Link to="/Login">
                                        <u>Log in</u>
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

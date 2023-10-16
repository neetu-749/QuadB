import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import CompanyLogin from '../Login/CompanyLogin'
import { useSelector } from 'react-redux'
import Footer from '../../Components/Footer/Footer'
import { publicRequest } from '../../requestMethods'
import { toast } from 'react-toastify'
// import 'aos/dist/aos.css';
const CompanyHome = () => {
    const [neww, setNeww] = useState('');
    const [equity, setEquity] = useState('')
    const [cdata, setCdata] = useState([]);

    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);
    useEffect(() => {
        // console.log("anil", user);
        if (!user) { navigate("/login") }
    }, [user]);

    useEffect(() => {

        const getcdata = async () => {
            try {
                const res = await publicRequest.get("/investor/");
                setCdata(res.data);

            } catch (err) {
                console.log(err);
            };
        };
        getcdata();

    }, []);

    const handleChangenew = (event) => {
        setNeww(event.target.value);

        const getcdata = async () => {
            try {
                const res = await publicRequest.get("/investor?new=" + event.target.value);
                setCdata(res.data);

            } catch (err) {
                console.log(err);
            };
        };
        getcdata();
        setEquity('');
    };

    const handleChangeequity = (event) => {
        setEquity(event.target.value);
        const getcdata = async () => {
            try {
                const res = await publicRequest.get("/investor?equity=" + event.target.value);
                setCdata(res.data);

            } catch (err) {
                console.log(err);
            };
        };
        getcdata();
        setNeww('');
    };
    const handleClick = async(item) => {
        try {
            const res = await publicRequest.post("/conversation/", { receiverId:user?._id , senderId: item?._id });      
            if(res.status === 200){
                toast.success("chat created");
                navigate("/chat");        
            }
    
        } catch (err) {
            toast.error("something went wrong");
            console.log(err);
        };

    }
    // console.log(cdata);

    return (
        <div >
            <Header></Header>

            <div class="mt-5">
                <span>let's apply some filter to right match..</span>
                <label for="equity" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">equity</label>
                <select id="equity" value={equity} label="equity" onChange={handleChangeequity} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor-500 focus:border-themeColor-500   p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-themeColor-500 light:focus:border-themeColor-500">
                    <option selected>equity</option>
                    <option value={10}>10%</option>
                    <option value={20}>20%</option>
                    <option value={30}>30%</option>
                    <option value={40}>40%</option>
                </select>
                <label for="recently added" class=" mb-2 text-sm font-medium text-gray-900 dark:text-white">recently added</label>
                <select value={neww} label="New" onChange={handleChangenew} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor-500 focus:border-themeColor-500   p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-themeColor-500 light:focus:border-themeColor-500">
                    <option selected>recently added</option>
                    <option value={true}>Yes</option>
                    {/* <option value={false}>No</option> */}
                </select>

            </div>
            <section class="bg-white">
                <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" >
                    <div
                        class=" md:items-center grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-16 lg:items-center"

                    >

                        {cdata.map((item) => (
                            <div className=" mt-5" data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                                <div className="mx-auto h-24 w-24 border-solid border-4 border-themeColor-500 rounded-full" >

                                <img
                                    src={item.profileImg}
                                    class="mx-auto h-24 w-24 border-solid border-4 border-white-500 rounded-full object-cover shadow-xl"
                                />
                                </div>

                                <blockquote
                                    class="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl h-4/5"
                                >
                                    <p class="text-lg font-bold text-gray-700">{item.username}</p>
                                    <p class="mt-4 text-sm text-gray-500">
                                        {item.gender === 'M' ? <span>Mr </span> : <span>Mrs </span>}{item.username} wants to invest <b>{item.amount}</b>  in companys related to <b>{item.category}</b> industry.{item.gender === 'M' ? <span>He </span> : <span>She </span>}{item.investedbefore === true ? <span>have also invested before in many companies.</span> : <span>is a new investor.</span>}
                                    </p>
                                    <button onClick={()=>handleClick(item)} class="cursor-pointer bg-gray-500 hover:bg-gray-400 text-white font-bold mt-5 -mb-5 py-1 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">
                                        Click here to connect
                                    </button>

                                </blockquote>
                            </div>

                        ))}
                    </div>
                </div>
            </section>
            <Footer></Footer>

        </div>
    )
}

export default CompanyHome
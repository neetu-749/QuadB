import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import CompanyLogin from '../Login/CompanyLogin'
import { useSelector } from 'react-redux'
import Footer from '../../Components/Footer/Footer'
import { publicRequest } from '../../requestMethods'
import { toast } from 'react-toastify'
// import 'aos/dist/aos.css';
const InvestorHome = () => {

  const navigate = useNavigate();
  const user = useSelector(state => state.user.currentUser);
  useEffect(() => {
    // console.log("anil", user);
    if (!user) { navigate("/login") }
  }, [user]);



  const [neww, setNeww] = useState('');
  const [equity, setEquity] = useState('')
  const [profit, setProfit] = useState('')
  const [evolution, setEvolution] = useState('')


  const handleChangenew = (event) => {
    setNeww(event.target.value);

    const getcdata = async () => {
      try {
        const res = await publicRequest.get("/company?new=true");
        setCdata(res.data);

      } catch (err) {
        console.log(err);
      };
    };
    getcdata();


    setEquity('');
    setProfit('');
    setEvolution('');
  };

  const handleChangeequity = (event) => {
    setEquity(event.target.value);
    const getcdata = async () => {
      try {
        const res = await publicRequest.get("/company?equity=" + event.target.value);
        setCdata(res.data);

      } catch (err) {
        console.log(err);
      };
    };
    getcdata();

    setNeww('');

    setProfit('');
    setEvolution('');
  };


  const handleChangeprofit = (event) => {
    setProfit(event.target.value);
    const getcdata = async () => {
      try {
        const res = await publicRequest.get("/company?profit=" + event.target.value);
        setCdata(res.data);

      } catch (err) {
        console.log(err);
      };
    };
    getcdata();

    setNeww('');
    setEquity('');

    setEvolution('');
  };

  const handleChangeevolution = (event) => {
    setEvolution(event.target.value);
    const getcdata = async () => {
      try {
        const res = await publicRequest.get("/company?evolution=" + event.target.value);
        setCdata(res.data);

      } catch (err) {
        console.log(err);
      };
    };
    getcdata();

    setNeww('');
    setEquity('');
    setProfit('');

  };

  const [cdata, setCdata] = useState([]);

  useEffect(() => {

    const getcdata = async () => {
      try {
        const res = await publicRequest.get("/company/");
        setCdata(res.data);

      } catch (err) {
        console.log(err);
      };
    };
    getcdata();

  }, []);

  const handleClick = async (item) => {
    // console.log("yes anil sir",item._id);
    try {
      const res = await publicRequest.post("/conversation/", { receiverId: user._id, senderId: item._id });
      if (res.status === 200) {
        toast.success("chat created");
        navigate("/chat");
      }

    } catch (err) {
      toast.error("something went wrong");
      console.log(err);
    };


  };

  console.log(cdata);


  return (
    <div >
      <Header></Header>

      <div class="mt-5 -mb-10 ">
        <span>let's apply some filter to right match..</span>
        <label for="equity" class=" text-sm font-medium text-gray-900 dark:text-white">equity</label>
        <select id="equity" value={equity} label="equity" onChange={handleChangeequity} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor-500 focus:border-themeColor-500   p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-themeColor-500 light:focus:border-themeColor-500">
          <option selected>equity</option>
          <option value={10}>10%</option>
          <option value={20}>20%</option>
          <option value={30}>30%</option>
          <option value={40}>40%</option>
        </select>
        <label for="recently added" class=" text-sm font-medium text-gray-900 dark:text-white">recently added</label>
        <select value={neww} label="New" onChange={handleChangenew} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor-500 focus:border-themeColor-500   p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-themeColor-500 light:focus:border-themeColor-500">
          <option selected>recently added</option>
          <option value={true}>Yes</option>
          {/* <option value={false}>No</option> */}
        </select>
        <label for="profit" class=" text-sm font-medium text-gray-900 dark:text-white">profit</label>
        <select id="profit" value={profit} label="profit" onChange={handleChangeprofit} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor-500 focus:border-themeColor-500   p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-themeColor-500 light:focus:border-themeColor-500">
          <option selected>profit</option>
          <option value={100000}>10 L</option>
          <option value={300000}>20 L</option>
          <option value={500000}>30 L</option>
          <option value={1000000}>40 L</option>
        </select>
        <label for="evolution" class=" text-sm font-medium text-gray-900 dark:text-white">evolution</label>
        <select id="evolution" value={evolution} label="evolution" onChange={handleChangeevolution} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-themeColor-500 focus:border-themeColor-500   p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-themeColor-500 light:focus:border-themeColor-500">
          <option selected>evolution</option>
          <option value={100000}>10 L</option>
          <option value={300000}>20 L</option>
          <option value={500000}>30 L</option>
          <option value={1000000}>40 L</option>
        </select>

      </div>
      <section class="bg-white">
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" >
          <div
            class=" md:items-center grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-16 lg:items-center"

          >

            {cdata.map((item, _id) => (
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
                    {/* {item.username} wants to invest of <b>{item.amount}</b>. */}
                    It is <b>{item.year}</b> years old company in <b>{item.category}</b> industry.
                    Last year profit was <b>{item.profit}</b> and last year sales where around <b>{item.sales}</b>.it hase a evolution of <b>{item.evolution}</b> from last round.
                    Company wants to disolve <b>{item.equity}</b> of equity.
                  </p>
                  <button class="cursor-pointer bg-gray-500 hover:bg-gray-400 text-white font-bold mt-5 -mb-5 py-1 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
                    onClick={() => handleClick(item)}>
                    Click here to start chat
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

export default InvestorHome
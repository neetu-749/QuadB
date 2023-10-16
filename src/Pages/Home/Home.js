import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import CompanyLogin from '../Login/CompanyLogin'
import { useSelector } from 'react-redux'
import InvestorHome from './InvestorHome'
import CompanyHome from './CompanyHome'
// import 'aos/dist/aos.css';
const Home = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);
    const type = useSelector(state=>state.user.type);
    console.log("anil",user);
    
    useEffect(() => {
        if(!user){navigate("/login")}
        else if(user?.verifed == false){
            navigate("/otp");
          }
    }, []);

    return (
        <div >
          {type==="in" ? <InvestorHome/> : <CompanyHome/>}

        </div>
    )
}

export default Home
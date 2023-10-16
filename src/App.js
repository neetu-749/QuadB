import logo from './logo.svg';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import CompanyLogin from './Pages/Login/CompanyLogin';
import InvestorLogin from './Pages/Login/InvestorLogin';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Investorregister from './Pages/Register/InvestorRegister';
import CompanyRegister from './Pages/Register/CompanyRegister';
import { useSelector } from 'react-redux';
import InvestorHome from './Pages/Home/InvestorHome';
import CompanyHome from './Pages/Home/CompanyHome';
import Home from './Pages/Home/Home';
import Otp from './Pages/Otp/Otp';
import Chat from './Pages/Chat/Chat';
import Contact from './Pages/Contact/Contact';
import Landing from './Pages/Landing/Landing';



function App() {

 


  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<Register />} />
      <Route path="/companylogin" element={<CompanyLogin />} />
      <Route path="/investorlogin" element={<InvestorLogin />} />
      <Route path="/investorregister" element={<Investorregister />} />
      <Route path="/companyregister" element={<CompanyRegister />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/chat" element={<Chat></Chat>}/>
      <Route path="/otp" element={<Otp/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/terms-and-conditions" element={<Contact/>} />



    </Routes>
    <ToastContainer />
    </div>
  );
}

export default App;

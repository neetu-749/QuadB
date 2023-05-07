import { useLocation } from "react-router-dom";
import "./form.css";
import { useState } from "react";

// const Card = (data) =>{
//     console.log(data.data.show);
//     return (
//         <>
//         <>{data.data.show.id}</>
//         <>{data.data.show.id}</>
//         <img src={data.data.show.url}/>
//         </>
//     )
// }


const Card = () => {

    const location = useLocation();
    const propsData = location.state;
    const [formSubmitted, setFormSubmitted] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        let userName = e.target[0].value;
        const mobile = e.target[1].value;
        const address = e.target[2].value;
        const pincode = e.target[3].value;
        
        setFormSubmitted(true);
        if(userName!="" && mobile!="" && address!="" && pincode!=""){
            localStorage.setItem(`userName${mobile}`,userName)
            localStorage.setItem(`mobile${mobile}`,mobile)
            localStorage.setItem(`address${mobile}`,address)
            localStorage.setItem(`pincode${mobile}`,pincode)
        }
    }

    return (
        <div className="form">
            <div className="form-div">
                <div style={{fontSize:"25px",fontWeight:"600",color:"#0B2D36",marginBottom:"10px"}}>{propsData.show.name}</div>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="userName" placeholder="Enter your Name..." />
                    <input type="number" className="userMobile" placeholder="Enter your Mobile Number..." />
                    <input type="text" className="userAddress" placeholder="Enter your Address..." />
                    <input type="number" className="userPincode" placeholder="Enter your Pincode..." />
                    <button className="submit">Book Now</button>
                </form>
                {formSubmitted && <div className="message" style={{ display: "block" }}>Thanks! Your Ticket is Booked</div>}
            </div>
        </div>
    )
}
export default Card;
import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
// import 'aos/dist/aos.css';
const Landing = () => {

    return (
        <div className="center">
            <Header></Header>
            <section class="bg-white">
                <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" >
                    <div class=" max-w-xl text-left" >
                        <h2 class="text-5xl font-bold">
                            The Best Way for Companies and Investors to Connect
                        </h2>

                    </div>

                    <div
                        class="mt-16 md:items-center grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:items-center"

                    >

                        <div className="text-2xl" data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                            Connect with other companies and investors on a chat platform that satisfies all your needs! This platform allows you to chat with anyone according to your requirements.
                        </div>

                        <div data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                            <img className="mx-auto rounded object-cover shadow-xl" src="/Images/img1.jpg"></img>
                        </div>

                    </div >
                </div >
                <div class="-mt-20 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" >
                    <div class=" max-w-xl text-right" >
                        <h2 class="text-5xl font-bold">
                            Connect with Investors and Take Your Business to the Next Level.
                        </h2>

                    </div>

                    <div
                        class="mt-16 md:items-center grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:items-center"

                    >
                        <div  data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                            <img className="mx-auto rounded object-cover shadow-xl" src="/Images/img2.jpg"></img>

                        </div>

                        <div className="text-2xl" data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                            Build your investor network and grow your business with InvestMatch, the ultimate platform for entrepreneurs and investors.you can connect with investors and find the right match for your business in minutes, not months. Say goodbye to lengthy and inefficient fundraising processes.

                        </div>

                    </div>
                </div>
                {/* <div class="-mt-20 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" >
                <div class=" max-w-xl text-left" >
                        <h2 class="text-5xl font-bold">
                            Cards:
                        </h2>

                    </div>

                        <div className="mt-10 text-2xl font-bold" data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                            - Use Case 1: Are you looking for investors or companies ? Chat with relevant parties according to your investment needs. [Find Your Match]
                           
                        </div>
                        <br/>
                        
                        <div className="text-2xl font-bold" data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                            - Use Case 2: Looking for new ideas for your business or investment? Chat with people working in different fields. [Open Your Mind]
                           
                        </div>
                </div> */}
            </section>
            <Footer ></Footer>
            
        </div>
    )
}

export default Landing
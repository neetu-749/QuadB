import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
// import 'aos/dist/aos.css';
const Register = () => {

    return (
        <div >
            <Header></Header>
            <section class="bg-white">
                <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8" >
                    <div class="mx-auto max-w-xl text-center" >
                        <h2 class="text-5xl font-bold">
                            Register as.....
                        </h2>

                    </div>

                    <div
                        class="mt-16 md:items-center grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:items-center"

                    >
                    <Link to="/companyregister">
                        <div className="cursor-pointer" data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                            <img
                                alt="Woman"
                                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=344&q=80"
                                class="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
                            />

                            <blockquote
                                class="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl h-4/5"
                            >
                                <p class="text-lg font-bold text-gray-700">Company</p>
                                <p class="mt-4 text-sm text-gray-500">
                                    Let's Groww allows you to expand your network and meet potential investors and business partners from around the world. With our networking events and community, you can share your ideas and collaborate with like-minded professionals.
                                </p>
                            </blockquote>
                        </div>
                        </Link>

                        <Link to="/investorregister">
                            <div className="cursor-pointer" data-aos="fade-right" data-aos-duration="20" data-aos-offset="100">
                                <img
                                    alt="Woman"
                                    src="https://images.unsplash.com/photo-1535643302794-19c3804b874b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                                    class="mx-auto h-24 w-24 rounded-full object-cover shadow-xl"
                                />

                                <blockquote
                                    class="-mt-6 flex flex-col justify-between rounded-lg p-12 text-center shadow-xl h-4/5"
                                >
                                    <p class="text-lg font-bold text-gray-700">Investor</p>
                                    <p class="mt-4 text-sm text-gray-500">
                                    Let's Groww allows you to expand your network and incredible people have been able to expand my network in ways you never thought possible. we highly recommend it to all entrepreneurs and investors out here.
                                    </p>
                                </blockquote>
                            </div>
                        </Link>




                    </div>
                </div>
            </section>

        </div>
    )
}

export default Register
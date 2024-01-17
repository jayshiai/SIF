import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Link from 'next/link';
const page = () => {
    return (
        <>


            <div className='bg-[#e8eff9] h-[calc(100vh-64px)] w-[calc(100vw-255px)] p-8 overflow-y-auto overflow-x-hidden'>
                <div className='m-auto w-full  h-fit'>
                    <img src="https://bhuvan.nrsc.gov.in/home/images/BhuvanGenesis2.jpg" alt="" />
                </div>
                <div className='m-auto w-full  h-[40px] flex items-center whitespace-nowrap'>
                    <div className='h-full bg-blue-700 text-white flex items-center px-3 rounded-l-sm'>
                        Latest Updates
                    </div>
                    <div className='px-4'>Hi</div>
                    <div className='px-4'>Latest News-Bhuvan</div>
                    <div className='px-4'>Newsletter Arriving</div>
                    <div className='px-4'>Who let these dogs out?</div>
                    <div className='px-4'>Where's Waldo?</div>
                    <div className='px-4'>Finding nemo</div>

                </div>
                <div className='w-full mt-8'>
                    <h2 className='w-full text-center text-2xl '>Visulization data and Free Download</h2>
                    <p className='w-full text-center mt-2'>Collaborative applications - Platform to share your data and create governance applications</p>
                </div>
                <div className='flex w-full gap-4 justify-center mt-4'>
                    <div className='bg-white h-[200px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[200px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[200px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[200px] w-[200px] flex justify-center items-center'>Some Text</div>
                </div>
                <div className='w-full mt-8'>
                    <h2 className='w-full text-center text-2xl '>Application Sectors</h2>
                    <p className='w-full text-center mt-2'>Collaborative applications - Platform to share your data and create governance applications</p>
                </div>
                <div className='flex w-full gap-4 justify-center mt-4'>
                    <div className='bg-white h-[200px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[200px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[200px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[200px] w-[200px] flex justify-center items-center'>Some Text</div>
                </div>

                <div className='w-full mt-8'>
                    <h2 className='w-full text-center text-2xl '>Maps & OGC Services</h2>
                    <p className='w-full text-center mt-2'>Collaborative applications - Platform to share your data and create governance applications</p>
                </div>
                <div className='flex w-full gap-4 justify-center mt-4'>
                    <div className='bg-white h-[100px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[100px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[100px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[100px] w-[200px] flex justify-center items-center'>Some Text</div>
                </div>
                <div className='w-full mt-8'>
                    <h2 className='w-full text-center text-2xl '>Bhuvan Central Applications    </h2>
                    <p className='w-full text-center mt-2'>Collaborative applications - Platform to share your data and create governance applications</p>
                </div>
                <div className='flex w-full gap-4 justify-center mt-4'>
                    <div className='bg-white h-[100px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[100px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[100px] w-[200px] flex justify-center items-center'>Some Text</div>
                    <div className='bg-white h-[100px] w-[200px] flex justify-center items-center'>Some Text</div>
                </div>
            </div>

        </>
    )
}

export default page
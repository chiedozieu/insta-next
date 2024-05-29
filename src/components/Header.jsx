'use client';

import Link from "next/link"
import Image from "next/image"
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from 'react-modal';
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { AiOutlineCloseSquare } from "react-icons/ai";

export default function Header() {
    const { data: session } = useSession();
    
    const [isOpen, setIsOpen] = useState(false)
    
  return (
    <div className="shadow-sm border-b sticky top-0 z-30 p-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link href='/' className="hidden lg:inline-flex">
                <Image
                src='/Instagram.png'
                width={66} height={66}
                alt="Instagram Logo"
                />
            </Link>
            <Link href='/' className="lg:hidden">
                <Image
                src='/Insta.png'
                width={50} height={50}
                alt="Instagram Logo"
                />
            </Link>
            <input type="text" placeholder="Search..."
            className="bg-gray-50 border border-gray-200 text-sm rounded w-full py-2 px-4 max-w-[210px]" />

            { session ? (
                <div className="flex items-center gap-2">
                 <AiOutlinePlusCircle className="text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-success"
                  onClick={()=> setIsOpen(true)}
                 />
                  <img
                  src={session.user.image}
                  alt={session.user.name}
                  onClick={signOut}
                  className="h-10 w-10 rounded-full cursor-pointer"
                  />
                </div>
            ) : (
            <button 
            className="font-semibold text-blue-500"
            onClick={signIn}
            >Sign In
            </button>
                
            ) }
        </div>
        {
          isOpen && (
            <Modal isOpen={isOpen} className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-sm' 
            onRequestClose={()=> setIsOpen(false )}
            ariaHideApp={false}
            >
               <div className="flex flex-col items-center justify-center h-[100%]">
                <MdOutlinePhotoCameraBack className="text-5xl text-gray-600 cursor-pointer" />
               </div>
               <input type="text" maxLength='150' placeholder="Please enter your caption..." className="mb-4 border-none text-center w-full outline-none"/>
               {/* <input type="file" /> */}
               <button className="bg-red-600 w-full rounded-lg text-white hover:bg-red-700 p-2 disabled:bg-slate-200 disabled:cursor-not-allowed disabled:hover:bg-slate-300">Upload Post</button>
               <AiOutlineCloseSquare className="absolute top-2 right-2 cursor-pointer hover:text-red-600 transition duration-300 text-2xl" onClick={()=> setIsOpen(false)}/>
            </Modal>
          )
        }
    </div>

  )
}
  
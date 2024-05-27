'use client';

import Link from "next/link"
import Image from "next/image"
import { signIn, useSession, signOut } from "next-auth/react"

export default function Header() {
    const { data: session } = useSession(); 
    console.log(session);
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
                <img src={session.user.image} alt={session.user.name} onClick={signOut} className="h-10 w-10 rounded-full cursor-pointer"/>
            ) : (
            <button 
            className="font-semibold text-blue-500"
            onClick={signIn}
            >Sign In
            </button>
                
            ) }
        </div>
    </div>
  )
}
  
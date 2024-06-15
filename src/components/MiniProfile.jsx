 'use client';

 import { useSession, signIn, signOut } from 'next-auth/react'

export default function MiniProfile() {
    const {data: session} = useSession()
  return (
    <div className='flex items-center justify-between mt-14 ml-10 w-full'>
        <img
            className='w-16 h-16 rounded-full ' 
            src={session?.user?.image ||  'insta.png'} 
            alt="user pic or instagram logo" />
        <div className=" text-gray-900 flex-1 ml-2 ">
            <h1 className='font-bold text-xl'>{session?.user?.username}</h1>
            <h3 className='text-xs text-gray-500'>Welcome to instagram</h3>
        </div>
        <div className="">
            {
                session? 
                (<button
                    onClick={signOut}
                    className='text-blue-500 text-sm font-semibold'
                >Sign Out</button>
                ) : (<button
                    onClick={signIn}
                    className='text-blue-500 text-sm font-semibold'
                >Sign In</button>)
            }
        </div>
        
    </div>
  )
} 

'use client';

import Link from "next/link"
import Image from "next/image"
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from 'react-modal';
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { app } from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';

export default function Header() {
    const { data: session } = useSession(); 
    const filePickerRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFile, setSelectedFile ] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUpLoading, setImageFileUpLoading] = useState(false)
    const [postUploading, setPostUploading] = useState(false)
    const [ caption, setCaption] = useState('')

    const db = getFirestore(app)

    const addImageToPost = (e) => {
      const file = e.target.files[0]; 
      if (file) {
        setSelectedFile(file)
        setImageFileUrl(URL.createObjectURL(file)); 
        
      }
    }

    useEffect(()=>{
      if (selectedFile) {
        upLoadImageToStorage();
      }
    },[selectedFile])

   
    async function upLoadImageToStorage () {
      setImageFileUpLoading(true)   
      const storage = getStorage(app)
      const fileName = new Date().getTime() + '-' + selectedFile.name
      const storageRef = ref(storage, fileName);
      const upLoadTask = uploadBytesResumable(storageRef, selectedFile);
      upLoadTask.on(
        'state_changed', 
        (snapshot)=> {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is' + progress + '%done');
        },
        (error) => {
          console.error(error)
          setImageFileUpLoading(false);
          setImageFileUrl(null);
          setSelectedFile(null);
        },
        ()=> {
          getDownloadURL(upLoadTask.snapshot.ref).then((getDownloadURL)=> {
            setImageFileUrl(getDownloadURL);
            setImageFileUpLoading(false)
          })
        }
      )
    } 
    async function handleSubmit () {
      setPostUploading(true)
      const docRef = await addDoc(collection(db, 'posts'),{
        username: session.user.username,
        caption: caption,
        profileImage: session.user.image,
        image: imageFileUrl,
        timestamp: serverTimestamp()
    });
    setPostUploading(false);
    setIsOpen(false);
    location.reload();
    }
// const [fn, ln] =  'Adamma Kemu'.split(' ')
// console.log(fn)
// const [fn, ln] =  session.user.name.split(' ')
// // console.log(fn)
// console.log(ln)
// console.log(session)
// console.log(session.user.username)

  return (
    <div className="shadow-sm border-b sticky top-0 z-50 bg-white p-3">
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
                 <AiOutlinePlusCircle className="text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-800"
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
                {
                  selectedFile ? (
                    <img onClick={() => setSelectedFile(null)} src={imageFileUrl} alt="Selected File" className={`w-full h-[250px] object-cover cursor-pointer ${imageFileUpLoading ? 'animate-pulse' : ''}`} />
                  ) : (

                    <MdOutlinePhotoCameraBack onClick={()=>filePickerRef.current.click()} className="text-5xl text-gray-600 cursor-pointer" />
                  )
                }
                    <input hidden ref={filePickerRef} type="file" accept="image/*" onChange={addImageToPost}/>
                    <input 
                    type="text" 
                    maxLength='150' 
                    placeholder="Please enter your caption..." 
                    className="mb-4 border-none text-center w-full outline-none"
                    onChange={(e)=> setCaption(e.target.value)} 
                    />
                    
                    <button 
                    onClick={handleSubmit}
                    disabled={
                      !selectedFile || caption.trim() === '' ||  postUploading || imageFileUpLoading
                    }
                    className="bg-red-600 w-full rounded-lg text-white hover:bg-red-700 p-2 disabled:bg-slate-200 disabled:cursor-not-allowed disabled:hover:bg-slate-300">Upload Post
                    </button>

                    <AiOutlineCloseSquare className="absolute top-2 right-2 cursor-pointer hover:text-red-600 transition duration-300 text-2xl" onClick={()=> setIsOpen(false)}/>
               </div>
            </Modal>
          )
        } 
    </div>

  )
}
  
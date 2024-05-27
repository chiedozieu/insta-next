import Link from "next/link"
import Image from "next/image"

export default function Header() {
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
        <button className="font-semibold text-blue-500">Sign In</button>
    </div>
    </div>
  )
}
  
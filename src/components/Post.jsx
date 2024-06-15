import { HiOutlineDotsVertical} from 'react-icons/hi';

export default function Post({post}) {
    
  return (
    <div className="bg-white my-7 border rounded-md">
        <div className="flex items-center p-5 border-b border-gray-100">
            <img 
                src={post.profileImage}
                className="h-12 rounded-full object-cover border p-1 mr-3" 
                alt={post.username} />

            <p className="flex-1 font-semibold">{post.username}</p>
            <HiOutlineDotsVertical className='cursor-pointer h-5'/>     
        </div>
        <img 
            className='object-cover w-full'
            src={post.image} alt={post.caption} />
            <p className='p-5 truncate'>
                <span className='font-semibold mr-2'>{post.username}</span>
                {post.caption}
            </p>
    </div>
  )
  
}

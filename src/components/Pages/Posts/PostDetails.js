import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';

const PostDetails = () => {
    const post = useLoaderData()
    console.log(post);

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={post?.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {post?.title}
                        <div className='flex items-center'>
                            <Link className='ml-4'><FaHeart className='text-red-500'></FaHeart></Link>
                            {post?.love}
                            {/* <Link onClick={() => handleLoveCount(post)} className='ml-4'><FaHeart className='text-red-500'></FaHeart></Link> */}
                        </div>
                    </h2>
                    <p>{post?.details}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary btn-sm"><Link>Add comment</Link></button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PostDetails;
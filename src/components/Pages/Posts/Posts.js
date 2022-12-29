import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Loading from '../../../Shared/Loading';


const Posts = () => {

    const handleLoveCount = (postDetails) => {
        const { post, title, email, img, love, _id } = postDetails;

        console.log(_id);
        const newPost = {
            post: post,
            title: title,
            email: email,
            img: img,
            love: love + 1
        }
        fetch(`https://social-media-server-opal.vercel.app/allPosts/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Data Updated')
                    console.log(data);
                    refetch()
                }

            })
    }




    const { data: allPosts = [], refetch, isLoading } = useQuery({
        queryKey: ['allPost'],
        queryFn: async () => {
            const res = await fetch('https://social-media-server-opal.vercel.app/allPosts');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }



    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3'>
                {
                    allPosts.map(post => <div className="card w-full md:w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={post?.img} alt="Shoes" className="rounded-xl w-72 h-52" />
                        </figure>
                        <div className="card-body items-center text-center">

                            <h2 className="card-title">{post?.title}</h2>
                            {/* <p>{post?.post}</p> */}
                            {
                                post?.comments && <p className='font-bold text-primary'>Comment: <span className='text-black'>
                                    {post?.comments}
                                </span></p>
                            }
                            <div className="card-actions items-center">
                                <div className='flex items-center'>
                                    {post?.love}
                                    <Link onClick={() => handleLoveCount(post)} className='ml-2'><FaHeart className='text-red-500'></FaHeart></Link>
                                </div>
                                <Link className="btn btn-primary btn-sm" to={`/posts/${post?._id}`}>Details</Link>
                            </div>
                        </div>
                    </div>)
                }

            </div>

        </div>
    );
};

export default Posts;
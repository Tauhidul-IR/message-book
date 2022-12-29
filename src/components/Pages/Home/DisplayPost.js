import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import SinglePost from './SinglePost';

const DisplayPost = () => {

    const { data: allPosts = [], refetch, isLoading } = useQuery({
        queryKey: ["allPosts"],
        queryFn: async () => {
            const res = await fetch(`https://social-media-server-opal.vercel.app/topPost`);
            const data = await res.json();
            return data;
        }
    });
    console.log(allPosts);


    return (
        <div>
            <h1 className='text-5xl font-bold my-10 text-center'>Display Post Section</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    allPosts.map(posts => <SinglePost key={posts._id} posts={posts}></SinglePost>)
                }
            </div>
        </div>
    );
};

export default DisplayPost;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';

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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    allPosts.map(posts => <div className="card w-full md:w-96 bg-base-100 shadow-xl">

                        <div className="card-body items-center text-center">

                            <h2 className="card-title">Post About : <span></span></h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>

                            <div className="card-actions items-center">
                                <Link to={`/posts/${posts?._id}`} className="btn btn-primary btn-sm">Details</Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default DisplayPost;
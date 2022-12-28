import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Loading from '../../../Shared/Loading';


const Posts = () => {
    // const [loveCount, setLoveCount] = useState()


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
        fetch(`http://localhost:4000/allPosts/${_id}`, {
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
            const res = await fetch('http://localhost:4000/allPosts');
            const data = await res.json();
            return data;
        }
    });



    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    allPosts.map(post => <div className="card w-full md:w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={post?.img} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">

                            <h2 className="card-title">{post?.title}</h2>
                            <p>{post?.post}</p>
                            {
                                <p>Commet: {post?.comments}</p>
                            }
                            <div className="card-actions items-center">
                                <div className='flex items-center'>
                                    {post?.love}
                                    <Link onClick={() => handleLoveCount(post)} className='ml-4'><FaHeart className='text-red-500'></FaHeart></Link>
                                </div>
                                <Link className="btn btn-primary btn-sm" to={`/posts/${post?._id}`}>Details</Link>
                                <button className="btn btn-primary btn-sm"><Link>Add comment</Link></button>
                            </div>
                        </div>
                    </div>)
                }

            </div>

        </div>
    );
};

export default Posts;
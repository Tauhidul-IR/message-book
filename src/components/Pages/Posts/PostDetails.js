import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';

const PostDetails = () => {
    const post = useLoaderData()
    console.log(post);

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




    const { data: postinfo = [], refetch, isLoading } = useQuery({
        queryKey: [post._id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4000/posts/${post._id}`);
            const data = await res.json();
            return data;
        }
    });












    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={post?.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {postinfo?.title}
                        <div className='flex items-center'>
                            {/* <Link className='ml-4'><FaHeart className='text-red-500'></FaHeart></Link> */}
                            {postinfo?.love}
                            <Link onClick={() => handleLoveCount(postinfo)} className='ml-4'><FaHeart className='text-red-500'></FaHeart></Link>
                        </div>
                    </h2>
                    <p>{postinfo?.details}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary btn-sm"><Link>Add comment</Link></button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PostDetails;
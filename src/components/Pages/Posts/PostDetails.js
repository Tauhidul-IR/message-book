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



    const handleAddComment = (event) => {
        event.preventDefault();
        const form = event.target;
        const comment = form.comment.value;

        const newPost = {
            post: postinfo.post,
            title: postinfo.title,
            email: postinfo.email,
            img: postinfo.img,
            love: postinfo.love,
            comments: comment
        }
        console.log(newPost);
        fetch(`http://localhost:4000/posts/${postinfo._id}`, {
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










    return (
        <div>
            <div className="card w-full md:w-96 bg-base-100 mx-auto my-10 shadow-xl">
                <figure><img src={post?.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {postinfo?.title}
                        <div className='flex items-center'>
                            {/* <Link className='ml-4'><FaHeart className='text-red-500'></FaHeart></Link> */}
                            <Link onClick={() => handleLoveCount(postinfo)} className='ml-4 mr-2'><FaHeart className='text-red-500'></FaHeart></Link>
                            {postinfo?.love}
                        </div>
                    </h2>
                    <p>{postinfo?.post}</p>
                    <p>Comments : {postinfo?.comments}</p>
                    <div className="card-actions justify-end">
                        {/* <Link onClick={() => handleAddComment(postinfo)} className="btn btn-primary btn-sm">Add comment</Link> */}
                        <form onSubmit={handleAddComment} className='grid grid-cols-1 w-full gap-3 mx-auto'>
                            <label className='font-bold'>Give your Comment</label>
                            <input name='comment' type="text" placeholder="Your Comment" className="input input-bordered w-full" />
                            <input className='w-12 btn-sm btn btn-neutral' type="submit" value="send" />

                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PostDetails;
import React from 'react';
import { Link } from 'react-router-dom';

const SinglePost = ({ posts }) => {
    const { title, post } = posts;
    const shortDetails = post.slice(0, 50);
    return (
        <div>
            <div className="card w-full md:w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={posts?.img} alt="Shoes" className="rounded-xl w-72 h-52" />
                </figure>

                <div className="card-body items-center text-center">

                    <h2 className="card-title">Post About : <span className='text-secondary'>{posts?.title}</span></h2>
                    <p>{shortDetails}</p>

                    <div className="card-actions items-center">
                        <Link to={`/posts/${posts?._id}`} className="btn btn-primary btn-sm">Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
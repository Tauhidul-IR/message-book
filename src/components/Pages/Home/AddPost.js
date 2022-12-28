import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const AddPost = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext)
    const userName = user?.displayName ? user.displayName : 'no name';
    console.log(user);


    const handleAddProduct = (data) => {
        // console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=d7af164dae32ae1803621b0c1dce000c`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const postDetails = {
                        title: data.title,
                        post: data.post,
                        img: imgData.data.url,
                        user: userName,
                        email: user?.email,
                        love: 0


                    }
                    console.log(postDetails);


                    fetch('http://localhost:4000/addPost', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(postDetails)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            if (result.acknowledged) {
                                toast.success(`Post added successfully`);
                            }
                            // navigate('/dashboard/myProduct')
                        })
                }
            })
            .catch(error => console.log(error))


    }

    return (
        <div className='my-10 w-full mx-auto'>
            <h1 className='text-5xl font-bold my-10 text-center'>Add Post Section</h1>
            <form onSubmit={handleSubmit(handleAddProduct)}>



                {/* --------------Name---------------------------------- */}
                <div className="form-control w-full ">
                    <label className="label"><span className="label-text font-bold">Post Title</span></label>
                    <input
                        {...register("title", {
                            required: 'Title Must Given.'
                        })}
                        type="text" className="input input-bordered w-full " />
                    {/* {errors.name && <p className='text-red-500'>{errors.name?.message}</p>} */}

                </div>
                {/* --------------Name---------------------------------- */}
                {/* --------------Name---------------------------------- */}
                <div className="form-control w-full ">
                    <label className="label"><span className="label-text font-bold">Your Post</span></label>
                    <input
                        {...register("post", {
                            required: 'Post Must Given.'
                        })}
                        type="text" className="textarea textarea-bordered h-24 w-full " />
                    {/* {errors.name && <p className='text-red-500'>{errors.name?.message}</p>} */}

                </div>
                {/* --------------Name---------------------------------- */}


                {/* --------------Upload photo---------------------------------- */}
                <div className="form-control w-full ">
                    <label className="label"><span className="label-text font-bold">Photo</span></label>
                    <input
                        {...register("image", {
                            required: 'Photo is required.'
                        })}
                        type="file" className="input input-bordered w-full " />
                    {errors.img && <p className='text-red-500'>{errors.img?.message}</p>}

                </div>
                {/* --------------Upload photo---------------------------------- */}


                {/* --------------Submit Btn---------------------------------- */}
                <input className='btn btn-primary mt-5' type="submit" value={'Add Post'} />
                {/* display Error */}
                <div>
                    {
                        // signUpError && <p className='text-red-600'>{signUpError}</p>
                    }
                </div>
            </form>
        </div>
    );
};

export default AddPost;
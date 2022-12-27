import React from 'react';

const AddPost = () => {
    return (
        <div className='my-10 w-96 mx-auto'>
            <h1 className='text-5xl font-bold my-10 text-center'>Add Post Section</h1>
            <form>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl font-bold">Post title</span>
                    </label>
                    <input name='title' className="input input-bordered w-full " placeholder=""></input>

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl font-bold">Write Your Post</span>
                    </label>
                    <textarea name='post' className="textarea textarea-bordered h-24" placeholder=""></textarea>

                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="text-xl font-bold">Upload Photo</span>

                    </label>
                    <input type="file" name='photo' className="input input-bordered w-full" />

                </div>
                <input className='btn btn-primary mt-5' type="submit" value={'Add Post'} />
            </form>
        </div>
    );
};

export default AddPost;
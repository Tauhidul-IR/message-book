import React from 'react';
import { toast } from 'react-hot-toast';

const EditAboutUserModal = ({ singleUser, setAboutUser, refetch }) => {

    const handleUpdateInfo = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const university = form.university.value;
        const address = form.address.value;
        const upadatedInfo = {
            name,
            email,
            university,
            address

        }

        fetch(`http://localhost:4000/user/${singleUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(upadatedInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Data Updated')
                    setAboutUser(null)
                    console.log(data);
                    refetch()
                }

            })
    }


    return (
        <div>






            <input type="checkbox" id="editAbout-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="editAbout-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2>Edit Your Info</h2>
                    <form onSubmit={handleUpdateInfo} className='grid grid-cols-1 gap-3 mt-10'>

                        <label>Name</label>
                        <input name='name' type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        <label>Email</label>
                        <input name='email' type="email" defaultValue={singleUser?.email} disabled className="input input-bordered w-full" />
                        <label>University</label>
                        <input name='university' type="text" placeholder="University" className="input input-bordered w-full" />
                        <label>Address</label>
                        <input name='address' type="text" placeholder="Address" className="input input-bordered w-full" />
                        <br />
                        <input className='w-full  btn btn-primary' type="submit" value="Save" />

                    </form>
                </div>
            </div>

        </div>
    );
};

export default EditAboutUserModal;
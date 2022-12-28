import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loading from '../../../Shared/Loading';
import EditAboutUserModal from './EditAboutUserModal';




const About = () => {
    const [aboutUser, setAboutUser] = useState(null);
    const { user } = useContext(AuthContext);

    const handlesetuser = () => {
        setAboutUser(singleUser)
    }

    const { data: singleUser, refetch, isLoading } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:4000/user?email=${user?.email}`);
            const data = await res.json()
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl w-full md:w-2/3 mx-auto">
                <div className="card-body">
                    <div className="card-actions justify-end">
                        {/* The button to open modal */}
                        <label onClick={handlesetuser} htmlFor="editAbout-modal" className="btn">Edit</label>
                    </div>
                    <h2 className="card-title">Name : <span className='text-primary'>{singleUser?.name}</span></h2>
                    <p className='font-bold'>Email : <span className='text-primary'>{singleUser?.email}</span></p>
                    <p className='font-bold'>University : <span className='text-primary'>{singleUser?.university}</span></p>
                    <p className='font-bold'>Address : <span className='text-primary'>{singleUser?.address}</span></p>
                </div>
                {
                    aboutUser && <EditAboutUserModal refetch={refetch} setAboutUser={setAboutUser} singleUser={singleUser}></EditAboutUserModal>
                }
            </div>
        </div >
    );
};

export default About;
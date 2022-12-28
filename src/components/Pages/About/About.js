import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loading from '../../../Shared/Loading';



const About = () => {

    const { user } = useContext(AuthContext)

    // 
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

    // fetch(`http://localhost:4000/user?email=${user?.email}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error))

    console.log(singleUser);

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{singleUser?.name}</h2>
                    <p>{singleUser?.email}</p>
                    <p>{singleUser?.university}</p>
                    <p>{singleUser?.address}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
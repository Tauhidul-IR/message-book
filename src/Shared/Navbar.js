import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext)

    const handlelogout = () => {
        logOutUser()
            .then(() => { })
            .catch(error => console.error(error))
    }


    const navItem = <>
        <li><Link to={'/'}>Home</Link></li>

        <li><Link to={'/posts'}>Posts</Link></li>
        {
            user?.uid ? <>
                <li><Link to={'/Login'}>About</Link></li>
                <li><Link onClick={handlelogout} to={'/Login'}>SignOut</Link></li>
            </> : <li><Link to={'/Login'}>Login</Link></li>
        }
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-xl">Message-Book</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
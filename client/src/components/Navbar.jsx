import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from "axios";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import profile from "../assets/profile.png";

const Navbarr = () => {
    const [userData, setUserData] = React.useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            axios.get("http://localhost:8080/isAuth", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            })
                .then((response) => {
                    console.log(response.data);

                    if (response.data.result && response.data.result.length > 0) {
                        const userData = response.data.result[0];
                        setUserData(userData);
                        localStorage.setItem("userData", JSON.stringify(userData));
                    } else {
                        console.error('No user details found in the response');
                    }
                })
                .catch((error) => {
                    console.error('An unexpected error occurred:', error.message);
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUserData(null);
        navigate('/');
    };
    return (
        <nav className="bg-gray-800 flex justify-between items-center p-2 py-3">
            <div className="flex items-center">
                <img className="h-10 w-10" src={logo} alt="Logo"/>
                <Link to="/home" className="text-white text-lg font-normal ml-2">Yum Yacht</Link>
            </div>
            <ul className="flex space-x-4 ">
                <li className="pr-8">
                    <Link to="/home" className="text-white font-bold hover:text-gray-300">Home</Link>
                </li>
                <li className="pr-8">
                    <Link to="/home" className="text-white hover:text-gray-300 font-bold">Hotels</Link>
                </li>
                <li className="pr-8">
                    <Link to="/home" className="text-white font-bold hover:text-gray-300">Food</Link>
                </li>
                <li className="pr-8">
                    {userData ? (
                    <button className='text-white hover:text-gray-300 font-bold' onClick={handleLogout}>
                        Logout
                    </button>
                    ) : (
                    <Link to="/login" className="text-white hover:text-gray-300 font-bold" style={{ textDecoration: 'none' }}>
                        <button className="">Login</button>
                    </Link>
                    )}
                </li>
                <li className="pr-8 flex">

                    {userData && userData.name && (
                        <div className="flex">
                        <div className="avatar">
                            <div className="w-7 h-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={profile}/>
                            </div>
                        </div>
                        <p className="text-teal-500 font-bold ml-3">{userData.name}</p>
                        </div>
                )}
            </li>
        </ul>
</nav>
)
    ;
};

export default Navbarr;

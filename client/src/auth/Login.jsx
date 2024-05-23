import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from "../assets/logo.png";
import { toast } from 'react-toastify';

function Login() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log({ email, password });
    //     try {
    //         const response = await axios.post('http://localhost:8080/login', {
    //             email:email,
    //             password:password
    //         });
    //         if (!response.data.auth) {
    //             setLoginStatus(false);
    //         } else {
    //             setLoginStatus(true);
    //             const { token, result } = response.data;
    //             localStorage.setItem('token', token);
    //             localStorage.setItem('userData', JSON.stringify(result));
    //             toast.success("Login Successful");
    //             navigate('/home');
    //
    //         }
    //     } catch (error) {
    //         console.error('An unexpected error occurred:', error.message);
    //
    //     }
    // };


    const handleSubmit= async (e) => {
        e.preventDefault();
        console.log({ email, password });
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email: email,
                password: password,
            });
            if (!response.data.auth) {
                setLoginStatus(false);

            } else {
                setLoginStatus(true);

                const { token, result, owners } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userData', JSON.stringify(result));



                    if (result.role === 'User') {
                        navigate('/home');
                        toast.success("Login Successful");
                    } else if (result.role === 'Delivery') {
                        navigate('/delivery');
                        toast.success("Login Successful");
                    } else if (result.role === 'Hotel') {
                        navigate('/hotel');
                        toast.success("Login Successful");
                    } else if (result.role === 'Admin') {
                        navigate('/admin');
                        toast.success("Login Successful");
                    }
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error.message);
        }
    };




    const userauth = () => {
        axios
            .get('http://localhost:8080/isAuth', {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('An unexpected error occurred:', error.message);
            });
    };

    return (
        <div className="bg-flags bg-amber-50 h-screen flex items-center justify-center cursor-elderwand">
            <div className="bg-white p-8 rounded-lg shadow-md sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-24 w-24 rounded-full"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your Account
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} name="email"
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/*<div>*/}
                    {/*    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">*/}
                    {/*        Choose Role*/}
                    {/*    </label>*/}
                    {/*    <div className="mt-1">*/}
                    {/*        <select onChange={handleInput} name="role"*/}
                    {/*                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">*/}
                    {/*            <option name="role" value="bla">Select</option>*/}

                    {/*            <option name="role" value="admin">Admin</option>*/}
                    {/*            <option name="role" value="normaluser">Normal User</option>*/}
                    {/*        </select>*/}
                    {/*        {errors.role && <span className="text-sm text-red-500">{errors.role}</span>}*/}

                    {/*    </div>*/}
                    {/*</div>*/}

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} name="password"
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="cursor-elderwand flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Log in
                        </button>
                        {/*{loginStatus && <button onClick={userauth}>Check</button>}*/}
                    </div>
                </form>
                <div className="text-center mt-2">
                    <Link to="/register" className="text-blue-500 hover:underline ">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;

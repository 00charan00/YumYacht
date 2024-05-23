import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Validation from "./RegisterValidation"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../Style/App.css";
import logo from "../assets/logo.png";


function Register() {
    const [values, setValues] = useState({
        name: '',
        email:'',
        password: '',
        role:''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there are no errors and submit the form
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8080/register', values)
                .then(res => {
                    navigate('/login');
                })
                .catch(err => console.log(err));
        }
    }, [errors]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    };

    return (
        <div className="bg-flags bg-amber-50 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-24 w-24 rounded-full"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register your Account
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text" placeholder="Enter name" name="name" onChange={handleInput}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email Address
                        </label>
                        <div className="mt-1">
                            <input
                                type="email" placeholder="Enter email" name="email" onChange={handleInput}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                            Choose Role
                        </label>
                        <div className="mt-1">
                            <select onChange={handleInput} name="role"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option name="role" value="">Select</option>
                                <option name="role" value="Admin">Admin</option>
                                <option name="role" value="User">User</option>
                                <option name="role" value="Hotel">Hotel</option>
                                <option name="role" value="Delivery">Delivery</option>
                            </select>
                            {errors.role && <span className="text-sm text-red-500">{errors.role}</span>}

                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                type="password" placeholder="Enter password" name="password" onChange={handleInput}
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-center mt-2">
                    <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;







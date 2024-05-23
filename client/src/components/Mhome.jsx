import React from 'react';
import Navbar from './Navbar';
import '../Style/App.css';
import Footer from "./Footer";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Mhome() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>user page</h1>
        </div>

    );
}

export default Mhome;
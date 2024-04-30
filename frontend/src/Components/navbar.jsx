import React, { useState } from "react";
import "./navbar.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




export default function Navbar(){
    const isLoggedin = sessionStorage.getItem('token');;
    const navigate = useNavigate();

        const handleLogout = () => {
            sessionStorage.removeItem('token'); // Token'ı sessionStorage'den kaldır
            navigate('/sign'); // Çıkış yapıldığında login sayfasına yönlendir
        };
    
    

    return (
        <>
        {!isLoggedin ? (<Link  to="/sign" type='button' className="btn btn-lg btn-primary">Login</Link>) : (<div className="yeninavbar">
            <ul></ul>
            <ul></ul>
            <ul></ul>
            <ul></ul>
            <div className="mt-4 gap-2 d-md-block">
                
                <button onClick={handleLogout} className="btn btn-lg btn-success">Logout</button>
            </div>
            

        </div>)}
        </>
    )
 };


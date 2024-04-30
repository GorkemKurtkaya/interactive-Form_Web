import React from 'react';
import './login-signup.css';
import { useNavigate } from 'react-router-dom';

export default function Sign() {
    const navigate = useNavigate();





    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: e.target.logemail.value,
                    password: e.target.logpass.value
                })
            });
            const data = await response.json();
            if (response.status === 201) {
                sessionStorage.setItem('token', data.token); // Token'ı sessionStorage'e kaydet
                navigate('/');
            } else {
                console.log(data.message);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/signup_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: e.target.logname.value,
                    email: e.target.logemail.value,
                    password: e.target.logpass.value
                })
            });
            const data = await response.json();
            console.log(data);
            if (response.status === 201) {
                navigate('/');
            } else {
                navigate('/sign');

            } // Handle response data as needed
            // Redirect to login page after successful sign-up
        } catch (error) {
            console.log(error); // Handle error as needed
        }
    };

    return (
        <div>

            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center ">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Log In </span><span className='yellow-text'>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3 login-title">Log In</h4>
                                                    <form action="" method="post" onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <input required type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input required type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button type="submit" className="signbtn mt-4">Submit</button>
                                                    </form>
                                                    <p className="mb-0 mt-4 text-center"><a href="/sign" className="link">Forgot your password?</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <a className="logo" target="_blank" rel="noreferrer">
                                                        <img src="https://avatars.githubusercontent.com/u/27950435?s=200&v=4" alt="" />
                                                    </a>
                                                    {/* <h4 className="mb-4 pb-3 signup-title">Sign up</h4>
                                                    <form action="" method='post' onSubmit={handleSignUp}>
                                                        <div className=" form-group">
                                                            <input type="text" name="logname" className="form-style" placeholder="Your Full Name" id="logname" autoComplete="off" />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>	
                                                        <div className="form-group mt-2">
                                                            <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>	
                                                        <div className="form-group mt-2">
                                                            <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button type="submit" className="btn mt-4">Submit</button>
                                                        <p><a href="/sign">Already have an account? </a></p>
                                                    </form> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar'; 
  
export default function BasicInfo({ addBasicData }) { 
  // State variables to store user input 
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [contact, setContact] = useState(""); 
    
  // Navigation function for programmatic routing 
  const navigate = useNavigate(); 
  
  // Function to handle form submission 
  const submit = (e) => { 
    e.preventDefault(); 
    if (!name || !email || !contact) { 
      // Alert if any field is missing 
      alert("All fields necessary!"); 
    } else { 
      // Call the addBasicData function provided by the parent component 
      addBasicData(name, email, contact); 
      // Navigate to the '/questions' route 
      navigate('/questions'); 
    } 
  } 
  
  return (
    <div> <Navbar/>
    <div className="container-fluid qform"> 
      <div className="col-md-5 m-auto"> 
        <div className="mt-3"> 
          <div className="card text-left h-100"> 
            <div className="card-body my-3"> 
              <form onSubmit={submit}> 
                <label htmlFor=""> 
                  <h4>Bilgileriniz</h4> 
                </label> 
                <div className="form-group my-3"> 
                  <label htmlFor=""> 
                    <b>1.</b> İsim 
                  </label> 
                  {/* Input field for name */} 
                  <input 
                    type="text"
                    name="name"
                    value={name} 
                    onChange={(e) => { setName(e.target.value) }} 
                    className='form-control my-2'
                    placeholder='İsminizi Giriniz'
                    autoComplete='off'
                  /> 
                </div> 
                <div className="form-group my-3"> 
                  <label htmlFor=""> 
                    <b>2.</b> Email 
                  </label> 
                  {/* Input field for email */} 
                  <input 
                    type="email"
                    name='email'
                    value={email} 
                    onChange={(e) => { setEmail(e.target.value) }} 
                    className='form-control my-2'
                    placeholder='Email Adresinizi Giriniz'
                    autoComplete='off'
                  /> 
                </div> 
                <div className="form-group my-3"> 
                  <label htmlFor=""> 
                    <b>3.</b> İletişim No. 
                  </label> 
                  {/* Input field for contact number */} 
                  <input 
                    type="tel"
                    name='contact'
                    value={contact} 
                    onChange={(e) => { setContact(e.target.value) }} 
                    className='form-control my-2'
                    placeholder='Telefon Numarınızı Giriniz'
                    autoComplete='off'
                  /> 
                </div> 
                {/* Submit button */} 
                <button type='submit' className='btn btn-success mx-3'>Next</button> 
              </form> 
              {/* Step indicators */} 
              <center> 
                  <a href="/" className="badge badge-pill bg-success">1</a> 
                  <a href="/questions" className="badge rounded-pill disabled"><b>2</b></a> 
                  <a href="/details" className="badge rounded-pill disabled">3</a> 
                </center> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
    </div> 
  ) 
} 
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
// import StarRateApp from './star-rating.js'; // Updated import path
import "../App.css";


export default function FormCreate({ addBasicData }) {

    const [name, setName] = useState(""); 
    const [formdescription, setFormDescription] = useState(""); 
    
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/forms/createform', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.logname.value,
                description: e.target.logdescription.value
            })
        }).then(response => {
            navigate('/newformslist');
            return response.json();
        }).catch(error => console.log(error));
    };

      return ( 
        <div className="container-fluid qform"> 
          <div className="col-md-5 m-auto"> 
            <div className="mt-3"> 
              <div className="card text-left h-100 "> 
                <div className="card-body my-3 custom-form"> 
                  <form onSubmit={submit}> 
                    <label htmlFor=""> 
                      <h4 className='custom-form'>Form Oluştur</h4> 
                    </label> 
                    <div className="my-3 custom-form-group">
                        <label htmlFor="">
                          <b>1.</b> Form Adı
                        </label>
                        {/* Görsel tasarım eklemek için */}
                        <input
                          type="name"
                          name="logname"
                          value={name}
                          id='logname'
                          onChange={(e) => { setName(e.target.value) }}
                          className='form-control my-2 custom-input' // custom-input class ekleyin
                          placeholder='Form Adını Giriniz'
                          autoComplete='off'
                        />
                      </div>
                    <div className=" my-3 custom-form-group"> 
                      <label htmlFor=""> 
                        <b>2.</b> Form Açıklaması 
                      </label> 
                      {/* Input field for formdetail alanı */} 
                      <input 
                        type="description"
                        name='logdescription'
                        value={formdescription}
                        id='logdescription' 
                        onChange={(e) => { setFormDescription(e.target.value) }} 
                        className='form-control my-2 custom-input' // custom-input class ekleyin
                        placeholder='Form Detayını Giriniz'
                        autoComplete='off'
                      /> 
                    </div> 
                    <br />
                    {/* Submit button */} 
                    <button type='submit' className='btn btn-success mx-3 position-absolute bottom-0 end-0 btn-next'>Next</button> 
                  </form>
                  {/* Step indicators */} 
                    {/* <div className="step-indicator"> 
                        <div className="step done"></div> 
                        <div className="step"></div> 
                        <div className="step"></div>
                </div>  */}

              </div> 
            </div> 
          </div> 
        </div>
        </div>  
      ) 
    }   

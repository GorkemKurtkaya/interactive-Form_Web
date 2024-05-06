import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BasicInfo({ formId, onSetUserId, onNext }) {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/forms/createUser/${formId}`, { name });
            console.log(response.data); // Oluşturulan kullanıcı hakkında bilgi alabilirsiniz
            onSetUserId(response.data._id); // Kullanıcı kimliğini ayarla
            onNext(); // Sonraki adıma geç
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="container-fluid qform">
            <div className="col-md-5 m-auto">
                <div className="mt-3">
                    <div className="card text-left h-100">
                        <div className="card-body my-3">
                            <form onSubmit={handleSubmit}>
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
                                        onChange={handleNameChange}
                                        className='form-control my-2'
                                        placeholder='İsminizi Giriniz'
                                        autoComplete='off'
                                    />
                                </div>
                                {/* Submit button */}
                                <button type='submit' className='btn btn-success mx-3'>Next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

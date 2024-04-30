import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRateApp from './star-rating';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export default function FormsList() {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionDescription, setQuestionDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    


    const onStarSelect = (stars) => {
        setSelectedStars(stars);
    };

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get('http://localhost:3000/forms');
                setForms(response.data);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };
        fetchForms();
    }, []);

    const handleFormSelect = async (formId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/forms/${formId}`);
            console.log(response);
            setSelectedForm(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching form details:', error);
            setLoading(false);
        }

        // Fetch questions for the selected form
        try {
            setLoading(true);
            const questionsResponse = await axios.get(`http://localhost:3000/forms/${formId}/questions`);
            setSelectedForm(prevState => ({ ...prevState, questions: questionsResponse.data }));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setLoading(false);
        }
    };

    const handleAddQuestion = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${selectedForm._id}/questions`, {
                title: questionTitle,
                description: questionDescription,
                options: options.map(option => ({ value: option })),
                stars: selectedStars, // Add stars field
            });
            setSelectedForm(response.data.form);
            setQuestionTitle("");
            setQuestionDescription("");
            setOptions([]);
            setLoading(false);
            handleFormSelect(selectedForm._id);
        } catch (error) {
            console.error('Error adding question:', error);
            setLoading(false);
        }
    };

useEffect(() => {
    console.log(selectedForm);
}, [selectedForm]);


 


return (
        <div className="container-fluid qform">
            <div className="col-md-8 mx-auto">
                <div className="mt-3">
                    <div className="card text-center ">
                        <div className="card-body">
                            <h1 className="mb-4 custom-form">Formlar</h1>
                            <div className="row">
                                {forms.map((form) => (
                                    <div key={form._id} className="col-md-4 mb-3  ">
                                        <div className="mycard formCard " onClick={() => handleFormSelect(form._id)}>
                                            <div className="">
                                                <h3 className='custom-form'>{form.name}</h3>
                                                <p>{form.description}</p>
                                                <Link to={`/formshare/${form._id}`} type='button'>
                                                    <i className="bi bi-share"></i>
                                                    <button type="button" class="btn btn-outline-secondary ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"></path>
                                                            </svg>
                                                        <span class="visually-hidden">Button</span>
                                                        </button></Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="col-md-4 mb-3">
                                <Link to="/formcreate" className="mb-4 custom-form">
                                    <div>
                                        <h3 className='mycard formCard'>+</h3>
                                    </div>
                                </Link>
                            </div>
                            </div>
                            {selectedForm && (
                                <div className="mt-4 mb-4 ">
                                    <h2 className='custom-form'>{selectedForm.name}</h2>
                                    <p className='custom-form'>{selectedForm.description}</p>
                                    <h2 className='custom-form'>Sorular</h2>
                                    <div className="row mt-3">
                                        {selectedForm.questions && selectedForm.questions.map((question) => (
                                            <div key={question._id} className="col-md-6 mb-3">
                                                <div className="card border-light mb-3">
                                                    <div className="card-body leftborder">
                                                        <div className='card-header formsoru'> {question.description} </div>
                                                        <br />
                                                        {/* Star rating component */}
                                                        <StarRateApp onStarSelect={(stars) => setSelectedStars(stars)} value={selectedStars} />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        ))}
                                    </div>
                                    <div className="mt-4 form-control my-2 custom-input">
                                        <h3 className='custom-form'>Soru Ekle</h3>
                                        <input type="text" value={questionDescription} onChange={(e) => setQuestionDescription(e.target.value)} placeholder="Soru Açıklaması" className="form-control mb-2" />
                                        <button onClick={handleAddQuestion} className="btn btn-success" disabled={loading}>{loading ? "Ekleniyor..." : "Soruyu Ekle"}</button>
                                    </div>
                                    
                                    
                                </div>
                            )}
                            {/* <Link to="/formcreate" type='button' className="formolusturbtn btn btn-outline-primary btn-sm justify position-absolute bottom-0 start-0">Form Oluştur</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRateApp from './star-rating';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './sidebar/sidebar.css';
import EnteredDetails from './EnteredDetails';
import BasicInfo from './BasicInfo';
import FormCreate from './formcreate';
import classNames from 'classnames';
import './container-navbar/containernavbar.css';
import ContainerNavbar from './container-navbar/containernavbar';
import Sign from './login-signup';
import { EditFormComponent } from './editFormComponent';

export default function NewFormsList({ }) {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionDescription, setQuestionDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [selectedOption, setSelectedOption] = useState('home');
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [selectedFormCreate, setSelectedFormCreate] = useState(true);
    const [menu, setMenu] = useState("Formlar");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedbutton, setSelectedButton] = useState(null);
    const [selectedEditForm, setSelectedEditForm] = useState(null);
    


    const onStarSelect = (stars) => {
        setSelectedStars(stars);
    };

    const handleFormCreate = () => {
        setShowFormCreate(true);
        setSelectedFormCreate(true);
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
            setSelectedForm(response.data);
            setShowFormCreate(false);
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

    const handleQuestionSelect = async (formId, questionId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/forms/${formId}/questions/${questionId}`);
            setSelectedQuestion(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching question details:', error);
            setLoading(false);
        }
    };

    const handleEditForm = async (formId) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${formId}/edit`);
            setSelectedForm(response.data.form);
            setLoading(false);
        } catch (error) {
            console.error('Error editing form:', error);
            setLoading(false);
        }
    }

    const handledeleteForm = async (formId) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${formId}/delete`);
        } catch (error) {
            console.error('Error deleting form:', error);
            setLoading(false);
        }
    }

    const handleDeleteQuestion = async (selectedQuestion, questionId) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${selectedForm._id}/questions/${questionId}/delete`);
            setLoading(false);
        } catch (error) {
            console.error('Error deleting question:', error);
            setLoading(false);
        }
    }

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
        <div className="gorkem-sidebar-container">
            <div className="gorkem-sidebar">
                <div className="gorkem-logo" style={{ backgroundImage: `url(${"https://avatars.githubusercontent.com/u/27950435?s=200&v=4"})` }}></div>
                <ul className="gorkem-options">
                    <li
                        className={`gorkem-option ${selectedOption === 'home' ? 'active' : ''}`}
                        onClick={() => setSelectedOption('home')}
                    >
                        <span className="gorkem-icon">
                            <i className="fa fa-house" />
                        </span>
                        <span className="gorkem-text">Home</span>
                    </li>
                    <li
                        className={`gorkem-option ${selectedOption === 'deneme' ? 'active' : ''}`}
                        onClick={() => setSelectedOption('deneme')}
                    >
                        <span className="gorkem-icon">
                            <i className="fa fa-file-code-o" />
                        </span>
                        <span className="gorkem-text">Deneme</span>
                    </li>
                    <li
                        className={`gorkem-sign-button btn-lg ${selectedOption === 'sign' ? 'active' : ''}`}
                        onClick={() => setSelectedOption('sign')}
                    >
                        Sign
                    </li>
                </ul>


                {/* <button className="gorkem-sign-button btn-lg">Signn</button> */}
            </div>
            <div  className="gorkem-content-container overflow-auto">
                {/* You can put other components or content here */}
                <div>
                    {selectedOption === 'home' && (
                        <div className="col-md-12">
                            <ContainerNavbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            {selectedCategory === "Formlar" && (
                                <div className="mt-3">
                                    <div>
                                        <div className="card-body">
                                            <div className="row">
                                                {forms.map((form) => (
                                                    <div key={form._id} className="mb-3">
                                                        <div className="mycard formCard" onClick={() => handleFormSelect(form._id)}>
                                                            <div className='myCardRow'>
                                                                <h3 className='custom-form'>{form.name}</h3>
                                                                <div className='mybtn-group'>
                                                                    <Link to={`/formshare/${form._id}`} type='button' className='btn-share'>
                                                                        <i className="bi bi-share"></i>
                                                                        <button type="button" className="btn btn-outline-secondary ">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M15 3a3 3 0 0 1-5.175 2.066l-3.92 2.179a2.994 2.994 0 0 1 0 1.51l3.92 2.179a3 3 0 1 1-.73 1.31l-3.92-2.178a3 3 0 1 1 0-4.133l3.92-2.178A3 3 0 1 1 15 3Zm-1.5 10a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 13.5 13Zm-9-5a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 4.5 8Zm9-5a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 13.5 3Z"></path></svg>
                                                                            <span className="visually-hidden">Button</span>
                                                                        </button></Link>
                                                                    <button onClick={() => setSelectedEditForm(form._id)} type='button' className='btn btn-outline-secondary'>
                                                                        <i className="bi bi-edit"></i>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg>
                                                                    </button>
                                                                    <button onClick={() => handledeleteForm(form.formId)} type='button' className='btn btn-outline-secondary'>
                                                                        <i className="bi bi-trash"></i>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {/* yazının boyutunu değiştirmek için */}
                                                            <p className={classNames('', {
                                                                'text-muted': form.description.length <= 10,
                                                                "font-sm": form.description.length > 10
                                                            })}>{form.description}</p>
                                                        </div>
                                                    </div>

                                                ))}

                                            </div>
                                            {selectedFormCreate && (
                                                <div className="row">
                                                    <div className=" col-md-12 mb-3 mb-4 ">
                                                        <div>
                                                            <h3 onClick={() => {
                                                                
                                                                setSelectedFormCreate(false);
                                                                handleFormCreate();
                                                            }} className='pluscard '>+</h3>
                                                        </div>
                                                    </div>
                                                    {showFormCreate && (
                                                        <div  className="card-body  ">
                                                            <FormCreate />
                                                        </div>
                                                    )}
                                                </div>
                                            )}


                                            {selectedForm && (
                                                <div className="mt-4 mb-4 ">
                                                    <h2 className='custom-form'>{selectedForm.name}</h2>
                                                    <p className='custom-form'>{selectedForm.description}</p>
                                                    <h2 className=' custom-form'>Sorular</h2>
                                                    <div className="row mt-3">
                                                        {selectedForm.questions && selectedForm.questions.map((question, index) => (
                                                            <div key={question._id} className="col-md-6 mb-3">
                                                                <div className=" card border-light mb-3">
                                                                    <div className="card-body leftborder">
                                                                        <div className='card-header formsoru'> {question.description} </div>
                                                                        <br />
                                                                        {/* Star rating component */}
                                                                        <StarRateApp onStarSelect={(stars) => setSelectedStars(stars)} value={selectedStars} />
                                                                        <br />
                                                                        <button onClick={() => handleDeleteQuestion(selectedForm.formId, question._id)} type='button' className='btn btn-outline-secondary'>
                                                                            <i className="bi bi-trash"></i>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                                                        </button>
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
                            )}
                        </div>

                    )}
                    {selectedEditForm && (<EditFormComponent form={selectedEditForm}/>)}
                    {selectedOption === 'deneme' && (<div>
                        <div className='gorkem-content-container'>
                            <BasicInfo />
                        </div>
                    </div>)}

                    {selectedOption === 'sign' && (
                        <div>
                            <div className='gorkem-content-container'>
                                <Sign />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

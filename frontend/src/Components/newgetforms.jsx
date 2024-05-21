import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import StarRateApp from './star-rating';
import './sidebar/sidebar.css';
import BasicInfo from './BasicInfo';
import FormCreate from './formcreate';
import classNames from 'classnames';
import './container-navbar/containernavbar.css';
import ContainerNavbar from './container-navbar/containernavbar';
import Sign from './Login-signup/login-signup';
import EditForm from './Form_Edit/editFormComponent';
import { Button, Modal, Space, message } from 'antd';
import NewFormsAnswers from './Answers/answers';
import { useNavigate } from 'react-router-dom';





export default function NewFormsList() {
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
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedEditForm, setSelectedEditForm] = useState(null);
    const contentRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [questionType, setQuestionType] = useState('stars'); // Default to 'stars'
    const [showEditForm, setShowEditForm] = useState(false);
    const [editFormName, setEditFormName] = useState("");
    const [editFormDescription, setEditFormDescription] = useState("");
    const [showFormQuestion, setShowFormQuestion] = useState(false);
    



    const navigate = useNavigate();

    //    Modal kısmı
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };



    // EditForm'u açma fonksiyonu
    const handleEditFormToggle = (form) => {
        console.log("Form Data:", form); // Check form data
        setEditFormName(form.name);
        setEditFormDescription(form.description);
        setShowEditForm(!showEditForm);
        setSelectedEditForm(form); // Set selectedEditForm correctly
        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    };

    // Formu güncelleme fonksiyonu
    const handleUpdateForm = async (formId) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${formId}/edit`, {
                name: editFormName,
                description: editFormDescription,
            });
            setSelectedForm(response.data.form);
            setLoading(false);
            setShowEditForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Form güncelleme hatası:', error);
            setLoading(false);
        }
    };

    const handledeleteForm = async (formId) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${formId}/delete`);
            setSelectedForm(response.data.form);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting form:', error);
            setLoading(false);
        }
    }


    const onStarSelect = (stars) => {
        setSelectedStars(stars);
    };

    const handleFormCreate = () => {
        setShowFormQuestion(false);
        setShowFormCreate(true);
        setSelectedFormCreate(true);
        setSelectedForm(null); // Önceki formu seçili olmaktan çıkar
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
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
        setShowFormQuestion(true);
        setShowFormCreate(false);
        showEditForm && setShowEditForm(false);
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/forms/${formId}`);
            setSelectedForm(response.data);
            setShowFormCreate(false);
            setLoading(false);
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            console.error('Error fetching form details:', error);
            setLoading(false);
        }
        // Soruları getir
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
    const handleAddYesNoQuestion = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${selectedForm._id}/questions`, {
                title: questionTitle,
                description: questionDescription,
                options: options.map(option => ({ value: option })),
                questionType: 'yesNo',
            });
            setSelectedForm(response.data.form);
            setQuestionTitle("");
            setQuestionDescription("");
            setOptions([]);
            setLoading(false);
            handleFormSelect(selectedForm._id);
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error adding question:', error);
            setLoading(false);
        }
    };


    const handleAddQuestion = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${selectedForm._id}/questions`, {
                title: questionTitle,
                description: questionDescription,
                questionType: 'stars',
                stars: selectedStars,
            });
            setSelectedForm(response.data.form);
            setQuestionTitle("");
            setQuestionDescription("");
            setSelectedStars([]);
            setLoading(false);
            handleFormSelect(selectedForm._id);
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error adding question:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(selectedForm);
    }, [selectedForm]);

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        sessionStorage.removeItem('token'); // Token'ı sessionStorage'den kaldır
        navigate('/sign'); // Çıkış yapıldığında login sayfasına yönlendir
        window.location.reload(); // Sayfayı yenile
    };



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
                </ul>


                <button className="gorkem-sign-button btn-lg" onClick={handleLogout}>Logout</button>
            </div>
            <div className="gorkem-content-container overflow-auto">

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
                                                                    <Space>
                                                                        <Button
                                                                            type="default"
                                                                            onClick={(event) => {
                                                                                event.stopPropagation();
                                                                                Modal.confirm({
                                                                                    title: 'Share URL',
                                                                                    content: `http://localhost:3001/forms/formshare/${form._id}`,
                                                                                    footer: (_, { OkBtn, CancelBtn }) => (
                                                                                        <>
                                                                                            <Button>
                                                                                                <a href={`http://localhost:3001/forms/formshare/${form._id}`} target="_blank" rel="noreferrer">Open in new tab</a>
                                                                                            </Button>
                                                                                            <Button
                                                                                                type='primary'
                                                                                                onClick={() => {
                                                                                                    const url = `http://localhost:3001/forms/formshare/${form._id}`;

                                                                                                    navigator.clipboard.writeText(url)
                                                                                                        .then(() => {
                                                                                                            // Kopyalama başarılı, bildirim göster
                                                                                                            message.success('Link Başarıyla Kopyalandı!');
                                                                                                        })
                                                                                                        .catch((error) => {
                                                                                                            // Kopyalama başarısız, hata mesajı göster
                                                                                                            alert('Error copying link to clipboard: ' + error);
                                                                                                        });
                                                                                                }}
                                                                                            >Copy URL</Button>
                                                                                            {/* <CancelBtn /> */}
                                                                                            <OkBtn />
                                                                                        </>
                                                                                    ),
                                                                                });
                                                                            }}
                                                                        >
                                                                            <i className="bi bi-share"></i>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M15 3a3 3 0 0 1-5.175 2.066l-3.92 2.179a2.994 2.994 0 0 1 0 1.51l3.92 2.179a3 3 0 1 1-.73 1.31l-3.92-2.178a3 3 0 1 1 0-4.133l3.92-2.178A3 3 0 1 1 15 3Zm-1.5 10a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 13.5 13Zm-9-5a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 4.5 8Zm9-5a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 13.5 3Z"></path></svg>
                                                                            <span className="visually-hidden"></span>
                                                                        </Button>
                                                                    </Space>
                                                                    <Button onClick={(event) => {
                                                                        event.stopPropagation();
                                                                        handleEditFormToggle(form);
                                                                    }} type='default' contentRef={contentRef}>
                                                                        <i className="bi bi-edit"></i>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg>
                                                                    </Button>
                                                                    <Button onClick={(event) => { event.stopPropagation(); handledeleteForm(form.formId) }} type='default' >
                                                                        <i className="bi bi-trash"></i>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path></svg>
                                                                    </Button>
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
                                                        <div ref={contentRef}>
                                                            <h3 onClick={() => {
                                                                setSelectedFormCreate(!selectedFormCreate);
                                                                handleFormCreate();
                                                            }}
                                                                className={`pluscard ${selectedFormCreate ? 'active' : ''}`}  >+</h3>
                                                        </div >
                                                    </div>
                                                    {showFormCreate && (
                                                        <div className="card-body" >
                                                            <FormCreate />
                                                        </div>
                                                    )}
                                                </div>
                                            )}


                                            {selectedForm && (
                                                <div className="mt-4 mb-4">
                                                    <h2 className='custom-form'>{selectedForm.name}</h2>
                                                    <p className='custom-form'>{selectedForm.description}</p>
                                                    <div>
                                                        <h2 className='custom-form' ref={contentRef}>Sorular</h2>
                                                        <div className="row mt-3" >
                                                            {selectedForm.questions && selectedForm.questions.map((question, index) => (
                                                                <div key={question._id} className="col-md-6 mb-3">
                                                                    <div className="card border-light mb-3">
                                                                        <div className="card-body leftborder">
                                                                            <div className='card-header formsoru'>{question.description}</div>
                                                                            <br />
                                                                            {question.questionType === 'stars' ? (
                                                                                <StarRateApp onStarSelect={(stars) => setSelectedStars(stars)} value={selectedStars} />
                                                                            ) : (
                                                                                <div>
                                                                                    <button className='yes-button'>Yes</button>
                                                                                    <button className='no-button'>No</button>
                                                                                </div>
                                                                            )}
                                                                            <br />
                                                                            <button onClick={() => handleDeleteQuestion(selectedForm.formId, question._id)} type='button' className='btn btn-outline-secondary'>
                                                                                <i className="bi bi-trash"></i>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 form-control my-2 custom-input">
                                                        <h3 className='custom-form' ref={contentRef}>Soru Ekle</h3>
                                                        <input
                                                            type="text"
                                                            value={questionDescription}
                                                            onChange={(e) => setQuestionDescription(e.target.value)}
                                                            placeholder="Soru Açıklaması"
                                                            className="form-control mb-2"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    questionType === 'stars' ? handleAddQuestion() : handleAddYesNoQuestion();
                                                                }
                                                            }}
                                                        />
                                                        <select
                                                            value={questionType}
                                                            onChange={(e) => setQuestionType(e.target.value)}
                                                            className="form-select mb-2"
                                                        >
                                                            <option value="stars">Stars</option>
                                                            <option value="yesNo">Yes/No</option>
                                                        </select>
                                                        <br />
                                                        <Button onClick={questionType === 'stars' ? handleAddQuestion : handleAddYesNoQuestion} type='submit' className="denemebutton" disabled={loading}>
                                                            {loading ? "Ekleniyor..." : "Soruyu Ekle"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                            {/* <Link to="/formcreate" type='button' className="formolusturbtn btn btn-outline-primary btn-sm justify position-absolute bottom-0 start-0">Form Oluştur</Link> */}
                                        </div>
                                    </div>
                                    <div ref={contentRef}>
                                        {showEditForm && (
                                            <EditForm
                                                name={editFormName}
                                                description={editFormDescription}
                                                onNameChange={(e) => setEditFormName(e.target.value)}
                                                onDescriptionChange={(e) => setEditFormDescription(e.target.value)}
                                                onSave={() => handleUpdateForm(selectedEditForm._id)}
                                                onCancel={() => setShowEditForm(false)}
                                            />
                                        )}
                                    </div>
                                </div>

                            )}
                            {selectedCategory === "Yanıtlar" && (
                                <div>
                                    <div className="gorkem-content-container">
                                        <NewFormsAnswers />
                                    </div>
                                </div>
                            )}

                        </div>
                    )}


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

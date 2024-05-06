import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Steps } from 'antd';
import StarRateApp from './star-rating';
import BasicInfo from './BasicInfo'; // BasicInfo bileşenini ekledik
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

export default function FormShare() {
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const { formId } = useParams();
    const [selectedStars, setSelectedStars] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [selectedResponses, setSelectedResponses] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userId, setUserId] = useState(null); // Kullanıcı ID'sini tutmak için state eklendi
    const { current, setCurrent } = useState(0);

    const onStarSelect = (index, stars) => {
        setSelectedStars( prevStars => {
            const newStars = [...prevStars];
            newStars[index] = stars;
            return newStars;
        })
    };

    const handleSetUserId = (id) => {
        setUserId(id);
    };

    const handleStepSelect = (step) => {
        setCurrentQuestionIndex(step);

    };

    // Soru seçildiğinde cevabı ekle
    const handleQuestionSelect = (questionId, stars) => {
        setSelectedResponses(prevResponses => [
            ...prevResponses,
            { questionId, stars }
        ]);
    };



    useEffect(() => {
        const fetchForm = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/forms/${formId}`);
                setForm(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching form:', error);
                setLoading(false);
            }

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
        fetchForm();
    }, [formId]);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    useEffect(() => {
        console.log("selectedStars: ", selectedStars);
    }, [selectedStars]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${form._id}/questions/${selectedForm.questions[currentQuestionIndex - 1]._id}/answers`, {
                questionId: selectedForm.questions[currentQuestionIndex - 1]._id,    
                stars: selectedStars[selectedForm.questions[currentQuestionIndex - 1]._id],
                userId: userId // Kullanıcı ID'sini gönder
            });
            console.log(response.data);
            setLoading(false);
            handleNextQuestion();

            if (currentQuestionIndex === selectedForm.questions.length) {
                navigate("/thanks");
            }

        } catch (error) {
            console.error('Error submitting response:', error);
            setLoading(false);
        }
    };


    return (
        <div className="container-fluid qform">
            <div className="col-md-8 mx-auto">
                <div className="mt-3">
                    <div className="card text-center">
                        <div className="card-body custom-form">
                            <Steps
                                type="navigation"
                                current={currentQuestionIndex}
                                onChange={setCurrentQuestionIndex}
                                className="site-navigation-steps"
                            >
                                <Step key={0} title="Başla" />
                                {selectedForm && selectedForm.questions.map((question, index) => (
                                    <Step key={index + 1} title={`Soru ${index + 1}`} />
                                ))}
                            </Steps>

                            {loading ? (
                                <div>Loading...</div>
                            ) : form ? (
                                <div>
                                    <div style={{}}>
                                        <h2>{form.name}</h2>
                                    </div>
                                    {currentQuestionIndex === 0 && (
                                        <BasicInfo
                                            formId={formId}
                                            onSetUserId={handleSetUserId}
                                            onNext={() => setCurrentQuestionIndex(1)} // Sıradaki adıma geçiş
                                        />
                                    )}

                                    {currentQuestionIndex > 0 && (
                                        <>
                                            {/* <h3 className='custom-form' style={{ textAlign: 'center' }}>Soru {currentQuestionIndex} / {selectedForm.questions.length}</h3> */}
                                            <div className="row justify-content-center">
                                                {selectedForm.questions && (
                                                    <div className="col-md-8 mb-3">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <p>{selectedForm.questions[currentQuestionIndex - 1].description}</p>
                                                                <br />
                                                                <StarRateApp onStarSelect={(stars) => onStarSelect(selectedForm.questions[currentQuestionIndex - 1]._id, stars)} value={selectedStars} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                                <button onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1))} className='btn btn-secondary' style={{ marginRight: '10px' }}>Geri</button>
                                                <button onClick={() => handleSubmit()} className='btn btn-success' style={{ marginRight: '10px' }}>{currentQuestionIndex === selectedForm.questions.length ? 'Sonucu Gönder' : 'Gönder'}</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div>Form bulunamadı!</div>
                            )}
                            <Link to="/formslist" type='button' className="formolusturbtn btn btn-outline-primary btn-sm justify position-absolute bottom-0 start-0">Formlar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



}

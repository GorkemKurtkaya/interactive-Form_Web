import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRateApp from './star-rating';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function FormShare() {
    const navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const { formId } = useParams();
    const [selectedStars, setSelectedStars] = useState(0);
    const [selectedForm, setSelectedForm] = useState(null);
    const [selectedResponses, setSelectedResponses] = useState([]); // Array to store responses for each question
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question

    const onStarSelect = (stars) => {
        setSelectedStars(stars);
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

    useEffect(() => {
        console.log(form);
    }, [form]);

    // Soru seçildiğinde cevabı ekle
    const handleQuestionSelect = (questionId, stars) => {
        setSelectedResponses(prevResponses => [
            ...prevResponses,
            { questionId, stars }
        ]);
    };

    useEffect(() => {
        console.log(selectedResponses);
    }, [selectedResponses]);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
        setSelectedStars(0); // Reset star rating for the next question
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/forms/${form._id}/questions/${selectedForm.questions[currentQuestionIndex]._id}/answers`, {
                stars: selectedResponses[currentQuestionIndex].stars,
                questionId: selectedForm.questions[currentQuestionIndex]._id
            });
            console.log(response.data); // Gönderilen cevabı kontrol etmek için
            setLoading(false);
            handleNextQuestion(); // Sıradaki soruya geç
    
            if (currentQuestionIndex === selectedForm.questions.length - 1) {
                // Tüm soruları yanıtladıktan sonra "/thanks" sayfasına yönlendirme yapabilirsiniz
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
                            {loading ? (
                                <div>Loading...</div>
                            ) : form ? (
                                <div>
                            <div style={{  }}>
                                <h2>{form.name}</h2>
                            </div>
                            <p>{form.description}</p>
                            <h3 className='custom-form' style={{ textAlign: 'center' }}>Soru {currentQuestionIndex + 1} / {selectedForm.questions.length}</h3>
                            <div className="row justify-content-center">
                                {selectedForm.questions && (
                                    <div className="col-md-6 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <p>{selectedForm.questions[currentQuestionIndex].description}</p>
                                                <br />
                                                {/* Star rating component */}
                                                <StarRateApp onStarSelect={(stars) => handleQuestionSelect(selectedForm.questions[currentQuestionIndex]._id, stars)} value={selectedStars} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1))} className='btn btn-secondary' style={{ marginRight: '10px' }}>Geri</button>
                            <button onClick={handleSubmit} className='btn btn-success' style={{ marginRight: '10px' }}>{currentQuestionIndex === selectedForm.questions.length - 1 ? 'Sonucu Gönder' : 'Gönder'}</button>
                            {/* {currentQuestionIndex < selectedForm.questions.length - 1 && (
                                <button onClick={() => setCurrentQuestionIndex(prevIndex => prevIndex + 1)}>Sonraki Soru</button>
                            )} */}
                            </div>
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

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
    const Navigate = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const { formId } = useParams();
    const [selectedStars, setSelectedStars] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [selectedResponses, setSelectedResponses] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userId, setUserId] = useState(null); // Kullanıcı ID'sini tutmak için state eklendi
    const [starSelected, setStarSelected] = useState(false);
    const [selectedYesNo, setSelectedYesNo] = useState({});

    const onStarSelect = (index, stars) => {
        setSelectedStars(prevStars => {
            const newStars = [...prevStars];
            newStars[index] = stars;
            return newStars;
        });
        setStarSelected(true); // Set to true when stars are selected
    };

    const handleSetUserId = (id) => {
        setUserId(id);
    };

    const handleStepSelect = (step) => {
        setCurrentQuestionIndex(step);
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
        console.log("selectedStars: ", selectedStars);
    }, [selectedStars]);

    const handleSubmit = async () => {
        const currentQuestion = selectedForm.questions[currentQuestionIndex - 1];
        const currentQuestionId = currentQuestion._id;
      
        const answer = currentQuestion.questionType === 'stars'
          ? selectedStars[currentQuestionId]
          : selectedYesNo[currentQuestionId];
      
        try {
          setLoading(true);
          const response = await axios.post(`http://localhost:3000/forms/${form._id}/questions/${currentQuestionId}/answers`, {
            questionId: currentQuestionId,
            stars: currentQuestion.questionType === 'stars' ? selectedStars[currentQuestionId] : null,
            answer: answer,
            userId: userId
          });
          console.log(response.data);
          setLoading(false);
      
          if (currentQuestionIndex === selectedForm.questions.length) {
            Navigate("/thanks");
          } else {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          }
        } catch (error) {
          console.error('Error submitting response:', error);
          setLoading(false);
        }
      };
      


    const handleYesNoAnswer = (questionId, answer) => {
        setSelectedYesNo(prevState => ({
            ...prevState,
            [questionId]: answer
        }));
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
                                className="site-navigation-steps ms-2"
                            >
                                <Step key={0} title="Başla" />
                                {selectedForm && selectedForm.questions.map((question, index) => (
                                    <Step key={index + 1} title={
                                        selectedForm.questions.length > 10 ? ` ${index + 1}` :
                                            `Soru ${index + 1}`} />
                                ))}
                            </Steps>

                            {loading ? (
                                <div>Loading...</div>
                            ) : form ? (
                                <div>
                                    <br />
                                    {currentQuestionIndex === 0 && (
                                        <BasicInfo
                                            formId={formId}
                                            onSetUserId={handleSetUserId}
                                            onNext={() => setCurrentQuestionIndex(1)} // Sıradaki adıma geçiş
                                        />
                                    )}

                                    {currentQuestionIndex > 0 && (
                                        <>
                                            <div className="row justify-content-center">
                                                {selectedForm.questions && (
                                                    <div className="col-md-8 mb-3">
                                                        <div className="questioncard">
                                                            <div className="card-body">
                                                                <p className='buyuk-yazi'>{selectedForm.questions[currentQuestionIndex - 1].description}</p>
                                                                <br />
                                                                {selectedForm.questions[currentQuestionIndex - 1].questionType === 'stars' ? (
                                                                    <StarRateApp onStarSelect={(stars) => onStarSelect(selectedForm.questions[currentQuestionIndex - 1]._id, stars)} value={selectedStars} />
                                                                ) : selectedForm.questions[currentQuestionIndex - 1].questionType === 'yesNo' ? (
                                                                    <div>
                                                                        <button
                                                                            className={`yes-button ${selectedYesNo[selectedForm.questions[currentQuestionIndex - 1]._id] === 'yes' ? 'selected' : ''}`}
                                                                            onClick={() => handleYesNoAnswer(selectedForm.questions[currentQuestionIndex - 1]._id, 'yes')}
                                                                        >
                                                                            Evet
                                                                        </button>
                                                                        <button
                                                                            className={`no-button ${selectedYesNo[selectedForm.questions[currentQuestionIndex - 1]._id] === 'no' ? 'selected' : ''}`}
                                                                            onClick={() => handleYesNoAnswer(selectedForm.questions[currentQuestionIndex - 1]._id, 'no')}
                                                                        >
                                                                            Hayır
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div>Question type not supported</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                                <button onClick={() => setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1))} className='btn btn-secondary' style={{ marginRight: '10px' }}>Geri</button>
                                                <button
                                                    onClick={handleSubmit}
                                                    className='btn btn-success'
                                                    style={{ marginRight: '10px' }}
                                                    disabled={
                                                        (selectedForm.questions[currentQuestionIndex - 1].questionType === 'stars' && !selectedStars[selectedForm.questions[currentQuestionIndex - 1]._id]) ||
                                                        (selectedForm.questions[currentQuestionIndex - 1].questionType === 'yesNo' && !selectedYesNo[selectedForm.questions[currentQuestionIndex - 1]._id])
                                                    }
                                                >
                                                    {currentQuestionIndex === selectedForm.questions.length ? 'Sonucu Gönder' : 'Gönder'}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div>Form bulunamadı!</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

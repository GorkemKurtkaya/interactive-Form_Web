import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Space, message } from 'antd';
import axios from 'axios';
import { Table, Icon } from 'antd';
import classNames from 'classnames';


export default function NewFormsAnswers() {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const contentRef = useRef(null);



    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get('http://localhost:3000/forms');
                setForms(response.data);
            } catch (error) {
                console.error('Error fetching forms:', error);
                // Handle error (e.g., show error message to the user)
            }
        };
        fetchForms();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
          await axios.delete(`http://localhost:3000/forms/${selectedForm._id}/users/${userId}`);
          setSelectedForm((prevState) => ({
            ...prevState,
            users: prevState.users.filter((user) => user._id !== userId),
          }));
        } catch (error) {
          console.error('Error deleting user:', error);
          // Handle error (e.g., show error message to the user)
        }
      };



    const handleFormSelect = async (formId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/forms/${formId}`);
            setSelectedForm(response.data);
            setLoading(false);
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
            // Fetch users for the selected form
            const usersResponse = await axios.get(`http://localhost:3000/forms/${formId}/users`);
            const usersWithNames = usersResponse.data.map(user => ({
                ...user,
                userName: user.name // Assuming user name is stored in 'name' field
            }));
    
            const questionsResponse = await axios.get(`http://localhost:3000/forms/${formId}/questions`);
            const questions = questionsResponse.data;
            console.log(questions);
    
            const answersAverage = questions.map(question => {
                const totalStars = question.answers.reduce((acc, answer) => acc + (answer.stars || 0), 0); // yıldızları toplar
                return totalStars / (question.answers.length || 1); // yıldız sayısını soru sayısına böler
            });
            console.log(answersAverage);
    
            setSelectedForm(prevState => ({
                ...prevState,
                users: usersWithNames,
                questions: response.data.questions
            }));
    
            const totalObject = {
                name: "Toplam Ortalama",
                answers: [
                  {
                    questionId: questions[0]?._id,
                    stars: parseFloat((questions[0].answers.reduce((acc, answer) => acc + (answer.stars || 0), 0) / (questions[0].answers.length || 1)).toFixed(2))
                  },
                  ...answersAverage.map((average, index) => ({
                    questionId: questions[index + 1]?._id,
                    stars: parseFloat(average.toFixed(2))
                  }))
                ],
              };
            setSelectedForm(prev => ({
                ...prev,
                users: [...prev.users, totalObject],
            }));
        } catch (error) {
            console.error('Error fetching form details:', error);
            setLoading(false);
            // Handle error (e.g., show error message to the user)
        }
    };
    
    



    const columns = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'userName',
        },

        ...(selectedForm?.questions || []).map((question, index) => ({
            title: `Soru ${index + 1}`,
            dataIndex: 'answers',
            key: `answers${index}`,
            render: (answers) => {
                if (!Array.isArray(answers) || answers.length === 0) {
                    return '-';
                }
                if(answers[index + 1].answer === "yes") {
                    return "Evet";
                } else if(answers[index + 1].answer === "no") {
                    return "Hayır";
                } else {
                const stars = answers && answers[index + 1]?.stars; // 
                return stars !== undefined ? stars : '0';} // yılız sayısını döndürür
            },
        })),
        
        {
            title: 'Ortalama',
            dataIndex: 'answers',
            key: 'average',
            render: (answers) => {
                if (!Array.isArray(answers) || answers.length === 0) {
                    return '-';
                }

                const starAnswers = answers.filter(answer => answer.stars !== null && answer.stars !== undefined);
                const totalStars = starAnswers.reduce((acc, answer) => acc + (answer.stars || 0), 0);
                const average = totalStars / (starAnswers.length || 1);

                return average ? average.toFixed(2) : '-';
            },
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (_, record) => (
              <Button type="link" onClick={() => handleDeleteUser(record._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"></path></svg>
              </Button>
            ),
          },

    ];




    return (
        <div className="col-md-12">
            <div className="mt-3 md-12">
                <div>
                    <div className="card-body">
                        <div className="row">
                            {forms.map((form, index) => (
                                <div key={form._id} className="mb-3">
                                    <div className="mycard formCard" onClick={() => handleFormSelect(form._id)}>
                                        <div className='myCardRow'>
                                            <h3 className='custom-form'>{form.name}</h3>
                                            <div className='mybtn-group'>
                                                <Space>
                                                    <Button
                                                        type="default"
                                                        className=""
                                                        onClick={() => {
                                                            Modal.confirm({
                                                                title: 'Share URL',
                                                                content: `http://localhost:3001/forms/formshare/${form._id}`,
                                                                footer: (_, { OkBtn }) => (
                                                                    <>
                                                                        <Button>
                                                                            <a href={`http://localhost:3001/forms/formshare/${form._id}`} target="_blank" rel="noreferrer">Open in new tab</a>
                                                                        </Button>
                                                                        <Button
                                                                            type=''
                                                                            onClick={() => {
                                                                                const url = `http://localhost:3001/forms/formshare/${form._id}`;

                                                                                navigator.clipboard.writeText(url)
                                                                                    .then(() => {
                                                                                        message.success('Link Başarıyla Kopyalandı!');
                                                                                    })
                                                                                    .catch((error) => {
                                                                                        alert('Error copying link to clipboard: ' + error);
                                                                                    });
                                                                            }}
                                                                        >Copy URL</Button>
                                                                        <OkBtn />
                                                                    </>
                                                                ),
                                                            });
                                                        }}
                                                    >
                                                        <i className="bi bi-share"></i>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M15 3a3 3 0 0 1-5.175 2.066l-3.92 2.179a2.994 2.994 0 0 1 0 1.51l3.92 2.179a3 3 0 1 1-.73 1.31l-3.92-2.178a3 3 0 1 1 0-4.133l3.92-2.178A3 3 0 1 1 15 3Zm-1.5 10a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 13.5 13Zm-9-5a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 4.5 8Zm9-5a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 13.5 3Z"></path></svg>
                                                        <span className="visually-hidden">Button</span>
                                                    </Button>
                                                </Space>
                                            </div>
                                        </div>
                                        <p className={classNames('', {
                                            'text-muted': form.description.length <= 10,
                                            "font-sm": form.description.length > 10
                                        })}>{form.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {selectedForm && (
                            <div className="mt-4 mb-4">
                                <h2 className='custom-form'>{selectedForm.name}</h2>
                                <p className='custom-form'>{selectedForm.description}</p>
                                <div className="col-md-12 tablo-yazi" ref={contentRef}>
                                    <Table
                                        columns={columns}
                                        dataSource={selectedForm.users || []}
                                        loading={loading}
                                        scroll={{ x: 'max-content' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

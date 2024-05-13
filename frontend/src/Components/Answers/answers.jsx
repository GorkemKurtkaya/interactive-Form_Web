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

            // Fetch questions and answers for the selected form


            setSelectedForm(prevState => ({
                ...prevState,
                users: usersWithNames,
                questions: response.data.questions
            }));
            
            const totalStars = response.data.users.map(user => {
                const answers = user.answers || [];
                const totalStars = answers.reduce((acc, answer) => acc + (answer.stars || 0), 0);
                return totalStars;
            });
            setSelectedForm((prev) => ({
                ...prev,
                users: [...prev.users, totalStars],
            }));


        } catch (error) {
            console.error('Error fetching form details:', error);
            setLoading(false);
            // Handle error (e.g., show error message to the user)
        }
    };

useEffect(() => {
    console.log('selectedForm:', selectedForm);
}, [selectedForm]);

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
                const stars = answers && answers[index + 1]?.stars; // Check if answers array exists before accessing its elements
                return stars !== undefined ? stars : '0'; // Render stars if defined, otherwise '-'
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

                const totalStars = answers.reduce((acc, answer) => acc + (answer.stars || 0), 0);
                const average = totalStars / answers.length;

                return average ? average.toFixed(2) : '-';
            },
        },

    ];

    const usersTableColumns = [
        {
            title: 'Ortalamalar',
            dataIndex: 'average',
            key: 'average',
        },
        ...(selectedForm?.questions || []).map((question, index) => ({
            title: `Soru ${index + 1}`,
            dataIndex: 'answers',
            key: `answers${index}`,
            render: (answers) => {
                console.log('answers:', answers);
                if (!Array.isArray(answers) || answers.length === 0) {
                    return null;
                }
    
                const filteredAnswers = answers.filter(answer => answer.stars !== undefined && answer.questionId === question._id);
                console.log('filteredAnswers:', filteredAnswers);
                if (filteredAnswers.length === 0) {
                    return null;
                }
    
                const totalStars = filteredAnswers.reduce((acc, answer) => acc + answer.stars, 0); // stars özelliğini doğrudan ekliyoruz

                const average = totalStars / filteredAnswers.length;
    
                return average ? average.toFixed(2) : null;
            },
        })),
    ];



    return (
        <div className="col-md-12">
            <div className="mt-3 md-12">
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
                                    <Table
                                        columns={usersTableColumns}
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

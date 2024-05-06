import React from 'react';
import { Button, Modal, Space, message } from 'antd';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Table } from 'antd';
import classNames from 'classnames';

export default function NewFormsAnswers() {

    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showFormCreate, setShowFormCreate] = useState(false);

    const [menu, setMenu] = useState("Formlar");

    const contentRef = useRef(null);



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
            contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    // const columns = [
    //     {
    //         title: 'Form İsmi',
    //         width: 100,
    //         dataIndex: 'name',
    //         key: 'name',
    //         fixed: 'left',
    //     },
    //     {
    //         title: 'Kullanıcı',
    //         width: 100,
    //         dataIndex: 'name',
    //         key: 'name',
    //         fixed: 'left',
    //         sorter: true,
    //     },
    //     {
    //         title: 'Column 1',
    //         dataIndex: 'address',
    //         key: '1',
    //     },
    //     {
    //         title: 'Column 2',
    //         dataIndex: 'address',
    //         key: '2',
    //     },
    //     {
    //         title: 'Column 3',
    //         dataIndex: 'address',
    //         key: '3',
    //     },
    //     {
    //         title: 'Column 4',
    //         dataIndex: 'address',
    //         key: '4',
    //     },
    //     {
    //         title: 'Column 5',
    //         dataIndex: 'address',
    //         key: '5',
    //     },
    //     {
    //         title: 'Column 6',
    //         dataIndex: 'address',
    //         key: '6',
    //     },
    //     {
    //         title: 'Column 7',
    //         dataIndex: 'address',
    //         key: '7',
    //     },
    //     {
    //         title: 'Column 8',
    //         dataIndex: 'address',
    //         key: '8',
    //     },
    //     {
    //         title: 'Action',
    //         key: 'operation',
    //         fixed: 'right',
    //         width: 100,
    //         render: () => <a>action</a>,
    //     },
    // ];

    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York Park',
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 40,
    //         address: 'London Park',
    //     },
    // ];

    return (
        // <Table
        //     columns={columns}
        //     dataSource={data}
        //     scroll={{ x: 1300 }}
        // />
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
                                                        type="button" className="btn btn-outline-secondary"
                                                        onClick={() => {
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
                                                        <span className="visually-hidden">Button</span>
                                                    </Button>
                                                </Space>

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
                    </div>
                </div>
            </div>
        </div>
    );
};

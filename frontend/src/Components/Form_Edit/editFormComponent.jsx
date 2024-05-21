import React from 'react';
import { Button, Input } from 'antd';

const EditForm = ({ name, description, onNameChange, onDescriptionChange, onSave, onCancel }) => {
    return (
        <div className="container-fluid qform">
            <div className="col-md-5 m-auto">
                <div className="mt-3">
                    <div className="card text-left h-100 ">
                        <div className="card-body my-3 custom-form">
                            <div className="my-3 custom-form-group">
                                <label htmlFor="">
                                    <h4 className='custom-form'>Form Düzenle</h4>
                                </label>
                                <br />
                                <label htmlFor="">
                                    <b>1.</b> Form Adı
                                </label>
                                <Input
                                    placeholder="Form Name"
                                    value={name}
                                    onChange={onNameChange}
                                />
                                <div className=" my-3 custom-form-group">
                                    <label htmlFor="">
                                        <b>2.</b> Form Açıklaması
                                    </label>
                                </div>
                                <Input
                                    placeholder="Form Description"
                                    value={description}
                                    onChange={onDescriptionChange}
                                />
                                <br />
                                <br />
                                <Button type="primary" onClick={onSave}>Save</Button>
                                <Button onClick={onCancel}>Cancel</Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        // <div>
        //     <Input
        //         placeholder="Form Name"
        //         value={name}
        //         onChange={onNameChange}
        //     />
        //     <Input
        //         placeholder="Form Description"
        //         value={description}
        //         onChange={onDescriptionChange}
        //     />
        //     <Button type="primary" onClick={onSave}>Save</Button>
        //     <Button onClick={onCancel}>Cancel</Button>
        // </div>
    );
};

export default EditForm;

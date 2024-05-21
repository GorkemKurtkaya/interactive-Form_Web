import React from 'react';
import { Button, Input } from 'antd';

const EditForm = ({ name, description, onNameChange, onDescriptionChange, onSave, onCancel }) => {
    return (
        <div>
            <Input
                placeholder="Form Name"
                value={name}
                onChange={onNameChange}
            />
            <Input
                placeholder="Form Description"
                value={description}
                onChange={onDescriptionChange}
            />
            <Button type="primary" onClick={onSave}>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </div>
    );
};

export default EditForm;

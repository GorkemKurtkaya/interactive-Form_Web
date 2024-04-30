import React, { useState } from 'react';
export function EditFormComponent({form}) {
    
    // form.id =>  istek

    const [baslik, setBaslik] = useState(form.baslik);

    const handlebaslikChange = (e) => {
        setBaslik(e.target.value);
    }
    //
    return (
        <div>
            <input value={baslik} onChange={handlebaslikChange} />
        </div>
    )
}
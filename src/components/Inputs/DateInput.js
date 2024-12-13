import React, { useContext } from 'react';
import { AppContext } from '../../appContext';

const DateInput = (  params ) => {

    const { formData } = useContext(AppContext);

    const field = params.field
    const handleChange = params.handleChange
    const commonProps = params.commonProps

    const handleDateChange = (field, value) => {
        value = new Date(value).toISOString(); // Transforma a formato ISO 8601
        handleChange(field, value)
    }

    const valueDate = formData[field.key] !== undefined ? new Date(formData[field.key]).toISOString().split("T")[0] : ''

    return (
        <div key={field.key} className="form-group" field={field.key}>
            <label className={'label-required'}>Indica una fecha{ field.key === 'fecha_aproximada' ? ' aproximada' : '' }</label>
            <input
                type="date"
                {...commonProps}
                value={valueDate}
                onChange={(e) => handleDateChange(field, e.target.value)}
            />
        </div>
    );

}

export default DateInput;
import React, { useContext } from 'react';

import { AppContext } from '../../appContext';
import InputSelector from './InputSelector';

const CheckBoxConditional = (  params ) => {

    const { formData } = useContext(AppContext);

    const field = params.field
    const handleChange = params.handleChange
    const commonProps = params.commonProps

    let child = null
    const thisVal = formData[field.key] || ''
    
    if( field.conditionals && thisVal !== ''){
      child = field.conditionals.find(conditional => conditional.caseOf === thisVal);
    }

    return (
        <>
            <div key={field.key} className="form-group">
                <div className="form-check">
                    <input
                        type="checkbox"
                        id={field.key}
                        className="form-check-input"
                        checked={!!formData[field.key]}
                        onChange={(e) => handleChange(field, e.target.checked)}
                    />
                    <label className={`form-check-label m-0 ${field.required ? 'label-required' : ''}`} htmlFor={field.key}>
                        {field.label}
                    </label>
                </div>
            </div>

            {field.conditionals && child !== null && child !== undefined && child.nestChildren &&
            child.nestChildren.map((nestedField, index) => (
                <InputSelector  key={'child-'+nestedField.key} field={nestedField} handleChange={handleChange} commonProps={commonProps}></InputSelector>
            ))}
        </>
    );

}

export default CheckBoxConditional;
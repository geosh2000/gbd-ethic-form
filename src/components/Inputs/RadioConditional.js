import React, { useContext } from 'react';

import { AppContext } from '../../appContext';
import InputSelector from './InputSelector';

const RadioConditional = (  params ) => {

    const { catalogs, formData } = useContext(AppContext);

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
                <div className="d-flex">
                    <label className={`${field.required ? 'label-required' : ''}`}>{field.label}</label>
                </div>
                <div className="d-flex flex-wrap justify-content-between fechas">
                    {(Array.isArray(catalogs[field.key]) ? catalogs[field.key] : []).map(option => (
                        <div key={option.key} className="form-check form-check-inline">
                            <input
                                type="radio"
                                id={`${field.key}-${option.key}`}
                                name={field.key}
                                className="form-check-input"
                                value={option.path_locales}
                                path={option.path_locales}
                                key={option.key}
                                catalogue={field.catalogue}
                                isown={field.isOwn ? "true" : "false"}
                                checked={formData[field.key] === option.path_locales}
                                onChange={(e) => handleChange(field, e.target.value)}
                            />
                            <label htmlFor={`${field.key}-${option.key}`} className="form-check-label">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {field.conditionals && child !== null && child !== undefined && child.nestChildren &&
            child.nestChildren.map((nestedField, index) => (
                <InputSelector key={'child-'+nestedField.key} field={nestedField} handleChange={handleChange} commonProps={commonProps}></InputSelector>
            ))}
        </>
    );

}

export default RadioConditional;
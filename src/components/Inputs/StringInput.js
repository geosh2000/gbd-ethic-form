import React, { useContext } from 'react';
import { AppContext } from '../../appContext';

const StringInput = (  params ) => {

    const { formData } = useContext(AppContext);

    const field = params.field
    const handleChange = params.handleChange
    const commonProps = params.commonProps

    

    return (
      <div key={field.key} className="form-group">
          <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
          {field.type === 'description' ? (
              <textarea
                  {...commonProps}
                  rows="4"
                  onChange={(e) => handleChange(field, e.target.value)}
                  value={formData[field.key]}
              />
          ) : (
              <input
                  {...commonProps}
                  type={field.type === 'subject' ? 'text' : 'text'}
                  value={formData[field.key]}
                  placeholder={field.placeholder ?? field.label}
                  onChange={(e) => handleChange(field, e.target.value)}
              />
          )}
      </div>
    );

}

export default StringInput;
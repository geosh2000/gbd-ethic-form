import React, { useContext } from 'react';
import Select from 'react-select';
import { AppContext } from '../../appContext';

const SelectCond = (  params ) => {

    const { catalogs, formData } = useContext(AppContext);

    const field = params.field
    const handleChange = params.handleChange
    const customStyles = params.customStyles

    const formatGroupLabel = ( field ) => {
        return( 
            <div className={`${field.required ? 'label-required' : ''}`}>
                <span>{field.label}</span>
            </div>
        );
    }

    const selectedOption = catalogs[field.key]?.find(option => option.value === formData[field.key]?.key);
            
    const handleSelection = (field, value) => {
        handleChange(field, value);
    };

    return (
          <div key={field.key}>
              <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
              <Select
                  styles={customStyles}
                  formatGroupLabel={formatGroupLabel(field)}
                  options={catalogs[field.key]}
                  className="mb-2"
                  id={field.key}
                  value={selectedOption || ''}
                  path={field.path_locales || field.scope}
                  catalogue={field.catalogue}
                  isown={field.isOwn ? "true" : "false"}
                  onChange={(e) => {
                      handleSelection(field, e)
                  }}
              ></Select>
          </div>
    )

}

export default SelectCond;
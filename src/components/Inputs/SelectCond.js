import React, { useContext } from 'react';
import Select from 'react-select';
import { AppContext } from '../../appContext';

const SelectCond = (  params ) => {

    const { catalogs, formData } = useContext(AppContext);

    const field = params.field
    const handleChange = params.handleChange
    const customStyles = params.customStyles
    const defVal = params.defVal

    console.log(params)

    function formatGroupLabel(field) {
        return (
            <div className={`${field.required ? 'label-required' : ''}`}>
                <span>{field.label}</span>
            </div>
        );
    }

    // Default Setup
    // Type value
    const typeVal = { 
          "grievance":{
            "key": "grievance",
            "label": "Denuncia",
            "description": null,
            "examples": null,
            "container_name": "Denuncia",
            "is_active": true,
            "path": "type::grievance",
            "path_locales": "type::grievance"
          },
          "suggestion": {
            "key": "suggestion",
            "label": "Idea, Propuesta de Innovación o Sugerencia",
            "description": null,
            "examples": null,
            "container_name": null,
            "is_active": true,
            "path": "",
            "path_locales": "type::suggestion"
          }
    };

    const handleSelection = (field, value) => {
        handleChange(field, value);
    };

    let selectedOption = null;
    let readonly = (defVal === null || defVal === undefined) ? false : true;
    if( defVal && !(catalogs[field.key]?.find(option => option.value === formData[field.key]?.key)) ){
        selectedOption = typeVal[defVal]
        handleSelection(field, typeVal[defVal]);
    }else{
        selectedOption = catalogs[field.key]?.find(option => option.value === formData[field.key]?.key);
    }       
    
    console.log(field.label, defVal, field.key);

    return (
          <div key={field.key}>
              <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
              <Select
                  styles={customStyles}
                //   isDisabled = {readonly}
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
import React, { useContext } from 'react';
import { AppContext } from '../../appContext';
import SelectCond from './SelectCond';
import InputSelector from './InputSelector';

const CatalogSelect = (  params ) => {

    const { formData } = useContext(AppContext);

    const field = params.field
    const handleChange = params.handleChange
    const commonProps = params.commonProps
    const defVal = params.defVal

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#d3d3d3' : provided.backgroundColor,
          color: state.isSelected ? '#000' : provided.color,
          '&:hover': {
            backgroundColor: state.isSelected ? '#d3d3d3' : '#f0f0f0',
          },
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#000',
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999,
        }),
        control: (provided) => ({
          ...provided,
          borderColor: '#ccc',
          boxShadow: 'none',
          '&:hover': {
            borderColor: '#aaa',
          },
        }),
        placeholder: (provided) => ({
          ...provided,
          color: '#888',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
    };

    

    let child = null
    const thisVal = formData[field.key] || ''
    
    if( field.conditionals && thisVal !== ''){
      child = field.conditionals.find(conditional => conditional.caseOf === thisVal.path_locales);
    }

    return (
        <>
          <SelectCond key={'select-'+field.key} field={field} handleChange={handleChange} customStyles={customStyles} defVal={defVal}></SelectCond>
         
          {field.conditionals && child !== null && child !== undefined && child.nestChildren &&
          child.nestChildren.map((nestedField, index) => (
              <InputSelector key={'child-'+nestedField.key} field={nestedField} handleChange={handleChange} commonProps={commonProps}></InputSelector>
          ))}
        </>
    )

}

export default CatalogSelect;
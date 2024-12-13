import React from 'react';

import CatalogSelect from '../Inputs/CatalogSelect';
import StringInput from '../Inputs/StringInput';
import DateInput from '../Inputs/DateInput';
import RangeInput from '../Inputs/RangeInput';
import RadioConditional from '../Inputs/RadioConditional';
import CheckBoxConditional from '../Inputs/CheckBoxConditional';
import FileInput from '../Inputs/FileInput';
import Involved from '../Inputs/InvolvedInput';

const InputSelector = (  params ) => {

    const field = params.field
    const handleChange = params.handleChange
    const commonProps = params.commonProps

    switch (field.type) {
        case 'string':
        case 'subject':
        case 'description':
          return <StringInput field={field} handleChange={handleChange} commonProps={commonProps}></StringInput>
        case 'date':
          return <DateInput field={field} handleChange={handleChange} commonProps={commonProps}></DateInput>
        case 'date-range':
          return <RangeInput field={field}></RangeInput>
        case 'catalog-radio-conditional':
          return <RadioConditional field={field} handleChange={handleChange}  commonProps={commonProps}></RadioConditional>
        case 'catalog-select':
        case 'catalog-select-conditional':
          return <CatalogSelect field={field} handleChange={handleChange} commonProps={commonProps}></CatalogSelect>
        case 'checkbox-conditional':
        case 'checkbox':
          return <CheckBoxConditional field={field} handleChange={handleChange} commonProps={commonProps}></CheckBoxConditional>
        case 'file':
            return <FileInput field={field} handleChange={handleChange}></FileInput>
        case 'involved':
            return <Involved field={field} handleChange={handleChange}></Involved>
        default:
            return null;
    }

}

export default InputSelector;
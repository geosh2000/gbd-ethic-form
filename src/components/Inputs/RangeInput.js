import React, { useContext } from 'react';
import { AppContext } from '../../appContext';

const RangeInput = (  params ) => {

    const { formData, handleInputChange, handleFormData } = useContext(AppContext);

    const field = params.field

    const handleRangeChange = (field, value, type ) => {

      value = new Date(value).toISOString(); // Transforma a formato ISO 8601
      field.overKey=`${field.key}_${type}`
      const oposit = type == 'from' ? 'to' : 'from'
      const valOp = formData[`${field.key}_${oposit}`]

      handleInputChange(field, value)

      if( valOp !== undefined ){
        const { overKey, ...updatedField } = field

        let range = ''
        if( oposit === 'to' ){
          range = value + '__' + formData[`${field.key}_to`]
        }else{
          range = formData[`${field.key}_from`] + '__' + value
        }

        handleInputChange(updatedField, range);

      }

    };

    const valueFrom = formData[`${field.key}_from`] !== undefined ? new Date(formData[`${field.key}_from`]).toISOString().split("T")[0] : ''
    const valueTo = formData[`${field.key}_to`] !== undefined ? new Date(formData[`${field.key}_to`]).toISOString().split("T")[0] : ''

    return (
        <div key={field.key} className="form-group ">
           <label className={'label-required'}>Selecciona entre que fechas sucedieron los hechos</label>
            <div className="mb-2 boxed"> 
                <div>
                  <label className={'label-required'}>Fecha inicial:</label>
                  <input
                      type="date"
                      className="form-control mr-2"
                      value={valueFrom}
                      onChange={(e) => handleRangeChange(field, e.target.value, 'from')}
                      placeholder="Desde"
                  />
                </div>
                <div>
                  <label>Fecha final:</label>
                  <input
                      type="date"
                      className="form-control"
                      value={valueTo}
                      onChange={(e) => handleRangeChange(field, e.target.value, 'to')}
                      placeholder="Hasta"
                  />
              </div>
            </div>
        </div>
    );

}

export default RangeInput;
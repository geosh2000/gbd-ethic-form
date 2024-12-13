import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../appContext';

const Involved = (  params ) => {

    const { handleInputChange, formData } = useContext(AppContext);

    const field = params.field

    const InvolvedInput = ({ onChanges, keyDiv }) => {
        const [involved, setInvolved] = useState([]);
        const [currentInput, setCurrentInput] = useState({ name: '', occupation: '', type: 'Afectado' });
    
        // Usar useEffect para inicializar el estado de 'involved' solo cuando 'keyDiv' cambie o el componente se monte
        useEffect(() => {
            if (formData[keyDiv]) {
                setInvolved(formData[keyDiv]);
            }
        }, [keyDiv, formData]);

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setCurrentInput({
                ...currentInput,
                [name]: value
            });
        };
    
        const handleAddInvolved = () => {
    
        const name = document.getElementById('involved-name')
        const occupation = document.getElementById('involved-occupation')
        const type = document.getElementById('involved-type')

        if( name.value === "" || occupation.value === "" || type.value === "" ){
            alert('Por favor, complete todos los campos requeridos para agregar a los involucrados.');
            return;
        }

        const newInvolved = [...involved, currentInput];

            setInvolved(newInvolved);
            setCurrentInput({ name: '', occupation: '', type: '' }); // Limpiar input después de agregar

            if (onChanges) {
                onChanges(newInvolved); // Llamar a onChange con el array actualizado
            }
        };
    
        const handleRemoveInvolved = (index) => {
            const updatedInvolved = involved.filter((_, i) => i !== index);
            setInvolved(updatedInvolved);

            if (onChanges) {
                onChanges(updatedInvolved); // Llamar a onChange con el array actualizado
            }
        };
    
        return (
            <div>
                <div className="form-group involucrado">
                    <select
                        name="type" 
                        value={currentInput.type || ''}
                        onChange={handleInputChange}
                        className="form-select label-required"
                        id="involved-type"
                    >
                        <option value="" disabled>Tipo de Involucrado</option>
                        <option value="Afectado">Afectado</option>
                        <option value="Testigo">Testigo</option>
                        <option value="Infractor">Infractor</option>
                        <option value="Complice">Complice</option>
                    </select>
                    <input
                        type="text"
                        name="name"
                        value={currentInput.name}
                        onChange={handleInputChange}
                        placeholder="Nombre del Involucrado"
                        className="form-control"
                        id="involved-name"
                    />
                    <input
                        type="text"
                        name="occupation"
                        value={currentInput.occupation}
                        onChange={handleInputChange}
                        placeholder="Ocupación del Involucrado"
                        className="form-control"
                        id="involved-occupation"
                    />
                      
                    <div className="divRight">
                        <button type="button" className="mt-2 btn btn-outline-primary" onClick={handleAddInvolved} >
                            Agregar
                        </button>
                    </div>
                </div>
    
                <div className="people-involved">
                    {involved.length === 0 ? (
                        <div className="not-involved">Tipo de involucrado</div>
                    ) : (
                    <div className="selectable-list">
                        {involved.map((item, index) => (
                            <div key={index} 
                              className={`selectable-item ${
                                item.type === 'Afectado' ? 'victim' :
                                item.type === 'Complice' ? 'accomplice' :
                                item.type === 'Testigo' ? 'witness' :
                                item.type === 'Infractor' ? 'offender' :
                                ''}`}    
                            >
                                <strong>{item.type}:&nbsp;</strong>
                                {item.name} ({item.occupation}) 
                                <button type="button"
                                    onClick={() => handleRemoveInvolved(index)}
                                    className="btn btn-danger btn-sm float-right">X</button>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div key={field.key} className="form-group">
            <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
            <InvolvedInput 
                keyDiv={field.key}
                onChanges={(newInvolvedArray) => handleInputChange(field, newInvolvedArray)}
            />
        </div>
    );
}

export default Involved;
// AuthContext.js
import React, { createContext, useState, useCallback } from 'react';
import { fetchCatalog } from './services/api';

const AppContext = createContext({
  step: "test"
});

const AppProvider = ({ children }) => {
  const [stepper, setStepper] = useState({});
  const [catalogs, setCatalogs] = useState({});
  const [renderForm, setRenderForm] = useState({});
  const [formData, setFormData] = useState({});
  const [formDataValues, setFormDataValues] = useState({});

  const [currentStep, setCurrentStep] = useState(0);
  const [binaryFiles, setBinaryFiles] = useState([]);

  const setSteps = (steps) => {
    setStepper(steps);
    setRenderForm( steps );
  }

    // Función para obtener la estructura del formulario
    const fetchFormStructure = useCallback(async () => {
        try {
            const response = await fetch('https://djaguar.herokuapp.com/odoo_com_sistemaetico_grupobd/api/form/retrieve/current-report/?lg=es');
            const data = await response.json();
            setSteps(data.stepers);
            setCurrentStep( 0 );
        } catch (error) {
            console.error('Error al obtener la estructura del formulario:', error);
        }
    }, []);

    // Función para cargar catálogos
    const loadCatalogs = useCallback(async (sublevel = false, isOwn, catalogue, path, fieldId) => {
        const fetchCatalogs = async (fields) => {
        const newCatalogs = {};
        for (const field of fields) {
            if (['catalog-select', 'catalog-select-conditional', 'catalog-radio-conditional'].includes(field.type) && !catalogs[field.key]) {
            const fieldPath = field.path_locales || field.scope || '/';
            const catalogData = await fetchCatalog(field.isOwn, field.catalogue, fieldPath);
            const updatedCatalogData = catalogData.data.map(cat => ({
                ...cat,
                value: cat.key // Asigna el valor del campo 'key' a 'value'
            }));
            newCatalogs[field.key] = updatedCatalogData;
            }

            if (field.conditionals) {
            for (const cond of field.conditionals) {
                for (const condNest of cond.nestChildren) {
                if (['catalog-select', 'catalog-select-conditional', 'catalog-radio-conditional'].includes(condNest.type) && !catalogs[condNest.key]) {
                    const condPath = condNest.path_locales || condNest.scope || '/';
                    const catalogData = await fetchCatalog(condNest.isOwn, condNest.catalogue, condPath);
                    const updatedCatalogData = catalogData.data.map(cat => ({
                    ...cat,
                    value: cat.key // Asigna el valor del campo 'key' a 'value'
                    }));
                    newCatalogs[condNest.key] = updatedCatalogData;
                }
                }
            }
            }
        }
        return newCatalogs;
        };

        if (!sublevel) {
        const allFields = stepper.flatMap(step => step.form["json-schema"]);
        const newCatalogs = await fetchCatalogs(allFields);
        setCatalogs(prevCatalogs => ({ ...prevCatalogs, ...newCatalogs }));
        } else if (fieldId) {
        const catalogData = await fetchCatalog(isOwn, catalogue, path);
        setCatalogs(prevCatalogs => ({
            ...prevCatalogs,
            [fieldId]: catalogData.data
        }));
        }
    }, [catalogs, stepper, setCatalogs]);

    const handleFormData = ( id, val, path, date = false, field = null ) => {

        if( !date ){
            setFormData(prevFormData => ({
                ...prevFormData,
                [id]: val,
                path
            }));
        }else{
            setFormData((prevFormData) => {
                const updatedFormData = {
                    ...prevFormData,
                    [id]: val,
                };
            
                const rangeVal = `${updatedFormData[`${id}_from`] || ''}T15:06:08.268Z_${updatedFormData[`${id}_to`] || ''}T15:06:08.268Z`;
            
                // Ahora tienes el estado más reciente en updatedFormData
                handleInputChange(field, rangeVal, false);
            
                path = rangeVal
                return updatedFormData;

            });
        }


        setFormDataValues( prevFormDataValues => ({
            ...prevFormDataValues,
            [id]: path
        }))
    }

    const updateConditionalsInFields = useCallback((fields, fieldId, newConditional) => {
        return fields.map(field => {
            if (field.key === fieldId) {
                return {
                    ...field,
                    nestedContitional: (newConditional && newConditional.caseOf !== undefined) ? true : false,
                    conditionals: field.conditionals
                        ? [...field.conditionals, newConditional]
                        : [newConditional],
                };
            }

            if (field.conditionals) {
                return {
                    ...field,
                    conditionals: updateConditionalsInFields(field.conditionals, fieldId, newConditional),
                };
            }

            if (field.nestChildren) {
                return {
                    ...field,
                    nestChildren: updateConditionalsInFields(field.nestChildren, fieldId, newConditional),
                };
            }

            return field;
        });
    }, []);

    const updateFieldConditionals = useCallback((fieldId, newConditional) => {
            return setSteps(prevSteps => {
                const updatedSteps = [...prevSteps];
                const step = updatedSteps[currentStep];
                const updatedForm = {
                    ...step.form,
                    'json-schema': updateConditionalsInFields(step.form['json-schema'], fieldId, newConditional),
                };
                return [
                    ...updatedSteps.slice(0, currentStep),
                    {
                        ...step,
                        form: updatedForm,
                    },
                    ...updatedSteps.slice(currentStep + 1),
                ];
            });

    }, [currentStep, updateConditionalsInFields]);

    const handleInputChange = useCallback(async (field, value, changeFormData = true ) => {
  
        const keyVal = value.path_locales ?? value;
        const fieldId = field.overKey ?? field.key;

        // handleValueChange( field, value, parent );

        if( changeFormData ){
            handleFormData( fieldId, value, value.path_locales || value )
        } 
  
        handleFormData( fieldId, value, keyVal )

        if (field.catalogue) {
            const path_locales = value.path_locales
            const catalogue = field.catalogue
            const isOwn = field.isOwn
            const label = value.label
    
                try {
                    const catalogData = await fetchCatalog(isOwn, catalogue, path_locales);
    
                    if (catalogData.data?.length > 0) {
                        const updatedCatalogData = catalogData.data.map(cat => ({
                        ...cat,
                        value: cat.key // Asigna el valor del campo 'key' a 'value'
                        }));
    
                        setCatalogs(prevCatalogs => ({
                            ...prevCatalogs,
                            ...(catalogs[path_locales] ? {} : { [path_locales]: updatedCatalogData })
                        }));
    
                        const nestChildren = [{
                        key: path_locales,
                        originalKey: field.key,
                        grid: 6,
                        type: "catalog-select",
                        break: false,
                        isOwn,
                        label,
                        path_locales,
                        hidden: false,
                        required: true,
                        catalogue,
                        sensitive: false,
                        placeholder: "Texto de apoyo"
                    }]
    
                        const newConditional = {
                            caseOf: path_locales,
                            nestChildren: nestChildren
                        };
    
                        updateFieldConditionals(fieldId, newConditional);
    
                    }
                } catch (error) {
                    console.error("Error fetching catalog data:", error);
                }
            }


        // UPDATE CONDITIONALS
        if( field.conditionals ){
            const match = field.conditionals.find(conditional => conditional.caseOf === keyVal);
      
            if( match ){
                const children = match.nestChildren;
        
                setRenderForm((prevState) => {
                    const newState = [...prevState];
                    const parentKey = field.key;

                    const findElement = (items, key) => {
                        for (const item of items) {
                            if (item.key === key) {
                                return item;
                            }
                            if (item.children && Array.isArray(item.children)) {
                                const found = findElement(item.children, key);
                                if (found) return found;
                            }
                        }
                        return null;
                    };
          
                    const jsonSchema = newState[currentStep].form['json-schema'];
                    const parentElement = findElement(jsonSchema, parentKey);
            
                    if (parentElement) {
                        if (!parentElement.children) {
                            parentElement.children = [];
                        }

                        parentElement.children = children;
                    }

                    return newState;
              });
            }
        }

    }, [catalogs, updateFieldConditionals, renderForm]);

    const handleFileChange = (field, event) => {
        const files = event.target.files; // Archivos seleccionados
        const fileArray = Array.from(files); // Convertir a array para mapear

        setBinaryFiles(fileArray); // Guardar binarios en el estado
    };

    const handleSubmit = useCallback(async () => {

        const buildRecursiveString = (formDataValues, key) => {
            // Inicializamos el resultado con el valor actual
            let result = formDataValues[key];
        
            // Verificamos si el valor actual apunta a otro valor
            while (formDataValues[result] !== undefined) {
                // Concatenamos el valor actual y seguimos buscando
                result = formDataValues[result];
            }
        
            return result;
        };
    
        const formulario = {
            'metadata': {},
            'attachments_id': []
        }

        let metadata = {}

        renderForm.map( (step, index) => {
            let breadcrumb = `stepers::${index}`
            metadata[step.name] = []
            breadcrumb += `::form::json-schema::`
            step.form['json-schema'].map( (input,x) => {
                const element = {
                    origin: breadcrumb + x
                }
                input.catalogue && (element['catalogue'] = input.catalogue);
                input.sensitive !== undefined  && (element['sensitive'] = input.sensitive);
                input.isOwn !== undefined && (element['isOwn'] = input.isOwn);
                
                input.catalogue && (element[input.catalogue] = buildRecursiveString(formDataValues, input.key));
                !input.catalogue && input.key && (element[input.key] = buildRecursiveString(formDataValues, input.key));

                if( input.conditionals ){
                    element['conditionals'] = []
                    const childIndex = input.conditionals.findIndex( child => child.caseOf === formDataValues[input.key] )
                    if( childIndex >= 0 ){
                        const childs = input.conditionals[childIndex].nestChildren
                        let bredChild = breadcrumb + x + '::conditionals::' + childIndex + '::nestChildren::'
                        
                        childs.map( (ch, y) => {
                            const el = {
                                origin: bredChild + y
                            }
                            ch.catalogue && (el['catalogue'] = ch.catalogue);
                            ch.sensitive !== undefined  && (el['sensitive'] = ch.sensitive);
                            ch.isOwn !== undefined && (el['isOwn'] = ch.isOwn);
                            
                            ch.catalogue && (el[ch.catalogue] = buildRecursiveString(formDataValues, ch.key));
                            !ch.catalogue && ch.key && (el[ch.key] = buildRecursiveString(formDataValues, ch.key));

                            element.conditionals.push(el)
                        })
                    }
                }

                metadata[step.name].push(element)
            })
        })

        formulario['metadata'] = metadata

        if( binaryFiles.length > 0 ){

            // Crear una instancia de FormData
            const formData = new FormData();
        
            // Agregar cada archivo al FormData
            binaryFiles.forEach((file) => {
                formData.append("attachments", file, file.name); // Nombre del campo y nombre del archivo
            });
        
            const response = await fetch('https://djaguar.herokuapp.com/odoo_com_sistemaetico_grupobd/api/attachment/', {
                method: 'POST',
                headers: {},
                body: formData,
            });
        
            const result = await response.json();
            formulario['attachments_id'] = result.attachments_id;
        }

        try {
            const response = await fetch('https://api.ethicsglobal.com/odoo_com_sistemaetico_grupobd/api/report/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formulario ),
            });
            const result = await response.json();
            const trackingCode = result.tracking_code;
            window.location.href = `confirmacion-denuncia?conf=${trackingCode}`;
        } catch (error) {
            alert('Error al enviar el formulario');
        }

    }, [binaryFiles, formDataValues]);

    const validateData = async ( step ) => {
        let validation = true

        await Promise.all(
            renderForm[step].form['json-schema'].map( (input, index) => {
                validation = inputValidation(input, index, validation)
            })
        );

        return validation;
    }

    const inputValidation = ( input, index, validation ) => {

        // Validacion Parents
        if( input.required ){
            const parentVal = formDataValues[input.key];
            if( !parentVal || parentVal === '' || (parentVal === undefined) ){
                validation = false
            }
        }

        // Validacion Childs
        if( input.conditionals ){
            const childs = input.conditionals.find( child => child.caseOf === formDataValues[input.key])
            if( childs ){
                childs.nestChildren.map((nestedField, index) => (
                    validation = inputValidation(nestedField, index, validation)
                ))
            }
        }

        return validation;
    }

  
    return (
        <AppContext.Provider value={{ stepper, catalogs, setSteps, setCatalogs, renderForm,
            fetchFormStructure, loadCatalogs, currentStep, formData, setCurrentStep,
            handleInputChange, handleFileChange, handleSubmit, validateData,
            handleFormData
        }}>
        {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
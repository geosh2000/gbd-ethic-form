// src/App.js

import React, { useState, useEffect, useCallback } from 'react';
import './App.css'
import './Stepper.css'
import { fetchCatalog } from './services/api';
import Select from 'react-select';
import { Modal, Button } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

const App = ( params ) => {
    const [formData, setFormData] = useState({});
    const [defaultData, setDefaultData] = useState({});
    const [formDataValues, setFormDataValues] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [catalogs, setCatalogs] = useState({});
    const [loading, setLoading] = useState(true);
    const [fieldValues, setFieldValues] = useState({});
    const [binaryFiles, setBinaryFiles] = useState([]);

    const [show, setShow] = useState(false);
    const [trackingCode, setTrackingCode] = useState('123456'); // Aquí debes establecer 

    const handleClose = () => {
      setShow(false);
      resetForm();
    };
    const handleShow = () => setShow(true);

    const resetForm = () =>{
      setFormData({});
      setFormDataValues({});
      setCurrentStep(0);
      setFieldValues({});
      setBinaryFiles([]);
    }

    useEffect(() => {
      if (params.unidad) {
        const unidades = {
          atpm: {
            "key": "adh_-_atpm",
            "label": "ADH - ATPM",
            "description": null,
            "examples": null,
            "container_name": "ADH - ATPM",
            "is_active": true,
            "path": "type::adh_-_atpm",
            "path_locales": "type::adh_-_atpm"
          },
          bdi: {
              "key": "bdi_inmobiliaria",
              "label": "BDI  INMOBILIARIA",
              "description": null,
              "examples": null,
              "container_name": "BDI  INMOBILIARIA",
              "is_active": true,
              "path": "",
              "path_locales": "type::bdi_inmobiliaria"
          },
          butik: {
              "key": "butik",
              "label": "BUTIK",
              "description": null,
              "examples": null,
              "container_name": "BUTIK",
              "is_active": true,
              "path": "",
              "path_locales": "type::butik"
          },
          club: {
              "key": "club_vacacional",
              "label": "CLUB VACACIONAL",
              "description": null,
              "examples": null,
              "container_name": "CLUB VACACIONAL",
              "is_active": true,
              "path": "type::club_vacacional",
              "path_locales": "type::club_vacacional"
          },
          grupobd: {
              "key": "grupobd_(oficinas_centrales)",
              "label": "GRUPOBD (Oficinas centrales)",
              "description": null,
              "examples": null,
              "container_name": "GRUPOBD (Oficinas centrales)",
              "is_active": true,
              "path": "type::grupobd_(oficinas_centrales)",
              "path_locales": "type::grupobd_(oficinas_centrales)"
          },
          olcp: {
              "key": "óleo",
              "label": "Óleo",
              "description": null,
              "examples": null,
              "container_name": "Óleo",
              "is_active": true,
              "path": "type::óleo",
              "path_locales": "type::óleo"
          }
        };

        const unidad = unidades[params.unidad];
    
        if (unidad) {
          setDefaultData((prevDefaultData) => ({
            ...prevDefaultData,
            'C::OWN::unidad_de_negocio': unidad
          }));
        }
      }
    }, []);

    

    // Función para obtener la estructura del formulario
    const fetchFormStructure = useCallback(async () => {
      try {
          const response = await fetch('https://djaguar.herokuapp.com/odoo_com_sistemaetico_grupobd/api/form/retrieve/current-report/?lg=es');
          const data = await response.json();
          setSteps(data.stepers);
      } catch (error) {
          console.error('Error al obtener la estructura del formulario:', error);
      } finally {
          setLoading(false);
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
          const allFields = steps.flatMap(step => step.form["json-schema"]);
          const newCatalogs = await fetchCatalogs(allFields);
          setCatalogs(prevCatalogs => ({ ...prevCatalogs, ...newCatalogs }));
      } else if (fieldId) {
          const catalogData = await fetchCatalog(isOwn, catalogue, path);
          setCatalogs(prevCatalogs => ({
              ...prevCatalogs,
              [fieldId]: catalogData.data
          }));
      }
  }, [steps, catalogs]);
  
  
    useEffect(() => {
        fetchFormStructure();
    }, []);

    useEffect(() => {
        if (steps.length > 0) {
            loadCatalogs();
        }
    }, [steps]);

  
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
      setSteps(prevSteps => {
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

  const handleValueChange = useCallback(async (field, value, parent) => {

      if( value === 'tbd' ){
        value = null
      }

      // Asegúrate de que currentStep, steps y field tienen valores válidos
      const currentStepData = steps[currentStep]?.form['json-schema'] || [];
      const isConditional = (parent && !parent.nestedContitional);
      
      let index = currentStepData.findIndex(item => item.key === (field.originalKey || field.key));

      let fieldOk = field;
      let originChild = '';
      
      if (isConditional) {
          fieldOk = parent;
          index = currentStepData.findIndex(item => item.key === (fieldOk.originalKey || fieldOk.key));

          // Verifica la existencia de conditionals y nestChildren para evitar errores
          const indexCond = currentStepData[index]?.conditionals?.findIndex(
              item => item.caseOf === (fieldValues[parent.key]?.value?.path_locales || fieldValues[parent.key]?.value)
          );

          if (indexCond !== -1 && currentStepData[index]?.conditionals?.[indexCond]?.nestChildren) {
              const indexNest = currentStepData[index].conditionals[indexCond].nestChildren.findIndex(item => item.key === field.key);
              originChild = `::conditionals::${indexCond}::nestChildren::${indexNest}`;
          } else {
              console.error("Error: No se encontró la condición o nestChildren.");
              return;
          }
      }

      const inputValue = {
          origin: `stepers::${currentStep}::form::json-schema::${index}${originChild}`,
          sensitive: false,
          [field.catalogue || (field.originalKey || field.key)]: (value?.path_locales || value),
      };

      // Añade las propiedades específicas del tipo de campo
      switch (field.type) {
          case 'catalog-select':
          case 'catalog-select-conditional':
              inputValue['catalogue'] = field.catalogue;
              inputValue['isOwn'] = field.isOwn;
              break;
          default:
              // Otros tipos de campo si es necesario
              break;
      }

      
      if (field.conditionals && !field.nestedContitional) {
          inputValue['conditionals'] = [];
      }

      // Actualiza el estado de formDataValues
      setFormDataValues(prevFormDataValues => {
          const stepName = steps[currentStep].name;
          const currentValues = prevFormDataValues[stepName] || [];

          const existingIndex = currentValues.findIndex(item => item.origin === `stepers::${currentStep}::form::json-schema::${index}`);

          if (existingIndex === -1) {
              return {
                  ...prevFormDataValues,
                  [stepName]: [...currentValues, inputValue]
              };
          } else {
              return {
                  ...prevFormDataValues,
                  [stepName]: currentValues.map((item, idx) => {
                      if (idx === existingIndex) {
                          if (isConditional) {
                              // Buscar si ya existe un inputValue con el mismo origin en los conditionals
                              const updatedConditionals = [...item.conditionals || []];
                              const existingCondIndex = updatedConditionals.findIndex(cond => cond.origin === inputValue.origin);

                              if (existingCondIndex !== -1) {
                                  // Si existe, actualízalo
                                  updatedConditionals[existingCondIndex] = inputValue;
                              } else {
                                  // Si no existe, agrégalo
                                  updatedConditionals.push(inputValue);
                              }

                              return {
                                  ...item,
                                  conditionals: updatedConditionals
                              };
                          } else {
                              // Si no es condicional, simplemente actualiza el valor
                              return inputValue;
                          }
                      }
                      return item;
                  })
              };
          }
      });
  }, [currentStep, steps, setFormDataValues, fieldValues]);


  const handleInputChange = useCallback(async (field, value, parent, changeFormData = true ) => {

    const fieldId = field.key;

    handleValueChange( field, value, parent );

    if( changeFormData ){
      setFormData(prevFormData => ({
          ...prevFormData,
          [fieldId]: value,
          path: value.path_locales || value
      }));
    }  

      setFieldValues(prevFieldValues => ({
          ...prevFieldValues,
          [fieldId]: {
              value,
              path: value.path_locales || value
          }
      }));   

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

                  const newConditional = {
                      caseOf: path_locales,
                      nestChildren: [{
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
                  };

                  updateFieldConditionals(fieldId, newConditional);
              }
          } catch (error) {
              console.error("Error fetching catalog data:", error);
          }
      }
  }, [catalogs, updateFieldConditionals, handleValueChange]);

  const handleFileChange = (field, event) => {

    const files = event.target.files; // Archivos seleccionados
    const fileArray = Array.from(files); // Convertir a array para mapear

    setBinaryFiles(fileArray); // Guardar binarios en el estado
    handleValueChange( field, 'tbd' );
  };

  const handleNextStep = () => {
      const fields = steps[currentStep]?.form["json-schema"] || [];
      const isValid = fields.every(field => {
          if (field.required && !formData[field.key]) {
              return false;
          }
          return true;
      });

      // setCurrentStep(currentStep + 1);
      if (isValid) {
          setCurrentStep(currentStep + 1);
      } else {
          alert('Por favor, complete todos los campos requeridos.');
      }
  };

  const handlePrevStep = () => {
      setCurrentStep(currentStep - 1);
  };

  const handleSubmit = useCallback(async () => {

    const formulario = {
      'metadata': formDataValues,
      'attachments_id': []
    }

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
        setTrackingCode(result.tracking_code);
        handleShow();
    } catch (error) {
        alert('Error al enviar el formulario');
    }

  }, [formDataValues]);

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
        const newInvolved = [...involved, currentInput];
        console.log(newInvolved, involved);
          setInvolved(newInvolved);
          setCurrentInput({ name: '', occupation: '', type: 'Afectado' }); // Limpiar input después de agregar

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
              <div className="form-group">
                  <input
                      type="text"
                      name="name"
                      value={currentInput.name}
                      onChange={handleInputChange}
                      placeholder="Nombre del Involucrado"
                      className="form-control"
                  />
                  <input
                      type="text"
                      name="occupation"
                      value={currentInput.occupation}
                      onChange={handleInputChange}
                      placeholder="Ocupación del Involucrado"
                      className="form-control"
                  />
                  <select
                      name="type"
                      value={currentInput.type}
                      onChange={handleInputChange}
                      className="form-control"
                  >
                      <option value="Afectado">Afectado</option>
                      <option value="Testigo">Testigo</option>
                      <option value="Infractor">Infractor</option>
                      <option value="Complice">Complice</option>
                  </select>
                  <div className="d-grid gap-2">
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
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <FaExclamationTriangle style={{ color: 'red', marginRight: '10px' }} />
                    IMPORTANTE!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p><strong>Este es tu número de seguimiento: {trackingCode}</strong></p>
                  <p>Conservar tu número de seguimiento es esencial para realizar seguimiento de tu reporte y acceder a funciones clave como:</p>
                  <ul>
                    <li>Consultar el estado actual de tu reporte.</li>
                    <li>Añadir información adicional.</li>
                    <li>Subir documentos o evidencias adicionales.</li>
                    <li>Recibir y responder mensajes importantes de manera anónima con el equipo de atención.</li>
                  </ul>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
          </div>
      );
  };


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
  



  // Función de renderizado optimizada para cada tipo de campo
const renderField = (field, parent) => {

    const handleChange = (field, value, additionalProps = {}) => {
        // Maneja el cambio del input, incluyendo el valor y otras propiedades
        handleInputChange(field, value, parent);
    };

    if( defaultData[field.key] ){
      handleChange(field, defaultData[field.key]);
      delete defaultData[field.key];
    }

    const handleRangeChange = (field, value, type) => {
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          [`${field.key}_${type}`]: value,
        };
    
        const rangeVal = `${updatedFormData[`${field.key}_from`] || ''}T15:06:08.268Z_${updatedFormData[`${field.key}_to`] || ''}T15:06:08.268Z`;
    
        // Ahora tienes el estado más reciente en updatedFormData
        handleInputChange(field, rangeVal, parent, false);
    
        return updatedFormData;
      });
    };

    const handleDrop = (e, field) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleChange(field, files[0]); // Puedes manejar un solo archivo o múltiples, según necesites
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necesario para permitir el drop
    };

    const commonProps = {
        id: field.key,
        className: "form-control",
        value: formData[field.key] || '',
        onChange: (e) => handleChange(field, e.target.value),
        placeholder: field.placeholder
    };

    switch (field.type) {
        case 'string':
        case 'subject':
        case 'description':
            return (
                <div key={field.key} className="form-group">
                    <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
                    {field.type === 'description' ? (
                        <textarea
                            {...commonProps}
                            rows="4"
                            onChange={(e) => handleChange(field, e.target.value, parent)}
                        />
                    ) : (
                        <input
                            {...commonProps}
                            type={field.type === 'subject' ? 'text' : 'text'}
                            onChange={(e) => handleChange(field, e.target.value, parent)}
                        />
                    )}
                </div>
            );
        case 'date':
            return (
                <div key={field.key} className="form-group">
                    <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
                    <input
                        type="date"
                        {...commonProps}
                        onChange={(e) => handleChange(field, e.target.value, parent)}
                    />
                </div>
            );
        case 'date-range':
            return (
                <div key={field.key} className="form-group">
                    <label className={`${field.required ? 'label-required' : ''}`}>{field.label}</label>
                    <div className="mb-2">
                        <div>
                          <label>Fecha inicial:</label>
                          <input
                              type="date"
                              className="form-control mr-2"
                              value={formData[`${field.key}_from`] || ''}
                              onChange={(e) => handleRangeChange(field, e.target.value, 'from')}
                              placeholder="Desde"
                          />
                        </div>
                        <div>
                          <label>Fecha final:</label>
                          <input
                              type="date"
                              className="form-control"
                              value={formData[`${field.key}_to`] || ''}
                              onChange={(e) => handleRangeChange(field, e.target.value, 'to')}
                              placeholder="Hasta"
                          />
                      </div>
                    </div>
                </div>
            );
        case 'catalog-radio-conditional':
            return (
                <div key={field.key} className="form-group">
                  <div className="d-flex">
                    <label className={`${field.required ? 'label-required' : ''}`}>{field.label}</label>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between">
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
                                onChange={(e) => handleChange(field, e.target.value, parent)}
                            />
                            <label htmlFor={`${field.key}-${option.key}`} className="form-check-label">
                                {option.label}
                            </label>
                        </div>
                    ))}
                  </div>
                    {field.conditionals?.map(conditional => {
                      const selectedPathLocales = fieldValues[field.key]?.path;
                        if (`${selectedPathLocales}` === conditional.caseOf) {
                            return conditional.nestChildren.map(nestedField => renderField(nestedField, field));
                        }
                        return null;
                    })}
                </div>
            );
        case 'catalog-select':
        case 'catalog-select-conditional':
            const formatGroupLabel = ( field ) => {
              return(
              <div className={`${field.required ? 'label-required' : ''}`}>
                <span>{field.label}</span>
              </div>
            );}
            const selectedOption = catalogs[field.key]?.find(option => option.value === formData[field.key]?.key);


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
                    onChange={(e) => handleChange(field, e, parent)}
                >
                </Select>
                {field.conditionals?.map(conditional => {
                    const selectedPathLocales = fieldValues[field.key]?.path;
                    if (selectedPathLocales === conditional.caseOf) {
                        return conditional.nestChildren.map(nestedField => renderField(nestedField, field));
                    }
                    return null;
                })}
              </div>
            );
        case 'checkbox-conditional':
            return (
                <div key={field.key} className="form-group">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id={field.key}
                            className="form-check-input"
                            checked={!!formData[field.key]}
                            onChange={(e) => handleChange(field, e.target.checked, parent)}
                        />
                        <label className={`form-check-label ${field.required ? 'label-required' : ''}`} htmlFor={field.key}>
                            {field.label}
                        </label>
                    </div>
                    {field.conditionals?.map(conditional => {
                        const selectedPathLocales = fieldValues[field.key]?.path;
                        if (selectedPathLocales === conditional.caseOf) {
                            return conditional.nestChildren.map(nestedField => renderField(nestedField, field));
                        }
                        return null;
                    })}
                </div>
            );
            case 'file':
              return (
                  <div key={field.key} className="form-group">
                      <div className="d-flex">
                          <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
                      </div>
                      <div key={field.key} 
                        className="attachments pointer drop-zone"
                        onDrop={(e) => handleDrop(e, field)}
                        onDragOver={handleDragOver}
                      >
                          <div className="attachments-icon-container">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <g fill="#292D32" fillRule="evenodd">
                                <path d="M9 22.75c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75H9zM2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9C4.39 2.75 2.75 4.39 2.75 9z"></path><path d="M6.25 8c0-1.52 1.23-2.75 2.75-2.75S11.75 6.48 11.75 8 10.52 10.75 9 10.75 6.25 9.52 6.25 8zm1.5 0a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0z"></path><path d="M2.05 19.37a.746.746 0 0 1 .21-1.04l4.93-3.31c1.08-.73 2.57-.64 3.55.19l.33.29c.5.43 1.35.43 1.84 0l4.16-3.57c1.06-.91 2.73-.91 3.8 0l1.63 1.4c.31.27.35.74.08 1.06-.27.31-.74.35-1.06.08l-1.63-1.4c-.5-.43-1.35-.43-1.85 0l-4.16 3.57c-1.06.91-2.73.91-3.8 0l-.33-.29c-.46-.39-1.22-.43-1.73-.08l-4.93 3.31c-.13.08-.28.12-.42.12-.24 0-.48-.12-.62-.33z" fillRule="nonzero"></path>
                              </g>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <g fill="#292D32" fillRule="evenodd">
                                <path d="M8 12.95c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75H8zM8 16.95c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.38c.41 0 .75.34.75.75s-.34.75-.75.75H8z" fillRule="nonzero"></path><path d="M10 6.75c-.96 0-2.75 0-2.75-2.75S9.04 1.25 10 1.25h4c.96 0 2.75 0 2.75 2.75 0 .96 0 2.75-2.75 2.75h-4zM8.75 4c0 1.25.26 1.25 1.25 1.25h4c1.25 0 1.25-.26 1.25-1.25 0-1.25-.26-1.25-1.25-1.25h-4c-.99 0-1.25 0-1.25 1.25z"></path><path d="M9 22.75c-5.62 0-6.75-2.58-6.75-6.75v-6c0-4.56 1.65-6.51 5.71-6.72.4-.02.77.29.79.71.02.42-.3.76-.71.78C5.2 4.93 3.75 5.78 3.75 10v6c0 3.7.73 5.25 5.25 5.25h6c4.52 0 5.25-1.55 5.25-5.25v-6c0-4.22-1.45-5.07-4.29-5.23a.757.757 0 0 1-.71-.79c.02-.41.38-.73.79-.71 4.06.22 5.71 2.17 5.71 6.72v6c0 4.18-1.13 6.76-6.75 6.76H9z" fillRule="nonzero"></path>
                              </g>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <g fill="#292D32" fillRule="evenodd">
                                <path d="M10.02 19.76 7.1 17.93c-.2-.12-.43-.19-.66-.19H5c-2.42 0-3.75-1.33-3.75-3.75v-4c0-2.42 1.33-3.75 3.75-3.75h1.43c.23 0 .46-.07.66-.19l2.92-1.83c1.46-.91 2.88-1.08 4-.46 1.12.62 1.73 1.91 1.73 3.64v9.17c0 1.72-.62 3.02-1.73 3.64-.44.26-.94.38-1.46.38-.79 0-1.66-.28-2.53-.83zM2.75 10v4c0 1.58.67 2.25 2.25 2.25h1.43c.52 0 1.02.14 1.46.42l2.92 1.83c.96.6 1.87.76 2.48.42.61-.34.96-1.19.96-2.32V7.41c0-1.14-.35-1.99-.96-2.32-.61-.34-1.52-.19-2.48.42L7.88 7.33c-.43.28-.94.42-1.45.42H5c-1.58 0-2.25.67-2.25 2.25z"></path><path d="M17.55 16.6a.75.75 0 0 1-.15-1.05 5.94 5.94 0 0 0 0-7.1.75.75 0 0 1 1.2-.9c1.96 2.62 1.96 6.28 0 8.9-.15.2-.37.3-.6.3a.76.76 0 0 1-.45-.15z" fillRule="nonzero"></path><path d="M19.38 19.1a.75.75 0 0 1-.15-1.05c2.67-3.56 2.67-8.54 0-12.1a.75.75 0 0 1 1.2-.9c3.07 4.09 3.07 9.81 0 13.9-.14.2-.37.3-.6.3a.76.76 0 0 1-.45-.15z" fillRule="nonzero"></path>
                              </g>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <g fill="#292D32" fillRule="evenodd">
                                <path d="M6.81 20.86C3.26 20.86 2 18.37 2 16.05v-8.1c0-3.46 1.35-4.81 4.81-4.81h6.07c3.46 0 4.81 1.35 4.81 4.81v8.1c0 3.46-1.35 4.81-4.81 4.81H6.81zM3.52 7.95v8.1c0 1.23.43 3.29 3.29 3.29h6.07c2.61 0 3.29-.68 3.29-3.29v-8.1c0-2.61-.68-3.29-3.29-3.29H6.81c-2.61 0-3.29.68-3.29 3.29z"></path><path d="m19.17 17.53-2.67-1.87a.754.754 0 0 1-.32-.62V8.96c0-.25.12-.48.32-.62l2.67-1.87c1.19-.83 2.06-.59 2.47-.38.41.22 1.11.79 1.11 2.24v7.33c0 1.45-.7 2.03-1.11 2.24-.19.11-.49.21-.86.21-.43 0-.98-.14-1.61-.58zm.87-1.25c.45.31.77.34.9.27.14-.07.29-.35.29-.89V8.34c0-.55-.16-.82-.29-.89-.13-.07-.45-.04-.9.27l-2.35 1.64v5.28l2.35 1.64zM9.25 9.5c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25-1.01 2.25-2.25 2.25-2.25-1.01-2.25-2.25zm1.5 0c0 .41.34.75.75.75s.75-.34.75-.75-.34-.75-.75-.75-.75.34-.75.75z"></path>
                              </g>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <g fill="#292D32" fillRule="evenodd">
                                <path d="M9 22.75c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75H9z" fillRule="nonzero"></path><path d="M18 10.75c-3.42 0-4.75-1.33-4.75-4.75V2c0-.3.18-.58.46-.69.28-.12.6-.05.82.16l8 8a.751.751 0 0 1-.53 1.28h-4zM14.75 6c0 2.58.67 3.25 3.25 3.25h2.19l-5.44-5.44V6z"></path>
                              </g>
                            </svg>
                          </div>
                          <input 
                              className="form-control mt-2" 
                              type="file"
                              id={field.key}
                              onChange={ (e) => handleFileChange(field, e)}
                              multiple={true}  // Para admitir múltiples archivos
                          />
                      </div>
                  </div>
              );
  
        case 'involved':
          return (
              <div key={field.key} className="form-group">
                  <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
                  <InvolvedInput 
                      keyDiv={field.key}
                      onChanges={(newInvolvedArray) => handleInputChange(field, newInvolvedArray)}
                  />
              </div>
          );
        default:
            return null;
    }
  };

    return (
        <div className="container mt-5">

          <div className="mt-20">
            <div className="dyTheme1 dyBorder1 p-5 container-md">
              <div className="form-preview">

              {loading && <p>Cargando...</p>}
              {!loading && steps.length > 0 && (
                  <>
                    {/* Aquí va el Stepper Visual */}
                    <div className="stepper-wrapper mb-4">
                      {steps.map((step, index) => (
                        <div key={index} className={`stepper-item ${currentStep >= index ? 'completed' : ''}`}>
                          <span></span>
                          <span></span>
                          <div className="step-counter">{index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
                        </div>
                      ))}
                    </div>

                    {/* Título del paso */}
                    <div className="form-preview-header mb-30">
                      <div className={`form-preview-header-name indicator-3-${ currentStep + 1 }`}>
                        <h3>{steps[currentStep]?.title}</h3>
                        <span className="step-indicator"></span>
                      </div>
                    </div>

                      <form>
                          <div className="form-grid row">
                            {steps[currentStep]?.form["json-schema"].map(field => renderField(field))}
                          </div>
                          <div className="mt-3 d-flex justify-content-end">
                              {currentStep > 0 && <button type="button" className="btn btn-info me-2" onClick={handlePrevStep}>Anterior</button>}
                              {currentStep < steps.length - 1 && <button type="button" className="btn btn-primary ml-2" onClick={handleNextStep}>Siguiente</button>}
                              {currentStep === steps.length - 1 && <button type="button" className="btn btn-success ml-2" onClick={handleSubmit}>Enviar</button>}
                          </div>
                      </form>
                  </>
              )}

              </div>
            </div>
          </div>
            
        </div>
    );
};

export default App;

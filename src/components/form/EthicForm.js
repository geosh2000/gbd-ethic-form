
import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../appContext';

import AvisoPrivacidad from '../AvisoPrivacidad';
import InputSelector from '../Inputs/InputSelector';

const EthicForm = ( params ) => {

  const { stepper, renderForm, catalogs,
      fetchFormStructure, loadCatalogs, formData,
      currentStep, setCurrentStep, handleInputChange,
      handleSubmit, validateData
       } = useContext(AppContext);

  const stepTop = document.getElementById("steptop");

  // Obtener estructura inicial
  useEffect(() => {
      fetchFormStructure();
  }, []);

  // Obtener Catálogos
  useEffect(() => {
    if (stepper.length > 0) { loadCatalogs() }
  }, [stepper]);

  const handleNextStep = async () => {
    let isValid = await validateData(currentStep);

    // setCurrentStep(currentStep + 1);
    if (isValid) {
        setCurrentStep((prev) => prev + 1);
        setCurrentStep(currentStep + 1);
        window.history.pushState({ step: currentStep + 1 }, "Step");
        if (stepTop) {
          stepTop.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    } else {
        alert('Por favor, complete todos los campos requeridos.');
    }

    // Default "Denuncia"
    // const grieveInd = renderForm[currentStep + 1].form['json-schema'].findIndex( input => input.key === 'C::EG::RC-100' )
    // console.log(catalogs)
    // if( grieveInd >= 0 ){
    //   if( formData['C::EG::RC-100'] === undefined ){
    //     const grieveCat = catalogs['C::EG::RC-100'].find( cat => cat.key === 'grievance' )
    //     console.log(renderForm[currentStep + 1].form['json-schema'][grieveInd], grieveCat)
    //     handleInputChange(renderForm[currentStep + 1].form['json-schema'][grieveInd], grieveCat)
    //   }
    // }

  };
  
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setCurrentStep(currentStep - 1);
    window.history.pushState({ step: currentStep - 1 }, "Step");
    if (stepTop) {
      stepTop.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    // Al cargar la página, asegura que el historial esté sincronizado con el estado inicial
    window.history.replaceState({ step: 0 }, "Step 0");
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentStep((prevStep) => {
        if (prevStep > 0) {
          return prevStep - 1;
        }
        return prevStep; // No retrocede más allá del 0
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  
  const renderField = (field, parent) => {

    // Handle change to be modified
    const handleChange = (field, value) => {
        handleInputChange(field, value);
    };

    const commonProps = {
        id: field.key,
        className: "form-control",
        value: formData[field.key] || '',
        placeholder: field.placeholder
    };

    return <InputSelector field={field} handleChange={handleChange} commonProps={commonProps}></InputSelector>

  };

  return (
    <div className="container mt-5">
      <div className="mt-20">
        <div className="dyTheme1 dyBorder1 p-5 container-md">
          <div className="form-preview">

            {/* Aquí va el Stepper Visual */}
            <div className="stepper-wrapper mb-4" id='steptop'>
              {stepper && Array.isArray(stepper) && 
              stepper.map((step, index) => (
                <div key={'step-'+index} className={`stepper-item ${currentStep > index ? 'completed' : (currentStep < index ? '' : 'focus')}`}>
                  <span></span>
                  <span></span>
                  <div className="step-counter">{index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
                </div>
              ))}
            </div>

            {/* Título del paso */}
            <div className="form-preview-header mb-30">
              <div className={`form-preview-header-name indicator-3-${ currentStep + 1 }`}>
                <h3>{stepper[currentStep]?.title}</h3>
                <span className="step-indicator"></span>
              </div>
            </div>

            <form>
                <div className="form-grid row">
                  {stepper && Array.isArray(stepper) && 
                    renderForm[currentStep]?.form["json-schema"].map(field => renderField(field))
                  }
                </div>
                { currentStep === 0 && <AvisoPrivacidad tipoAviso={formData['C::OWN::centro_de_trabajo']?.value || ""} /> }
                <div className="mt-3 d-flex justify-content-end">
                    {currentStep > 0 && <button type="button" className="btn btn-info me-2" onClick={handlePrevStep}>Anterior</button>}
                    {currentStep < stepper.length - 1 && <button type="button" className="btn btn-primary ml-2" onClick={handleNextStep}>Siguiente</button>}
                    {currentStep === stepper.length - 1 && <button type="button" className="btn btn-success ml-2" onClick={handleSubmit}>Enviar</button>}
                </div>
            </form>
          </div>
        </div>
      </div>       
    </div>
  );
}

export default EthicForm;
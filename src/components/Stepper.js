import React from 'react';

const Stepper = ({ steps, currentStep, goToStep }) => {
    return (
        <div>
            {steps.map((step, index) => (
                <button key={index} onClick={() => goToStep(index)} disabled={index === currentStep}>
                    {step.label}
                </button>
            ))}
        </div>
    );
};

export default Stepper;

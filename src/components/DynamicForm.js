import React, { useState } from 'react';
import { fetchCatalog } from '../services/api';

const DynamicForm = () => {
    const [formData, setFormData] = useState({});
    const [fieldValues, setFieldValues] = useState({});
    const [catalogs, setCatalogs] = useState({});
    const [steps, setSteps] = useState([/* tu estructura de pasos aquí */]);
    const [currentStep, setCurrentStep] = useState(0);

    const handleInputChange = async (fieldId, value, path_locales, catalogue, isOwn, label) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldId]: value,
            path: path_locales || value,
        }));

        setFieldValues(prevFieldValues => ({
            ...prevFieldValues,
            [fieldId]: {
                value: value,
                path: path_locales || value,
            },
        }));

        if (catalogue) {
            const original = steps[currentStep].form['json-schema'].find(item => item.key === fieldId);
            const catalogData = await fetchCatalog(isOwn, catalogue, path_locales);

            if (catalogData.data && catalogData.data.length > 0) {
                setCatalogs(prevCatalogs => ({
                    ...prevCatalogs,
                    [value]: catalogData.data,
                }));

                if (original.conditionals) {
                    original.conditionals.push({
                        caseOf: path_locales,
                        nestChildren: [
                            {
                                key: path_locales,
                                grid: 6,
                                type: 'catalog-select',
                                break: false,
                                isOwn: isOwn,
                                label: label,
                                scope: '/',
                                hidden: false,
                                required: true,
                                catalogue: catalogue,
                                sensitive: false,
                                placeholder: 'Texto de apoyo',
                            },
                        ],
                    });
                } else {
                    original.conditionals = [
                        {
                            caseOf: path_locales,
                            nestChildren: [
                                {
                                    key: path_locales,
                                    grid: 6,
                                    type: 'catalog-select',
                                    break: false,
                                    isOwn: isOwn,
                                    label: label,
                                    scope: '/',
                                    hidden: false,
                                    required: true,
                                    catalogue: catalogue,
                                    sensitive: false,
                                    placeholder: 'Texto de apoyo',
                                },
                            ],
                        },
                    ];
                }

                // Ahora, asegurarte de que el componente se re-renderiza con las nuevas condiciones.
                setSteps([...steps]);
            }
        }
    };

    return (
        <div>
            {/* Renderizar los campos aquí */}
        </div>
    );
};

export default DynamicForm;

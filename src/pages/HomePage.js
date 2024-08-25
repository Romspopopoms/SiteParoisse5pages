import React, { useState } from 'react';
import TemplateSelector from '../components/TemplateSelector';
import DynamicForm from '../components/DynamicForm';
import Template1 from "../assets/BoulangerieTemplates.png";

const HomePage = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState(null);

    const templates = [
        {
            id: 1,
            name: "Paroisse",
            description: "Un template pour un site de paroisse avec plusieurs sections.",
            image: Template1, // Utilise simplement la variable Template1 ici
            previewUrl: "https://template-boulangerie.vercel.app/" // URL pour prévisualiser le site
        },
        // Ajoute d'autres templates ici si nécessaire
    ];

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
    };

    const handleFormSubmit = (data) => {
        setFormData(data);
        console.log('Données soumises:', data);
    };

    return (
        <div className="">
            {!selectedTemplate ? (
                <TemplateSelector templates={templates} onSelectTemplate={handleTemplateSelect} />
            ) : (
                <DynamicForm template={selectedTemplate} onSubmit={handleFormSubmit} />
            )}
            {formData && (
                <div className="mt-4">
                    <p>Site généré avec les données : {JSON.stringify(formData)}</p>
                </div>
            )}
        </div>
    );
};

export default HomePage;

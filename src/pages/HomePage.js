import React, { useState } from 'react';
import TemplateSelector from '../components/TemplateSelector';
import DynamicForm from '../components/DynamicForm';
import Template1 from "../assets/BoulangerieTemplates.png";
import BaseNavbar from '../components/BaseNavbar';

const HomePage = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState(null);

    const templates = [
        {
            id: 1,
            name: "Paroisse",
            description: "Un template pour un site de paroisse avec plusieurs sections.",
            image: Template1, 
            previewUrl: "https://template-boulangerie.vercel.app/"
        },
        // Ajoutez d'autres templates ici si nécessaire
    ];

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setFormData(null);  // Réinitialiser les données du formulaire si un nouveau template est sélectionné
    };

    const handleFormSubmit = (data) => {
        setFormData(data);
        console.log('Données soumises:', data);
    };

    return (
        <div>
            <BaseNavbar />
            {!selectedTemplate ? (
                <TemplateSelector templates={templates} onSelectTemplate={handleTemplateSelect} />
            ) : (
                <>
                    <DynamicForm template={selectedTemplate} onSubmit={handleFormSubmit} />
                    <button 
                        onClick={() => setSelectedTemplate(null)} 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Retour à la sélection de template
                    </button>
                </>
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

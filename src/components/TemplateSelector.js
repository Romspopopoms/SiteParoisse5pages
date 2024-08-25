import React, { useState } from 'react';

const TemplateSelector = ({ templates, onSelectTemplate }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleTemplateClick = (template) => {
        const userConfirmed = window.confirm("Le site va s'ouvrir pour que vous validiez votre choix. Cliquez sur OK pour continuer.");
        if (userConfirmed) {
            window.open(template.previewUrl, '_blank'); // Ouvre un nouvel onglet avec l'aperçu du template
            setSelectedTemplate(template); // Stocke le template sélectionné
            setShowModal(true); // Affiche le modal de confirmation
        }
    };

    const handleModalChoice = (confirm) => {
        setShowModal(false);
        if (confirm) {
            onSelectTemplate(selectedTemplate); // Si l'utilisateur confirme, passe à la phase suivante
        } else {
            setSelectedTemplate(null); // Réinitialise la sélection si l'utilisateur annule
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div key={template.id} className="border rounded-lg shadow-lg overflow-hidden">
                        <img src={template.image} alt={template.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                            <p className="text-gray-600 mb-4">{template.description}</p>
                            <button 
                                onClick={() => handleTemplateClick(template)} 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Prévisualiser
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de confirmation */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl mb-4">Souhaitez-vous donc choisir ce template ?</h2>
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={() => handleModalChoice(true)} 
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Oui
                            </button>
                            <button 
                                onClick={() => handleModalChoice(false)} 
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Non
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;

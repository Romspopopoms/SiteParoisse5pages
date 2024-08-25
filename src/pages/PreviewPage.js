import React from 'react';
import Preview from '../components/Preview';
import { useLocation, useNavigate } from 'react-router-dom';

const PreviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData;

    if (!formData) {
        // Si formData est undefined, vous pouvez rediriger vers le formulaire ou afficher un message d'erreur.
        navigate('/');
        return null;
    }

    const handleSubmitToTeam = () => {
        alert('Template soumis à votre équipe!');
        navigate('/confirmation'); // Redirige vers une page de confirmation ou autre
    };

    return (
        <div className="relative">
            <Preview formData={formData} />
            <div className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-l-lg shadow-lg cursor-pointer">
                <button onClick={handleSubmitToTeam} className="font-semibold">
                    Soumettre le Template
                </button>
            </div>
        </div>
    );
};

export default PreviewPage;

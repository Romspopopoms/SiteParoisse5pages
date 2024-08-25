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

    const handleSubmitToTeam = async () => {
        try {
            const response = await fetch('/api/create-repo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: '1234', // Remplacez par l'ID de l'utilisateur connecté
                    template_data: formData, // Les données du template
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Template soumis à votre équipe! Repo créé: ${data.repo_url}`);
                navigate('/');
            } else {
                alert('Erreur lors de la soumission du template.');
            }
        } catch (error) {
            console.error('Error submitting template:', error);
            alert('Erreur lors de la soumission du template.');
        }
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

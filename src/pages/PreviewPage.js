import React, { useState } from 'react';
import Preview from '../components/Preview';
import { useLocation, useNavigate } from 'react-router-dom';

const PreviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData;
    const [loading, setLoading] = useState(false);

    if (!formData) {
        alert('Les données du formulaire sont manquantes. Vous allez être redirigé.');
        navigate('/');
        return null;
    }

    const handleSubmitToTeam = async () => {
        setLoading(true);
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
                const errorData = await response.json();
                alert(`Erreur lors de la soumission du template: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error submitting template:', error);
            alert('Erreur lors de la soumission du template. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <Preview formData={formData} />
            <div className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-4 rounded-l-lg shadow-lg cursor-pointer">
                <button 
                    onClick={handleSubmitToTeam} 
                    className="font-semibold"
                    disabled={loading}
                    aria-busy={loading ? "true" : "false"}
                >
                    {loading ? 'Soumission en cours...' : 'Soumettre le Template'}
                </button>
            </div>
        </div>
    );
};

export default PreviewPage;

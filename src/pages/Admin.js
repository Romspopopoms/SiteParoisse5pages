import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Charger les dépôts via une API ou directement depuis GitHub
        fetch('/api/get-repos')  // Assurez-vous de créer cette route API pour récupérer les repos
            .then(response => response.json())
            .then(data => {
                setRepos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching repos:', error);
                setLoading(false);
            });
    }, []);

    const handleValidation = (repoName) => {
        // Valider le dépôt
        fetch(`/api/validate-repo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ repoName }),
        })
        .then(response => response.json())
        .then(data => {
            // Mettre à jour l'état des repos pour refléter la validation
            const updatedRepos = repos.map(repo => 
                repo.name === repoName ? { ...repo, validated: true } : repo
            );
            setRepos(updatedRepos);
        })
        .catch(error => {
            console.error('Error validating repo:', error);
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <ul className="space-y-4">
                    {repos.map(repo => (
                        <li key={repo.name} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <a 
                                    href={`https://${repo.name}.vercel.app`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:underline text-xl"
                                >
                                    {repo.name}
                                </a>
                            </div>
                            <div>
                                {repo.validated ? (
                                    <span className="text-green-600 font-semibold">✅ Validé</span>
                                ) : (
                                    <button 
                                        onClick={() => handleValidation(repo.name)} 
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Valider
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminDashboard;

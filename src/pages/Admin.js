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
        <div>
            <h1>Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {repos.map(repo => (
                        <li key={repo.name}>
                            <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                            {repo.validated ? (
                                <span>✅ Validé</span>
                            ) : (
                                <button onClick={() => handleValidation(repo.name)}>Valider</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminDashboard;

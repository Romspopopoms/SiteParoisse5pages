import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentRepo, setCurrentRepo] = useState(null);
    const [reviewText, setReviewText] = useState(""); // Ajoutez cette ligne

    useEffect(() => {
        fetch('/api/get-repos')
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

    const handleDeploy = (repoName) => {
        fetch('/api/deploy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ repoName }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.previewUrl) {
                window.open(data.previewUrl, '_blank');
            }
        })
        .catch(error => {
            console.error('Error deploying repo:', error);
        });
    };

    const handleReview = (repoName) => {
        setCurrentRepo(repoName);
        setModalOpen(true);
    };

    const handleSubmitReview = () => {
        // Envoyer le feedback pour le repo
        fetch(`/api/review-repo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ repoName: currentRepo, review: reviewText }),
        })
        .then(response => response.json())
        .then(() => {
            setModalOpen(false);
        })
        .catch(error => {
            console.error('Error submitting review:', error);
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="space-y-4">
                    {repos.map(repo => (
                        <li key={repo.name} className="flex items-center justify-between">
                            <span>{repo.name}</span>
                            <div className="space-x-2">
                                <button 
                                    onClick={() => handleDeploy(repo.name)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Prévisualiser
                                </button>
                                <button 
                                    onClick={() => window.open(`/admin/edit/${repo.name}`, '_blank')}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    Modifier
                                </button>
                                <button 
                                    onClick={() => handleReview(repo.name)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    À Revoir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-2">Feedback pour {currentRepo}</h2>
                        <textarea 
                            className="w-full h-32 border rounded p-2"
                            placeholder="Entrez vos remarques..."
                            value={reviewText} // Ajoutez cette ligne
                            onChange={(e) => setReviewText(e.target.value)} // Modifiez cette ligne
                        />
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Annuler</button>
                            <button 
                                onClick={handleSubmitReview} 
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

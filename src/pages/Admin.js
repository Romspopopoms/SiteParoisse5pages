import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentRepo, setCurrentRepo] = useState(null);
    const [reviewText, setReviewText] = useState("");

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
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Repository Name</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {repos.map(repo => (
                                <tr key={repo.name} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {repo.name}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex item-center space-x-2">
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-2">Feedback pour {currentRepo}</h2>
                        <textarea 
                            className="w-full h-32 border rounded p-2"
                            placeholder="Entrez vos remarques..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
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

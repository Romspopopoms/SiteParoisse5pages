import fetch from 'node-fetch';

const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN;
const GITHUB_USER = process.env.MY_GITHUB_ORG;

export default async function handler(req, res) {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch repos');
        }

        const repos = await response.json();
        res.status(200).json(repos.map(repo => ({
            name: repo.name,
            url: repo.html_url,
            validated: false,  // Vous pouvez ajouter une logique pour vérifier si le dépôt est validé
        })));
    } catch (error) {
        console.error('Error fetching repos:', error);
        res.status(500).json({ error: 'Failed to fetch repos' });
    }
}

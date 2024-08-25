import fetch from 'node-fetch';

const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN;

export default async function handler(req, res) {
    try {
        const repos = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const response = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}`, {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch repos');
            }

            const result = await response.json();
            repos.push(...result);
            page += 1;
            hasMore = result.length === 100;  // Continue to paginate if we have 100 results
        }

        // Return the repo list with basic details
        res.status(200).json(repos.map(repo => ({
            name: repo.name,
            url: repo.html_url,
            private: repo.private,
            validated: false,  // Placeholder for validation logic
        })));
    } catch (error) {
        console.error('Error fetching repos:', error);
        res.status(500).json({ error: 'Failed to fetch repos' });
    }
}

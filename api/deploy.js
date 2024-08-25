const express = require('express');
const fetch = require('node-fetch');

const app = express();
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

app.post('/api/deploy', async (req, res) => {
    const { repoName } = req.body;

    // Étape 1 : Créer un nouveau projet sur Vercel
    const projectResponse = await fetch('https://api.vercel.com/v9/projects', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: repoName,
            gitRepository: {
                type: 'github',
                repo: repoName,
            },
        }),
    });

    const projectData = await projectResponse.json();

    if (!projectResponse.ok) {
        return res.status(500).json({ error: projectData.error.message });
    }

    const projectId = projectData.id;

    // Étape 2 : Déployer le projet nouvellement créé
    const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: repoName,
            gitSource: {
                type: 'github',
                repoId: projectId,
                ref: 'main', // Branche que vous voulez déployer
                repoPath: `/${repoName}`,
            },
        }),
    });

    const deployData = await deployResponse.json();

    if (deployResponse.ok) {
        res.status(200).json({ previewUrl: deployData.url });
    } else {
        res.status(500).json({ error: deployData.error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

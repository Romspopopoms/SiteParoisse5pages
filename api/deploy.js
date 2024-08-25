const express = require('express');
const fetch = require('node-fetch');

const app = express();
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

app.use(express.json());

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
                repo: `Romspopopoms/${repoName}`,  // Utilisez le nom d'utilisateur et le repo
            },
        }),
    });

    const projectData = await projectResponse.json();
    console.log('Project Creation Response:', projectData);  // Ajoutez cette ligne

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
            projectId: projectId,
            gitSource: {
                type: 'github',
                ref: 'main', // Branche que vous voulez déployer
            },
        }),
    });

    const deployData = await deployResponse.json();
    console.log('Deploy Response:', deployData);  // Ajoutez cette ligne

    if (deployResponse.ok) {
        res.status(200).json({ previewUrl: deployData.url });
    } else {
        res.status(500).json({ error: deployData.error.message });
    }
});

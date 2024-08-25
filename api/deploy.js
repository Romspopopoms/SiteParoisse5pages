const express = require('express');
const fetch = require('node-fetch');

const app = express();
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

app.use(express.json());

app.post('/api/deploy', async (req, res) => {
    try {
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

        if (deployResponse.ok) {
            return res.status(200).json({ previewUrl: deployData.url });
        } else {
            return res.status(500).json({ error: deployData.error.message });
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = app;  // Ajoutez cette ligne à la fin de votre fichier `deploy.js`

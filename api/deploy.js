const express = require('express');
const fetch = require('node-fetch');

const app = express();
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

app.use(express.json());

app.post('/api/deploy', async (req, res) => {
    try {
        let { repoName } = req.body;

        // Convertir le nom du projet en minuscules
        repoName = repoName.toLowerCase();

        console.log(`Début du déploiement pour le repo: ${repoName}`);

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
                    repo: `Romspopopoms/${repoName}`,
                },
            }),
        });

        const projectData = await projectResponse.json();
        console.log('Réponse de création de projet:', projectData);

        if (!projectResponse.ok) {
            console.error('Erreur lors de la création du projet:', projectData);
            return res.status(500).json({ error: projectData.error.message });
        }

        const projectId = projectData.id;
        const repoId = projectData.link.repoId; // Récupérer le repoId du projet

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
                    repoId: repoId, // Utiliser le repoId récupéré
                    ref: 'main', // Branche que vous voulez déployer
                },
            }),
        });

        const deployData = await deployResponse.json();
        console.log('Réponse de déploiement:', deployData);

        if (deployResponse.ok) {
            console.log('Déploiement réussi:', deployData.url);
            return res.status(200).json({ previewUrl: deployData.url });
        } else {
            console.error('Erreur lors du déploiement:', deployData);
            return res.status(500).json({ error: deployData.error.message });
        }
    } catch (error) {
        console.error('Erreur côté serveur:', error);
        res.status(500).json({ error: 'Erreur Interne du Serveur' });
    }
});



module.exports = app;  // Ajoutez cette ligne à la fin de votre fichier `deploy.js`

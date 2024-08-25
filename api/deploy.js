const express = require('express');
const fetch = require('node-fetch');

const app = express();
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

app.use(express.json());

app.post('/api/deploy', async (req, res) => {
    try {
        let { repoName } = req.body;
        repoName = repoName.toLowerCase();

        console.log(`Début du déploiement pour le repo: ${repoName}`);

        // Étape 1 : Vérifier si le projet existe déjà
        let projectId = null;
        const existingProjectResponse = await fetch(`https://api.vercel.com/v9/projects/${repoName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (existingProjectResponse.ok) {
            const existingProjectData = await existingProjectResponse.json();
            projectId = existingProjectData.id;
            console.log(`Projet existant trouvé: ${repoName} (ID: ${projectId})`);
        } else if (existingProjectResponse.status === 404) {
            // Étape 2 : Créer un nouveau projet si celui-ci n'existe pas
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

            projectId = projectData.id;
        } else {
            // Gérer d'autres erreurs possibles
            const errorData = await existingProjectResponse.json();
            console.error('Erreur lors de la vérification du projet:', errorData);
            return res.status(500).json({ error: errorData.error.message });
        }

        // Étape 3 : Déployer le projet (nouveau ou existant)
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
                    ref: 'main', 
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

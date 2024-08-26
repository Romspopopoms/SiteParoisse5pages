const fetch = require('node-fetch');

const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { repoName } = req.body;
        const uniqueProjectName = `${repoName}-${Date.now()}`; // Remplacement des underscores par des tirets
        const domain = `${uniqueProjectName}.vercel.app`.replace(/_/g, '-'); // Remplacer les underscores par des tirets

        console.log(`Début du déploiement pour le repo: ${repoName} avec le projet: ${uniqueProjectName}`);

        // Étape 1 : Créer un nouveau projet sur Vercel
        const projectResponse = await fetch('https://api.vercel.com/v9/projects', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: uniqueProjectName,
                gitRepository: {
                    type: 'github',
                    repo: `Romspopopoms/${repoName}`,  // Utilisez le nom d'utilisateur et le repo
                },
            }),
        });

        const projectData = await projectResponse.json();
        console.log('Réponse complète de la création de projet:', projectData);

        if (!projectResponse.ok) {
            console.log('Erreur lors de la création du projet:', projectData);
            return res.status(500).json({ error: projectData.error.message });
        }

        const projectId = projectData.id; // Récupérer l'ID du projet
        const repoId = projectData?.link?.repoId; // Assurez-vous que `repoId` existe

        if (!repoId) {
            return res.status(500).json({ error: 'RepoId is missing from project creation response' });
        }

        // Étape 2 : Ajouter un domaine de production au projet
        const domainResponse = await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: domain,
            }),
        });

        const domainData = await domainResponse.json();
        console.log('Réponse d\'ajout de domaine:', domainData);

        if (!domainResponse.ok) {
            console.log('Erreur lors de l\'ajout du domaine:', domainData);
            return res.status(500).json({ error: domainData.error.message });
        }

        // Étape 3 : Déployer le projet nouvellement créé
        const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: uniqueProjectName,
                gitSource: {
                    type: 'github',
                    repoId: repoId,
                    ref: 'main', // Branche que vous voulez déployer
                },
            }),
        });

        const deployData = await deployResponse.json();
        console.log('Réponse de déploiement:', deployData);

        if (deployResponse.ok) {
            return res.status(200).json({ previewUrl: deployData.url });
        } else {
            console.log('Erreur lors du déploiement:', deployData);
            return res.status(500).json({ error: deployData.error.message });
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

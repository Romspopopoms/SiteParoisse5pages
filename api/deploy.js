app.post('/api/deploy', async (req, res) => {
    try {
        const { repoName } = req.body;
        const uniqueProjectName = `${repoName}_${Date.now()}`;

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

        if (!projectResponse.ok) {
            if (projectData.error && projectData.error.code === 'repo_links_exceeded_limit') {
                return res.status(400).json({ error: 'Ce dépôt GitHub est déjà connecté à 3 projets Vercel. Veuillez en supprimer un ou créer un nouveau dépôt.' });
            }

            console.log('Erreur lors de la création du projet:', projectData);
            return res.status(500).json({ error: projectData.error.message });
        }

        const repoId = projectData.link.repoId; // Récupérez le repoId du projet créé

        console.log('Réponse de création de projet:', projectData);

        // Étape 2 : Déployer le projet nouvellement créé sans la propriété `projectId`
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
                    repoId: repoId, // Utilisez le repoId ici
                    ref: 'main', // Branche que vous voulez déployer
                },
            }),
        });

        const deployData = await deployResponse.json();

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
});

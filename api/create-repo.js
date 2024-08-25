const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios');

// Remplacez par votre token d'accès personnel GitHub
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_ORG = process.env.GITHUB_TOKEN; // Remplacez par votre organisation GitHub (ou votre nom d'utilisateur pour les dépôts personnels)

/**
 * Copie récursivement un répertoire d'un endroit à un autre.
 * @param {String} src - Chemin du répertoire source.
 * @param {String} dest - Chemin du répertoire de destination.
 */
function copyDirectory(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    fs.mkdirSync(dest, { recursive: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

/**
 * Remplace les placeholders dans un fichier donné par les valeurs du formData.
 * @param {String} filePath - Chemin du fichier où les placeholders doivent être remplacés.
 * @param {Object} formData - Données du formulaire avec les valeurs à injecter.
 */
function replacePlaceholdersInFile(filePath, formData) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Remplacer les placeholders par les données du formData
    content = content.replace(/{{navbar.logoSrc}}/g, formData.navbar.logoSrc);
    content = content.replace(/{{navbar.link1}}/g, formData.navbar.links[0].name);
    content = content.replace(/{{navbar.link2}}/g, formData.navbar.links[1].name);
    content = content.replace(/{{navbar.link3}}/g, formData.navbar.links[2].name);
    content = content.replace(/{{navbar.link4}}/g, formData.navbar.links[3].name);
    content = content.replace(/{{navbar.link5}}/g, formData.navbar.links[4].name);
    content = content.replace(/{{navbar.link6}}/g, formData.navbar.links[5].name);

    content = content.replace(/{{section1.title}}/g, formData.section1.title);
    content = content.replace(/{{section1.backgroundImageSrc}}/g, formData.section1.backgroundImageSrc || 'default_image_path');
    content = content.replace(/{{section1.button1}}/g, formData.section1.button1);
    content = content.replace(/{{section1.button2}}/g, formData.section1.button2);

    content = content.replace(/{{section2.title}}/g, formData.section2.title);
    content = content.replace(/{{section2.text1}}/g, formData.section2.text1);
    content = content.replace(/{{section2.text2}}/g, formData.section2.text2);
    content = content.replace(/{{section2.text3}}/g, formData.section2.text3);

    content = content.replace(/{{section3.title}}/g, formData.section3.title);
    content = content.replace(/{{section3.description}}/g, formData.section3.description);
    content = content.replace(/{{section3.backgroundImageSrc}}/g, formData.section3.backgroundImageSrc || 'default_image_path');

    content = content.replace(/{{section4.title}}/g, formData.section4.title);
    content = content.replace(/{{section4.button1}}/g, formData.section4.button1);
    content = content.replace(/{{section4.button2}}/g, formData.section4.button2);
    content = content.replace(/{{section4.button3}}/g, formData.section4.button3);

    content = content.replace(/{{section5.title}}/g, formData.section5.title);
    content = content.replace(/{{section5.description}}/g, formData.section5.description);
    content = content.replace(/{{section5.backgroundImageSrc}}/g, formData.section5.backgroundImageSrc || 'default_image_path');

    content = content.replace(/{{section6.title}}/g, formData.section6.title);
    formData.section6.images.forEach((image, index) => {
        content = content.replace(new RegExp(`{{section6.image${index + 1}Title}}`, 'g'), image.name);
        content = content.replace(new RegExp(`{{section6.image${index + 1}Src}}`, 'g'), image.imageSrc || 'default_image_path');
    });

    content = content.replace(/{{footer.logoSrc}}/g, formData.footer.logoSrc || 'default_logo_path');
    content = content.replace(/{{footer.address}}/g, formData.footer.address);
    content = content.replace(/{{footer.facebook}}/g, formData.footer.socialLinks.facebook);
    content = content.replace(/{{footer.instagram}}/g, formData.footer.socialLinks.instagram);
    content = content.replace(/{{footer.youtube}}/g, formData.footer.socialLinks.youtube);

    fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Remplace les placeholders dans tous les fichiers d'un répertoire donné.
 * @param {String} dir - Le répertoire dans lequel remplacer les placeholders.
 * @param {Object} formData - Les données du formulaire.
 */
function replacePlaceholders(dir, formData) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            replacePlaceholders(filePath, formData);
        } else {
            replacePlaceholdersInFile(filePath, formData);
        }
    });
}

/**
 * Crée un nouveau dépôt GitHub via l'API GitHub.
 * @param {String} repoName - Le nom du dépôt à créer.
 * @returns {Promise<String>} - L'URL du dépôt GitHub.
 */
async function createGitHubRepo(repoName) {
    const response = await axios.post(
        `https://api.github.com/orgs/${GITHUB_ORG}/repos`,
        {
            name: repoName,
            private: true, // Vous pouvez choisir de le rendre public
        },
        {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        }
    );

    return response.data.clone_url;
}

/**
 * Configure un dépôt Git dans le répertoire spécifié et le pousse vers GitHub.
 * @param {String} repoDir - Le répertoire du projet.
 * @param {String} repoUrl - L'URL du dépôt GitHub.
 */
function setupGitRepository(repoDir, repoUrl) {
    // Initialiser le dépôt Git
    execSync('git init', { cwd: repoDir });
    execSync('git add .', { cwd: repoDir });
    execSync('git commit -m "Initial commit from template"', { cwd: repoDir });
    execSync(`git remote add origin ${repoUrl}`, { cwd: repoDir });
    execSync('git push -u origin main', { cwd: repoDir });
}

/**
 * Injecte les données du formulaire dans un template, puis configure un dépôt Git.
 * @param {Object} formData - Les données du formulaire à injecter dans le template.
 * @param {String} templateDir - Le répertoire contenant le template.
 * @param {String} outputDir - Le répertoire de sortie pour le projet généré.
 * @returns {Promise<String>} - L'URL du dépôt GitHub.
 */
async function injectTemplateAndSetupRepo(formData, templateDir, outputDir) {
    // Copier le template dans le répertoire de sortie
    copyDirectory(templateDir, outputDir);

    // Remplacer les placeholders dans les fichiers copiés
    replacePlaceholders(outputDir, formData);

    // Créer un nouveau dépôt GitHub
    const repoName = `repo_${Date.now()}`;
    const repoUrl = await createGitHubRepo(repoName);

    // Configurer le dépôt Git local et le pousser vers GitHub
    setupGitRepository(outputDir, repoUrl);

    return repoUrl;
}

// Handler pour l'API
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { template_data } = req.body;
        const templateDir = path.join(process.cwd(), 'templates', 'TemplateParoisse1'); // Dossier du template
        const outputDir = path.join(process.cwd(), 'output', `repo_${Date.now()}`); // Dossier de sortie unique pour le repo

        try {
            // Injecter les données dans le template et créer le dépôt GitHub
            const repoUrl = await injectTemplateAndSetupRepo(template_data, templateDir, outputDir);
            // Retourner l'URL du dépôt créé au frontend
            res.status(200).json({ repo_url: repoUrl });
        } catch (error) {
            console.error('Error creating repo:', error);
            res.status(500).json({ error: 'Failed to create repository' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const fetch = require('node-fetch');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_ORG = process.env.GITHUB_ORG;

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

async function createGitHubRepo(repoName) {
    const response = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: repoName,
            private: true,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`GitHub API Error: ${data.message}`);
    }

    return data.clone_url;
}

function setupGitRepository(repoDir, repoUrl) {
    execSync('git init', { cwd: repoDir });
    execSync('git add .', { cwd: repoDir });
    execSync('git commit -m "Initial commit from template"', { cwd: repoDir });
    execSync(`git remote add origin ${repoUrl}`, { cwd: repoDir });
    execSync('git push -u origin main', { cwd: repoDir });
}

async function injectTemplateAndSetupRepo(formData, templateDir, outputDir) {
    // Créer le répertoire de sortie s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    copyDirectory(templateDir, outputDir);
    replacePlaceholders(outputDir, formData);

    const repoName = `repo_${Date.now()}`;
    const repoUrl = await createGitHubRepo(repoName);

    setupGitRepository(outputDir, repoUrl);

    return repoUrl;
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { template_data } = req.body;
        const templateDir = path.join(__dirname, '..', 'src', 'components', 'TemplateParoisse1');
        const outputDir = path.join('/tmp', `repo_${Date.now()}`);
        console.log('Template directory path:', templateDir);
        console.log('Output directory path:', outputDir);

        try {
            const repoUrl = await injectTemplateAndSetupRepo(template_data, templateDir, outputDir);
            res.status(200).json({ repo_url: repoUrl });
        } catch (error) {
            console.error('Error creating repo:', error);
            res.status(500).json({ error: 'Failed to create repository' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}


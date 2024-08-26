const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const GITHUB_TOKEN = process.env.MY_GITHUB_TOKEN;
const GITHUB_USER = process.env.MY_GITHUB_ORG; // Le nom d'utilisateur GitHub

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
    const apiUrl = `https://api.github.com/user/repos`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: repoName,
            private: true,
            auto_init: true,
        }),
    });

    console.log('GITHUB_TOKEN:', GITHUB_TOKEN ? 'Token exists' : 'Token missing');

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`GitHub API Error: ${data.message}`);
    }

    return data.clone_url;
}

async function createGitHubBlob(repoName, filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${repoName}/git/blobs`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: Buffer.from(content).toString('base64'),
            encoding: 'base64',
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('GitHub API response:', data);
        throw new Error(`GitHub API Error: ${data.message}`);
    }

    return data.sha;
}

async function createGitHubTree(repoName, tree) {
    const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${repoName}/git/trees`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tree: tree,
            base_tree: null,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`GitHub API Error: ${data.message}`);
    }

    return data.sha;
}

async function createGitHubCommit(repoName, treeSha) {
    const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${repoName}/git/commits`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Initial commit from template',
            tree: treeSha,
            parents: [],
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(`GitHub API Error: ${data.message}`);
    }

    return data.sha;
}

async function updateGitHubBranch(repoName, commitSha) {
    const branchRefUrl = `https://api.github.com/repos/${GITHUB_USER}/${repoName}/git/refs/heads/main`;

    // Vérifier si la branche 'main' existe
    const branchResponse = await fetch(branchRefUrl, {
        method: 'GET',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (branchResponse.status === 404) {
        // Si la branche n'existe pas, la créer
        const createBranchResponse = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repoName}/git/refs`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ref: 'refs/heads/main',
                sha: commitSha,
            }),
        });

        if (!createBranchResponse.ok) {
            const data = await createBranchResponse.json();
            throw new Error(`GitHub API Error: ${data.message}`);
        }
    } else if (branchResponse.ok) {
        // Mise à jour de la branche 'main' avec le nouveau commit
        const updateBranchResponse = await fetch(branchRefUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sha: commitSha,
                force: true, // Forcer la mise à jour
            }),
        });

        if (!updateBranchResponse.ok) {
            const data = await updateBranchResponse.json();
            throw new Error(`GitHub API Error: ${data.message}`);
        }
    } else {
        const data = await branchResponse.json();
        throw new Error(`GitHub API Error: ${data.message}`);
    }
}


async function injectTemplateAndSetupRepo(formData, templateDir, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Copier tous les fichiers du répertoire templateDir vers outputDir
    copyDirectory(templateDir, outputDir);
    replacePlaceholders(outputDir, formData);

    const repoName = `repo_${Date.now()}`;
    const repoUrl = await createGitHubRepo(repoName);
    const fileTree = [];

    const files = fs.readdirSync(outputDir);
    for (const file of files) {
        const filePath = path.join(outputDir, file);
        const blobSha = await createGitHubBlob(repoName, filePath);

        fileTree.push({
            path: file,
            mode: '100644',
            type: 'blob',
            sha: blobSha,
        });
    }

    const treeSha = await createGitHubTree(repoName, fileTree);
    const commitSha = await createGitHubCommit(repoName, treeSha);

    await updateGitHubBranch(repoName, commitSha);

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
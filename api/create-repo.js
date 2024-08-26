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

function saveUploadedImages(formData, outputDir) {
    const assetsDir = path.join(outputDir, 'src', 'assets');
    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    const sections = ['navbar', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'footer'];

    sections.forEach(section => {
        const sectionData = formData[section];
        if (sectionData) {
            Object.keys(sectionData).forEach(key => {
                if (sectionData[key] && typeof sectionData[key] === 'object' && sectionData[key].image) {
                    const imageBuffer = Buffer.from(sectionData[key].image, 'base64');
                    const imageName = `${section}_${key}.png`; // Par exemple: section1_backgroundImage.png
                    const imagePath = path.join(assetsDir, imageName);
                    fs.writeFileSync(imagePath, imageBuffer);
                    sectionData[key].imageSrc = path.relative(outputDir, imagePath);
                }
            });
        }
    });
}

function replacePlaceholdersInFile(filePath, formData) {
    let content = fs.readFileSync(filePath, 'utf-8');

    const navbar = formData.navbar || {};
    const section1 = formData.section1 || {};
    const section2 = formData.section2 || {};
    const section3 = formData.section3 || {};
    const section4 = formData.section4 || {};
    const section5 = formData.section5 || {};
    const section6 = formData.section6 || {};
    const footer = formData.footer || {};

    content = content.replace(/{{navbar.logoSrc}}/g, navbar.logoSrc || 'default_logo_path');
    content = content.replace(/{{navbar.link1}}/g, navbar.links?.[0]?.name || 'default_link1');
    content = content.replace(/{{navbar.link2}}/g, navbar.links?.[1]?.name || 'default_link2');
    content = content.replace(/{{navbar.link3}}/g, navbar.links?.[2]?.name || 'default_link3');
    content = content.replace(/{{navbar.link4}}/g, navbar.links?.[3]?.name || 'default_link4');
    content = content.replace(/{{navbar.link5}}/g, navbar.links?.[4]?.name || 'default_link5');
    content = content.replace(/{{navbar.link6}}/g, navbar.links?.[5]?.name || 'default_link6');

    content = content.replace(/{{section1.title}}/g, section1.title || 'default_section1_title');
    content = content.replace(/{{section1.backgroundImageSrc}}/g, section1.backgroundImageSrc || 'default_image_path');
    content = content.replace(/{{section1.button1}}/g, section1.button1 || 'default_button1');
    content = content.replace(/{{section1.button2}}/g, section1.button2 || 'default_button2');

    content = content.replace(/{{section2.title}}/g, section2.title || 'default_section2_title');
    content = content.replace(/{{section2.text1}}/g, section2.text1 || 'default_text1');
    content = content.replace(/{{section2.text2}}/g, section2.text2 || 'default_text2');
    content = content.replace(/{{section2.text3}}/g, section2.text3 || 'default_text3');

    content = content.replace(/{{section3.title}}/g, section3.title || 'default_section3_title');
    content = content.replace(/{{section3.description}}/g, section3.description || 'default_description');
    content = content.replace(/{{section3.backgroundImageSrc}}/g, section3.backgroundImageSrc || 'default_image_path');

    content = content.replace(/{{section4.title}}/g, section4.title || 'default_section4_title');
    content = content.replace(/{{section4.button1}}/g, section4.button1 || 'default_button1');
    content = content.replace(/{{section4.button2}}/g, section4.button2 || 'default_button2');
    content = content.replace(/{{section4.button3}}/g, section4.button3 || 'default_button3');

    content = content.replace(/{{section5.title}}/g, section5.title || 'default_section5_title');
    content = content.replace(/{{section5.description}}/g, section5.description || 'default_description');
    content = content.replace(/{{section5.backgroundImageSrc}}/g, section5.backgroundImageSrc || 'default_image_path');

    content = content.replace(/{{section6.title}}/g, section6.title || 'default_section6_title');
    section6.images?.forEach((image, index) => {
        content = content.replace(new RegExp(`{{section6.image${index + 1}Title}}`, 'g'), image.name || `default_image${index + 1}_title`);
        content = content.replace(new RegExp(`{{section6.image${index + 1}Src}}`, 'g'), image.imageSrc || 'default_image_path');
    });

    content = content.replace(/{{footer.logoSrc}}/g, footer.logoSrc || 'default_logo_path');
    content = content.replace(/{{footer.address}}/g, footer.address || 'default_address');
    content = content.replace(/{{footer.facebook}}/g, footer.socialLinks?.facebook || 'default_facebook');
    content = content.replace(/{{footer.instagram}}/g, footer.socialLinks?.instagram || 'default_instagram');
    content = content.replace(/{{footer.youtube}}/g, footer.socialLinks?.youtube || 'default_youtube');

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

async function processDirectory(repoName, dir, baseDir = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const fileTree = [];

    for (let entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.join(baseDir, entry.name);

        if (entry.isDirectory()) {
            const subTree = await processDirectory(repoName, fullPath, relativePath);
            fileTree.push(...subTree);
        } else {
            const blobSha = await createGitHubBlob(repoName, fullPath);

            fileTree.push({
                path: relativePath,
                mode: '100644',
                type: 'blob',
                sha: blobSha,
            });
        }
    }

    return fileTree;
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

    const branchResponse = await fetch(branchRefUrl, {
        method: 'GET',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

    if (branchResponse.status === 404) {
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
        const updateBranchResponse = await fetch(branchRefUrl, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sha: commitSha,
                force: true,
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

    copyDirectory(templateDir, outputDir);

    saveUploadedImages(formData, outputDir);
    
    replacePlaceholders(outputDir, formData);

    const repoName = `repo_${Date.now()}`;
    const repoUrl = await createGitHubRepo(repoName);

    const fileTree = await processDirectory(repoName, outputDir);

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

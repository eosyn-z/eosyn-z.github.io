const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const CONFIG = {
    contentFolders: [
        { name: 'Projects', path: 'content/projects' },
        { name: 'Thoughts', path: 'content/thoughts' },
        { name: 'Learning', path: 'content/learning' },
        { name: 'Resources', path: 'content/resources' },
        { name: 'Archive', path: 'content/archive', recursive: true }
    ],
    outputFile: 'data/manifest.json'
};
async function build() {
    console.log('🔨 Building manifest...');
    const manifest = {
        pages: [],
        citationIndex: {
            byType: {},
            byPage: {},
            stats: {}
        },
        knowledgeGraph: {
            nodes: [],
            links: [],
            backlinks: {}
        },
        buildTime: new Date().toISOString()
    };
    for (const folder of CONFIG.contentFolders) {
        console.log(`📂 Processing ${folder.name}...`);
        await processFolder(folder, manifest);
    }
    buildKnowledgeGraph(manifest);
    await fs.writeFile(
        CONFIG.outputFile,
        JSON.stringify(manifest, null, 2),
        'utf-8'
    );
    console.log('✅ Manifest build complete!');
    console.log(`   Pages: ${manifest.pages.length}`);
    console.log(`   Citations: ${Object.values(manifest.citationIndex.stats).reduce((a, b) => a + b, 0)}`);
    console.log(`   Links: ${manifest.knowledgeGraph.links.length}`);
    await buildGallery();
    await buildSites();
}
async function buildGallery() {
    console.log('\n  Building gallery...');

    // First, get nature images from settings.txt (legacy support)
    const settingsContent = await fs.readFile('config/settings.txt', 'utf-8');
    const natureImages = [];
    const lines = settingsContent.split('\n');
    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('NATURE_IMAGE=')) {
            const data = line.substring('NATURE_IMAGE='.length);
            const parts = data.split('|').map(s => s.trim());
            if (parts.length === 6) {
                const [url, group, vibe, weather, time, credit] = parts;
                natureImages.push({
                    filename: url,
                    tags: [group, vibe, weather, time].filter(t => t && t !== 'null'),
                    group: group === 'null' ? null : group,
                    vibe: vibe === 'null' ? null : vibe,
                    weather: weather === 'null' ? null : weather,
                    time: time === 'null' ? null : time,
                    credit: credit === 'null' ? null : credit,
                    source: 'settings'
                });
            }
        }
    });

    // Check for nature images in content/nature folder
    const naturePath = path.join(__dirname, '..', '..', '..', 'content', 'nature');
    try {
        const files = await fs.readdir(naturePath);
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (imageExtensions.includes(ext)) {
                const nameWithoutExt = path.basename(file, ext);

                // Parse filename for metadata (similar to art)
                let title = nameWithoutExt.replace(/[-_]/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());

                natureImages.push({
                    filename: file,
                    title: title,
                    tags: ['nature'],
                    source: 'folder'
                });
            }
        }
    } catch (error) {
        console.log('   Creating content/nature/ folder...');
        await fs.mkdir(naturePath, { recursive: true });
    }
    const artPath = path.join(__dirname, '..', '..', '..', 'content', 'art');
    const artImages = [];
    try {
        const files = await fs.readdir(artPath);
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (imageExtensions.includes(ext)) {
                const nameWithoutExt = path.basename(file, ext);

                // Parse format: [NSFW__]Title_Title_Title__MM_DD_YY or Title_Title_Title__MM_DD_YYYY
                let title, date, formattedDate;
                let isNSFW = false;

                // Check for NSFW prefix
                let workingName = nameWithoutExt;
                if (workingName.startsWith('NSFW__')) {
                    isNSFW = true;
                    workingName = workingName.substring(6); // Remove "NSFW__" prefix
                }

                if (workingName.includes('__')) {
                    // Split by double underscore to separate title from date
                    const [titlePart, datePart] = workingName.split('__');

                    // Parse title: replace underscores with spaces
                    title = titlePart.replace(/_/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase());

                    // Parse date: MM_DD_YY or MM_DD_YYYY
                    if (datePart) {
                        const dateParts = datePart.split('_');
                        if (dateParts.length === 3) {
                            const [month, day, year] = dateParts;
                            // Handle 2-digit or 4-digit year
                            const fullYear = year.length === 2 ? `20${year}` : year;
                            date = new Date(`${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);

                            // Format date nicely
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            formattedDate = `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${fullYear}`;
                        }
                    }
                } else {
                    // Fallback to old format for files without date
                    title = workingName.replace(/[-_]/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase());
                }

                artImages.push({
                    filename: file,
                    title: title || 'Untitled',
                    date: date ? date.toISOString() : null,
                    dateFormatted: formattedDate || null,
                    tags: isNSFW ? ['art', 'nsfw'] : ['art'],
                    category: 'misc',
                    description: formattedDate ? `Created ${formattedDate}` : null,
                    nsfw: isNSFW
                });
            }
        }
    } catch (error) {
        console.log('   Creating content/art/ folder...');
        await fs.mkdir(artPath, { recursive: true });
    }

    // Sort art images by date (newest first)
    artImages.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
        }
        if (a.date) return -1; // Items with dates come first
        if (b.date) return 1;
        return 0; // Keep original order for items without dates
    });

    const imagesData = {
        nature: natureImages,
        art: artImages
    };
    await fs.writeFile(
        path.join('gallery', 'images.json'),
        JSON.stringify(imagesData, null, 2),
        'utf-8'
    );
    console.log('✅ Gallery build complete!');
    console.log(`   Nature images: ${natureImages.length}`);
    console.log(`   Art images: ${artImages.length}`);
}
async function processFolder(folder, manifest, subPath = '') {
    try {
        const currentPath = subPath ? path.join(folder.path, subPath) : folder.path;
        const files = await fs.readdir(currentPath, { withFileTypes: true });
        for (const file of files) {
            const relativePath = subPath ? path.join(subPath, file.name) : file.name;
            if (file.isDirectory() && folder.recursive) {

                await processFolder(folder, manifest, relativePath);
            } else if (file.isFile() && (file.name.endsWith('.md') || file.name.endsWith('.markdown'))) {

                await processMarkdownFile(folder, relativePath, manifest, subPath);
            }
        }
    } catch (error) {
        console.error(`Error processing folder ${folder.name}:`, error.message);
    }
}
async function processMarkdownFile(folder, filename, manifest, subPath = '') {
    const filePath = path.join(folder.path, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    const { frontmatter, bodyContent } = parseFrontmatter(content);
    const slug = filename.replace(/\.(md|markdown)$/, '').toLowerCase().replace(/\\/g, '/');
    const sectionName = folder.name.toLowerCase();
    const pageId = `${sectionName}/${slug}`;
    let title = frontmatter.title || extractTitle(bodyContent);
    if (!title) {

        const cleanName = path.basename(filename, path.extname(filename))
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
        if (subPath) {

            const folderName = path.dirname(filename).replace(/\\/g, '/').split('/').pop();
            title = `${folderName}/${cleanName}`;
        } else {
            title = cleanName;
        }
    }
    const excerpt = frontmatter.excerpt || extractExcerpt(bodyContent);
    const wikiLinks = extractWikiLinks(bodyContent);
    const page = {
        id: pageId,
        section: sectionName,
        slug: slug,
        title: title,
        excerpt: excerpt,
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        tags: frontmatter.tags || [],
        sources: frontmatter.sources || [],
        wikiLinks: wikiLinks,
        filename: filename,
        path: `${folder.path}/${filename}`.replace(/\\/g, '/')
    };
    manifest.pages.push(page);
    if (page.sources && page.sources.length > 0) {
        processCitations(page, manifest);
    }
}
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    if (!match) {
        return {
            frontmatter: {},
            bodyContent: content
        };
    }
    try {
        const frontmatter = yaml.load(match[1]);
        const bodyContent = match[2];
        return { frontmatter, bodyContent };
    } catch (error) {
        console.error('Error parsing frontmatter:', error.message);
        return {
            frontmatter: {},
            bodyContent: content
        };
    }
}
function extractTitle(content) {
    const lines = content.split('\n');
    for (const line of lines) {
        if (line.startsWith('# ')) {
            return line.substring(2).trim();
        }
    }
    return null;
}
function extractExcerpt(content) {
    const cleanContent = content
        .replace(/^#+\s*/gm, '')
        .replace(/^\*\*.*?\*\*$/gm, '')
        .replace(/^-\s*/gm, '')
        .replace(/\[\[([^\]]+)\]\]/g, '$1')
        .replace(/\n+/g, ' ')
        .trim();
    return cleanContent.substring(0, 150) +
           (cleanContent.length > 150 ? '...' : '');
}
function extractWikiLinks(content) {
    const links = [];
    const regex = /\[\[([^\]]+)\]\]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const linkText = match[1].trim();
        const parts = linkText.split('|');
        const target = parts[0].trim();
        const display = parts[1] ? parts[1].trim() : target;
        links.push({ target, display });
    }
    return links;
}
function processCitations(page, manifest) {
    const pageId = page.id;
    manifest.citationIndex.byPage[pageId] = page.sources;
    page.sources.forEach(source => {
        const type = source.type || 'unknown';
        if (!manifest.citationIndex.byType[type]) {
            manifest.citationIndex.byType[type] = {};
        }
        const sourceId = extractSourceId(source.url, type);
        if (!manifest.citationIndex.byType[type][sourceId]) {
            manifest.citationIndex.byType[type][sourceId] = {
                url: source.url,
                title: source.title,
                pages: []
            };
        }
        if (!manifest.citationIndex.byType[type][sourceId].pages.includes(pageId)) {
            manifest.citationIndex.byType[type][sourceId].pages.push(pageId);
        }
        manifest.citationIndex.stats[type] = (manifest.citationIndex.stats[type] || 0) + 1;
    });
}
function extractSourceId(url, type) {
    try {
        switch (type) {
            case 'arxiv':
                const arxivMatch = url.match(/arxiv\.org\/abs\/(.+?)(?:[?#]|$)/);
                return arxivMatch ? arxivMatch[1] : url;
            case 'pubmed':
                const pubmedMatch = url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
                return pubmedMatch ? pubmedMatch[1] : url;
            case 'nlab':
                const nlabMatch = url.match(/ncatlab\.org\/nlab\/show\/(.+?)(?:[?#]|$)/);
                return nlabMatch ? decodeURIComponent(nlabMatch[1]) : url;
            case 'doi':
                const doiMatch = url.match(/doi\.org\/(.+?)(?:[?#]|$)/);
                return doiMatch ? doiMatch[1] : url;
            default:
                return url;
        }
    } catch (e) {
        return url;
    }
}
function buildKnowledgeGraph(manifest) {

    const titleToPage = {};
    manifest.pages.forEach(page => {
        titleToPage[page.title.toLowerCase()] = page;
    });
    manifest.pages.forEach(page => {

        manifest.knowledgeGraph.nodes.push({
            id: page.id,
            title: page.title,
            section: page.section,
            slug: page.slug,
            excerpt: page.excerpt
        });
        manifest.knowledgeGraph.backlinks[page.id] = [];
        page.wikiLinks.forEach(link => {
            const targetPage = titleToPage[link.target.toLowerCase()];
            if (targetPage) {

                manifest.knowledgeGraph.links.push({
                    source: page.id,
                    target: targetPage.id,
                    type: 'wiki-link'
                });
                if (!manifest.knowledgeGraph.backlinks[targetPage.id]) {
                    manifest.knowledgeGraph.backlinks[targetPage.id] = [];
                }
                manifest.knowledgeGraph.backlinks[targetPage.id].push({
                    sourceId: page.id,
                    sourceTitle: page.title,
                    sourceSection: page.section,
                    sourceSlug: page.slug
                });
            }
        });
    });
}
async function buildSites() {
    console.log('\n Building recommended sites...');
    try {
        const sitesContent = await fs.readFile('config/sites.txt', 'utf-8');
        const sites = [];
        const lines = sitesContent.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('SITE=')) {
                const data = line.substring('SITE='.length);
                const parts = data.split('|').map(s => s.trim());
                if (parts.length >= 4) {
                    const [title, url, description, tagsString] = parts;
                    const tags = tagsString.split(',').map(t => t.trim()).filter(t => t);
                    sites.push({
                        title,
                        url,
                        description,
                        tags
                    });
                }
            }
        });
        const sitesData = {
            version: '1.0',
            lastUpdated: new Date().toISOString().split('T')[0],
            sites: sites
        };
        await fs.writeFile(
            'data/sites.json',
            JSON.stringify(sitesData, null, 2),
            'utf-8'
        );
        console.log('✅ Sites build complete!');
        console.log(`   Recommended sites: ${sites.length}`);
    } catch (error) {
        console.log('⚠️  No sites.txt found, skipping recommended sites');
    }
}
build().catch(error => {
    console.error('❌ Build failed:', error);
    process.exit(1);
});
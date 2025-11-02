function getKnowledgeGraph() {
    if (!manifest) return { nodes: [], links: [], backlinks: {} };
    return manifest.knowledgeGraph;
}
function getBacklinksForPage(sectionName, slug) {
    if (!manifest) return [];
    const pageId = `${sectionName}/${slug}`;
    return manifest.knowledgeGraph.backlinks[pageId] || [];
}
function getCitationsForPage(sectionName, slug) {
    if (!manifest) return [];
    const pageId = `${sectionName}/${slug}`;
    return manifest.citationIndex.byPage[pageId] || [];
}
function getCitationStats() {
    if (!manifest) return {};
    return manifest.citationIndex.stats;
}
function getPagesCitingSource(type, sourceId) {
    if (!manifest ||!manifest.citationIndex.byType[type] ||
        !manifest.citationIndex.byType[type][sourceId]) {
        return [];
    }
    return manifest.citationIndex.byType[type][sourceId].pages;
}
function renderWikiLinks(content) {
    if (!manifest) return content;
    const titleToPage = {};
    manifest.pages.forEach(page => {
        titleToPage[page.title.toLowerCase()] = {
            section: page.section,
            slug: page.slug
        };
    });
    return content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
        const parts = linkText.split('|');
        const targetTitle = parts[0].trim();
        const displayText = parts[1] ? parts[1].trim() : targetTitle;
        const targetPage = titleToPage[targetTitle.toLowerCase()];
        if (targetPage) {
            return `<a href="#${targetPage.section}/${targetPage.slug}" class="wiki-link" onclick="showPage('${targetPage.section}', '${targetPage.slug}'); return false;">${displayText}</a>`;
        } else {

            return `<span class="wiki-link-broken" title="Page not found">${displayText}</span>`;
        }
    });
}
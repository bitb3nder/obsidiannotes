// Global Variables
const tp = app.plugins.getPlugin("templater-obsidian").templater.current_functions_object;

//Support Functions
async function setSummary(tp, initSummary) {
    let summary = await tp.system.prompt("Summary (cannot be blank):", initSummary);
    if (summary === null) { summary = initSummary};
	return summary;
}

/*
 * This script will update the summary metadata of a note
 */
module.exports = async function updateSummary(params) {
    const activeFile = params.app.workspace.getActiveFile();
    if (!activeFile) {
        console.error("No active file found.");
        return;
    }
    
    const activeFileContent = await params.app.vault.read(activeFile);
    const summaryRegex = /^summary:\s*(.*)/m;
    const match = activeFileContent.match(summaryRegex);

    if (match) {
        const currentSummary = match[1].trim();
        const newSummary = await setSummary(tp, currentSummary);
        const updatedContent = activeFileContent.replace(summaryRegex, `summary: ${newSummary}`);
        await params.app.vault.modify(activeFile, updatedContent);
    } else {
        const newSummary = await setSummary(tp, "This is a new Summary field entry!");
        const updatedContent = activeFileContent.replace(
            /^---/,
            `---\nsummary: ${newSummary}`
        );
        await params.app.vault.modify(activeFile, updatedContent);
    }
};
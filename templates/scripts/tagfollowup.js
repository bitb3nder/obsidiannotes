// Global Variables
const tp = app.plugins.getPlugin("templater-obsidian").templater.current_functions_object;

/*
 * This script will tag the note for follow up and add the note as a metadata property. 
 * It will also need a helper function (remove) that when run will clear this shit from metadata.
 */
module.exports = async function tagFollowUp(params) {
    const activeFile = params.app.workspace.getActiveFile();
    if (!activeFile) {
        console.error("No active file found.");
        return;
    }
    
    const tagsRegex = /^tags:(.*(?:\n(?!^\w+:).*)*)/m;
    const activeFileContent = await params.app.vault.read(activeFile);

    const tagsMatch = activeFileContent.match(tagsRegex);

    if (tagsMatch) {
        const tagsValue = tagsMatch[1].trim();

        if (tagsValue.includes("followup")) {
            const choice = await tp.system.suggester(["✍️ Edit Existing Tag", "🚮 Remove Existing Tag"], ["Edit Tag", "Remove Tag"], true);
            if (choice === "Remove Tag") {
                // User chose to remove the tag
                const updatedTags = tagsValue.split('\n').filter(tag => tag.trim() !== "followup" && tag.trim() !== "- followup").join('\n');
                const updatedContent = activeFileContent.replace(tagsRegex, `tags: \n  ${updatedTags}`).replace(/^followupnote:(.*(?:\n(?!^\w+:).*)*)/m, '').replace(/^---\n\n/, '---\n');               
                await params.app.vault.modify(activeFile, updatedContent);
            } else if (choice === "Edit Tag") {
                // User chose to edit the tag
                const followupnoteRegex = /^followupnote:(.*(?:\n(?!^\w+:).*)*)/m;
                const match = activeFileContent.match(followupnoteRegex);
                const existingFollowUpNote = match ? match[1].trim() : null;

                let newFollowUpNote = await tp.system.prompt("Follow up note (cannot be blank):", existingFollowUpNote);
                if (!newFollowUpNote) {
                    console.error("Follow up note cannot be blank.");
                    return;
                }

                const updatedContent = activeFileContent.replace(followupnoteRegex, `followupnote: ${newFollowUpNote}`);
                await params.app.vault.modify(activeFile, updatedContent);
            } else {
                // User canceled the prompt or made an unexpected choice
            }
        } else {
            const updatedTags = `${tagsValue}\n  - followup`;

            let followupnote = await tp.system.prompt("Follow up note (cannot be blank):");
            if (!followupnote) {
                console.error("Follow up note cannot be blank.");
                return;
            }

            const updatedContent = activeFileContent.replace(tagsRegex, `tags: \n  ${updatedTags}`).replace(/^---/, `---\nfollowupnote: ${followupnote}`);
            await params.app.vault.modify(activeFile, updatedContent);
        }
    } else {
        console.error("No 'tags' field found in the file.");
        return 0; // Return 0 to indicate an error or absence of 'tags'
    }
};
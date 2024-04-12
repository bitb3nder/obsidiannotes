module.exports = async function markNoteAsComplete(params) {
    // Get the currently open note's file object
    const activeFile = params.app.workspace.getActiveFile();
    if (!activeFile) {
        console.error("No active file found.");
        return;
    }

    // Read the content of the active note
    const fileContent = await params.app.vault.read(activeFile);

    // nuke both "#todo" or " - todo" from the content
    const modifiedContent = fileContent.replace(/ -\s?todo/gi, '').replace(/ -\s?\"#todo\"/gi, '');

    // Save the modified content back to the active note
    await params.app.vault.modify(activeFile, modifiedContent);
};
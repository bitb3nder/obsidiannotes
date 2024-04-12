/*
 * New Folder creation! Intended to be used from a button 
 * on a note, (inherets lots from the note the button is 
 * pressed from)
*/
module.exports = async function createNewFolder(params) {
    // Get the active note the script is running from
    const activeFile = params.app.workspace.getActiveFile();
    if (!activeFile) {
        console.error("No active file found.");
        return;
    }

    // grab current tags from file
    const activeFileContent = await params.app.vault.read(activeFile);
    var activeFileTags = [];
    const matches = activeFileContent.match(/---([\s\S]*?)---/g);
    if (matches) {
        for (const match of matches) {
            // Find the 'tags:' section with '-' prefixes
            const tagblockMatch = match.match(/tags:([^:]+)/);
            
            if (tagblockMatch) {
                const tagblock = tagblockMatch[1].trim();
                
                // Find and extract lines starting with " - "
                const tagMatches = tagblock.match(/- (.+)/g);
                
                if (tagMatches) {
                    // Extract and clean up the tags
                    activeFileTags = tagMatches.map(tag => tag.replace(/- /g, '').trim());

                    // Check if there are any tags
                    if (activeFileTags.length > 0) {
                        // Join the tags into a single string
                        const tagsString = `[${activeFileTags.join(', ')}]`;

                        console.log("tags: "+tagsString);
                    } else {
                        console.log("No tags found in this section.");
                    }
                } else {
                    console.log("No tags found in this section.");
                }
            } else {
                console.log("No 'tags:' section found in this section.");
            }
        }
    } else {
        console.log("No '---' delimited sections found in the file.");
    }

    // prompt the user to enter a project name
    const userInput = await params.quickAddApi.inputPrompt(
        "Create a new folder",
        "Folder Name"
    );

    if (!userInput) {
        console.log("Folder creation canceled by the user.");
        return;
    }

    // get the path of the active file and strip the file name, use in note to create a link to parent
    const currentFilePath = activeFile.path;
    const folderPath = currentFilePath.substring(0,currentFilePath.lastIndexOf("/"));

    // create a new folder with the user-provided project name inside the current folder
    const newFolderName = userInput.trim();
    const projectDirectoryPath = `${folderPath}/${newFolderName}`;

    // check if the directory already exists, and create it if not
    if (!await params.app.vault.adapter.exists(projectDirectoryPath)) {
        await params.app.vault.adapter.mkdir(projectDirectoryPath);
        console.log(`Created new directory: ${projectDirectoryPath}`);
    } else {
        console.log(`Directory already exists: ${projectDirectoryPath}`);
    }


    // tag refactorization based on parent note
    if (activeFileTags.includes("maincategory")) {
        // pemove "maincategory" from the array
        const index = activeFileTags.indexOf("maincategory");
        activeFileTags.splice(index, 1);
    
    } 
	
	// prompt for a new value and add it to the array
    const newCategoryTag = await params.quickAddApi.inputPrompt("New Folder Tag");
    activeFileTags.push(newCategoryTag);

    // set default buttonText
    let buttonText = "name New Default Note 📝\ntype command\naction QuickAdd: newdefault\nclass large";
	
	// override buttonText based on tag
    if (activeFileTags.includes("tool")) {
        buttonText = "name New Tool Note 🔧\ntype command\naction QuickAdd: newtool\nclass large";
    } else if (activeFileTags.includes("play")) {
        buttonText = "name New Play Note ▶️\ntype command\naction QuickAdd: newplay\nclass large";
    } else if (activeFileTags.includes("research")) {
        buttonText = "name New Research Note 🔎\ntype command\naction QuickAdd: newresearch\nclass large";
    } else if (activeFileTags.includes("services")) {
		buttonText = "name New Service Note 📝\ntype command\naction QuickAdd: newprotocol\nclass large";
	} else if (activeFileTags.includes("doc")) {
        buttonText = "name New Default Note 📝\ntype command\naction QuickAdd: newdefault\nclass large";
    } else if (activeFileTags.includes("win32")) {
        buttonText = "name New Win32 Note 📝\ntype command\naction QuickAdd: newwin32\nclass large";
    } 

    // prompt user for summary of the new folder (what is my purpose)
    const summaryInput = await params.quickAddApi.inputPrompt("Enter a brief summary of the folder contents","Summary");
    if (!summaryInput) {
        console.log("Summary input canceled by the user.");
        return;
    }
    const summary = summaryInput.trim();

    // create the folder note
    const newNotePath = `${projectDirectoryPath}/${newFolderName}.md`;
    await params.app.vault.create(
        newNotePath,
`---
alias: []
tags:
${activeFileTags.map(tag => ` - ${tag}`).join('\n')}
order: 0
summary: ${summary}
link: "[[${currentFilePath}]]"
cssclasses:
  - resourceTable
---
***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

***
\`\`\`dataviewjs
let pages = dv.pages('"' + dv.current().file.folder +'"')
	.where(p => p.link.path == dv.current().file.path );

let tableElements = []
tableElements.push(["📁 "+ dv.fileLink(dv.current().link.path, false, "../"),dv.page(dv.current().link.path).summary])
let tableFiles = []
for (let page of pages) {
	if (page.tags.includes("folder")){ tableElements.push(["📁 "+ dv.fileLink(page.file.name),page.summary]) }
	else { tableFiles.push(["📝 "+ dv.fileLink(page.file.name),page.summary])}
}

dv.header(3, "Contents");
dv.table(["Name", "Summary"], tableElements.concat(tableFiles))
\`\`\`

> [!col] 
>\`\`\`button
> name New Folder 📁
>type command
>action QuickAdd: Create New Folder
>class large
>\`\`\`
> 
>\`\`\`button
>${buttonText}
>\`\`\`
`);
};
module.exports = async (params) => {
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

    // Prompt the user to enter a project name
    const userInput = await params.quickAddApi.inputPrompt(
        "Create a new service category",
        "Category Name"
    );

    if (!userInput) {
        console.log("Service category creation canceled by the user.");
        return;
    }

    // Get the path of the active file and strip the file name, use in note to create a link to parent
    const currentFilePath = activeFile.path;
    const folderPath = currentFilePath.substring(0,currentFilePath.lastIndexOf("/"));

    // Create a new folder with the user-provided project name inside the current folder
    const newFolderName = userInput.trim();
    const projectDirectoryPath = `${folderPath}/${newFolderName}`;

    // Check if the directory already exists, and create it if not
    if (!await params.app.vault.adapter.exists(projectDirectoryPath)) {
        await params.app.vault.adapter.mkdir(projectDirectoryPath);
        console.log(`Created project directory: ${projectDirectoryPath}`);
    } else {
        console.log(`Project directory already exists: ${projectDirectoryPath}`);
    }

    var dataviewString = "";
    //tag refactorization based on parent note
	if (activeFileTags.includes("category")) {
        // Remove "category" from the array
        const index = activeFileTags.indexOf("category");
        activeFileTags.splice(index, 1);
    
        // Prompt for a new value and add it to the array
        const newCategoryTag = await params.quickAddApi.inputPrompt("New Service Category Tag");
        activeFileTags.push(newCategoryTag);
    
        // Create a string called dataview-string with the resulting tags
        dataviewString = activeFileTags.map(tag => `#${tag}`).join(" and ");
        dataviewString += " and -#subcategory";

        // Add "subcategory" to the array
        activeFileTags.push("subcategory");
    } else if (activeFileTags.includes("subcategory")) {
        //this is either a sub-subcategory or something is fucked
        // Remove "subcategory" from the array
        const index = activeFileTags.indexOf("subcategory");
        activeFileTags.splice(index, 1);

        // Create a string called dataview-string with the resulting tags
        dataviewString = activeFileTags.map(tag => `#${tag}`).join(" and ");
        dataviewString += " and -#nested";

        // Add "nested" to the array
        activeFileTags.push("nested");
    } else {
        //sub sub category or something whoopsd 
        //change the dataview string 
        dataviewString = activeFileTags.map(tag => `#${tag}`).join(" and ");
    }

    //set buttonText
    let buttonText = "";
	if (activeFileTags.includes("services")) {
		buttonText = "name New Service Note 📝\ntype command\naction QuickAdd: newprotocol\nclass large";
	} else {
        buttonText = "name New Default Note 📝\ntype command\naction QuickAdd: newdefault\nclass large";
    }

    //prompt user for summary of the new folder (what is my purpose)
    const summaryInput = await params.quickAddApi.inputPrompt("Enter a brief summary of the service category","Summary");
    if (!summaryInput) {
        console.log("Summary input canceled by the user.");
        return;
    }
    const summary = summaryInput.trim();

    //create the folder note
    const newNotePath = `${projectDirectoryPath}/${userInput}.md`;
    await params.app.vault.create(
        newNotePath,
        `---
alias: []
tags:
${activeFileTags.map(tag => ` - ${tag}`).join('\n')}
order: 0
summary: ${summary}
link: "[[${currentFilePath}]]"
---
***
<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

> [!example]+ Contents
>\`\`\`dataview
>table file.frontmatter.summary as Summary
>from ${dataviewString}
>sort order asc
>\`\`\`

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

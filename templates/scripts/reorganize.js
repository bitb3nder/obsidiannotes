const tp = app.plugins.getPlugin("templater-obsidian").templater.current_functions_object;

async function getDestination(tp, initPath) {
    let currentFolderPath = initPath;
    while (true) {
        const choiceOptions = await getFoldersInFolder(currentFolderPath);
		const filteredChoices = choiceOptions.filter(choice => !choice.startsWith("⬇️ Current:") && choice !== "⬅️ Go Back");
        if (filteredChoices.length === 0) {
            // No subfolders found, exit the loop
            break;
        }
		const choice = await tp.system.suggester(choiceOptions, choiceOptions, true);
        if (choice.includes("⬇️ Current: ")) {
            break;
        } else if (choice.includes("⬅️ Go Back")){
	        // remove the last folder from the path
	        currentFolderPath = currentFolderPath.substr(0, currentFolderPath.lastIndexOf("/"));
        } else {
	        // dont prepend leading / at root
	        if (currentFolderPath === "") {
		        currentFolderPath = choice;
		        continue;
	        }
            currentFolderPath = currentFolderPath + "/" + choice;
        }
    }
	return currentFolderPath;
}

async function getFoldersInFolder(folderPath) {
	// get the paths of all folders in the vault
	// performance boost over all files when using a large vault
    const folders = app.vault.getAllLoadedFiles().filter(i => i.children).map(folder => folder.path);
    const immediateSubfolders = new Set();
    var searchPath;

	if (folderPath === "") {
		searchPath = "/";
	} else {
		searchPath = folderPath;
	}
	
	for (const folder of folders) {
		if (folder.startsWith(searchPath) || searchPath === "/") {

			// hide images and templates while at root
			if (searchPath === "/" ){
				var subFolder = folder.split('/')[0];
				if (subFolder === "images") {continue;}
				if (subFolder === "templates") {continue;}
				
			} else {
				// get only the first level of subfolders
				var subFolder = folder.replace(searchPath+"/","").replace(searchPath,"").split('/')[0];
			}
   
			if (subFolder != "") {
				immediateSubfolders.add(subFolder);
			}
		}
	}

    var folderList = Array.from(immediateSubfolders);

	// only allow traversal up if not at root
	if (searchPath != "/") {
		folderList.splice(0, 0, "⬇️ Current: " + folderPath);
		folderList.push("⬅️ Go Back");

	} else {
		folderList.splice(0, 0, "⬇️ Current: " + "Vault Root");
	}
	
	return folderList;
}

async function getInheritableTags(tp, parentFolder) {
  if (parentFolder === "") {  
    return "\n - todo";
  }
  
  const parent = parentFolder + "/" + parentFolder.split("/").at(-1) + ".md";
  var tags = DataviewAPI.page(tp.file.find_tfile(parent).path).tags;

  tags = tags.map(tag => tag.trim().startsWith('#') ? tag.trim().substring(1) : tag.trim());
  var tagsToRemove = ["folder", "category", "subcategory", "maincategory", "todo"];
  tags = tags.filter(tag => !tagsToRemove.includes(tag));

  var tag_string = "\n - " + tags.join("\n - ") + "\n - todo";
  return tag_string;
}

module.exports = async function reorganizeNote(params) {
    //const tp = app.plugins.getPlugin("templater-obsidian").templater.current_functions_object;
    var destination;
	var parent;
	var link;
    var tags;
    
    const activeFile = params.app.workspace.getActiveFile();
    if (!activeFile) {
        console.error("No active file found.");
        return;
    }
    var title = activeFile.basename;

    //get the contents of the active file (metadata + notes)
    const activeFileContent = await params.app.vault.read(activeFile);

    destination = await getDestination(tp,"");

    try {
		await tp.file.move(destination + "/" + title);
	} catch (error) {
		console.error("Error moving the file:", error);
	}
	
    // Replace tags and link in the metadata with the updated values.
    const tagsRegex = /^tags:(.*(?:\n(?!^\w+:).*)*)/m;
    const linkRegex = /^link:(.*?)(\w+:|$)/gm;

    //get new tags
	tags = await getInheritableTags(tp, destination);

    //get new link
    if (destination != "") {
		parent = destination + "/" + destination.split("/").at(-1) + ".md";
		link = "\"[[" + parent + "]]\"";
	} else { link = "\"[[Home.md]]\""; }
    
    //apply
    const updatedContent = activeFileContent.replace(tagsRegex, `tags:${tags}`).replace(linkRegex, "link: " + link);

    // Write the updated content back to the file.
    await params.app.vault.modify(activeFile, updatedContent);
};
// Functions
async function validateTitle(noteTitle) {
  if (typeof noteTitle === 'undefined' || (typeof noteTitle === 'string' && noteTitle.includes('Untitled')) || noteTitle === null || noteTitle === "") {
    return false;
  } 
  else 
  {
    return true;
  }
}

async function setTitle(tp, title, templateName) {
  while ((await validateTitle(title)) == false) {
    title = await tp.system.prompt("New " + templateName + " Note:");
  }
  await tp.file.rename(title);
  return title;
}

async function setSummary(tp, initSummary) {
	summary = "";	
	while ((await validateTitle(summary)) == false) {
		summary = await tp.system.prompt("Summary (cannot be blank):", initSummary);
	}
	return summary;
}

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


// Function that sets the metadata for the new noteTitle
// Params:
//   - tp                          : templater instance
//   - templateDefaultSummary      : default summary from new template template
//   - templateSpecificDefaultPath : default path from new template template (can be "")
//   - templateName                : template name from new template template
async function templateSetMetadata(tp, templateDefaultSummary, templateSpecificDefaultPath, templateName) {
	
	var title = tp.file.title;
	var destination;
	var defaultPath;
	var metadata;
	var summary;
	var parent;
	var link;
	var tags = "tags: ";
	
	title = await setTitle(tp, title, templateName);
	//summary = await setSummary(tp, templateDefaultSummary);
	summary = templateDefaultSummary;

	// get the current folder if the template doesn't specify a default
	// if it does, the specified path is the default path
	if (templateSpecificDefaultPath === "") {
		const activeFile = app.workspace.getActiveFile();
		if (activeFile === null) { defaultPath = ""; }
		else if (activeFile.parent.isRoot()) { defaultPath = ""; }
		else { defaultPath = activeFile.parent.path; }
	} else { defaultPath = templateSpecificDefaultPath; }
	
	destination = await getDestination(tp, defaultPath);
	
	try {
		await tp.file.move(destination + "/" + title);
	} catch (error) {
		console.error("Error moving the file:", error);
	}
	
	tags += await getInheritableTags(tp, destination);
	
	// set link to parent, unless at root
	// root-1 nodes don't get a link to home
	if (destination != "") {
		parent = destination + "/" + destination.split("/").at(-1) + ".md";
		link = "\"[[" + parent + "]]\"";
	} else { link = "\"[[Home.md]]\""; }

	console.log("target link: " + link);
	
	metadata =  "---\n" 
	metadata += "creation date: "+tp.file.creation_date('MMMM Do YYYY')+"\n";
	metadata += "aliases: \n";
	metadata += tags + "\n";
	metadata += "cssclass: resourceTable\n";
	metadata += "summary: " + summary + "\n";
	metadata += "link: " + link + "\n";
	metadata += "---\n";
	
	return metadata;
	
}
module.exports = templateSetMetadata;
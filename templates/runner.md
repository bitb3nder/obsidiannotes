<%* 
var note;

async function getTemplates() {
	// get the paths of all folders in the vault
	// performance boost over all files when using a large vault
    const files = app.vault.getFiles().filter(file => file.path.includes("templates/"));
    const templates = [];
    const displays = [];
	for (const file of files) {
		var templateName;
		var templateEmoji = "";
		var displayName;
		var templateVersion = "1";
		
		if (file.basename != "runner" && file.extension == "md") {

			templateContents = (await app.vault.read(file)).split("\n");

			for (line of templateContents) {

				if (line.includes("templateEmoji")) { templateEmoji = line.split('\"')[1]; }
				if (line.includes("templateName")) { templateName = line.split('\"')[1]; }
				if (line.includes("templateVersion")) { templateVersion = line.split('\"')[1]; }
				if (line.includes("NO TOUCH")) { break; }
			}

			if (templateEmoji === "") { displayName = templateName; }
			if (templateEmoji !== "") { displayName = templateEmoji + " (" + templateName + ")";}

			if (templateVersion !== "1") {
				templates[templates.length] = file.path;
				displays[displays.length] = displayName;
			}
		}
	}

	return [displays, templates];
}

const [displayList, fileList] = await getTemplates();
const choice = await tp.system.suggester(displayList, fileList, true);

note = await tp.file.include("[[" + choice + "]]");

%><%* tR += `${note}` %>
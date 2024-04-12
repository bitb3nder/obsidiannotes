<%*
// Constants - TOUCH
const templateSpecificDefaultPath = "Research"; // leave blank for current folder, no trailing slash
const templateDefaultSummary = "This is a research note!";
const templateVersion = "2"; // include in dynamic runner list
const templateName = "Research";
const templateEmoji = "🔬";

// Variables - NO TOUCH
// Note: modifying the comment line above this one WILL BREAK THINGS

// This calls the script in /templates/scripts/templater_userscripts/templateSetMetadata.js, which handles all the logic for 
// getting tags, title, summary, creation date, and a link to the parent file
var metadata = await tp.user.templateSetMetadata(tp, templateDefaultSummary, templateSpecificDefaultPath, templateName);

//
// Note that this template uses the last section of the parent link to determine what content to add to the template
//
var priority = "";
var body = "";

// should grab just the destination folder from the link returned by the metadata script
const link = (metadata.split("link: ")[1]).split("\n")[0];
const destination_folder = link.split("/").at(-2);

console.log(destination_folder);

if (destination_folder=="Reading List") {
    body = await tp.file.include("[[templates/readlistnote.md]]");
    priority = await tp.system.suggester(["🔴 High", "🟡 Medium", "🟢 Low"], ["priority: 🔴 High\n", "priority: 🟡 Medium\n", "priority: 🟢 Low\n"], true);
} else if (destination_folder=="Blog Posts") {
    body = await tp.file.include("[[templates/ideatemplate.md]]");
} else if (destination_folder=="Talks") {
    body = await tp.file.include("[[templates/readlistnote.md]]");
} else if (destination_folder=="Play Development") {
    body = await tp.file.include("[[templates/ideatemplate.md]]");
} else if (destination_folder=="Tool Development") {
    body = await tp.file.include("[[templates/ideatemplate.md]]");
}

// inject moar metadata
metadata = metadata.split("---")[1];
metadata += priority;
metadata = "---" + metadata + "---\n";

tR = metadata + body;
%>
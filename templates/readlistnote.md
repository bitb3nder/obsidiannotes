<%*
// Constants - TOUCH
const templateSpecificDefaultPath = "Research"; // leave blank for current folder
const templateDefaultSummary = "This is a research note!";
const templateVersion = "1"; // exclude from dynamic runner list
const templateName = "Research";
const templateEmoji = "🔬";

var resourceurl;

async function getLink(){
	resourceurl = await tp.system.prompt("Resource URL:");
}

await getLink();
%>***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

| Status     | 🔗 Link                       |
| ---------- | ----------------------------- |
| incomplete | <%* tR += `${resourceurl}` %> |
##### 👾 Summary 
<% tp.file.cursor(0) %>



***

Created on: <% tp.file.creation_date('MMMM Do YYYY (hh:ss a)') %> 
```button
name Mark As Complete
type command
action QuickAdd: Mark Completed
class .
remove true
```
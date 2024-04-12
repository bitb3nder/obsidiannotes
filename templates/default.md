<%*
// Constants - TOUCH
const templateSpecificDefaultPath = ""; // leave blank for current folder
const templateDefaultSummary = "This is a note!";
const templateVersion = "2"; // include in dynamic runner list
const templateName = "Default";
const templateEmoji = "📝";

// Variables - NO TOUCH
// Note: modifying the comment line above this one WILL BREAK THINGS

// This calls the script in /templates/scripts/templateSetMetadata, which handles all the logic for 
// getting tags, title, summary, creation date, and a link to the parent file
tR += await tp.user.templateSetMetadata(tp, templateDefaultSummary, templateSpecificDefaultPath, templateName);
%>***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

### Description
<% tp.file.cursor(0) %>

***
### Resources 
| 🔗 Hyperlink | Info |
| ----------- | ------ |
| link      | -    |

Created on: <% tp.file.creation_date('MMMM Do YYYY (hh:ss a)') %> 
```button
name Mark As Complete
type command
action QuickAdd: Mark Completed
class .
remove true
```
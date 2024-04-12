<%*
// Constants - TOUCH
const templateSpecificDefaultPath = "Playbooks"; // leave blank for current folder
const templateDefaultSummary = "This is a play note!";
const templateVersion = "2"; // include in dynamic runner list
const templateName = "Play";
const templateEmoji = "▶️";

// Variables - NO TOUCH
// Note: modifying the comment line above this one WILL BREAK THINGS

// This calls the script in /templates/scripts/templateSetMetadata, which handles all the logic for 
// getting tags, title, summary, creation date, and a link to the parent file
tR += await tp.user.templateSetMetadata(tp, templateDefaultSummary, templateSpecificDefaultPath, templateName);
%>***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

### 👾 Overview
What we are going to do at a high level and why <% tp.file.cursor(1) %>

### 🔍 Discovery
How to look for situations where this is applicable
```
command notes here
```

> [!warning] Requires versions 1.1.2 to work!

### 📌 Exploitation
Steps to exploit, reference links to {{documentation}} for context and {{tools}} for tools specific information
```
command notes here
```

> [!fail]- Warnings
> This will break the computer if you mess up

### 🚔 Detections 
Some ways that blue teams are looking for this activity are here 
> [!info] Indicators of Compromise
> Drops x to disk at C:\Temp if ran successfully

> [!info]- Cleanup
> `sudo rm -rf *`

***
### 📝 Resources 
| 🔗 Hyperlink | ℹ️ Info |
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
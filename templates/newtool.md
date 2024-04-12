<%*
// Constants - TOUCH
const templateSpecificDefaultPath = "Documentation/Tools"; // leave blank for current folder
const templateDefaultSummary = "This is a tool note!";
const templateVersion = "2"; // include in dynamic runner list
const templateName = "Tool";
const templateEmoji = "🔧";

// Variables - NO TOUCH
// Note: modifying the comment line above this one WILL BREAK THINGS

// This calls the script in /templates/scripts/templateSetMetadata, which handles all the logic for 
// getting tags, title, summary, creation date, and a link to the parent file
tR += await tp.user.templateSetMetadata(tp, templateDefaultSummary, templateSpecificDefaultPath, templateName);
%>***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

### 👾 Overview

🔗 Github: <% tp.file.cursor(1) %>
What this tool is used for and when to use it 
### 💾 Installation

> [!info]- Prerequisites
> - go version x 
> - aws config x

Installation instructions specific to installation resource
```
git clone git@github.com/project.git
venv
python3 setup.py -r requirements install
activate
```

### ⏯️ Usage 

General usage of the tool not covered by a specific TTP, otherwise reference table below
```
commands
```

| 🔗 TTP | ℹ️ Info |
| ----------- | ------ |
| link      | -    |

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
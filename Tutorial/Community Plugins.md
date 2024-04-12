---
creation date: February 2nd 2024
aliases: 
tags: 
 - tutorial
 - todo
cssclass: resourceTable
summary: This is a note!
link: "[[Tutorial/Tutorial.md]]"
---
***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

### 👾 Hello, there!

##### A Note on Community Plugins
Obsidian is the bones, everything else is done via community plugins. These plugins are not created equally! Some are really tight and well developed and some are janky pieces of shit, don't be afraid to play around, but when downloading full vaults online be mindful that the majority of these plugins allow for direct code execution on your system so don't blindly enable all without reading the plugin list to make sure you don't get rocked.
##### Folder Note
Folder Note is great for those of us used to Notion or CherryTree, as you can build a hierarchical note set from the file list on the left. This mod makes a .md file with the same name as the folder, and then hides the .md file from file view. This way when you click on a folder, it has a note containing useful information, maybe contents or an overview. 
##### Templater + QuickAdd
Templater lets you build templates but also gives you code execution (javascript or templater syntax) during events such as note creation. This allows us to create forms to optimize note creation, tagging, and even moving the note to where it will belong in the file structure automatically. QuickAdd lets us further configure scripts to perform all of the organization we need to achieve the most detail with the least time investment from an operator standpoint.  

The Templater+Quickadd combo insane and should get its own note entirely.
##### Dataview
There are several cool ways to parse code blocks in obsidian. For example 
```html
<html>
	<p> this will highlight all of my syntax based on the language! </p>
</html> 
```

Plugins make great use of this flexibility, one S+ tier example being Dataview! in this dataview example, my query is `LIST FROM #tutorial`, which will dynamically create a linked list to all notes tagged with tutorial! 
```dataview
LIST from #tutorial
```
The full power of this plugin has massive untapped potential, the README has a few basic queries to pull recently updated notes and lists noted tagged with to do.

Alright, thats fine. [[README]]

***
### Resources 
| 🔗 Hyperlink | Info |
| ----------- | ------ |
| link      | -    |

Created on: February 2nd 2024 (09:52 am) 
```button
name Mark As Complete
type command
action QuickAdd: Mark Completed
class .
remove true
```
---
alias: []
tags:
 - doc
 - folder
 - tools
 - external
order: 0
summary: configuration for resources commonly used to exploit internet exposed resources
link: "[[Documentation/Tools/Tools.md]]"
cssclasses:
  - resourceTable
---
***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

***
```dataviewjs
let pages = dv.pages('"' + dv.current().file.folder +'"')
	.where(p => p.link.path == dv.current().file.path );

let tableElements = []
tableElements.push(["📁 "+ dv.fileLink(dv.current().link.path, false, "../"),dv.page(dv.current().link.path).summary])
let tableFiles = []
for (let page of pages) {
	if (page.tags.includes("folder")){ tableElements.push(["📁 "+ dv.fileLink(page.file.name),page.summary]) }
	else { tableFiles.push(["📝 "+ dv.fileLink(page.file.name),page.summary])}
}

dv.header(3, "Contents");
dv.table(["Name", "Summary"], tableElements.concat(tableFiles))
```

> [!col] 
>```button
> name New Folder 📁
>type command
>action QuickAdd: Create New Folder
>class large
>```
> 
>```button
>name New Default Note 📝
type command
action QuickAdd: newdefault
class large
>```

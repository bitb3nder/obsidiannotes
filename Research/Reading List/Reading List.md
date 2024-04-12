---
aliases: []
cssclasses:
  - resourceTable
tags:
  - research
  - folder
  - read
order: 0
summary: my reading list and pre-prod notes on articles or tweets
link: "[[Research/Research]]"
---
***
<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

```dataviewjs
let pages = dv.pages('"' + dv.current().file.folder +'"')
	.where(p => p.link.path == dv.current().file.path );

let tableElements = []
tableElements.push(["📁 "+ dv.fileLink(dv.current().link.path, false, "../"), "" ,dv.page(dv.current().link.path).summary])
let tableFiles = []
for (let page of pages) {
	if (page.tags.includes("folder")){ tableElements.push(["📁 "+ dv.fileLink(page.file.name), "",page.summary]) }
	else { tableFiles.push(["📝 "+ dv.fileLink(page.file.name), page.priority, page.summary])}
}

dv.header(2, "Contents");
//                                     This needs to be fixed with css. 
dv.table(["Name", "Priority", "Summary　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　"], tableElements.concat(tableFiles))
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
>name New Research Note 🔎
>type command
>action QuickAdd: newresearch
>class large
>```
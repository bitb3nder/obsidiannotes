---
aliases: 
summary: Home
tags: 
  - home
  - folder
cssclasses:
  - homepage
link: "[[Home]]"
---
***
<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

If you're new here, check out the [[README|tutorial]]! 

> [!col] 
>> [!example]+ To-Do 
>>```dataview
>>Table dateformat(file.mtime, "DD HH:mm") as Tagged
>>From #todo and -"templates" and -"images" and -"Home" and -#folder
>>sort file.mtime DESC  
>>Limit 10
>>```
> 
>> [!info]+ Recent Activity
>>```dataview
>>Table dateformat(file.mtime, "DD HH:mm") as Modified
>>From "" and -"templates" and -"images" and -"Home" and -#folder 
>>sort file.mtime DESC  
>>Limit 10  
>>```

> [!col]+
>>[!bug]+ Follow-Ups
>>```dataview
>> Table file.frontmatter.followupnote as Note, dateformat(file.mtime, "DD HH:mm") as Tagged 
>> From #followup and -"_templates" 
>> sort file.mtime DESC  
>> Limit 20
>>```

```dataviewjs
let pages = dv.pages('"' + dv.current().file.folder +'"')
	.where(p => (p.link != null && p.link.path == dv.current().file.path)) 
	.where(p => p.file.name != "Home");

let tableElements = []
let tableFiles = []
for (let page of pages) {
	if ( page.tags.includes("folder")){ tableElements.push(["📁 "+ dv.fileLink(page.file.name),page.summary]) }
	else { tableFiles.push(["📝 "+ dv.fileLink(page.file.name),page.summary])}
}

dv.header(2, "Contents");
dv.table(["Name", "Summary"], tableElements.concat(tableFiles))
```

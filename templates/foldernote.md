---
alias: []
tags: 
  - #category 
  - #folder
order: 0
summary: a folder
link: 
---
***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

> [!example]+ Contents
>```dataview
>table file.frontmatter.summary as Summary
>from #tool and #category and #folder and -#maincategory
>sort order asc
>```

```button
name New Tool Note 🔧
type command
action QuickAdd: newdefault
class large
```
---
creation date: February 2nd 2024
aliases: 
tags:
 - play
 - internal
 - privesc/domain
 - todo
cssclass: resourceTable
summary: how 2 kerberoast
link: "[[Playbooks/Internal/Domain Privilege Escalation/Domain Privilege Escalation.md]]"
---
***

<div><ul class="navheader"> <ul><a href="Home.md" class="internal-link">🏠 Home</a></ul><ul><a href="Playbooks/Playbooks.md" class="internal-link">📚 Playbooks</a></ul><ul><a href="Documentation/Documentation.md" class="internal-link">📝 Documentation</a></ul><ul><a href="Tools/Tools.md" class="internal-link">🔧 Tools</a></ul><ul><a href="Research/Research.md" class="internal-link">🔬 Research</a></ul></ul></div>

### 👾 Overview
kerberoasting is fun what is [[kerberos]] 

### 🔍 Discovery
How to look for situations where this is applicable we use [[Rubeus]] 
```
rubeus kerberoast
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
> windows event id 4769

> [!info]- Cleanup
> `sudo rm -rf *`

***
### 📝 Resources 
| 🔗 Hyperlink | ℹ️ Info |
| ----------- | ------ |
| link      | -    |

Created on: February 2nd 2024 (05:39 pm) 
```button
name Mark As Complete
type command
action QuickAdd: Mark Completed
class .
remove true
```
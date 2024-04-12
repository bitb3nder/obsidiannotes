let pages = dv.pages('"' + dv.current().file.folder +'"')
	.where(p => p.link.path == dv.current().file.path );

let tableElements = []
tableElements.push(["📁 "+ dv.fileLink(dv.current().link.path, false, "../"),dv.page(dv.current().link.path).summary])
let tableFiles = []
for (let page of pages) {
	if (page.tags.includes("folder")){ tableElements.push(["📁 "+ dv.fileLink(page.file.name),page.summary]) }
	else { tableFiles.push(["📝 "+ dv.fileLink(page.file.name),page.summary])}
}

dv.header(2, "Contents");
dv.table(["Name", "Summary"], tableElements.concat(tableFiles))
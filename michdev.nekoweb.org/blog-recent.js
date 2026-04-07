var xml = new XMLHttpRequest()

const htmlBlogCard = '<a href=\"{LINK}\" style=\"width:50%\"><div class=\"blog-card\">\
	<h3>{TITLE}</h3>\
	<p class=\"subtext\"><span class=\"material-symbols-outlined\">edit</span> {PUBDATE} | {TAGS}\
	<hr>\
	<p class=\"content\" style="height:100%">{DESCRIPTION}</p>\
</div><a>'
const htmlTag = "<span class=\"tag\">{NAME}</span> "

function addCards() {
    console.log("--------- RESETTING CONTAINER ---------")
    document.getElementById("blog-card-container").innerHTML = ""
    var xmlDoc = xml.responseXML;
    let items = Array.from(xmlDoc.getElementsByTagName("item"))
    items.length = Math.min(items.length, 2)
    console.log(items)
    for (let item of items) {
        var title = "", pubdate = "", tags = "", desc = "", link=""
        for (let child of item.children) {
            switch (child.tagName) {
                case "title":
                    title = child.textContent
                    break
                case "pubDate":
                    pubdate = (new Date(child.textContent.split(",")[0])).toISOString().split("T")[0]
                    break
                case "category":
                    tags += htmlTag.replace("{NAME}", child.textContent)
                    break
                case "description":
                    desc = child.textContent
                    break
                case "link":
                    link = child.textContent
                    break
            }
        }
        let format = htmlBlogCard.replace(
            "{TITLE}", title
        ).replace(
            "{PUBDATE}", pubdate
        ).replace(
            "{TAGS}", tags
        ).replace(
            "{DESCRIPTION}", desc
        ).replace(
            "{LINK}", link
        )
        document.getElementById("blog-card-container").innerHTML += format
    }
}

const XMLREADY = 4;
const XMLSTATUSDONE = 200;
xml.onreadystatechange = function() {
    if (this.readyState == XMLREADY && this.status == XMLSTATUSDONE) {
        console.log("XML request finished")
        console.log(xml.responseXML)
        addCards();
    }
};
xml.open("GET", "./blog/rss.xml", true)
xml.send()
var query = new URLSearchParams(window.location.search);
var guid = ""
var xml = new XMLHttpRequest()

function loadPage() {
    let xmlDoc = xml.responseXML
    let ids = xmlDoc.getElementsByTagName("guid")
    let item = null;
    for (let id of ids) {
        if (id.textContent == guid) {
            item = id.parentElement
            break
        }
    }
    let elemTitle = document.getElementById("title")
    let elemDate = document.getElementById("date")
    let elemTags = document.getElementById("tags")
    let elemGUID = document.getElementById("guid")
    let elemDesc = document.getElementById("description")
    elemGUID.innerText = guid ? guid : "none provided"
    if (item == null) {
        elemTitle.innerText = "post not found"
        elemDesc.innerHTML = "<h2>post not found</h2><p class=\"subtext\"> check spelling and casing. sorry :["
    } else {
        let tags = []
        for (let child of item.children) {
            switch (child.tagName) {
                case "title":
                    elemTitle.innerText = child.textContent
                    document.getElementsByTagName("title")[0].innerText = "_michdev | " + child.textContent
                    break
                case "description":
                    elemDesc.innerHTML = child.innerHTML
                    break
                case "pubDate":
                    elemDate.innerText = (new Date(child.textContent).toISOString().split("T")[0])
                    break
                case "category":
                    tags.push(child.textContent)
                    break
                
            }
        }
        for (let tag of tags) {
            elemTags.innerHTML += "<span class=\"tag\">{NAME}</span> ".replace("{NAME}", tag)
        }
    }
    Prism.highlightAll()
}

if (query.has("guid")) {
    guid = query.get("guid")
}

const XMLREADY = 4;
const XMLSTATUSDONE = 200;
xml.onreadystatechange = function() {
    if (this.readyState == XMLREADY && this.status == XMLSTATUSDONE) {
        console.log("XML request finished")
        console.log(xml.responseXML)
        loadPage()
    }
};
xml.open("GET", "./blog/rss.xml", true)
xml.send()
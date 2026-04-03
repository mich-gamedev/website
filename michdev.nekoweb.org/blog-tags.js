var xml = new XMLHttpRequest()

function toggleActive(button) {
    button.classList.toggle("filter-active");
    if (button.classList.contains("filter-active")) {
        button.innerHTML = button.innerHTML.replace(
            "<span class=\"material-symbols-outlined\">close_small</span> ",
            "<span class=\"material-symbols-outlined\">check</span> "
        );
    } else {
        button.innerHTML = button.innerHTML.replace(
            "<span class=\"material-symbols-outlined\">check</span> ",
            "<span class=\"material-symbols-outlined\">close_small</span> "
        );
    } 
    addCards()
}

const htmlBlogCard = '<div class=\"blog-card\" style=\"width: 100%;\"\>\
	<h3>{TITLE}</h3>\
	<p class=\"subtext\"><span class=\"material-symbols-outlined\">edit</span> {PUBDATE} | {TAGS}\
	<hr>\
	<p class=\"content\" style="height:100%">{DESCRIPTION}</p>\
</div>'
const htmlTag = "<span class=\"tag\">{NAME}</span> "

function addCards() {
    console.log("--------- RESETTING CONTAINER ---------")
    document.getElementById("blog-card-container").innerHTML = ""
    var activeFilters = [];
    for (let filter of document.getElementsByClassName("filter-active")) {
        activeFilters.push(filter.id)
        console.log(filter)
    }
    console.log(activeFilters)
    var xmlDoc = xml.responseXML;
    let items = Array.from(xmlDoc.getElementsByTagName("item"))
    console.log(items)
    for (let item of items) {
        let isValid = true
        for (let child of item.children) {
            // TODO: currently this acts like an "or" operation. make it act like an "and" operation by accumulating the category item contents in an array and seeing if all activeFilters are present in the array
            if ((child.tagName == "category" && activeFilters.includes(child.textContent)) || activeFilters.length == 0) {
                isValid = true
                break
            }
        }
        if (isValid) {
            var title = "", pubdate = "", tags = "", desc = ""
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
            )
            document.getElementById("blog-card-container").innerHTML += format
        }
    }
}

var filters = document.getElementsByClassName("tag-filter");
var query = new URLSearchParams(window.location.search);

for (let filter of filters) {
    if (query.has("tags") && query.get("tags").split(" ").includes(filter.id)) {
        toggleActive(filter);
    }
    filter.addEventListener("click", function() {toggleActive(this)});
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
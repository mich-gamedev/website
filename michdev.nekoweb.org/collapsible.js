var coll = document.getElementsByClassName("collapsible");
console.log(coll)

var i;
for (i = 0; i < coll.length; i++) {
    if (coll[i].classList.contains("start-active")) {
        coll[i].nextElementSibling.style.maxHeight = coll[i].nextElementSibling.scrollHeight + "px";
        coll[i].classList.toggle("active");
    }
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var inside = this.nextElementSibling;
        if (!this.classList.contains("active")) {
            inside.style.maxHeight = null;
        } else {
            inside.style.maxHeight = inside.scrollHeight + "px";
        }
    });
}
var filters = document.getElementsByClassName("tag-filter")

for (let filter of filters) {
    filter.addEventListener("click", function() {
        this.classList.toggle("filter-active")
    })
}
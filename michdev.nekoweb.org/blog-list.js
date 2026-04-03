var buttons = document.getElementsByClassName("tag-filter");

var activeFilters = [];
for (let button of buttons) {
    if (button.classList.contains("active-filter")) {
        filters.push(button.id);
    }
    button.addEventListener("click", function() {
        if (activeFilters.includes(this.id)) {
            activeFilters = activeFilters.filter((filter) => filter != this.id);
        } else {
            activeFilters.push(this.id);
        }
    })
}
console.log(activeFilters)
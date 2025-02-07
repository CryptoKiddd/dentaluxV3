//langs dropdown
const $select = $("#language-select");
const $dropdown = $(".custom-dropdown");
const $selectedOption = $dropdown.find(".selected-option");
const $dropdownOptions = $(".dropdown-options");
$select.find("option").each(function () {
    var value = $(this).val();
    var text = $(this).text();
    var image = $(this).data("image");

    if (image) {
        $dropdownOptions.append(
            `<li data-value="${value}">
                    <img src="${image}" alt="${text} Flag">
                </li>`
        );
    }
});

// Show dropdown options on click
$dropdown.click(function () {
    $dropdownOptions.toggle();
});

// Handle option selection
$dropdownOptions.on("click", "li", function () {
    var selectedImage = $(this).find("img").attr("src");

    $selectedOption.html(`<img src="${selectedImage}" alt="${selectedText} Flag"> <img class="dropdown-arr-langs" src="assets/images/dropdown-arr.png" alt="" >`);
    $dropdownOptions.hide();


});

// Hide dropdown if clicked outside
$(document).click(function (e) {
    if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) {
        $dropdownOptions.hide();
    }
});

// Hide original select
$select.hide();

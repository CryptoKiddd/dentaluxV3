//langs dropdown
const $select = $("#language-select");
const $dropdown = $(".custom-dropdown");
const $selectedOption = $dropdown.find(".selected-option");
const $dropdownOptions = $(".dropdown-options");
$select.find("option").each(function () {
    let value = $(this).val();
    let text = $(this).text();
    let image = $(this).data("image");

    if (image) {
        $dropdownOptions.append(
            `<li data-value="${value}">
                    <img src="${image}" alt="${text} Flag">
                </li>`
        );
    }
});

// Show dropdown options on click
$dropdown.click(function (e) {
    e.stopPropagation();
    $dropdownOptions.toggle();
});

// Handle option selection
$dropdownOptions.on("click", "li", function () {
    let selectedImage = $(this).find("img").attr("src");

    $selectedOption.html(`<img src="${selectedImage}"> <img class="dropdown-arr-langs" src="assets/images/dropdown-arr.png" alt="" >`);
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



let heroCarousel = $("#hero-carousel")
heroCarousel.bxSlider({
    mode: 'vertical',
    // controls:false,
    controls: false,   // Hides prev/next arrows
    pager: false, 
    slideMargin: 0
  });
  $('#hero-prev').click(function() {
    heroCarousel.goToPrevSlide();
  });

  $('#hero-next').click(function() {
    heroCarousel.goToNextSlide();
  });
 
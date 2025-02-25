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
if (heroCarousel.length) {


    heroCarousel.bxSlider({
        mode: 'vertical',
        // controls:false,
        controls: false,   // Hides prev/next arrows
        pager: false,
        slideMargin: 0
    });
    $('#hero-prev').click(function () {
        heroCarousel.goToPrevSlide();
    });
    
    $('#hero-next').click(function () {
        heroCarousel.goToNextSlide();
    }) ;

}    

const recognitionsCarousel = $('.slider1');

if (recognitionsCarousel.length) {
    const totalSlides = recognitionsCarousel.children('.slide').length;
    const slidesToShow = Math.min(7, totalSlides); // Ensure it doesn't exceed total slides

    recognitionsCarousel.bxSlider({
        slideWidth: 218,
        minSlides: slidesToShow,
        maxSlides: slidesToShow,
        moveSlides: 1, // Move one slide at a time
        infiniteLoop: true,
        controls: false,
        pager: false,
    });
    $('.recog-prev').click(function () {
        recognitionsCarousel.goToPrevSlide();
    });

    $('.recog-next').click(function () {
        recognitionsCarousel.goToNextSlide();
    })

}







//   let recognitionsCarousel = $(".slider1'")



//     recognitionsCarousel.bxSlider({
//         slideWidth: 200,
//         minSlides: 2,
//         maxSlides: 3,
//         slideMargin: 10
//       });
$(document).ready(function () {
    $("#openModal").click(function () {
        $("body").css("overflow", "hidden"); // Disable scrolling
        $(".overlay1").show(); // Show blue blurry background
        $("#popupForm").addClass("show"); // Move modal to 50%
    });

    $(".close-btn, .overlay").click(function () {
        $("body").css("overflow", "auto"); // Enable scrolling
        $(".overlay1").hide(); // Hide background
        $("#popupForm").removeClass("show"); // Move modal off-screen
    });

    $(".submit-btn").click(function () {
        alert("Form Submitted!");
    });
});

function initMap() {
    if ($('#map').length > 0) { // Check if the map div exists
        let location = { lat: 41.6402829, lng: 41.6276066 };

        let map = new google.maps.Map($('#map')[0], { // Use [0] to get the raw DOM element
            zoom: 17,
            center: location
        });

        let marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: 'assets/images/mapicon.png' // Replace with your actual icon path
        });
    }
}

$(document).ready(function () {
    if ($('#map').length > 0) {
        initMap();
    }
});


const hamburger = $('#nav-icon1')

if(hamburger.length > 0){

hamburger.click(function(){
    $(this).toggleClass('open');

    if ($(".navigation").height() < 180) {
        $(".navigation").animate({ height: "100vh" }, 300);
        $("body").css("overflow", "hidden"); 
    } else {
        $(".navigation").animate({ height: "160px" }, 300);
        $("body").css("overflow", "auto");
    }
});
}

	



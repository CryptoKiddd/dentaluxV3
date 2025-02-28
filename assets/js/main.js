$(document).ready(function () {
    const $dropdown = $(".custom-dropdown");
    const $selectedOption = $dropdown.find(".selected-option");
    const $dropdownOptions = $(".dropdown-options");

    // Get initially selected language (first item in the list)
    let $initialSelected = $dropdownOptions.find("li").first();
    let selectedValue = $initialSelected.data("value");
    let selectedImage = $initialSelected.find("img").attr("src");

    // Set default selected flag
    $selectedOption.html(
        `<img src="${selectedImage}"> 
         <img class="dropdown-arr-langs" src="assets/images/dropdown-arr.png" alt="">`
    );

    // Hide initially selected language from options
    $initialSelected.hide();

    // Show dropdown options on click
    $dropdown.click(function (e) {
        e.stopPropagation();
        $dropdownOptions.toggle();
    });

    // Handle option selection
    $dropdownOptions.on("click", "li", function () {
        let selectedValue = $(this).data("value");
        let selectedImage = $(this).find("img").attr("src");

        // Update selected option UI
        $selectedOption.html(
            `<img src="${selectedImage}"> 
             <img class="dropdown-arr-langs" src="assets/images/dropdown-arr.png" alt="">`
        );

        // Show all options first, then hide the newly selected one
        $dropdownOptions.find("li").show();
        $(this).hide();

        $dropdownOptions.hide();
    });

    // Hide dropdown if clicked outside
    $(document).click(function (e) {
        if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) {
            $dropdownOptions.hide();
        }
    });
});





let heroCarousel = $("#hero-carousel")
if (heroCarousel.length > 0) {
    function initializeSlider() {
        let carouselMode = window.innerWidth < 500 ? 'horizontal' : 'vertical';

        if (heroCarousel.data('bxSlider')) {
            heroCarousel.destroySlider(); // Destroy previous instance before reinitializing
        }

        heroCarousel.bxSlider({
            mode: carouselMode,
            controls: false,  // Hides prev/next arrows
            pager: false,
            slideMargin: 0
        });
    }

    // Initialize on page load
    initializeSlider();

    // Reinitialize on window resize
    $(window).resize(function () {
        initializeSlider();
    });

    // Manual controls
    $('#hero-prev').click(function () {
        heroCarousel.goToPrevSlide();
    });

    $('#hero-next').click(function () {
        heroCarousel.goToNextSlide();
    });
}


const recognitionsCarousel = $('.slider1');

if (recognitionsCarousel.length > 0) {
    const totalSlides = recognitionsCarousel.children('.slide').length;
    let  slideWidth = 218
    let slidesToShow = Math.min(9, totalSlides); // Ensure it doesn't exceed total slides
    if(window.innerWidth < 480){
        slideWidth = 150
         slidesToShow = Math.min(3, totalSlides); // Ensure it doesn't exceed total slides

    }
    if(window.innerWidth < 401){
        slideWidth = 120

    }

    recognitionsCarousel.bxSlider({
        slideWidth: slideWidth,
        minSlides: slidesToShow,
        maxSlides: slidesToShow,
        moveSlides: 1, // Move one slide at a time
        infiniteLoop: true,
        controls: false,
        margin:0,
        pager: false,
    });
    $('.recog-prev').click(function () {
        recognitionsCarousel.goToPrevSlide();
    });

    $('.recog-next').click(function () {
        recognitionsCarousel.goToNextSlide();
    })

}








$(document).ready(function () {
    $("#openModal").click(function () {
        $("body").css("overflow", "hidden"); 
        $(".overlay1").fadeIn(); 
        $("#popupForm").fadeIn().addClass("show");
    });

    $(".close-btn, .overlay1").click(function () {
        $("body").css("overflow", "auto"); 
        $(".overlay1").fadeOut(); 
        $("#popupForm").fadeOut().removeClass("show");
    });

    $(".submit-btn").click(function () {
        alert("Form Submitted!");
    });
});


function initMap() {
    if ($('#map').length > 0) { 
        let location = { lat: 41.6402829, lng: 41.6276066 };

        let map = new google.maps.Map($('#map')[0], { 
            zoom: 17,
            center: location
        });

        let marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: 'assets/images/mapicon.png' 
        });
    }
}

$(document).ready(function () {
    if ($('#map').length > 0) {
        initMap();
    }
});


const hamburger = $('#nav-icon1')
if (hamburger.length > 0) {
    hamburger.click(function () {
        $(this).toggleClass('open');

        let navigation = $(".navigation");

        if (navigation.height() < 180) {
            navigation.css("overflow-y", "auto") 
                .animate({ height: "100vh" }, 300);

            $("body").css("overflow", "hidden"); 
            navigation.animate({ height: "130px" }, 300, function () {
                navigation.css("overflow-y", "hidden"); 
            });

            $("body").css("overflow", "auto");
        }
    });
}

if(window.innerWidth > 1050){



    let lastScrollTop = 0;
    let navigation = $(".navigation");
    
    navigation.css({ height: "220px", top: "0", transition: "height 0.3s ease-in-out, top 0.3s ease-in-out" });
    
    $(window).scroll(function () {
        let currentScroll = $(this).scrollTop();
    
        if (currentScroll === 0) {
          
            navigation.css({ height: "220px", top: "0px" });
        } else if (currentScroll > lastScrollTop) {
            if (navigation.height() > 130) {
                navigation.css({ height: "130px" }); 
            } else {
                navigation.css({ top: "-250px" });
            }
        } else {
          
            navigation.css({ top: "0px", height: "130px" });
        }
    
        lastScrollTop = currentScroll;
    });
}




// languages dropdown
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





let heroCarousel = $("#hero-carousel");

if (heroCarousel.length > 0) {
    function initializeSlider() {
        let carouselMode = window.innerWidth < 500 ? 'horizontal' : 'vertical';

        if (heroCarousel.hasClass("bx-initialized")) {
            heroCarousel.bxSlider().destroySlider();
        }

        heroCarousel.bxSlider({
            mode: carouselMode,
            controls: false, 
            pager: false,
            touchEnabled: true, 
            preventDefaultSwipeY: true,
            preventDefaultSwipeX: true,
            slideMargin: 0,
            auto: true,
            swipeThreshold: 100
        });
    }

    // Enable page scrolling when swiping
    $(document).on('touchmove', function(e) {
        if (e.originalEvent.touches.length > 1) return; // Ignore multi-touch
        e.stopPropagation(); // Allow vertical scroll
    });

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
    let slidesToShow = Math.min(8, totalSlides); // Ensure it doesn't exceed total slides
    if(window.innerWidth < 480){
        slideWidth = 150
         slidesToShow = Math.min(2, totalSlides); // Ensure it doesn't exceed total slides

    }
    if(window.innerWidth < 401){
        slideWidth = 110

    }

    recognitionsCarousel.bxSlider({
        slideWidth: slideWidth,
        minSlides: slidesToShow,
        maxSlides: slidesToShow,
        moveSlides: 1, // Move one slide at a time
        infiniteLoop: true,
        controls: false,
        margin:10,
        pager: false,
        auto: true,
    });
    $('.recog-prev').click(function () {
        recognitionsCarousel.goToPrevSlide();
    });

    $('.recog-next').click(function () {
        recognitionsCarousel.goToNextSlide();
    })

}






// popup

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

// map on contacts
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

// hamburger menu
const hamburger = $('#nav-icon1');

if (hamburger.length > 0) {
    hamburger.click(function () {
        $(this).toggleClass('open');

        let navigation = $(".navigation");

        if (navigation.outerHeight(true) < 180) {
            navigation.css("overflow-y", "auto") 
                .animate({ height: "100%", paddingBottom:50 }, 300, function () {
                    navigation.css("overflow-y", "hidden");
                });

            $("body").css("overflow", "hidden");  
        } else {
            navigation.animate({ height: "130px" }, 300, function () {
                $("body").css("overflow", "auto");
            });
        }
    });
}

// navigation scroll effect 
if(window.innerWidth > 1050){



    let lastScrollTop = 0;
    let navigation = $(".navigation");
    let logo = $(".mobile-wrapper .logo"); // Targeting the logo

    navigation.css({ height: "220px", top: "0", transition: "height 0.3s ease-in-out, top 0.3s ease-in-out" });
    
    $(window).scroll(function () {
        let currentScroll = $(this).scrollTop();
        if (currentScroll > 200) {
            navigation.css("background-color", "white"); 
        } else {
            navigation.css("background-color", "rgba(16, 57, 116, 0.04)"); 
        }
        if (currentScroll === 0) {
          
            navigation.css({ height: "220px", top: "0px" });
            logo.animate({ paddingTop: 0 }, 200); // Reset padding when at the top

        } else if (currentScroll > lastScrollTop) {
            if (navigation.height() > 130) {
                navigation.css({ height: "130px" }); 
                logo.animate({ paddingTop: 10 }, 200); // Add padding when navigation shrinks

            } else {
                navigation.css({ top: "-250px" });
            }
        } else {
          
            navigation.css({ top: "0px", height: "130px" });
        }
    
        lastScrollTop = currentScroll;
    });
}




// active state on link


$(document).ready(function () {
    let currentPage = window.location.pathname.split("/").pop(); // Get current page filename

    if (currentPage === "" || currentPage === "index.html") {
        currentPage = "mainpage.html"; // Default to index.html if empty
    }

    $(".nav-top li a, .nav-bottom li a").each(function () {
        let linkPage = $(this).attr("href");

        if (linkPage === currentPage) {
            $(this).addClass("active-navlink");
        }
    });
});


if ($('.project-carousel-wrapper').length > 0) {
    const container = document.querySelector('.container');
    const sections = gsap.utils.toArray('.container li');
    const vw = window.innerWidth < 500 ? 80 : 25;
    const containerWidth = `${sections.length * vw}vw`;

    container.style.width = containerWidth;

    // Horizontal scrolling animation
    gsap.to(".container", {
        x: `-${(sections.length - 1) * vw}vw`, // Moves sections left
        ease: "none",
        scrollTrigger: {
            trigger: ".project-carousel-wrapper",
            pin: true,
            scrub: 4, // Adjust for smoother scrolling
            end: () => `+=${container.offsetWidth - window.innerWidth}`, // Stops scrolling at the correct point
        }
    });
    gsap.from(".project-carousel-wrapper p", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".project-carousel-wrapper p",
            start: "top 80%", // Start when the paragraph is 80% in the viewport
            toggleActions: "play none none none",
        }
    });
}




//ANIMATIONSS
     // Animate the whole navigation appearing from the top
     gsap.from(".navigation", {
        y: -50, // Moves down from -50px
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    // Animate nav links (top)
    gsap.from(".nav-top li", {
        x: -30, // Moves in from the left
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2, // Stagger each item for a cool effect
        delay: 0.5
    });

    // Animate nav links (bottom)
    gsap.from(".nav-bottom li", {
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.8
    });

    // Animate social media icons with bounce effect
    gsap.from(".nav-social-media li", {
        y: 20, // Moves up from below
        opacity: 0,
        duration: 1,
        ease: "bounce.out",
        stagger: 0.3,
        delay: 1.2
    });
let currentPage = window.location.pathname.split("/").pop(); // Get current page filename
if(currentPage === "" || currentPage === "index.html"){


    gsap.from(".hero-carousel-item h1", {
        x: -50, // Moves from left (-50px)
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.from(".hero-carousel-item p", {
        x: -50, // Moves from left
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.7 // Slightly delayed after h1
    });

    gsap.from(".hero-carousel-item .carousel-item-btn", {
        y: 20, // Moves up from below
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1 // Delayed after paragraph for a natural effect
    });



 

  //  about us on mainpage
    document.addEventListener("DOMContentLoaded", function () {
        gsap.registerPlugin(ScrollTrigger);
    
        gsap.from(".index-about header p", {
            x: -50,  // Slide in from the left
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".index-about",
                start: "top 80%", // Start when section is 80% in view
            }
        });
    
        gsap.from(".index-about main p", {
            y: 20, // Move slightly up
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".index-about",
                start: "top 75%", // Trigger slightly later
            }
        });
    
        gsap.from(".index-about ul li", {
            y: 20,  // Move up from below
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.3,  // Stagger effect
            scrollTrigger: {
                trigger: ".index-about ul",
                start: "top 75%", // Trigger when the list enters viewport
            }
        });
    });
    
   



        //  servicessssss

        document.addEventListener("DOMContentLoaded", function () {
            gsap.registerPlugin(ScrollTrigger);
        
            // Animate header title on scroll
            gsap.from(".servicepage header p", {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".servicepage",
                    start: "top 80%", // Start animation when the section is 80% in view
                }
            });
        
            // Animate service list items one by one when scrolling
            gsap.from(".servicepage ul.services li", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.3, // Each item appears one after another
                scrollTrigger: {
                    trigger: ".servicepage",
                    start: "top 55%", // Trigger when section reaches 75% viewport height
                }
            });
        
            // Animate "See More" button when scrolling
            gsap.from(".servicepage .see-more", {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".servicepage",
                    start: "top 70%", // Slightly later trigger
                }
            });
        });
        



}

   if(currentPage === "services.html"){
    document.addEventListener("DOMContentLoaded", function () {
        gsap.registerPlugin(ScrollTrigger);
    
        // Header animation (fade in + move up)
        gsap.from(".servicepage header p", {
            x: 150, 
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".servicepage",
                start: "top 80%",
            }
        });
    
        // Service items animation (stagger effect with scale + rotation)
        gsap.from(".servicepage .services li", {
            opacity: 0,
            scale: 0.8,  // Start small and scale up
            rotationX: -20, // Adds slight 3D effect
            duration: 1.2,
            ease: "back.out(1.7)", // Smooth bounce-out effect
            stagger: 0.3, // Items appear one after another
            scrollTrigger: {
                trigger: ".servicepage .services",
                start: "top 75%",
            }
        });
    
        // Pagination animation (fade-in + slide up)
        gsap.from(".servicepage .pagination", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".servicepage .pagination",
                start: "top 80%",
            }
        });
    });
    
   }

   if(currentPage === "achievments.html"){
    document.addEventListener("DOMContentLoaded", function () {
        gsap.registerPlugin(ScrollTrigger);
    
        // Header animation (fade in + move up)
        gsap.from(".servicepage header p", {
            x: 150, 
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".servicepage",
                start: "top 80%",
            }
        });
    
        // Achievements list animation (staggered slide-in effect)
        gsap.from(".achievements li", {
            x: -50, // Slide in from the left
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.3, // Items appear one after another
            scrollTrigger: {
                trigger: ".achievements",
                start: "top 75%",
            }
        });
    
        // Pagination animation (fade-in + slide up)
        gsap.from(".pagination", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".pagination",
                start: "top 80%",
            }
        });
    
        // Icon animations (pop effect when scrolling)
        gsap.from(".icon.pdf-icon, .icon.download-icon", {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)", // Bounce effect
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".achievements",
                start: "top 75%",
            }
        });
    });
    
   }



 if(currentPage === "projects.html" || currentPage === "blog.html" || currentPage === "news.html"){
    $(document).ready(function() {
        gsap.from("header p", {
            x: -100, 
            opacity: 0, 
            duration: 1, 
            ease: "power2.out"
        });

        gsap.from(".projects li", {
            opacity: 0,
            y: 50,
            stagger: 0.3,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".pagination .icon, .pagination a", {
            opacity: 0,
            y: 10,
            stagger: 0.2,
            duration: 1,
            ease: "back.out(1.7)"
        });

        $(".pagination a").on("mouseenter", function() {
            gsap.to($(this), { scale: 1.2, duration: 0.2, ease: "back.out(1.7)" });
        });

        $(".pagination a").on("mouseleave", function() {
            gsap.to($(this), { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
        });
    });
 }

 if(currentPage === "textpage.html"){
    gsap.from("header p", {
        opacity: 0,
        y: -50,
        duration: 1.2,
        ease: "power2.out"
    });

    // Blockquote Fade and Slide Animation
    gsap.from("blockquote", {
        opacity: 0,
        y: 20,
        stagger: 0.3,
        duration: 1,
        ease: "power4.out"
    });

    // List Animation (bulleted and numbered)
    gsap.from(".textpage ul li, .textpage ol li", {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".textpage-text",
            start: "top 40%",
            
        }
    });

    // Heading Fade-in Animation
    gsap.from("h2", {
        opacity: 0,
        y: 30,
        stagger: 0.3,
        duration: 1.2,
        ease: "power3.out"
    });

    // Image Fade-in Animation
    gsap.from(".textpage-img img", {
        opacity: 0,
        scale: 1.1,
        duration: 1.5,
        ease: "power2.out"
    });

    // Scroll-triggered Animation for Paragraphs
 

    // Scroll-triggered Animation for Article Text
    gsap.from(".textpage-text", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".textpage-text",
            start: "top 80%",
            end: "bottom top",
            scrub: 1
        }
    });
 }



if(currentPage === "contact.html"){
    gsap.from(".contactpage header p", {
        opacity: 0,
        x: 150,
        duration: 1.5,
        ease: "power3.out"
    });

}
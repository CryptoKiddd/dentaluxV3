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

            slideMargin: 0,
            auto: true,
            swipeThreshold: 100,
            touchEnabled: true,  // Enable swipe gestures
            preventDefaultSwipeX: false,
        });
    }

    // Enable page scrolling when swiping
    $(document).on('touchmove', function (e) {
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
    let slideWidth = 218
    let slidesToShow = Math.min(8, totalSlides); // Ensure it doesn't exceed total slides
    if (window.innerWidth < 480) {
        slideWidth = 150
        slidesToShow = Math.min(2, totalSlides); // Ensure it doesn't exceed total slides

    }
    if (window.innerWidth < 401) {
        slideWidth = 110

    }

    recognitionsCarousel.bxSlider({
        slideWidth: slideWidth,
        minSlides: slidesToShow,
        maxSlides: slidesToShow,
        moveSlides: 1, // Move one slide at a time
        infiniteLoop: true,
        controls: false,
        margin: 10,
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
        let location = { lat:  41.64453132367018, lng: 41.62433159707863};
      
        let map = new google.maps.Map($('#map')[0], {
            zoom: 17,
            center: location
        });

        let marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: 'assets/images/logo.png'
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
                .animate({ height: "100%", paddingBottom: 50 }, 300, function () {
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




let lastScrollTop = 0;
let navigation = $(".navigation");
let logo = $(".mobile-wrapper .logo"); // Targeting the logo
const isMobile = window.innerWidth < 1050;

// Initial navigation setup
const setNavigationHeight = () => {
    const height = isMobile ? "130px" : "220px";
    const top = "0px";

    navigation.css({
        height: height,
        top: top,
        transition: "height 0.3s ease-in-out, top 0.3s ease-in-out"
    });

    logo.stop().animate({ paddingTop: 0 }, 200); // Reset logo padding on initial load
};


// Initialize navigation height on page load
setNavigationHeight();

// Update styles on window resize



if (isMobile) {
    $(window).scroll(function () {
        let currentScroll = $(this).scrollTop();
        console.log(currentScroll)

        // Change background color based on scroll position
        navigation.css("background-color", "#FFF2D7");

        // Scroll at the top (reset to initial height)
        if (currentScroll === 0) {
            setNavigationHeight();
            logo.stop().animate({ paddingTop: 0, width: 120, marginTop: 0 }, 200); // Shrink logo when navigation shrinks
            $('#nav-icon1').animate({ marginTop: 0 }, 200)


        } else if (currentScroll > lastScrollTop) {
            // Scrolling down
            if (navigation.height() > 100) {
                navigation.css({ height: "100px" });
                logo.stop().animate({ paddingTop: 0, width: 100, marginTop: -20 }, 200); // Shrink logo when navigation shrinks
                $('#nav-icon1').animate({ marginTop: -15 }, 200)
            }
            if (currentScroll > 200) {
                navigation.css({ top: "-250px" }); // Hide navigation if already at the minimum height
            }

        } else {
            // Scrolling up
            navigation.css({ top: "0px", height: "100px" }); // Show navigation and shrink height
        }

        lastScrollTop = currentScroll; // Update scroll position
    });

} else {
    $(window).resize(setNavigationHeight);

    $(window).scroll(function () {
        let currentScroll = $(this).scrollTop();

        // Change background color based on scroll position
        navigation.css("background-color", currentScroll > 200 ? "#FFF2D7" : "#FFF2D7");

        // Scroll at the top (reset to initial height)
        if (currentScroll === 0) {
            setNavigationHeight();
        } else if (currentScroll > lastScrollTop) {
            // Scrolling down
            if (navigation.height() > 130) {
                navigation.css({ height: "130px" });
                logo.stop().animate({ paddingTop: 10 }, 200); // Shrink logo when navigation shrinks
            } else {
                navigation.css({ top: "-250px" }); // Hide navigation if already at the minimum height
            }
        } else {
            // Scrolling up
            navigation.css({ top: "0px", height: "130px" }); // Show navigation and shrink height
        }

        lastScrollTop = currentScroll; // Update scroll position
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
if (currentPage === "" || currentPage === "index.html") {


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

if (currentPage === "services.html") {
    document.addEventListener("DOMContentLoaded", function () {
        gsap.registerPlugin(ScrollTrigger);

        // Header animation (fade in + move up)
        gsap.from(".servicepage header p", {
            x: -100,
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

if (currentPage === "achievments.html") {
    document.addEventListener("DOMContentLoaded", function () {
        gsap.registerPlugin(ScrollTrigger);

        // Header animation (fade in + move up)
        gsap.from(".servicepage header p", {
            x: -100,
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



if (currentPage === "projects.html" || currentPage === "blog.html" || currentPage === "news.html") {
    $(document).ready(function () {
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

        $(".pagination a").on("mouseenter", function () {
            gsap.to($(this), { scale: 1.2, duration: 0.2, ease: "back.out(1.7)" });
        });

        $(".pagination a").on("mouseleave", function () {
            gsap.to($(this), { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
        });
    });
}

if (currentPage === "textpage.html") {
    gsap.from("header p", {
        opacity: 0,
        x: -100,
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



if (currentPage === "contact.html") {
    gsap.from(".contactpage header p", {
        opacity: 0,
        x: -100,
        duration: 1.5,
        ease: "power3.out"
    });
    gsap.from(".contact-bar", {
        opacity: 0,
        y: 75,
        duration: 1.5,
        ease: "power3.out"
    })

}
$(".project-carousel-wrapper li").each(function (index, element) {
    gsap.from(element, {
        opacity: 0,
        y: 50, // Start slightly below
        duration: 0.6, // Duration per item
        ease: "power3.out",
        scrollTrigger: {
            trigger: element, // Trigger each <li> separately
            start: "top 85%", // Start when each <li> enters 85% of viewport
            toggleActions: "play none none none"
        }
    });
});

if ($(".working-hours-wrapper").length > 0) {



    $(document).ready(function () {
        // Define working hours array (similar to your React `workingHours`)
        const workingHours = [
            { day: "ორშაბათი", hours: "10:00 - 19:00", break: "", working: true },
            { day: "სამშაბათი", hours: "10:00 - 19:00", break: "", working: true },
            { day: "ოთხშაბათი", hours: "10:00 - 19:00", break: "", working: true },
            { day: "ხუთშაბათი", hours: "10:00 - 19:00", break: "", working: true },
            { day: "პარასკევი", hours: "10:00 - 19:00", break: "", working: true },
            { day: "შაბათი", hours: "10:00 - 16:00", break: "", working: true },
            { day: "კვირა", hours: "", break: "", working: false }
        ];

        // Generate HTML dynamically using jQuery
        workingHours.forEach((day, index) => {
            $(".working-hours-wrapper").append(`
                <div class="day ${day.working ? "" : "disabled"}" ">
                    <label class="switch">
                        <input type="checkbox" ${day.working ? "checked" : ""} disabled>
                        <span class="slider round"></span>
                    </label>
                    <p data-key="${index}" class="day-span">${day.day}</p>
                    <span class="hours-span">${day.hours || ""}</span>
                    <span class="break">${day.break}</span>
                </div>
            `);
        });
    });
}


// Translations object
const translations = {
    "ge": {
        "home": "მთავარი",
        "team": "ჩვენი გუნდი",
        "about": "შესახებ",
        "services": "სერვისები",
        "contact": "კონტაქტი",
        "achievements": "აღიარებები",
        "call_request": "დაგვირეკე ჩასაწერად",
        "about_us_header": "კომპანიის შესახებ",
        "quality": "ხარისხი",
        "modernity": "თანამედროვეობა",
        "experience": "გამოცდილება",
        "see_more": 'ვრცლად',
        "dentalux": "დენტალუქსი",
        "about-company-desc": "„დენტალუქსი“ – პროფესიონალიზმის, გამოცდილებისა და თანამედროვე ტექნოლოგიების სინთეზი. ჩვენ ვართ სტომატოლოგიური კლინიკების ქსელი და დიპლომისშემდგომი უწყვეტი განათლების სასწავლო ცენტრი, რომელიც მდებარეობს ბათუმში და ორიენტირებულია როგორც მაღალხარისხიანი სამედიცინო მომსახურების მიწოდებაზე, ისე ახალგაზრდა სტომატოლოგების პროფესიულ განვითარებაზე. „დენტალუქსის“ გუნდი აერთიანებს კვალიფიციურ ექიმებს, ინოვაციურ მიდგომებსა და პაციენტზე მაქსიმალურად ზრუნვის კულტურას. კლინიკას მინიჭებული აქვს ISO საერთაშორისო სერტიფიკატი, რაც ადასტურებს მომსახურების მაღალ სტანდარტს. წლების განმავლობაში „დენტალუქსი“ გახდა აღიარებული ბრენდი, რომელიც არაერთი პროფესიული ჯილდოთი და სერტიფიკატით არის დაჯილდოებული. ჩვენ ვამაყობთ იმით, რომ ვქმნით სივრცეს, სადაც პაციენტები იღებენ ინდივიდუალურად მორგებულ მკურნალობას, ხოლო ექიმები — მუდმივი განვითარების შესაძლებლობებს.",
        "service_header": "ჩვენი სერვისები",
        "dental_implants": "იმპლანტოლოგია",
        "periodontology":"პაროდონტოლოგია ",
        "orthodontics": "ორთოპედიული სტომატოლოგია ",
        "surgery": "ქირურგიული სტომატოლოგია",
        "therapy": "თერაპიული სტომატოლოგია ",
        "children": "ბავშვთა სტომატოლოგია",
        "microscope": "მიკროსკოპიული სტომატოლოგია",
        "radiology": " რენტგენოლოგიური სერვისები ",
        "our_team_header": "ჩვენი გუნდი",
        "gulnara": "გულნარა დიასამიძე",
        "qeti": "ქეთევან ყუშიტაშვილი",
        "lia": "ლია მაღლაკელიძე",
        "eteri": "ეთერ დიასამიძე",
        "maia": "მაია დიასამიძე",
        "megi": "მეგი მამულაძე",
        "nodari": "ნოდარ მესხი",
        "alex": "ალექსი თორია",
        "maiaT": "მაია ტალიკაძე",
        "nino": "ნინო ყუშიტაშვილი",
        "daria": "პავლოვა დარია დიმიტრიევნა",
        "0": "ორშაბათი",
        "1": "სამშაბათი",
        "2": "ოთხშაბათი",
        "3": "ხუთშაბათი",
        "4": "პარასკევი",
        "5": "შაბათი",
        "6": "კვირა",
        "about_comapny": "კომპანიის შესახებ",
        "contact_page": "კონტაქტების  გვერდი",
        "location1": " ზურაბ გორგილაძის 69, ბათუმი",
        "location2": " ფარნავაზ მეფის 140, ბათუმი",
        "main_slider_header1": "დენტალუქსი",
        "main_slider_header2": "სერვისების ფართო სპექტრი",
        "main_slider_text": "გაიმჯობესეთ თქვენი ღიმილი ექსპერტული სტომატოლოგიური მოვლის, თანამედროვე ტექნოლოგიებისა და ინდივიდუალური მკურნალობის საშუალებით, მუდმივი შედეგებისთვის.",
        "main_slider_text2": "სტომატოლოგიური სერვისების ფართო სპექტრი, რომელიც მიზნად ისახავს თქვენს კომფორტსა და ორალური ჯანმრთელობის დაცვას. რეგულარული შემოწმებებიდან დაწყებული, მოწინავე პროცედურებამდე, ჩვენ ვუზრუნველყოფთ უმაღლესი ხარისხის მოვლას.",
        "oral_surgery_description": "ქირურგიული სტომატოლოგია მოიცავს პათოლოგიურად შეცვლილი კბილების, რუდიმენტული (სიბრძნის) კბილების, ჩირქოვანი კერების, კისტების და სხვა დაავადებების ქირურგიულ მკურნალობას. „დენტალუქსში“ ყველა პროცედურა ტარდება თანამედროვე ტექნოლოგიებითა და სტერილურ გარემოში, მინიმალური ტკივილისა და მაქსიმალური სიზუსტის უზრუნველყოფით. ჩვენი ექიმ-ქირურგები გამოირჩევიან მაღალი კვალიფიკაციით და მრავალწლიანი პრაქტიკული გამოცდილებით.",
        "services_include": "სერვისები მოიცავს:",
        "tooth_extraction": "კბილის ამოღება (მარტივი და რთული ექსტრაქცია)",
        "wisdom_tooth_removal": "რუდიმენტული (სიბრძნის) კბილების ამოღება",
        "cystectomy": "კისტექტომია (კისტის მოცილება)",
        "apicoectomy": "აპიკოსექტომია (ფესვის წვერის რეზექცია)",
        "abscess_treatment": "ჩირქოვანი კერების მკურნალობა",
        "minor_surgeries": "მცირე ქირურგიული მანიპულაციები და პლასტიკური პროცედურები",
        "implantology_desc": "იმპლანტოლოგია თანამედროვე სტომატოლოგიის ერთ-ერთი უმნიშვნელოვანესი მიმართულებაა, რომელიც დაკარგული კბილების ჩანაცვლებას უზრუნველყოფს და „დენტალუქსში“ ხორციელდება უმაღლესი ხარისხის იმპლანტებითა და უახლესი ტექნოლოგიებით.",
        "implantation_consultation": "იმპლანტაციის კონსულტაცია და დაგეგმვა",
        "replacement_single_multiple_teeth": "ერთნაირი და მრავალნაირი კბილების ჩანაცვლება იმპლანტებით",
        "bone_augmentation": "ძვლის მატერიის მოცულობის აღდგენა (ძვლის გადანერგვა, სინუს ლიფტინგი)",
        "prosthetics_on_implants": "იმპლანტის საფუძველზე ორთოპედიული კონსტრუქციების შექმნა",

        "post_op_follow_up": "შემდეგი ეტაპების მონიტორინგი და პროფილაქტიკური კონტროლი",

        "pediatric_desc": "ბავშვთა სტომატოლოგია მოიცავს ბავშვების ასაკობრივი თავისებურებების გათვალისწინებით კბილებისა და ღრძილების პროფილაქტიკასა და მკურნალობას. „დენტალუქსში“ ჩვენ განსაკუთრებულად ვზრუნავთ პატარა პაციენტების კომფორტზე და ვქმნით მშვიდ, სასიამოვნო გარემოს, რათა ვიზიტი სტომატოლოგთან მათთვის გახდეს სასიამოვნო გამოცდილება. მკურნალობის პროცესი მორგებულია თითოეული ბავშვის ინდივიდუალურ საჭიროებებზე.",
        "pediatric_caries_prevention": "კარიესის პროფილაქტიკა და მკურნალობა",
        "pediatric_fillings": "ბჟენები ბავშვის კბილებზე",
        "pediatric_tooth_extraction": "რძის კბილების ექსტრაქცია",
        "pediatric_hygiene_and_fluoride": "ჰიგიენური და ფტორის აპლიკაცია",
        "pediatric_fissure_sealing": "დალუქვა (სელანტები)",
        "pediatric_parental_consultations": "მშობლებისთვის კონსულტაციები ბავშვთა პირის ღრუს ჯანმრთელობაზე",

        "therapy_desc": "თერაპიული სტომატოლოგია მიზნად ისახავს კბილების კონსერვატიულ მკურნალობას, რაც გულისხმობს კარიესისა და მისი გართულებული ფორმების – პულპიტისა და პაროდონტიტის დიაგნოსტიკასა და მკურნალობას. „დენტალუქსში“ ჩვენ ვიყენებთ თანამედროვე მეთოდებსა და მაღალტექნოლოგიურ მასალებს, რაც უზრუნველყოფს მკურნალობის მაღალ ეფექტურობასა და გრძელვადიან შედეგს. ჩვენი მიზანია, პაციენტს შევუნარჩუნოთ ბუნებრივი კბილი და დავუბრუნოთ ფუნქციური და ესთეტიკური კომფორტი.",

"caries_treatment": "კარიესის მკურნალობა",
      "tooth_fillings": "კბილების ამოღება (თეთრი ბუმბეროვანი ბჟენებით)",
      "pulpitis_and_periodontitis": "პულპიტისა და პაროდონტიტის მკურნალობა",
      "endodontic_treatment": "ენდოდონტიური (არხების) მკურნალობა მექანიკური და აპარატურული სისტემებით",
      "temporary_and_permanent_fillings": "დროებითი და მუდმივი ბჟენები",
      "preventive_visits_and_consultation": "პროფილაქტიკური ვიზიტები და კონსულტაცია",
      "prosthodontics_desc": "ორთოპედიული სტომატოლოგია მოიცავს კბილთა აღდგენასა და ჩანაცვლებასთან დაკავშირებულ თანამედროვე მეთოდებს, რომლებიც ეხმარება ღეჭვითი ფუნქციის, ესთეტიკისა და პაციენტის კომფორტის აღდგენას. „დენტალუქსში“ ჩვენ ვთავაზობთ ინდივიდუალურად მორგებულ ორთოპედიულ კონსტრუქციებს, რომლებიც პასუხობენ საერთაშორისო სტანდარტებს და უზრუნველყოფენ ბუნებრივ იერსახესა და მაღალ ფუნქციურ ხარისხს. ჩვენი ორთოპედები მუშაობენ უახლესი ტექნოლოგიებითა და მაღალი ხარისხის მასალებით.",
      "ceramic_crowns_and_bridges": "კერამიკული გვირგვინები და ხიდები (მეტალზე და ცირკონზე)",
      "zirconia_restorations": "უნაკლო ცირკონის კონსტრუქციები (CAD/CAM ტექნოლოგიით)",
      "removable_dentures": "მოხსნადი პროთეზები (სრულად და ნაწილობრივ)",
      "implant_supported_restorations": "იმპლანტზე დაფუძნებული ორთოპედიული კონსტრუქციები",
      "aesthetic_restorations": "ესთეტიკური კონსტრუქციები წინა ზონის აღდგენისთვის",
      "temporary_restorations": "დროებითი კონსტრუქციები მკურნალობის შუალედური ეტაპისთვის",

      "periodontology_desc": "პაროდონტოლოგია ეხება ღრძილების და კბილთა დამჭერი ქსოვილების დაავადებების დიაგნოსტიკასა და მკურნალობას. პაროდონტოზი და პაროდონტიტი გავრცელებული პრობლემებია, რომელთა უყურადღებობა ხშირად იწვევს კბილების დაკარგვას. „დენტალუქსში“ ჩვენ ვახორციელებთ დროულ დიაგნოსტიკას, სამკურნალო და პროფილაქტიკურ ღონისძიებებს, რაც მნიშვნელოვნად აუმჯობესებს პაციენტის ზოგად სტომატოლოგიურ ჯანმრთელობას.",
      "gum_inflammation_diagnosis_and_treatment": "ღრძილების ანთების დიაგნოსტიკა და მკურნალობა",
      "professional_dental_cleaning": "ღრძილების პროფესიული წმენდა (სკეილინგი და პოლიშინგი)",
      "deep_cleaning": "ღრმული წმენდა (ქვედა ღრძილქვეშა წმენდა)",
      "periodontal_pocket_therapy": "ღრძილის ჯიბეების სამკურნალო თერაპია",
      "periodontal_maintenance": "პაროდონტოლოგიური კონტროლი და რეგულარული მონიტორინგი",
      "oral_hygiene_improvement_recommendations": "რეკომენდაციები პირის ღრუს ჰიგიენის გაუმჯობესებისთვის",

      "radiology_services_desc": "ზუსტი დიაგნოზი სწორ მკურნალობას საფუძვლად უდევს, და სწორედ ამიტომ რადიოლოგიური კვლევები მნიშვნელოვან როლს ასრულებს სტომატოლოგიურ პრაქტიკაში. „დენტალუქსში“ პაციენტებს ვთავაზობთ თანამედროვე, დაბალდოზიან რენტგენოლოგიურ სერვისებს, რაც უზრუნველყოფს მაქსიმალურ ინფორმაციულ სიზუსტესა და პაციენტის უსაფრთხოებას. ჩვენი გუნდი იყენებს უახლეს ციფრულ აპარატურას და დოზირების საერთაშორისო სტანდარტებს.",
      "panoramic_xray": "პანორამული რენტგენი (ორთოპანთომოგრამა)",
      "3d_tomography": "3D ტომოგრაფია (CBCT)",
      "targeted_xray": "მიზნობრივი რენტგენი (პერაპიკალური და ბიტვინგი)",
      "implant_planning_radiological_assessment": "იმპლანტაციის წინასწარი დაგეგმვის რადიოლოგიური ანალიზი",
      "radiology_consultation": "რადიოლოგიური კონსულტაცია და აღწერა",
      "coming_soon":"ინფორმაცია მალე დაემატება",
      "marine":"მარინე ტაკიძე",

    
    },
    "en": {
        "home": "Home",
        "blog": "Blog",
        "team": "Our Team",
        "about": "About",
        "services": "Services",
        "contact": "Contact",
        "achievements": "Achievements",
        "call_request": "Call To Schedule",
        "dentalux": "DENTALUX",
        "about_comapny": "About Company",
        "quality": "Quality",
        "modernity": "Modernity",
        "experience": "Experience",
        "about_us_header": "About Company",
        "about-company-desc": "Dentalux – a fusion of professionalism, experience, and modern technology. We are a network of dental clinics and a postgraduate continuous education center based in Batumi, dedicated to delivering high-quality dental care and fostering the professional development of young dentists. The Dentalux team combines qualified specialists, innovative approaches, and a strong culture of patient-centered care. Our clinic is ISO certified, ensuring the highest standards of service and quality. Over the years, Dentalux has become a recognized and trusted brand, awarded with multiple professional certifications and honors. We are proud to provide an environment where patients receive personalized treatment and doctors find continuous opportunities for growth.",
        "service_header": "Our Services",
        "dental_implants": "Implantology",
        "orthodontics": "Prosthodontics",
        "surgery": "Dental Surgery",
        "therapy": "Therapeutic Dentistry",
"periodontology":"Periodontology",
        "children": "Pediatric Dentistry",
        "microscope": "Microscopic Dentistry",
        "radiology": "Radiology Services ",
        "see_more": "see more",
        "our_team_header": "Our Team",
        "gulnara": "Gulnara Diasamidze",
        "qeti": "Ketevan Khushitashvili",
        "lia": "Lia Maghlakelidze",
        "eteri": "Eter Diasamidze",
        "maia": "Maia Diasamidze",
        "megi": "Megi Mamuladze",
        "nodari": "Nodar Meskhi",
        "alex": "Alex Toria",
        "maiaT": "Maia Talikadze",
        "nino": "Nino Khushitashvili",
        "daria": "Pavlova Daria Dimitrievna",
        "marine":"Marine Takidze",
        "0": "Monday",
        "1": "Tuesday",
        "2": "Wednesday",
        "3": "Thursday",
        "4": "Friday",
        "5": "Saturday",
        "6": "Sunday",
        "contact_page": "Contact Page",
        "location1": " Zurab Gorgiladze 69, Batumi",
        "location2": " King Pharnavaz 140, Batumi",
        "main_slider_header1": "DENATALUX",
        "main_slider_header2": "Wide Range Of Services",
        "main_slider_text": "Transform your smile with expert dental care, modern technology, and personalized treatments for lasting results.",
        "main_slider_text2": "Discover a wide range of dental services designed for your comfort and oral health. From routine check-ups to advanced procedures, we ensure top-notch care every step of the way.",

        "oral_surgery_description": "Oral surgery involves the surgical treatment of diseased teeth, impacted wisdom teeth, abscesses, cysts, and other oral pathologies. At Dentalux, all procedures are performed using modern technologies in a sterile environment, ensuring minimal discomfort and maximum precision. Our oral surgeons are highly qualified professionals with many years of clinical experience.",
        "services_include": "Services include:",
        "tooth_extraction": "Tooth extraction (simple and complex)",
        "wisdom_tooth_removal": "Surgical removal of wisdom teeth",
        "cystectomy": "Cystectomy (removal of cysts)",
        "apicoectomy": "Apicoectomy (root-end resection)",
        "abscess_treatment": "Treatment of abscesses and infections",
        "minor_surgeries": "Minor surgical procedures and soft tissue plastic surgery",
        "implantology_desc": "Implantology is one of the most essential branches of modern dentistry, offering a reliable solution for replacing missing teeth, and at Dentalux, the implant placement process is performed using high-quality implant systems and the latest technologies.",
        "pediatric_desc": "Pediatric dentistry focuses on the prevention and treatment of dental and gum problems in children, considering their age-specific needs. At Dentalux, we pay special attention to the comfort of our young patients and create a calm, friendly environment to make dental visits a pleasant experience. Our treatment approach is tailored to each child’s individual needs.",

        "implantation_consultation": "Consultation and treatment planning for implants",
        "replacement_single_multiple_teeth": "Replacement of single or multiple missing teeth",
        "bone_augmentation": "Bone augmentation procedures (bone grafting, sinus lift)",
        "prosthetics_on_implants": "Prosthetic restorations on implants",
        "pediatric_caries_prevention": "Caries prevention and treatment",
        "pediatric_fillings": "Fillings for primary (baby) teeth",
        "pediatric_tooth_extraction": "Extraction of baby teeth",
        "pediatric_hygiene_and_fluoride": "Dental hygiene and fluoride application",
        "pediatric_fissure_sealing": "Fissure sealing (sealants)",
        "pediatric_parental_consultations": "Parental consultations on children’s oral health",
        "coming_soon":"Information will be added soon",

        

    "therapy_desc": "Therapeutic dentistry focuses on the conservative treatment of teeth, including the diagnosis and treatment of caries and its complications — pulpitis and periodontitis. At Dentalux, we apply advanced methods and high-quality materials to ensure effective and long-lasting results. Our goal is to preserve the patient’s natural tooth structure while restoring both function and aesthetics.",

      "caries_treatment": "Caries treatment",
      "tooth_fillings": "Tooth fillings (white composite restorations)",
      "pulpitis_and_periodontitis": "Treatment of pulpitis and periodontitis",
      "endodontic_treatment": "Endodontic (root canal) treatment using mechanical and instrumental systems",
      "temporary_and_permanent_fillings": "Temporary and permanent fillings",
      "preventive_visits_and_consultation": "Preventive visits and consultation",

      "prosthodontics_desc": "Prosthodontics focuses on the restoration and replacement of missing or damaged teeth using modern techniques that improve chewing function, aesthetics, and overall patient comfort. At Dentalux, we offer custom-made prosthetic solutions that meet international standards and provide patients with natural appearance and high functional value. Our prosthodontists use advanced technologies and high-quality materials for optimal results.",
      "ceramic_crowns_and_bridges": "Ceramic crowns and bridges (metal-based or zirconia)",
      "zirconia_restorations": "Full-contour zirconia restorations (CAD/CAM technology)",
      "removable_dentures": "Removable dentures (complete and partial)",
      "implant_supported_restorations": "Implant-supported prosthetic restorations",
      "aesthetic_restorations": "Aesthetic restorations for front zone restoration",
      "temporary_restorations": "Temporary restorations for interim treatment phases",


      "periodontology_desc": "Periodontology focuses on the diagnosis and treatment of gum diseases and supporting structures of the teeth. Conditions such as gingivitis and periodontitis are common and, if left untreated, can lead to tooth loss. At Dentalux, we provide timely diagnosis, therapeutic and preventive care to significantly improve overall dental health.",
    "gum_inflammation_diagnosis_and_treatment": "Diagnosis and treatment of gum inflammation",
    "professional_dental_cleaning": "Professional dental cleaning (scaling and polishing)",
    "deep_cleaning": "Deep cleaning (subgingival scaling)",
    "periodontal_pocket_therapy": "Treatment of periodontal pockets",
    "periodontal_maintenance": "Periodontal maintenance and regular monitoring",
    "oral_hygiene_improvement_recommendations": "Oral hygiene improvement recommendations",

"radiology_services_desc": "Accurate diagnosis is the foundation of successful treatment, and radiological imaging plays a vital role in dental care. At Dentalux, we offer state-of-the-art, low-dose radiology services to provide precise diagnostic information while ensuring patient safety. Our team uses advanced digital equipment in accordance with international radiation standards.",
    "panoramic_xray": "Panoramic X-ray (Orthopantomogram)",
    "3d_tomography": "3D tomography (CBCT)",
    "targeted_xray": "Targeted X-rays (periapical and bitewing)",
    "implant_planning_radiological_assessment": "Radiological assessment for implant planning",
    "radiology_consultation": "Radiology consultation and interpretation",
    
    }








}


// Function to change the language
async function changeLanguage(language) {
    const elements = document.querySelectorAll('[data-key]'); // Find all elements with data-key attribute
    elements.forEach(link => {
        const key = link.getAttribute('data-key');  // Get the key from data attribute
        if (translations[language] && translations[language][key]) {
            link.textContent = translations[language][key];  // Change the text based on the selected language
        }
    });

    // Save the language preference in localStorage to persist across pages
    localStorage.setItem('language', language);
}

// Function to load the current language from localStorage
function loadLanguage() {
    const currentLanguage = localStorage.getItem('language') || 'ge'; // Default to Georgian if no language is set
    changeLanguage(currentLanguage); // Update the page content based on the current language
}

// Add event listener to your language switcher container
document.querySelector('.change-lang').addEventListener('click', function () {
    const currentLanguage = localStorage.getItem('language') === 'en' ? 'ge' : 'en';  // Toggle between Georgian and English
    changeLanguage(currentLanguage);  // Update the page content
    $(this).text(currentLanguage === 'en' ? "ქარ" : 'EN');
});

// Load the selected language when the page loads
loadLanguage();

// function to include html popup video code
function includePopupHtml() {
    let html = `
        <div class="video-section">
            <div class="main-video-popup">
                <video controls src="./video.mp4"></video>
            </div>
        </div>`;
    let popDiv = document.createElement("div");
    popDiv.innerHTML = html;
    document.body.insertBefore(popDiv, document.body.firstChild);
}

// function init plugin
function videoPopupInit() {

    includePopupHtml();

    // select both buttons (.paly-btn and .play-btn)
    let buttons = document.querySelectorAll(".paly-btn, .play-btn");
    let popup = document.querySelector(".video-section");
    let videoEl = popup.querySelector("video");

    // add click listener to each button
    buttons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation(); // prevent immediate closing
            popup.style.display = "block";
            videoEl.currentTime = 0;
            videoEl.play();
        });
    });

    // hide popup when user clicks anywhere outside the video
    popup.addEventListener("click", function () {
        popup.style.display = "none";
        videoEl.pause();
    });

    // stop closing if clicking inside the video itself
    videoEl.addEventListener("click", function (e) {
        e.stopPropagation();
    });
}

videoPopupInit();




// Products List Script
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive  breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }

});


// Saying About Our Product Script

const products = new Swiper('.slider-wrappers', {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-nex',
        prevEl: '.swiper-button-pre',
    },

    // Responsive  breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }

});


// Form Validation
let userName = document.getElementById("username");
let userEmail = document.getElementById("email");
let flag = 1;

function validateForm() {
    if (userName.value == "") {
        document.getElementById("userError").innerHTML = "Username is Empty";
        flag = 0;
    } else if (userName.value.length < 3) {
        document.getElementById("userError").innerHTML = "Username is require min 3 char";
        flag = 0;
    } else {
        document.getElementById("userError").innerHTML = "";
        flag = 1;
    }
    if (userEmail.value == "") {
        document.getElementById("emailError").innerHTML = "Email is Empty";
        flag = 0;
    } else {
        document.getElementById("emailError").innerHTML = "";
        flag = 1;
    } if (flag) {
        return true;
    } else {
        return false;
    }
}
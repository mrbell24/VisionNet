/*==================================================
VISIONNEST HERO SLIDER
==================================================*/

const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".slider-dots");

let currentSlide = 0;
let sliderInterval;

/*==================================================
CREATE DOTS
==================================================*/

slides.forEach((slide,index)=>{

    const dot=document.createElement("span");

    if(index===0){

        dot.classList.add("active");

    }

    dot.addEventListener("click",()=>{

        showSlide(index);

        restartSlider();

    });

    dotsContainer.appendChild(dot);

});

const dots=document.querySelectorAll(".slider-dots span");

/*==================================================
SHOW SLIDE
==================================================*/

function showSlide(index){

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    dots.forEach(dot=>{

        dot.classList.remove("active");

    });

    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide=index;

}

/*==================================================
NEXT SLIDE
==================================================*/

function nextSlide(){

    currentSlide++;

    if(currentSlide>=slides.length){

        currentSlide=0;

    }

    showSlide(currentSlide);

}

/*==================================================
PREVIOUS SLIDE
==================================================*/

function prevSlide(){

    currentSlide--;

    if(currentSlide<0){

        currentSlide=slides.length-1;

    }

    showSlide(currentSlide);

}

/*==================================================
AUTO SLIDER
==================================================*/

function startSlider(){

    sliderInterval=setInterval(nextSlide,5000);

}

function restartSlider(){

    clearInterval(sliderInterval);

    startSlider();

}

/*==================================================
BUTTON EVENTS
==================================================*/

nextBtn.addEventListener("click",()=>{

    nextSlide();

    restartSlider();

});

prevBtn.addEventListener("click",()=>{

    prevSlide();

    restartSlider();

});

/*==================================================
PAUSE ON HOVER
==================================================*/

const hero=document.querySelector(".hero");

hero.addEventListener("mouseenter",()=>{

    clearInterval(sliderInterval);

});

hero.addEventListener("mouseleave",()=>{

    startSlider();

});

/*==================================================
START
==================================================*/

startSlider();
/*==================================================
PRELOADER
==================================================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if(preloader){

        preloader.style.opacity = "0";

        setTimeout(()=>{

            preloader.style.display = "none";

        },600);

    }

});


/*==================================================
STICKY HEADER
==================================================*/

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 80){

        header.classList.add("sticky");

    }

    else{

        header.classList.remove("sticky");

    }

});

/*==================================================
MOBILE MENU
==================================================*/

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if(menuBtn && navbar){

    menuBtn.addEventListener("click",()=>{

        navbar.classList.toggle("active");

        menuBtn.classList.toggle("active");

    });

}

/*==================================================
CLOSE MENU AFTER CLICK
==================================================*/

const navLinks = document.querySelectorAll("#navbar a");

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navbar.classList.remove("active");

        menuBtn.classList.remove("active");

    });

});

/*==================================================
ACTIVE MENU ON SCROLL
==================================================*/

const sections=document.querySelectorAll("section[id]");

window.addEventListener("scroll",()=>{

    let scrollY=window.pageYOffset;

    sections.forEach(section=>{

        const sectionHeight=section.offsetHeight;

        const sectionTop=section.offsetTop-120;

        const sectionId=section.getAttribute("id");

        const currentLink=document.querySelector('#navbar a[href="#'+sectionId+'"]');

        if(scrollY>sectionTop && scrollY<=sectionTop+sectionHeight){

            currentLink?.classList.add("active");

        }else{

            currentLink?.classList.remove("active");

        }

    });

});

/*==================================================
CLICK OUTSIDE TO CLOSE MENU
==================================================*/

document.addEventListener("click",(e)=>{

    if(!navbar.contains(e.target) && !menuBtn.contains(e.target)){

        navbar.classList.remove("active");

        menuBtn.classList.remove("active");

    }

});


/*==================================================
COUNTER ANIMATION
==================================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;

            const target = +counter.getAttribute("data-target");

            let count = 0;

            const speed = target / 120;

            const updateCounter = ()=>{

                if(count < target){

                    count += speed;

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                }

                else{

                    counter.innerText = target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

},
{
    threshold:0.5
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/*==================================================
PORTFOLIO FILTER
==================================================*/

const filterButtons=document.querySelectorAll(".portfolio-filter button");

const portfolioCards=document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

const filter=button.dataset.filter;

portfolioCards.forEach(card=>{

if(filter==="all"){

card.style.display="block";

setTimeout(()=>{

card.style.opacity="1";

card.style.transform="scale(1)";

},100);

}

else if(card.classList.contains(filter)){

card.style.display="block";

setTimeout(()=>{

card.style.opacity="1";

card.style.transform="scale(1)";

},100);

}

else{

card.style.opacity="0";

card.style.transform="scale(.8)";

setTimeout(()=>{

card.style.display="none";

},300);

}

});

});

});

/*==================================================
TESTIMONIAL SLIDER
==================================================*/

const testimonialCards=document.querySelectorAll(".testimonial-card");
const testimonialPrev=document.querySelector(".testimonial-prev");
const testimonialNext=document.querySelector(".testimonial-next");
const testimonialDotsContainer=document.querySelector(".testimonial-dots");

let testimonialIndex=0;
let testimonialInterval;

/*=========================
CREATE DOTS
=========================*/

testimonialCards.forEach((card,index)=>{

const dot=document.createElement("span");

if(index===0){

dot.classList.add("active");

}

dot.addEventListener("click",()=>{

showTestimonial(index);

restartTestimonials();

});

testimonialDotsContainer.appendChild(dot);

});

const testimonialDots=document.querySelectorAll(".testimonial-dots span");

/*=========================
SHOW
=========================*/

function showTestimonial(index){

testimonialCards.forEach(card=>{

card.classList.remove("active");

});

testimonialDots.forEach(dot=>{

dot.classList.remove("active");

});

testimonialCards[index].classList.add("active");

testimonialDots[index].classList.add("active");

testimonialIndex=index;

}

/*=========================
NEXT
=========================*/

function nextTestimonial(){

testimonialIndex++;

if(testimonialIndex>=testimonialCards.length){

testimonialIndex=0;

}

showTestimonial(testimonialIndex);

}

/*=========================
PREVIOUS
=========================*/

function prevTestimonial(){

testimonialIndex--;

if(testimonialIndex<0){

testimonialIndex=testimonialCards.length-1;

}

showTestimonial(testimonialIndex);

}

/*=========================
AUTO
=========================*/

function startTestimonials(){

testimonialInterval=setInterval(nextTestimonial,5000);

}

function restartTestimonials(){

clearInterval(testimonialInterval);

startTestimonials();

}

/*=========================
BUTTONS
=========================*/

testimonialNext.addEventListener("click",()=>{

nextTestimonial();

restartTestimonials();

});

testimonialPrev.addEventListener("click",()=>{

prevTestimonial();

restartTestimonials();

});

/*=========================
PAUSE ON HOVER
=========================*/

const testimonialSection=document.querySelector(".testimonials");

testimonialSection.addEventListener("mouseenter",()=>{

clearInterval(testimonialInterval);

});

testimonialSection.addEventListener("mouseleave",()=>{

startTestimonials();

});

/*=========================
TOUCH SWIPE
=========================*/

let touchStartX=0;

testimonialSection.addEventListener("touchstart",(e)=>{

touchStartX=e.changedTouches[0].screenX;

});

testimonialSection.addEventListener("touchend",(e)=>{

let touchEndX=e.changedTouches[0].screenX;

if(touchStartX-touchEndX>50){

nextTestimonial();

restartTestimonials();

}

if(touchEndX-touchStartX>50){

prevTestimonial();

restartTestimonials();

}

});

/*=========================
START
=========================*/

startTestimonials();

/*==================================================
SEARCH SYSTEM
==================================================*/

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function searchWebsite() {

    const keyword = searchInput.value.trim().toLowerCase();

    if(keyword===""){

        alert("Please enter a keyword.");

        return;

    }

    const sections = document.querySelectorAll("section");

    let found = false;

    sections.forEach(section=>{

        const data = section.dataset.search;

        if(data && data.toLowerCase().includes(keyword)){

            section.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

            found = true;

        }

    });

    if(!found){

        alert("No matching content found.");

    }

}

/* Button */

searchBtn.addEventListener("click",searchWebsite);

/* Enter Key */

searchInput.addEventListener("keyup",(e)=>{

    if(e.key==="Enter"){

        searchWebsite();

    }

});

/*==================================================
DARK MODE
==================================================*/

/*=====================================
SAVE DARK MODE
=====================================*/

const themeBtn=document.getElementById("themeBtn");

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){

document.body.classList.add("dark");

themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}else{

localStorage.setItem("theme","light");

themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

}

});

/* Toggle Theme */

themeBtn.addEventListener("click",()=>{

    body.classList.toggle("dark");

    if(body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeIcon.classList.remove("fa-moon");

        themeIcon.classList.add("fa-sun");

    }

    else{

        localStorage.setItem("theme","light");

        themeIcon.classList.remove("fa-sun");

        themeIcon.classList.add("fa-moon");

    }

});


/*==================================================
CONTACT FORM
==================================================*/

const contactForm=document.getElementById("contactForm");
const submitBtn=document.getElementById("submitBtn");
const formMessage=document.getElementById("formMessage");

contactForm.addEventListener("submit",(e)=>{

e.preventDefault();

/* Inputs */

const name=document.getElementById("name").value.trim();

const email=document.getElementById("email").value.trim();

const phone=document.getElementById("phone").value.trim();

const subject=document.getElementById("subject").value.trim();

const message=document.getElementById("message").value.trim();

/* Validation */

if(name==="" || email==="" || phone==="" || subject==="" || message===""){

showToast("Please fill in all fields.","error");

return;

}

/* Email */

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){

showToast("Invalid email address.","error");

return;

}

/* Phone */

const phonePattern=/^[0-9+ ]{9,15}$/;

if(!phonePattern.test(phone)){

showToast("Invalid phone number.","error");

return;

}

/* Loading */

submitBtn.disabled=true;

submitBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

/* Fake Server */

setTimeout(()=>{

showToast("Message sent successfully.","success");

contactForm.reset();

submitBtn.disabled=false;

submitBtn.innerHTML="Send Message";

},2000);

});

/*==================================================
MESSAGE
==================================================*/

function showMessage(text,type){

formMessage.innerHTML=text;

formMessage.className=type;

setTimeout(()=>{

formMessage.innerHTML="";

formMessage.className="";

},4000);

}

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitBtn = document.getElementById("submitBtn");
        const formMessage = document.getElementById("formMessage");

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

        const contactData = {

            name: document.getElementById("name").value.trim(),

            email: document.getElementById("email").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            subject: document.getElementById("subject").value.trim(),

            message: document.getElementById("message").value.trim()

        };

        try {

            const response = await fetch("http://localhost:5000/api/contact", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(contactData)

            });

            const result = await response.json();

            if (response.ok && result.success) {

                formMessage.innerHTML = `
                    <div class="success-message">
                        <i class="fa-solid fa-circle-check"></i>
                        Message sent successfully!
                    </div>
                `;

                contactForm.reset();

            } else {

                formMessage.innerHTML = `
                    <div class="error-message">
                        <i class="fa-solid fa-circle-xmark"></i>
                        ${result.message}
                    </div>
                `;

            }

        }

        catch (error) {

            console.error(error);

            formMessage.innerHTML = `
                <div class="error-message">
                    <i class="fa-solid fa-wifi"></i>
                    Unable to connect to the server.
                </div>
            `;

        }

        submitBtn.disabled = false;

        submitBtn.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Send Message
        `;

    });

}

/*==================================================
NEWSLETTER SUBSCRIPTION
==================================================*/

const newsletterForm=document.getElementById("newsletterForm");

const newsletterEmail=document.getElementById("newsletterEmail");

const newsletterBtn=document.getElementById("newsletterBtn");

const newsletterMessage=document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit",(e)=>{

e.preventDefault();

const email=newsletterEmail.value.trim();

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email===""){

showToast("Please enter your email.","error");

return;

}

if(!emailPattern.test(email)){

showToast("Invalid email address.","error");

return;

}

newsletterBtn.disabled=true;

newsletterBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';

setTimeout(()=>{

newsletterBtn.disabled=false;

newsletterBtn.innerHTML="Subscribe";

newsletterForm.reset();

showToast("Successfully subscribed.","success");

},2000);

});

function showNewsletter(text,type){

newsletterMessage.innerHTML=text;

newsletterMessage.className=type;

setTimeout(()=>{

newsletterMessage.innerHTML="";

newsletterMessage.className="";

},4000);

}

/*==================================================
SCROLL REVEAL
==================================================*/

const reveals=document.querySelectorAll(".reveal");

function revealSections(){

const windowHeight=window.innerHeight;

reveals.forEach(section=>{

const sectionTop=section.getBoundingClientRect().top;

const revealPoint=120;

if(sectionTop<windowHeight-revealPoint){

section.classList.add("active");

}

});

}

window.addEventListener("scroll",revealSections);

window.addEventListener("load",revealSections);



/*=====================================
PORTFOLIO LIGHTBOX
=====================================*/

const portfolioImages=document.querySelectorAll(".portfolio-image");

const lightbox=document.getElementById("lightbox");

const lightboxImg=document.getElementById("lightboxImg");

const closeLightbox=document.querySelector(".close-lightbox");

portfolioImages.forEach(img=>{

img.addEventListener("click",()=>{

lightbox.classList.add("active");

lightboxImg.src=img.src;

});

});

closeLightbox.addEventListener("click",()=>{

lightbox.classList.remove("active");

});

lightbox.addEventListener("click",(e)=>{

if(e.target===lightbox){

lightbox.classList.remove("active");

}

});

/*=====================================
PAGE PROGRESS BAR
=====================================*/

const progressBar=document.getElementById("progressBar");

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const progress=(scrollTop/height)*100;

progressBar.style.width=progress+"%";

});

/*=====================================
BUTTON RIPPLE EFFECT
=====================================*/

const buttons=document.querySelectorAll(".btn,.contact-btn,button");

buttons.forEach(button=>{

button.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const rect=button.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.classList.add("ripple");

button.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*=====================================
TOAST NOTIFICATION
=====================================*/

const toast=document.getElementById("toast");

const toastMessage=document.getElementById("toastMessage");

function showToast(message,type="success"){

toastMessage.innerHTML=message;

toast.classList.remove("error");

if(type==="error"){

toast.classList.add("error");

}

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3500);

}

/*=====================================
CTRL + K SEARCH
=====================================*/

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key.toLowerCase()==="k"){

e.preventDefault();

const input=document.getElementById("searchInput");

input.focus();

input.select();

showToast("Search Activated");

}

});

/*=====================================
COPY EMAIL
=====================================*/

const copyEmail=document.getElementById("copyEmail");

if(copyEmail){

copyEmail.style.cursor="pointer";

copyEmail.addEventListener("click",()=>{

navigator.clipboard.writeText("info@visionnest.co.tz");

showToast("Email Copied");

});

}

/*=====================================
COPY PHONE
=====================================*/

const copyPhone=document.getElementById("copyPhone");

if(copyPhone){

copyPhone.style.cursor="pointer";

copyPhone.addEventListener("click",()=>{

navigator.clipboard.writeText("+255790414987");

showToast("Phone Number Copied");

});

}

/*=====================================
WEB SHARE API
=====================================*/

const shareBtn=document.getElementById("shareWebsite");

if(shareBtn){

shareBtn.addEventListener("click",async()=>{

if(navigator.share){

try{

await navigator.share({

title:"VisionNest Company Limited",

text:"Professional Technology Company",

url:window.location.href

});

}catch(error){

console.log(error);

}

}else{

showToast("Sharing Not Supported","error");

}

});

}

/*=====================================
ONLINE OFFLINE STATUS
=====================================*/

window.addEventListener("offline",()=>{

showToast("No Internet Connection","error");

});

window.addEventListener("online",()=>{

showToast("Internet Connected");

});

/*=====================================
PRINT PAGE
=====================================*/

const printBtn=document.getElementById("printPage");

if(printBtn){

printBtn.addEventListener("click",()=>{

window.print();

});

}

/*=====================================
SCROLL BUTTON
=====================================*/

const topBtn=document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

/*=====================================
SAVE LANGUAGE
=====================================*/

const langBtn=document.getElementById("langBtn");

let currentLang=localStorage.getItem("language")||"EN";

langBtn.innerHTML=currentLang;

function changeLanguage(lang){

currentLang=lang;

langBtn.innerHTML=lang;

localStorage.setItem("language",lang);

/* hapa itaendelea kuita translation function yako */

}

langBtn.addEventListener("click",()=>{

if(currentLang==="EN"){

changeLanguage("SW");

}else{

changeLanguage("EN");

}

});


/*=====================================
SAVE SCROLL POSITION
=====================================*/

window.addEventListener("scroll",()=>{

localStorage.setItem("scrollPosition",window.scrollY);

});

window.addEventListener("load",()=>{

const saved=localStorage.getItem("scrollPosition");

if(saved){

window.scrollTo({

top:Number(saved),

behavior:"instant"

});

}

});

/*=====================================
FAVORITE PROJECT
=====================================*/

document.querySelectorAll(".favorite").forEach(icon=>{

icon.addEventListener("click",()=>{

icon.classList.toggle("active");

});

});

/*=====================================
VISITOR COUNTER DEMO
=====================================*/

let visitors=localStorage.getItem("visitors");

if(!visitors){

visitors=250;

}

visitors++;

localStorage.setItem("visitors",visitors);

document.getElementById("visitorCount").innerHTML=visitors;

/*=====================================
DEVELOPER MESSAGE
=====================================*/

console.log(

"%cVisionNest Company Limited",

"font-size:28px;color:#d40000;font-weight:bold;"

);

console.log(

"%cBuilding Future Digital Solutions",

"font-size:16px;color:#2563eb;"

);

document.getElementById("year").innerHTML=new Date().getFullYear();

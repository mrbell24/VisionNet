/*==================================================
VISIONNEST LANGUAGE SYSTEM
==================================================*/

const languageButton=document.getElementById("langBtn");

let currentLanguage="en";

const translations={

en:{

heroTitle:"Building Future Digital Solutions",

heroText:"We build modern websites, mobile applications, AI systems, branding solutions and business automation platforms that help companies grow.",

aboutTitle:"We Create Digital Solutions That Transform Businesses",

aboutDescription:"VisionNest Company Limited is a modern technology company committed to delivering innovative digital solutions.",

servicesTitle:"Professional Digital Services",

servicesDescription:"We provide complete technology solutions for businesses, organizations and startups.",

portfolioTitle:"Recent Projects",

contactTitle:"Let's Build Something Amazing Together"

},

sw:{

heroTitle:"Tunajenga Suluhisho za Kidijitali kwa Ajili ya Baadaye",

heroText:"Tunatengeneza tovuti za kisasa, programu za simu, mifumo ya AI, utambulisho wa biashara na mifumo ya kuboresha shughuli za biashara.",

aboutTitle:"Tunaunda Suluhisho za Kidijitali Zinazobadilisha Biashara",

aboutDescription:"VisionNest Company Limited ni kampuni ya teknolojia inayotoa suluhisho za kisasa za kidijitali.",

servicesTitle:"Huduma za Kitaalamu za Kidijitali",

servicesDescription:"Tunatoa huduma kamili za teknolojia kwa biashara, taasisi na kampuni changa.",

portfolioTitle:"Miradi Yetu ya Hivi Karibuni",

contactTitle:"Tujenge Kitu Bora Pamoja"

}

};

function translateWebsite(language){

document.querySelectorAll("[data-lang]").forEach(item=>{

const key=item.dataset.lang;

if(translations[language][key]){

item.innerHTML=translations[language][key];

}

});

}

languageButton.addEventListener("click",()=>{

currentLanguage=currentLanguage==="en" ? "sw" : "en";

languageButton.innerText=currentLanguage.toUpperCase();

translateWebsite(currentLanguage);

});
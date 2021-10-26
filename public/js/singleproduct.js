const menuSpan = document.querySelector(".menu-span");
const menu = document.querySelector(".menu");
const navbar = document.querySelector(".products-navbar");

menuSpan.addEventListener("click", function () {
    if(menu.classList.contains("active")){
        gsap.to(".menu", {opacity: 1, transform: "translateY(100px)", duration: 0.4});
        navbar.classList.add("nav-active");
       menu.classList.remove("active");
    }else{
        gsap.to(".menu", {opacity: 0, transform: "translateY(0)", duration: 0.3});
        navbar.classList.remove("nav-active");
        menu.classList.add("active");

    }
});

const smallImage = document.querySelectorAll(".small-img-col img");
const hugeImage = document.querySelector(".huge-img");


smallImage.forEach(function (image) {
    image.addEventListener("click", function (e) {

        let target = e.currentTarget.getAttribute("src");
        hugeImage.innerHTML = `<img src="${target}" alt="">`
        
    });
})
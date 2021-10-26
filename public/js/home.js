
const content = CSSRulePlugin.getRule(".header:before");
const headerTl = gsap.timeline();
headerTl.from(".content-sec h1", {stagger: 0.3, opacity:0, y: -30, duration: 0.8, ease: "back"});
headerTl.from(".content-sec p",{opacity: 0, y: -30, duration: 0.8, ease: "back"}, ">-.5");
headerTl.from(".content-sec a", {opacity: 0, x: 30, duration: 0.8, ease: "back"}, ">-.4");
headerTl.to(".header-images div", {stagger: 0.3, transform: "scaleY(1)", duration: 1, ease: "back"}, ">-.0");
headerTl.to(content, {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 3}, ">-3.0")

setTimeout(() => {
  const zoomTl = gsap.timeline();
zoomTl.to(".header-images div", { stagger: 0.07, y: -5, duration: 0.7}, "+=1");
zoomTl.to(".header-images div", { stagger: 0.07, y: 0, duration: 0.7, delay: 0.15}, ">-0.7");
zoomTl.repeat(-1).repeatDelay(0.1);

}, 6000);


// nav toggle
const navToggle = document.querySelector(".nav-span");
const navMenu = document.querySelector("#menu");
const navLink = navMenu.querySelectorAll("li");
const navAnchor = navMenu.querySelectorAll("a");


navToggle.addEventListener("click", function() {
  navToggle.classList.toggle("toggleActive");
  navMenu.classList.toggle("navActive");
});

navLink.forEach(function (link) {
  link.addEventListener("mouseenter", function () {
    gsap.to(link, {x: 7, color: "#ff5106", duration: 0.5, ease: "back"});

    link.addEventListener("mouseleave", function () {
      gsap.to(link, {x: 0, color: "black", duration: 1, ease: "back"});
    })
  });
});

navAnchor.forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    anchor.classList.add("active");

    navAnchor.forEach(function (nav) {
      if(nav.innerHTML !== e.currentTarget.innerHTML){
        nav.classList.remove("active");
      }
    });
    
  });
});



gsap.to(".col-3", {
  scrollTrigger: {
    trigger: ".categories",
    start: "top center",
    scrub: true,
  },
  transform: "rotate(20deg)",
  duration: 3
});



const latestCols = document.querySelectorAll(".latest-col");
const singleProduct = document.querySelector(".head-single");
const singleImg = document.querySelector(".huge-img");
const singleSmallImg = document.querySelectorAll(".small-img-col");
const singleProductColH1 = document.querySelector(".single-product-col-2 h1");
const singleProductColH4 = document.querySelector(".single-product-col-2 h4");
const smallImage = document.querySelectorAll(".small-img-col img");
const hugeImage = document.querySelector(".huge-img");
const addBtn = document.getElementById("addBtn");
const backBtn = document.getElementById("backBtn");
const counter = document.querySelector(".counter");
const checkout = document.querySelector(".checkout-items");
const shoppingCart = document.querySelector(".shopping-cart");
const priceTotal = document.querySelector(".total h4 span");
const cancel = document.querySelector(".cancel");
const checkoutBtn = document.querySelector(".checkout");
const checkoutCloseBtn = document.querySelector(".checkoutClose");
let count = 0;
let cartArray = []
let cartObj = {};
let amount;
let select;
let title;
let image;
let realPrice;
let total;
let totalPrice = 0;


latestCols.forEach(function(latestCol){

  latestCol.addEventListener("mouseenter", function(e){
    
    const hoveredDiv = e.currentTarget;
    const image = hoveredDiv.querySelector("img");
    const name = hoveredDiv.querySelector("h4");
    const rating = hoveredDiv.querySelector(".rating");
    const price = hoveredDiv.querySelector("p");
    
    
    image.classList.add("is-active");

    setTimeout(function(){
      name.style.right = "5%";
    }, 10);
    setTimeout(function(){
      rating.style.right = "5%";
    }, 60);
    setTimeout(function(){
      price.style.right = "5%";
    }, 110);
    
    latestCol.addEventListener("mouseleave", function(){
      image.classList.remove("is-active");
      name.style.right = "-100%";

      setTimeout(function(){
        rating.style.right = "-100%";
      }, 150);
      setTimeout(function(){
        price.style.right = "-100%";
      }, 300);
    });

    
  });

});


latestCols.forEach(function(item){
  item.addEventListener("click", function(e){
   
    const clickedDiv = e.currentTarget;
    image = clickedDiv.querySelector("img").getAttribute("src");
    title = clickedDiv.querySelector("h4").innerHTML;
    const price = clickedDiv.querySelector("p").innerHTML;
   realPrice = Number(price.slice(1, price.length));
    singleImg.innerHTML = ` <img src=${image} alt="">`
    singleSmallImg.forEach(function(small){
      small.innerHTML = `<img src=${image} alt="">`
    });
    singleProductColH1.innerHTML = title;
    singleProductColH4.innerHTML = price;
    singleProduct.style.opacity = "1";
    singleProduct.style.zIndex = "50";
  })

});

addBtn.addEventListener("click", function(){
  count ++;
  amount = document.getElementById("amount").value;
  amount = Number(amount);
  select = document.getElementById("select").value;
  total = realPrice * amount;
  cartArray.push({id: count, image: image, name: title, size : select, amount : amount, price: realPrice, total : total });
  document.getElementById("singleCart").style.opacity = "1";
  const singleCartTl = gsap.timeline({repeat: 15});
  singleCartTl.to("#singleCart", {transform: "rotate(-10deg)", transformOrigin: "center", duration: .05});
  singleCartTl.to("#singleCart", {transform: "rotate(10deg)", transformOrigin: "center", duration: .05})
  singleCartTl.to("#singleCart", {transform: "rotate(0deg)", transformOrigin: "center", duration: .05})
  
  cartObj = {id: count, image: image, name: title, size : select, amount : amount, price: realPrice, total : total }
 
  let checkoutItem = document.createElement("div");
    checkoutItem.setAttribute("id", `${cartObj.id}`);
    checkoutItem.classList.add("cart-item");
    checkoutItem.innerHTML = `<div class="cart-item-img">
    <img src=${cartObj.image} alt="">
  </div>
  <div class="cart-item-info">
    <p>${cartObj.name}</p>
    <p>${cartObj.size}</p>
    <P>${cartObj.amount}</P>
    <P>$${cartObj.price}</P>
  </div>
  <div class="cart-item-total">
    <h4>TOTAL</h4>
    <h2>$${cartObj.total}.00</h2>
  </div>
  <div class="cart-item-remove">
    <p>REMOVE</p>
  </div>`
  
  checkout.appendChild(checkoutItem);
  totalPrice += cartObj.total;
  counter.innerHTML = count;
  });

smallImage.forEach(function (image) {
  image.addEventListener("click", function (e) {

      let target = e.currentTarget.getAttribute("src");
      hugeImage.innerHTML = `<img src="${target}" alt="">`
      
  });
})


backBtn.addEventListener("click", function(){
singleProduct.style.opacity = "0";
singleProduct.style.zIndex = "-50";
document.getElementById("singleCart").style.opacity = "0";

document.getElementById("amount").value = "1";
document.getElementById("select").value = "Select Size";

});

shoppingCart.addEventListener("click", function(){
  document.querySelector(".checkout-section").style.zIndex = "100";
  priceTotal.innerHTML = totalPrice;

  const removeBtn = document.querySelectorAll(".cart-item-remove");
  removeBtn.forEach(function(btn){
   btn.addEventListener("click", removeItem);
  });

});

function removeItem(e){
  count --;
  let selectedItem = e.currentTarget.parentElement;
  selectedItem.style.display = "none";
  let selectedId = Number(e.currentTarget.parentElement.getAttribute("id"));
  
  let selectedPrice= cartArray.find((item) =>{
    return item.id == selectedId
     
  });
  cartArray = cartArray.filter((item)=> item.id !== selectedId);
 totalPrice -= selectedPrice.total;
 priceTotal.innerHTML = totalPrice;
 counter.innerHTML = count;
}

checkoutCloseBtn.addEventListener("click", function(){
document.querySelector(".checkout-section").style.zIndex = "-50";
});

cancel.addEventListener("click", function(){
cartArray = [];
totalPrice = 0;
priceTotal.innerHTML = totalPrice;
let cartItem = document.querySelectorAll(".cart-item");
cartItem.forEach(function(item){
  item.style.display = "none";
})
count = 0;
counter.innerHTML = count;
document.querySelector(".checkout-section").style.zIndex = "-50";
});

// offer animation
const offerBtn = document.querySelector(".offer-btn");
const offerImg = document.querySelector(".offer-col-2 img").getAttribute("src");

offerBtn.addEventListener("click", function(){
  
  count ++;

  cartArray.push({id: count,  total : 20 });

  let checkoutItem = document.createElement("div");
    checkoutItem.setAttribute("id", `${count}`);
    checkoutItem.classList.add("cart-item");
    checkoutItem.innerHTML = `<div class="cart-item-img">
    <img src=${offerImg} alt="">
  </div>
  <div class="cart-item-info">
    <p>SMART BAND 4</p>
    
  </div>
  <div class="cart-item-total">
    <h4>TOTAL</h4>
    <h2>$20.00</h2>
  </div>
  <div class="cart-item-remove">
    <p>REMOVE</p>
  </div>`
  
  checkout.appendChild(checkoutItem);
  totalPrice += 20;
  priceTotal.innerHTML = totalPrice;
  counter.innerHTML = count;
});
var offerTl = gsap.timeline();
offerTl.from(".offer-col-2 img", {transform: "rotate(30deg)", duration: 20});
offerTl.to(".offer-col-2 img", {transform: "rotate(30deg)", duration: 20});
offerTl.repeat(-1);



const featured = document.querySelector(".featured");
const colFours = document.querySelectorAll(".col-4");
const mainCol = document.querySelector(".main-col");
const colArray = Array.from(colFours);

var k = 0;

// colFours.forEach(function (col) {
//   gsap.from(col, { stagger: 1, left: 0, duration: 3, ease: "power3"})
// });

setInterval(() => {
  k++; 
  if(k > 0 && k < colArray.length){
    if(window.innerWidth < 560 ){
      colArray[k].style.visibilty = "visible";
    const featureTl = gsap.timeline();
    featureTl.to(colArray[k], { left: "16%", duration: 0.2});
    featureTl.to(colArray[k], {transform: "rotate(5deg)", transformOrigin: "bottom", duration: 0.2}, ">-0.1")
    featureTl.to(colArray[k], {transform: "rotate(-3deg)", transformOrigin: "bottom", duration: 0.1})
    featureTl.to(colArray[k], {transform: "rotate(0deg)", transformOrigin: "bottom", duration: 0.1})
    featureTl.to(colArray[k], {left: "110%", transform: "rotate(-5deg)", duration: 0.2, delay: 3});
  
    setTimeout(() => {
      colArray[k].style.visibilty = "hidden";
      colArray[k].style.left = "-110%";
    }, 4200);
    }else if(window.innerWidth > 560 && window.innerWidth < 1050){
      colArray[k].style.visibilty = "visible";
      const featureTl = gsap.timeline();
      featureTl.to(colArray[k], { left: "20%", duration: 0.2});
      featureTl.to(colArray[k], {transform: "rotate(5deg)", transformOrigin: "bottom", duration: 0.2}, ">-0.1")
      featureTl.to(colArray[k], {transform: "rotate(-3deg)", transformOrigin: "bottom", duration: 0.1})
      featureTl.to(colArray[k], {transform: "rotate(0deg)", transformOrigin: "bottom", duration: 0.1})
      featureTl.to(colArray[k], {left: "120%", transform: "rotate(0deg)", duration: 0.2, delay: 3});
    
      setTimeout(() => {
        colArray[k].style.visibilty = "hidden";
        colArray[k].style.left = "-110%";
      }, 4200);
      
    }else{
      colArray[k].style.visibilty = "visible";
      const featureTl = gsap.timeline();
      featureTl.to(colArray[k], { left: "35%", duration: 0.2});
      featureTl.to(colArray[k], {transform: "rotate(5deg)", transformOrigin: "bottom", duration: 0.2}, ">-0.1")
      featureTl.to(colArray[k], {transform: "rotate(-3deg)", transformOrigin: "bottom", duration: 0.1})
      featureTl.to(colArray[k], {transform: "rotate(0deg)", transformOrigin: "bottom", duration: 0.1})
      featureTl.to(colArray[k], {left: "100%", transform: "rotate(0deg)", duration: 0.2, delay: 3});
    
      setTimeout(() => {
        colArray[k].style.visibilty = "hidden";
        colArray[k].style.left = "-110%";
      }, 4200);
    }
  
  } else if(k == colArray.length){
    k = 0;
    colArray[0].style.visibilty = "visible";
    const firstTl = gsap.timeline();
    firstTl.to(colArray[0], { left: "35%", duration: 0.2, ease: "power3"});
    firstTl.to(colArray[0], {transform: "rotate(5deg)", transformOrigin: "bottom", duration: 0.2}, ">-0.1")
    firstTl.to(colArray[0], {transform: "rotate(-3deg)", transformOrigin: "bottom", duration: 0.1})
    firstTl.to(colArray[0], {transform: "rotate(0deg)", transformOrigin: "bottom", duration: 0.1})
    firstTl.to(colArray[0], {left: "110%", duration: 0.2, delay: 3});
  
    setTimeout(() => {
      colArray[0].style.visibilty = "hidden";
    colArray[0].style.left = "-110%";
   
    }, 4200);
  }

}, 4220);


  
  const testimony = document.querySelectorAll(".testimony-div");
  const testimonyArray = Array.from(testimony);
  var t = 0;

 var interval1 = () => {
  const tests1 = testimonyArray[0].querySelectorAll(".tests");
  let testsArray1 = Array.from(tests1);
  var i = testsArray1.length;
  let firstInterval = setInterval(() => {
    i--;
   if(i >= 0){
   
    const random1 = Math.floor(Math.random() * i);
    const randomSpan1 = testsArray1[random1];
    gsap.to(randomSpan1, {opacity: 1, duration: 0.1});
     testsArray1.splice(random1, 1);
   }else{
    clearInterval(firstInterval);
  }
   
    
 }, 50);
 
 
 }

 var interval2 = () => {
  const tests2 = testimonyArray[1].querySelectorAll(".tests");
 
  let testsArray2 = Array.from(tests2);
  var j = testsArray2.length;
  let secondInterval = setInterval(() => {
    j--;
    if(j >= 0){
   
   const random2 = Math.floor(Math.random() * j);
   const randomSpan2 = testsArray2[random2];
   gsap.to(randomSpan2, {opacity: 1, duration: 0.1});
    testsArray2.splice(random2, 1);
    }else{
      clearInterval(secondInterval);
    } 
 }, 50);

 }

 var interval3 = () => {
  const tests3 = testimonyArray[2].querySelectorAll(".tests");
  let testsArray3 = Array.from(tests3);
  var k = testsArray3.length;
  let thirdInterval = setInterval(() => {
    k--;
   if(k >= 0){
   
    const random3 = Math.floor(Math.random() * k);
    const randomSpan3 = testsArray3[random3];
    gsap.to(randomSpan3, {opacity: 1, duration: 0.1});
     testsArray3.splice(random3, 1);
   } else{
     clearInterval(thirdInterval);
   }
   
  

 }, 50);
  
 
 }

  
 let testInterval =  setInterval(() => {
      t++
      
      
      if(t == 1){
      testimonyArray[0].classList.remove("testimony-active");
      testimonyArray[0].style.opacity = 0;
      const testsOpacity1 = testimonyArray[0].querySelectorAll(".tests");
      testsOpacity1.forEach(function(opacity1) {
        opacity1.style.opacity = 0;
      });
      testimonyArray[1].classList.add("testimony-active");
      gsap.to(testimonyArray[1], {opacity: 1, duration: 1})
      interval2();
     
     }else if(t == 2){
        testimonyArray[1].classList.remove("testimony-active");
        testimonyArray[1].style.opacity = 0;

        const testsOpacity2 = testimonyArray[1].querySelectorAll(".tests");
      testsOpacity2.forEach(function(opacity2) {
        opacity2.style.opacity = 0;
      });
        testimonyArray[2].classList.add("testimony-active");
        gsap.to(testimonyArray[2], {opacity: 1, duration: 1})
        interval3();
        
      }else if(t == 3){
        t = 0;
        testimonyArray[2].classList.remove("testimony-active");
        testimonyArray[2].style.opacity = 0;

        const testsOpacity3 = testimonyArray[2].querySelectorAll(".tests");
      testsOpacity3.forEach(function(opacity3) {
        opacity3.style.opacity = 0;
      });
        testimonyArray[0].classList.add("testimony-active");
        gsap.to(testimonyArray[0], {opacity: 1, duration: 1})
        interval1();
      }
     
   }, 12000);




 

  

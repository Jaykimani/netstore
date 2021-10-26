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
    <h2>$${cartObj.total}</h2>
  </div>
  <div class="cart-item-remove">
    <p>REMOVE</p>
  </div>`
  
  checkout.appendChild(checkoutItem);
  totalPrice += cartObj.total;
  counter.innerHTML = count;
  console.log(cartArray)
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
  count--
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

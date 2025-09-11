

const loadTrees = () => {
fetch("https://openapi.programming-hero.com/api/categories")
.then((res) => res.json())
.then((json) => displayCategory(json.categories))
}

const displayCategory = (categories) =>{
const categoryContainer = document.getElementById("category-container")
for(let category of categories){
    const btnDiv =document.createElement("div")
    btnDiv.innerHTML = `<div onclick="cartCategory(${category.id})" id="few-cart-${category.id}" class="w-[200px] h-[35px] p-3 category-btn">${category.category_name}s
    </div>`;
    categoryContainer.append(btnDiv);
}
}

const removeActive = () => {
    const removeBtn = document.querySelectorAll(".category-btn");
    removeBtn.forEach((btn) => { btn.classList.remove("active")}); 

}
    const first = () => {
        removeActive();
        const firstBtn = document.getElementById("all-trees");
        firstBtn.classList.add("active");
    }

const cartCategory = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((json) =>{ 
       removeActive();
       const clickBtn = document.getElementById(`few-cart-${id}`);
        clickBtn.classList.add("active");
        showCart(json.plants)})
}
const showCart = (selecting) =>{
 let cartContainer =document.getElementById("cart-container");
 cartContainer.innerHTML ="";
 for(let select of selecting){
    const newCart = document.createElement("div");
    newCart.innerHTML =` <div class="p-6 max-h-[480px] w-[330px] bg-white">
    <img src="${select.image}" alt="" class="w-[300px] h-[180px] mb-2">
    <h3 class="font-semibold text-[14px] mb-1">${select.name}</h3>
    <p class="text-gray-500 mb-1">${select.description}</p> 
    <div class="flex justify-between items-baseline mb-2">
        <button class="min-w-[86px] min-h-[28px] bg-[#DCFCE7] text-[#15803D] rounded-xl">${select.category}</button>
        <p class="font-bold">৳${select.price}</p>
    </div>
    <button class="w-[300px] h-[45px] bg-[#15803D] text-white rounded-3xl mx-auto">Add to Cart</button>
   </div>`
   cartContainer.append(newCart);
 }

}

const loadCart = () =>{
    fetch("https://openapi.programming-hero.com/api/plants")
.then((res) => res.json())
.then((json) => displayCart(json.plants))
}
const displayCart = (carts) =>{

    let cartContainer =document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    for(let cart of carts){
    const cartDiv = document.createElement("div");
    cartDiv.innerHTML = ` <div class="p-6 max-h-[480px] w-[330px] bg-white">
    <img src="${cart.image}" alt="" class="w-[300px] h-[180px] mb-2">
    <h3 class="font-semibold text-[14px] mb-1">${cart.name}</h3>
    <p class="text-gray-500 mb-1">${cart.description}</p> 
    <div class="flex justify-between items-baseline mb-2">
        <button class="min-w-[86px] min-h-[28px] bg-[#DCFCE7] text-[#15803D] rounded-xl">${cart.category}</button>
        <p class="font-bold">৳${cart.price}</p>
    </div>
    <button class="w-[300px] h-[45px] bg-[#15803D] text-white rounded-3xl mx-auto">Add to Cart</button>
   </div>
`   
      cartContainer.append(cartDiv); 
    }
}

loadTrees();
loadCart();
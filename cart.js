
let sum = 0;


const manageSpinner = (status) =>{
    if(status === true){
     document.getElementById("spinner").classList.remove("hidden");
     document.getElementById("cart-container").classList.add("hidden");
      }

else{
  document.getElementById("cart-container").classList.remove("hidden");
  document.getElementById("spinner").classList.add("hidden");
}
};

const yourCartContainer =(id) =>{
fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
.then((res) => res.json())
.then((json) => yourContainer(json.plants))
}
const yourContainer = (cartLoad) =>{
    const totalCarts = document.getElementById("total-carts");
    const cartBox = document.createElement("div");
    cartBox.innerHTML =`<div class="w-[300px] h-[80px] mx-auto flex justify-between items-center bg-[#DCFCE7] rounded-md p-7 mb-2">
    <div>
      <h2 class="text-xl font-bold">${cartLoad.name}</h2>
      <h3><span>৳</span>
      <span> ${cartLoad.price}</span><i class="fa-solid fa-xmark"></i> 1</h3>
    </div>
    <div><i class="fa-solid fa-xmark vanish"></i></div>
   </div> 
   `;
   totalCarts.append(cartBox);
 document.getElementById("total").classList.remove("hidden");
   sum = sum + cartLoad.price;
    const totalPrice = document.getElementById("total-price");
    totalPrice.innerText =sum;
};



document.getElementById("total-carts").addEventListener("click", function(event){
if(event.target.className.includes("vanish")){
  
  const vanishCart = event.target;

   const minusAmount = vanishCart.parentNode.parentNode.children[0].children[1].children[1].innerText;
        
    const vanishDiv = vanishCart.parentNode.parentNode;
    vanishDiv.innerHTML = "";
    vanishDiv.className = "";
   let totalPrice = document.getElementById("total-price");
     if(sum > 0){
    sum = sum - Number(minusAmount);
document.getElementById("total-price").innerText = sum;};
if(sum === 0){
  //  document.getElementById("total").classList.add("hidden");
}
};
});


const loadTrees = () => {
fetch("https://openapi.programming-hero.com/api/categories")
.then((res) => res.json())
.then((json) => displayCategory(json.categories))
}

const displayCategory = (categories) =>{
const categoryContainer = document.getElementById("category-container")
for(let category of categories){
    const btnDiv =document.createElement("div")
    btnDiv.innerHTML = `<button onclick="cartCategory(${category.id})" id="few-cart-${category.id}" class="max-w-[200px] h-[35px] p-3 category-btn text-left rounded-md">${category.category_name}s
    </button>`;
    categoryContainer.append(btnDiv);
}
}

const loadTreeDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayTreeDetails(details.plants);
};

const displayTreeDetails = (tree) => {
    const detailsBox =document.getElementById("details-container");
    detailsBox.innerHTML =` <div>
      <h2 class="text-3xl font-bold mb-2">${tree.name}</h2>
      <img src="${tree.image}" alt="" class="w-full h-[240px] mb-2">
      <div class="text-2xl font-bold mb=2">Category:${tree.category}</div>
      <div class="text-2xl font-bold mb-2">Price:৳${tree.price}</div>
      <div class="text-2xl font-bold mb-2">Description:${tree.description}</div>`;
    document.getElementById("word_modal").showModal();
};

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
    manageSpinner(true);
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
    newCart.innerHTML =` <div class="p-6 min-h-[380px] w-[330px] bg-white mx-auto">
    <img src="${select.image}" alt="" class="w-[300px] h-[180px] mb-2">
    <h3 onclick="loadTreeDetail(${select.id})" class="font-semibold text-[14px] mb-1">${select.name}</h3>
    <p class="text-gray-500 mb-1">${select.description}</p> 
    <div class="flex justify-between items-baseline mb-2">
        <button class="min-w-[86px] min-h-[28px] bg-[#DCFCE7] text-[#15803D] rounded-xl">${select.category}</button>
        <p class="font-bold">৳${select.price}</p>
    </div>
    <button onclick="yourCartContainer(${select.id})" class="w-[300px] h-[45px] bg-[#15803D] text-white rounded-3xl mx-auto">Add to Cart</button>
   </div>`
   cartContainer.append(newCart);
 };
manageSpinner(false);
};

const loadCart = () =>{
    manageSpinner(true);
    fetch("https://openapi.programming-hero.com/api/plants")
.then((res) => res.json())
.then((json) => displayCart(json.plants))
}
const displayCart = (carts) =>{

    let cartContainer =document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    for(let cart of carts){
    const cartDiv = document.createElement("div");
    cartDiv.innerHTML = ` <div class="p-6 h-full w-[330px] bg-white mx-auto">
    <img src="${cart.image}" alt="" class="w-[300px] h-[180px] mb-2">
    <h3 onclick="loadTreeDetail(${cart.id})" class="font-semibold text-[14px] mb-1">${cart.name}</h3>
    <p class="text-gray-500 mb-1">${cart.description}</p> 
    <div class="flex justify-between items-baseline mb-2">
        <button class="min-w-[86px] min-h-[28px] bg-[#DCFCE7] text-[#15803D] rounded-xl">${cart.category}</button>
        <p class="font-bold">৳${cart.price}</p>
    </div>
    <button onclick="yourCartContainer(${cart.id})" class="w-[300px] h-[45px] bg-[#15803D] text-white rounded-3xl mx-auto">Add to Cart</button>
   </div>
`   
      cartContainer.append(cartDiv); 
    };
    manageSpinner(false);
}

loadTrees();
loadCart();
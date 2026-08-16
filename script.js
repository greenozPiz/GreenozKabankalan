const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));
document.getElementById("year").textContent=new Date().getFullYear();

document.getElementById("orderForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const contact=document.getElementById("contact").value.trim();
  const address=document.getElementById("address").value.trim();
  const method=document.getElementById("method").value;
  const datetime=document.getElementById("datetime").value;
  const pizza=document.getElementById("pizza").value.trim();
  const dateText=datetime?new Date(datetime).toLocaleString([],{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"}):"";
  const message=`To order, kindly fill in:

Name: ${name}
Contact#: ${contact}
Address: ${address}
Delivery/Pickup: ${method}
Date and Time: ${dateText}
Size and flavor: ${pizza}`;
  try{
    await navigator.clipboard.writeText(message);
    alert("Your order details have been copied. Facebook will open next. Paste the message into Messenger and send it.");
  }catch{
    window.prompt("Copy this order message, then paste it into Facebook Messenger:",message);
  }
  window.open("https://www.facebook.com/greenozkabranch","_blank","noopener");
});

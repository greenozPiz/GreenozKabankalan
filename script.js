const flavors=[
["Weisee","Tomato sauce, mozzarella cheese",[210,440,630,1200,1590],""],
["Montana","Tomato sauce, mozzarella cheese, ham",[230,500,680,1230,1620],""],
["Hawaiian","Tomato sauce, mozzarella cheese, ham, pineapple",[240,510,710,1270,1660],"BEST SELLER"],
["Zurich","Tomato sauce, mozzarella cheese, salami, onion, mushroom, bellpepper",[250,520,720,1280,1670],""],
["Tessino","Tomato sauce, mozzarella cheese, pepperoni, onion, mushroom, bellpepper",[260,540,740,1290,1710],""],
["Swisso Italiano","Tomato sauce, mozzarella cheese, ground beef, ham, salami, onion, bellpepper",[270,550,750,1290,1710],""],
["Bern","Tomato sauce, mozzarella cheese, ground beef, onion, mushroom",[250,520,720,1280,1670],""],
["Calzone","Tomato sauce, mozzarella cheese, salami, mushroom",[250,520,720,1280,1670],"FRESHLY BAKED"],
["Schweins","Tomato sauce, mozzarella cheese, ground beef, bacon, onion, tomato",[260,540,740,1290,1710],""],
["Vegetables","Tomato sauce, mozzarella cheese, onion, tomato, mushroom, bellpepper, black olives",[230,500,680,1230,1620],"NO MEAT"],
["El Tuna","Tomato sauce, mozzarella cheese, tuna, onion, bellpepper",[240,510,710,1280,1670],""],
["Supremo","Tomato sauce, mozzarella cheese, ground beef, salami, sausage, onion, bellpepper, black olives",[280,590,800,1300,1730],"BEST SELLER"],
["Greenoz Sausage","Tomato sauce, mozzarella cheese, ground beef, bacon, sausage, onion, bellpepper",[270,550,750,1290,1710],""],
["Anchovies","Tomato sauce, mozzarella cheese, anchovies, tuna, onion, bellpepper",[270,550,750,1290,1710],""],
["Pepperoni","Tomato sauce, mozzarella cheese, ground beef, pepperoni, onion, bellpepper",[270,550,750,1290,1710],"BEST SELLER"],
["Mama Mia","Tomato sauce, mozzarella cheese, ground beef, ham, salami, sausage, bacon, pepperoni, onion, bellpepper, black olives",[290,600,820,1330,1750],"OVERLOAD • BEST SELLER"]
];

const sizes=[
["Regular","6 SQ CUTS",1,1],
["Family","16 SQ CUTS",1,1],
["XL","24 SQ CUTS",1,2],
["XXL","54 SQ CUTS",1,2],
["Party","90 SQ CUTS",1,2]
];
const sizeKeys=["Regular","Family","XL","XXL","Party"];
let selectedSize="Regular", selectedCount=1, selectedFlavors=[], cart=[];
const deliveryLocations=[('Aguisan', 200), ('Akina', 30), ('Andulawan', 60), ('Balicaocao', 70), ('Balicaocao resort', 180), ('Binalbagan', 250), ('Binicuil', 40), ('Bino', 80), ('Bocana', 170), ('Calasa', 200), ('Camansi', 200), ('Camingawan', 220), ('Camugao', 30), ('Caradio-an', 130), ('Casipsipan', 80), ('Catali iglesia', 80), ('Cauayan proper', 250), ('CPSU', 200), ('Crossing Buenavista', 100), ('Daan Banua', 70), ('Dancalan', 120), ('Goce', 150), ('Hilamonan', 60), ('Himamaylan Proper', 160), ('Ilog Proper', 100), ('Linao', 80), ('Lupni Proper', 50), ('Malabong', 70), ('Mambugsay', 200), ('Manalad', 60), ('Naga', 60), ('Oringao', 150), ('Orong', 100), ('Overflow', 60), ('Palma', 80), ('Salong', 100), ('Saraet', 180), ('Sitio Patay', 150), ('Sonedco', 150), ('Su-ay', 80), ('Tagukon', 250), ('Tapi', 250), ('Tooy', 100), ('Tuyuman', 120), ('Vista Alegre', 100)];


const pizzaGrid=document.getElementById("pizzaGrid");
const locationSelect=document.getElementById("location");
locationSelect.innerHTML='<option value="">Select your area</option>'+deliveryLocations.map(x=>`<option value="${x[0]}" data-fee="${x[1]}">${x[0]}</option>`).join("");
function deliveryFee(){
 if(document.getElementById("method").value!=="Delivery") return 0;
 const o=locationSelect.options[locationSelect.selectedIndex];
 return o && o.dataset.fee ? Number(o.dataset.fee) : 0;
}
function cartSubtotal(){return cart.reduce((a,b)=>a+b.price,0)}

pizzaGrid.innerHTML=flavors.map((f,i)=>`
<article class="pizza-card" data-flavor="${i}">
 <div class="pizza-top"><span class="pizza-number">${String(i+1).padStart(2,"0")}</span><h3>${f[0]}</h3>${f[3]?`<span class="tag">${f[3]}</span>`:""}</div>
 <p class="ingredients">${f[1]}</p>
 <div class="price-row">${f[2].map((p,j)=>`<button data-size="${sizeKeys[j]}" data-flavor="${i}">₱${p.toLocaleString()}</button>`).join("")}</div>
</article>`).join("");

const sizeOptions=document.getElementById("sizeOptions");
sizeOptions.innerHTML=sizes.map(s=>`<button class="size-option" data-size="${s[0]}"><b>${s[0]}</b><small>${s[1]} • ${s[2]===s[3]?s[2]+" FLAVOR":s[2]+" OR "+s[3]+" FLAVORS"}</small></button>`).join("");

function allowedRange(size){const s=sizes.find(x=>x[0]===size);return {min:s[2],max:s[3]}}
function money(n){return "₱"+n.toLocaleString()}
function setSize(size){
 const range=allowedRange(size);
 selectedSize=size;
 selectedCount=range.min;
 selectedFlavors=[];
 document.querySelectorAll(".size-chip,.size-option").forEach(x=>x.classList.toggle("active",x.dataset.size===size));
 document.getElementById("flavorRule").innerHTML=range.max===1
   ? `<strong>${size}</strong> allows <strong>1 flavor only</strong>.`
   : `<strong>${size}</strong> allows <strong>1 or 2 flavors</strong>. For 2 flavors, the higher-priced flavor determines the pizza price.`;
 document.getElementById("flavorCount").innerHTML=range.max===1
   ? `<button class="count-btn active" data-count="1">1 FLAVOR</button>`
   : `<button class="count-btn ${selectedCount===1?"active":""}" data-count="1">1 FLAVOR</button><button class="count-btn" data-count="2">2 FLAVORS</button>`;
 document.querySelectorAll(".count-btn").forEach(b=>b.addEventListener("click",()=>{selectedCount=Number(b.dataset.count);selectedFlavors=[];renderSelectors();renderSummary();document.querySelectorAll(".count-btn").forEach(x=>x.classList.toggle("active",x===b));}));
 renderSelectors();
 renderSummary();
}
function renderSelectors(){
 const box=document.getElementById("flavorSelectors");
 box.innerHTML=Array.from({length:selectedCount},(_,i)=>`<select class="flavor-select" data-slot="${i}"><option value="">Choose flavor ${i+1}</option>${flavors.map((f,j)=>`<option value="${j}" ${selectedFlavors[i]==j?"selected":""}>${j+1}. ${f[0]}</option>`).join("")}</select>`).join("");
 box.querySelectorAll("select").forEach(s=>s.addEventListener("change",e=>{selectedFlavors[Number(e.target.dataset.slot)]=e.target.value===""?null:Number(e.target.value);renderSummary()}));
}
function renderSummary(){
 const valid=selectedFlavors.filter(v=>Number.isInteger(v));
 const price=valid.length?Math.max(...valid.map(v=>flavors[v][2][sizeKeys.indexOf(selectedSize)])):0;
 document.getElementById("summary").innerHTML=`<div class="summary-line"><span>Size</span><strong>${selectedSize}</strong></div><div class="summary-line"><span>Flavors</span><strong>${valid.length}/${selectedCount}</strong></div><div class="summary-line"><span>Price</span><strong>${valid.length===selectedCount?money(price):"—"}</strong></div>`;
}
function addPizza(){
 const valid=selectedFlavors.filter(v=>Number.isInteger(v));
 if(valid.length!==selectedCount){alert(`Please choose ${selectedCount} flavor${selectedCount>1?"s":""}.`);return}
 const price=Math.max(...valid.map(v=>flavors[v][2][sizeKeys.indexOf(selectedSize)]));
 cart.push({size:selectedSize,flavors:valid.map(v=>flavors[v][0]),price});
 renderCart();
 document.getElementById("customer-order").scrollIntoView?.({behavior:"smooth"});
}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<p class="empty">No pizza added yet.</p>';document.getElementById("cartTotal").textContent=money(deliveryFee());return}
 box.innerHTML=cart.map((item,i)=>`<div class="cart-item"><div><strong>${item.size}</strong> — ${item.flavors.join(" / ")}<br><small>${money(item.price)}</small></div><button type="button" onclick="removeCart(${i})">REMOVE</button></div>`).join("");
 document.getElementById("cartTotal").textContent=money(cartSubtotal()+deliveryFee());
 const fee=deliveryFee();
 const existing=document.querySelector(".delivery-fee-row");
 if(existing) existing.remove();
 if(fee>0){
   const row=document.createElement("div");
   row.className="cart-item delivery-fee-row";
   row.innerHTML=`<div><strong>Delivery Fee</strong><br><small>${locationSelect.value}</small></div><strong>${money(fee)}</strong>`;
   box.appendChild(row);
 }
}
function removeCart(i){cart.splice(i,1);renderCart()}
document.querySelectorAll(".size-chip").forEach(b=>b.addEventListener("click",()=>{setSize(b.dataset.size);document.getElementById("order").scrollIntoView({behavior:"smooth"})}));
document.querySelectorAll(".size-option").forEach(b=>b.addEventListener("click",()=>setSize(b.dataset.size)));
pizzaGrid.addEventListener("click",e=>{
 const btn=e.target.closest("button[data-size]");
 const card=e.target.closest(".pizza-card");
 if(btn){setSize(btn.dataset.size);selectedFlavors=[Number(btn.dataset.flavor)];renderSelectors();renderSummary();document.getElementById("order").scrollIntoView({behavior:"smooth"});return}
 if(card){const i=Number(card.dataset.flavor);selectedFlavors=[i];renderSelectors();renderSummary();document.getElementById("order").scrollIntoView({behavior:"smooth"})}
});
document.getElementById("addPizza").addEventListener("click",addPizza);
document.getElementById("clearCart").addEventListener("click",()=>{cart=[];renderCart()});
document.getElementById("method").addEventListener("change",renderCart);
locationSelect.addEventListener("change",renderCart);

document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

setSize("Regular");

document.getElementById("orderForm").addEventListener("submit",async e=>{
 e.preventDefault();
 if(!cart.length){alert("Please add at least one pizza to your order.");return}
 const name=document.getElementById("customerName").value.trim();
 const contact=document.getElementById("customerContact").value.trim();
 const address=document.getElementById("customerAddress").value.trim();
 const method=document.getElementById("method").value;
 const location=method==="Delivery"?locationSelect.value:"N/A";
 const fee=deliveryFee();
 if(method==="Delivery" && !location){alert("Please select your delivery location.");return}
 const dt=document.getElementById("datetime").value;
 const dateText=dt?new Date(dt).toLocaleString([],{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"}):"";
 const items=cart.map((x,i)=>`${i+1}. ${x.size} — ${x.flavors.join(" / ")} — ${money(x.price)}`).join("\n");
 const total=money(cartSubtotal()+fee);
 const message=`To order, kindly fill in:

Name: ${name}
Contact#: ${contact}
Location / Area: ${location}
Other Address Information: ${address}
Delivery/Pickup: ${method}
Delivery Fee: ${fee?money(fee):"₱0"}
Date and Time: ${dateText}

ORDER:
${items}

Estimated Total: ${total}`;
 try{await navigator.clipboard.writeText(message);alert("Your order details have been copied. Facebook will open next. Paste the message into Messenger and send it.");}
 catch{window.prompt("Copy this order message, then paste it into Facebook Messenger:",message)}
 window.open("https://www.facebook.com/greenozkabranch","_blank","noopener");
});


const deliveryAreas=[["Aguisan",200],["Akina",30],["Andulawan",60],["Balicaocao",70],["Balicaocao resort",180],["Binalbagan",250],["Binicuil",40],["Bino",80],["Bocana",170],["Calasa",200],["Camansi",200],["Camingawan",220],["Camugao",30],["Caradio-an",130],["Casipsipan",80],["Catali iglesia",80],["Cauayan proper",250],["CPSU",200],["Crossing Buenavista",100],["Daan Banua",70],["Dancalan",120],["Goce",150],["Hilamonan",60],["Himamaylan Proper",160],["Ilog Proper",100],["Linao",80],["Lupni Proper",50],["Malabong",70],["Mambugsay",200],["Manalad",60],["Naga",60],["Oringao",150],["Orong",100],["Overflow",60],["Palma",80],["Salong",100],["Saraet",180],["Sitio Patay",150],["Sonedco",150],["Su-ay",80],["Tagukon",250],["Tapi",250],["Tooy",100],["Tuyuman",120],["Vista Alegre",100]];
const areaSelect=document.createElement("select");
areaSelect.id="deliveryArea";
areaSelect.innerHTML='<option value="">Select your location / area (optional)</option><option value="Kabankalan Proper" data-fee="0">Kabankalan Proper — FREE DELIVERY</option>'+deliveryAreas.map(a=>`<option value="${a[0]}" data-fee="${a[1]}">${a[0]}</option>`).join("");
const locationBox=document.createElement("div");
locationBox.className="location-box";
locationBox.innerHTML='<h3>DELIVERY AREA <em>(OPTIONAL)</em></h3><p>Kabankalan Proper is FREE DELIVERY.</p>';
locationBox.appendChild(areaSelect);
document.querySelector(".customer-order").prepend(locationBox);
let deliveryFee=0;
areaSelect.addEventListener("change",e=>{deliveryFee=Number(e.target.selectedOptions[0].dataset.fee||0);if(typeof renderCart==="function")renderCart();});

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
["Regular","6 SQ CUTS",1],
["Family","16 SQ CUTS",1],
["XL","24 SQ CUTS",2],
["XXL","54 SQ CUTS",4],
["Party","90 SQ CUTS",4]
];
const sizeKeys=["Regular","Family","XL","XXL","Party"];
let selectedSize="Regular", selectedCount=1, selectedFlavors=[], cart=[];

const pizzaGrid=document.getElementById("pizzaGrid");
pizzaGrid.innerHTML=flavors.map((f,i)=>`
<article class="pizza-card" data-flavor="${i}">
 <div class="pizza-top"><span class="pizza-number">${String(i+1).padStart(2,"0")}</span><h3>${f[0]}</h3>${f[3]?`<span class="tag">${f[3]}</span>`:""}</div>
 <p class="ingredients">${f[1]}</p>
 <div class="price-row">${f[2].map((p,j)=>`<button data-size="${sizeKeys[j]}" data-flavor="${i}">₱${p.toLocaleString()}</button>`).join("")}</div>
</article>`).join("");

const sizeOptions=document.getElementById("sizeOptions");
sizeOptions.innerHTML=sizes.map(s=>`<button class="size-option" data-size="${s[0]}"><b>${s[0]}</b><small>${s[1]} • ${s[2]} FLAVOR${s[2]>1?"S":""}</small></button>`).join("");

function allowedCount(){return sizes.find(s=>s[0]===selectedSize)[2]}
function money(n){return "₱"+n.toLocaleString()}
function setSize(size){
 selectedSize=size; selectedCount=1; selectedFlavors=[];
 document.querySelectorAll(".size-chip,.size-option").forEach(x=>x.classList.toggle("active",x.dataset.size===size));
 document.getElementById("flavorRule").innerHTML=allowedCount()===1
 ? `<strong>${size}</strong> allows <strong>1 flavor only</strong>.`
 : `<strong>${size}</strong> allows <strong>1 or 2 flavors</strong>. Choose one or two.`;
 document.getElementById("flavorCount").innerHTML=allowedCount()===1
 ? `<button class="count-btn active">1 FLAVOR</button>`
 : `<button class="count-btn active" data-count="1">1 FLAVOR</button><button class="count-btn" data-count="2">2 FLAVORS</button>`;
 document.querySelectorAll(".count-btn[data-count]").forEach(b=>b.addEventListener("click",()=>{
   selectedCount=Number(b.dataset.count); selectedFlavors=[];
   document.querySelectorAll(".count-btn").forEach(x=>x.classList.toggle("active",x===b));
   renderSelectors(); renderSummary();
 }));
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
 const price=valid.length===selectedCount?Math.max(...valid.map(v=>flavors[v][2][sizeKeys.indexOf(selectedSize)])):0;
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
 if(!cart.length){box.innerHTML='<p class="empty">No pizza added yet.</p>';document.getElementById("cartTotal").textContent="₱0";return}
 box.innerHTML=cart.map((item,i)=>`<div class="cart-item"><div><strong>${item.size}</strong> — ${item.flavors.join(" / ")}<br><small>${money(item.price)}</small></div><button type="button" onclick="removeCart(${i})">REMOVE</button></div>`).join("");
 document.getElementById("cartTotal").textContent=money(cart.reduce((a,b)=>a+b.price,0));
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

document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();

setSize("Regular");

document.getElementById("orderForm").addEventListener("submit",async e=>{
 e.preventDefault();
 if(!cart.length){alert("Please add at least one pizza to your order.");return}
 const name=document.getElementById("customerName").value.trim();
 const contact=document.getElementById("customerContact").value.trim();
 const address=document.getElementById("customerAddress").value.trim(); const otherInfo=document.getElementById("formOtherInfo")?.value.trim()||""; const area=areaSelect.value||"Kabankalan Proper (FREE DELIVERY)";
 const method=document.getElementById("method").value;
 const dt=document.getElementById("datetime").value;
 const dateText=dt?new Date(dt).toLocaleString([],{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"}):"";
 const items=cart.map((x,i)=>`${i+1}. ${x.size} — ${x.flavors.join(" / ")} — ${money(x.price)}`).join("\n");
 const total=money(cart.reduce((a,b)=>a+b.price,0));
 const message=`To order, kindly fill in:

Name: ${name}
Contact#: ${contact}
Address / House Details: ${address}
Location / Area: ${area}
Other Information / Description: ${otherInfo||"None"}
Delivery/Pickup: ${method}
Date and Time: ${dateText}

ORDER:
${items}

Pizza Total: ${total-deliveryFee}
Delivery Fee: ${deliveryFee?money(deliveryFee):"FREE"}
TOTAL: ${total}`;
 try{await navigator.clipboard.writeText(message);alert("Your order details have been copied. Facebook will open next. Paste the message into Messenger and send it.");}
 catch{window.prompt("Copy this order message, then paste it into Facebook Messenger:",message)}
 window.open("https://www.facebook.com/greenozkabranch","_blank","noopener");
});

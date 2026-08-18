const flavors=[["WEISEE", "TOMATO SAUCE & MOZZARELLA CHEESE", [210, 440, 630, 1200, 1590]], ["MONTANA", "TOMATO SAUCE, HAM & MOZZARELLA CHEESE", [230, 500, 680, 1230, 1620]], ["HAWAIIAN", "TOMATO SAUCE, HAM, PINEAPPLE & MOZZARELLA CHEESE", [240, 510, 710, 1270, 1660]], ["ZURICH", "TOMATO SAUCE, GROUND BEEF, MUSHROOM, ONION, BELLPEPPER & MOZZARELLA CHEESE", [250, 520, 720, 1280, 1670]], ["TESSINO", "TOMATO SAUCE, MUSHROOM, BELLPEPPER, ONION, MOZZARELLA CHEESE & PEPPERONI", [260, 540, 740, 1290, 1710]], ["SWISSO ITALIANO", "TOMATO SAUCE, GROUND BEEF, HAM, SALAMI, ONION, BELLPEPPER & MOZZARELLA CHEESE", [270, 550, 750, 1290, 1710]], ["BERN", "TOMATO SAUCE, GROUNDBEEF, MUSHROOM, ONION & MOZZARELLA CHEESE", [250, 520, 720, 1280, 1670]], ["CALZONE", "TOMATO SAUCE, GROUNDBEEF, SALAMI, MUSHROOM & MOZZARELLA CHEESE", [250, 520, 720, 12800, 1670]], ["SCHWEINS", "TOMATO SAUCE, GROUNDBEEF, BACON, TOMATO, ONION & MOZZARELLA CHEESE", [260, 540, 740, 1290, 1710]], ["VEGETABLES", "TOMATO SAUCE, MUSHROOM, TOMATO, BELLPEPPER, ONION, MOZZARELLA CHEESE & BLACK OLIVES", [230, 500, 680, 1230, 1620]], ["EL TUNA", "TOMATO SAUCE, TUNA, ONION, BELLPEPPER & MOZZARELLA CHEESE", [240, 510, 710, 1280, 1670]], ["SUPREMO", "TAMATO SAUCE, GROUNDBEEF, SAUSAGE, SALAMI, ONION, BELLPEPPER, MOZZARELLA CHEESE & BLACK OLIVES", [280, 590, 800, 1300, 1730]], ["GREENOZ SAUSAGE", "TOMATO SAUCE, GROUNDBEEF, SAUSAGE, BACON, BELLPEPPER, ONION & MOZZARELLA CHEESE", [280, 590, 800, 1300, 1730]], ["PEPPERONI", "TOMATO SAUCE, GROUNDBEEF, ONION, BELLPEPPER, MOZZARELLA CHEESE & PEPPERONI", [270, 550, 750, 1290, 1710]], ["MAMAMIA", "TOMATO CHEESE, GROUNDBEEF, SAUSAGE, HAM, SALAMI, BACON, ONION, BELLPEPPER, MOZZARELLA CHEESE, PEPPERONI & BLACK OLIVES", [290, 600, 820, 1330, 1750]]];
const areas=[["Aguisan", 200], ["Akina", 30], ["Andulawan", 60], ["Balicaocao", 70], ["Balicaocao resort", 180], ["Binalbagan", 250], ["Binicuil", 40], ["Bino", 80], ["Bocana", 170], ["Calasa", 200], ["Camansi", 200], ["Camingawan", 220], ["Camugao", 30], ["Caradio-an", 130], ["Casipsipan", 80], ["Catali iglesia", 80], ["Cauayan proper", 250], ["CPSU", 200], ["Crossing Buenavista", 100], ["Daan Banua", 70], ["Dancalan", 120], ["Goce", 150], ["Hilamonan", 60], ["Himamaylan Proper", 160], ["Ilog Proper", 100], ["Linao", 80], ["Lupni Proper", 50], ["Malabong", 70], ["Mambugsay", 200], ["Manalad", 60], ["Naga", 60], ["Oringao", 150], ["Orong", 100], ["Overflow", 60], ["Palma", 80], ["Salong", 100], ["Saraet", 180], ["Sitio Patay", 150], ["Sonedco", 150], ["Su-ay", 80], ["Tagukon", 250], ["Tapi", 250], ["Tooy", 100], ["Tuyuman", 120], ["Vista Alegre", 100]];
const sizes=[["Regular","6 SQ CUTS",1],["Family","16 SQ CUTS",1],["XL","24 SQ CUTS",2],["XXL","54 SQ CUTS",4],["Party","90 SQ CUTS",4]];
let size="Regular",count=1,chosen=[],cart=[],fee=0;
const money=n=>"₱"+n.toLocaleString();
const grid=document.getElementById("menuGrid");
grid.innerHTML=flavors.map((f,i)=>`<article class="pizza" data-i="${i}"><h3>${f[0]}</h3><p>${f[1]}</p><div class="from">FROM ${money(f[2][0])}</div></article>`).join("");
grid.querySelectorAll(".pizza").forEach(x=>x.onclick=()=>{document.getElementById("order").scrollIntoView({behavior:"smooth"});chosen=[+x.dataset.i];render();document.querySelector("#flavors select").value=x.dataset.i;});

const sizeBox=document.getElementById("sizes");
sizeBox.innerHTML=sizes.map(s=>`<button type="button" class="choice ${s[0]==="Regular"?"active":""}" data-size="${s[0]}">${s[0]}<br><small>${s[1]}</small></button>`).join("");
sizeBox.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{size=b.dataset.size;chosen=[];count=sizes.find(s=>s[0]===size)[2]===1?1:1;render();});

function render(){
 const max=sizes.find(s=>s[0]===size)[2];
 sizeBox.querySelectorAll(".choice").forEach(b=>b.classList.toggle("active",b.dataset.size===size));
 const nums=max===1?[1]:max===2?[1,2]:[1,2,3,4];
 document.getElementById("counts").innerHTML=nums.map(n=>`<button type="button" class="choice ${n===count?"active":""}" data-n="${n}">${n} FLAVOR${n>1?"S":""}</button>`).join("");
 document.querySelectorAll("#counts .choice").forEach(b=>b.onclick=()=>{count=+b.dataset.n;chosen=[];render();});
 document.getElementById("rule").innerHTML=max===1?`<b>${size}</b> allows 1 flavor only.`:`<b>${size}</b> allows 1 to ${max} flavors.`;
 document.getElementById("flavors").innerHTML=Array.from({length:count},(_,i)=>`<select data-slot="${i}"><option value="">Select flavor ${i+1}</option>${flavors.map((f,j)=>`<option value="${j}" ${chosen[i]===j?"selected":""}>${j+1}. ${f[0]}</option>`).join("")}</select>`).join("");
 document.querySelectorAll("#flavors select").forEach(s=>s.onchange=()=>{chosen[+s.dataset.slot]=s.value===""?null:+s.value;renderTotal();});
 renderTotal();
}
function renderTotal(){
 const v=chosen.filter(x=>Number.isInteger(x));
 const price=v.length===count?Math.max(...v.map(i=>flavors[i][2][sizes.findIndex(s=>s[0]===size)])):0;
 document.getElementById("builderTotal").innerHTML=`<span>${v.length} / ${count} flavors</span><strong>${price?money(price):"—"}</strong>`;
}
document.getElementById("add").onclick=()=>{
 const v=chosen.filter(x=>Number.isInteger(x));
 if(v.length!==count){alert("Please select all flavors.");return;}
 const price=Math.max(...v.map(i=>flavors[i][2][sizes.findIndex(s=>s[0]===size)]));
 cart.push({size,flavors:v.map(i=>flavors[i][0]),price});
 drawCart();
};
function drawCart(){
 document.getElementById("cart").innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><div><b>${x.size}</b><br>${x.flavors.join(" / ")}<br>${money(x.price)}</div><button class="remove" onclick="removeItem(${i})">REMOVE</button></div>`).join(""):`<div class="empty">Your order is empty.</div>`;
 const p=cart.reduce((a,x)=>a+x.price,0);
 document.getElementById("cartCount").textContent=cart.length;
 document.getElementById("pizzaTotal").textContent=money(p);
 document.getElementById("deliveryTotal").textContent=fee?money(fee):"FREE";
 document.getElementById("total").textContent=money(p+fee);
}
window.removeItem=i=>{cart.splice(i,1);drawCart();};
const area=document.getElementById("area");
area.innerHTML=`<option value="" data-fee="0">Select your location / area (optional)</option><option value="Kabankalan Proper" data-fee="0">Kabankalan Proper — FREE DELIVERY</option>`+areas.map(a=>`<option value="${a[0]}" data-fee="${a[1]}">${a[0]}</option>`).join("");
area.onchange=()=>{fee=+area.selectedOptions[0].dataset.fee||0;drawCart();};
document.getElementById("form").onsubmit=async e=>{
 e.preventDefault();
 if(!cart.length){alert("Please add at least one pizza.");return;}
 const p=cart.reduce((a,x)=>a+x.price,0),total=p+fee;
 const msg=`To order, kindly fill in:

Name: ${document.getElementById("name").value}
Contact#: ${document.getElementById("contact").value}
Address / House Details: ${document.getElementById("address").value}
Location / Area: ${area.value||"Kabankalan Proper (FREE DELIVERY)"}
Other Information / Description: ${document.getElementById("other").value||"None"}
Delivery/Pickup: ${document.getElementById("method").value}
Date: ${document.getElementById("date").value}
Time: ${document.getElementById("time").value}

ORDER:
${cart.map((x,i)=>`${i+1}. ${x.size} — ${x.flavors.join(" / ")} — ${money(x.price)}`).join("\n")}

Pizza Total: ${money(p)}
Delivery Fee: ${fee?money(fee):"FREE"}
TOTAL: ${money(total)}`;
 const open=()=>window.open("https://www.facebook.com/greenozkabranch","_blank");
 try{await navigator.clipboard.writeText(msg);alert("Order details copied. Paste them into Facebook Messenger.");open();}
 catch{prompt("Copy your order details:",msg);open();}
};
render();drawCart();
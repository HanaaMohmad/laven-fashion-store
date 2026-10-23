const products = [
 {id:1,name:"جاكيت أوفر سايز",category:"women",categoryLabel:"حريمي",price:1290,oldPrice:1590,badge:"الأكثر مبيعًا",image:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=700&q=80",colors:["#b9a18d","#252525","#ddd4c7"]},
 {id:2,name:"قميص كتان كلاسيك",category:"men",categoryLabel:"رجالي",price:890,oldPrice:null,badge:"جديد",image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80",colors:["#e9e0d3","#9ca89b","#333333"]},
 {id:3,name:"فستان ميدي أنيق",category:"women",categoryLabel:"حريمي",price:1450,oldPrice:null,badge:"اختيارنا",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80",colors:["#a85d4b","#252525"]},
 {id:4,name:"تيشيرت أساسي",category:"men",categoryLabel:"رجالي",price:490,oldPrice:590,badge:"-17%",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",colors:["#f2f0eb","#252525","#8e9b8c"]},
 {id:5,name:"شنطة يومية أنيقة",category:"accessories",categoryLabel:"إكسسوارات",price:990,oldPrice:null,badge:"جديد",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",colors:["#b98a69","#2d2925"]},
 {id:6,name:"بنطلون واسع",category:"women",categoryLabel:"حريمي",price:780,oldPrice:null,badge:"",image:"https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=700&q=80",colors:["#c6b9a6","#3a3a37"]},
 {id:7,name:"جاكيت رجالي خفيف",category:"men",categoryLabel:"رجالي",price:1690,oldPrice:1890,badge:"عرض خاص",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80",colors:["#514b42","#222222"]},
 {id:8,name:"نظارة شمس كلاسيك",category:"accessories",categoryLabel:"إكسسوارات",price:620,oldPrice:null,badge:"",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",colors:["#242424","#795548"]},
 {id:9,name:"بلوزة ساتان",category:"women",categoryLabel:"حريمي",price:720,oldPrice:null,badge:"جديد",image:"https://images.unsplash.com/photo-1564257577-5b6d9c3e8f8a?auto=format&fit=crop&w=700&q=80",colors:["#e9d9cb","#9d5146"]},
 {id:10,name:"سويت شيرت يومي",category:"men",categoryLabel:"رجالي",price:950,oldPrice:null,badge:"",image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",colors:["#b4b0a9","#373737"]},
 {id:11,name:"حزام جلد",category:"accessories",categoryLabel:"إكسسوارات",price:420,oldPrice:null,badge:"",image:"https://images.unsplash.com/photo-1624222247344-550fb8a7c7b0?auto=format&fit=crop&w=700&q=80",colors:["#6d4c41","#222222"]},
 {id:12,name:"قميص أبيض ناعم",category:"women",categoryLabel:"حريمي",price:680,oldPrice:790,badge:"-14%",image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=700&q=80",colors:["#f1eee8","#b6a69a"]}
];
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
let activeFilter = "all";
let searchTerm = "";
let cart = [];
let favorites = new Set();
let showAll = false;
const productGrid = $("#productGrid");
const money = n => `${n.toLocaleString("en-US")} ج.م`;

function renderProducts(){
  let list = products.filter(p => (activeFilter === "all" || p.category === activeFilter) && (p.name.includes(searchTerm) || p.categoryLabel.includes(searchTerm)));
  const sort = $("#sortSelect").value;
  if(sort === "low") list.sort((a,b)=>a.price-b.price);
  if(sort === "high") list.sort((a,b)=>b.price-a.price);
  if(!showAll && activeFilter === "all" && !searchTerm && sort === "featured") list = list.slice(0,8);
  productGrid.innerHTML = list.map((p,i)=>`
    <article class="product-card" style="animation-delay:${Math.min(i*35,250)}ms">
      <div class="product-image-wrap">
        <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80'">
        ${p.badge?`<span class="product-badge">${p.badge}</span>`:""}
        <button class="favorite-btn ${favorites.has(p.id)?"favorited":""}" data-favorite="${p.id}" aria-label="إضافة ${p.name} للمفضلة">${favorites.has(p.id)?"♥":"♡"}</button>
        <button class="quick-add" data-add="${p.id}">+ أضف إلى السلة</button>
      </div>
      <div class="product-details"><span class="product-category">${p.categoryLabel}</span><h3 class="product-name">${p.name}</h3>
        <div class="product-bottom"><div class="product-price">${money(p.price)} ${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:""}</div>
        <div class="product-colors">${p.colors.map(c=>`<span class="color-dot" style="background:${c}"></span>`).join("")}</div></div>
      </div>
    </article>`).join("");
  $("#emptyState").hidden = list.length > 0;
  $("#showMore").style.display = activeFilter === "all" && !searchTerm && sort === "featured" ? "inline-flex" : "none";
  $("#showMore").innerHTML = showAll ? 'عرض منتجات أقل <span>↑</span>' : 'استكشاف المجموعة كاملة <span>↓</span>';
}
function setFilter(filter){
 activeFilter=filter;
 $$(".filter-btn").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));
 showAll=false;renderProducts();
}
function toast(message){
 const el=$("#toast");el.textContent=message;el.classList.add("show");
 clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2300);
}
function addToCart(id){
 const found=cart.find(x=>x.id===id);
 if(found) found.qty++; else cart.push({id,qty:1});
 renderCart();toast("اتضافت القطعة لسلتك بنجاح ♡");
}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);
 const total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 $("#cartCount").textContent=count;$("#drawerCount").textContent=`(${count})`;$("#cartSubtotal").textContent=money(total);
 if(!cart.length){
  $("#cartItems").innerHTML='<div class="cart-empty"><span>♡</span><h3>سلتك لسه فاضية</h3><p>اختاري قطعك المفضلة وابدئي رحلتك مع لافين.</p></div>';
 } else {
  $("#cartItems").innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="quantity-control"><button data-qty="${p.id}" data-delta="-1" aria-label="تقليل الكمية">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="زيادة الكمية">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="حذف المنتج">×</button></div>`}).join("");
 }
}
function openCart(){ $("#cartDrawer").classList.add("open");$("#overlay").classList.add("visible");$("#cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"; }
function closeCart(){ $("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("visible");$("#cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow=""; }

productGrid.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add)addToCart(Number(add.dataset.add));
 const fav=e.target.closest("[data-favorite]");if(fav){const id=Number(fav.dataset.favorite);favorites.has(id)?favorites.delete(id):favorites.add(id);renderProducts();toast(favorites.has(id)?"اتضافت للمفضلة":"اتشالت من المفضلة");}
});
$$(".filter-btn").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.filter)));
$$("[data-filter-link]").forEach(a=>a.addEventListener("click",()=>setFilter(a.dataset.filterLink)));
$("#sortSelect").addEventListener("change",renderProducts);
$("#showMore").addEventListener("click",()=>{showAll=!showAll;renderProducts();});
$("#searchToggle").addEventListener("click",()=>{$("#searchPanel").classList.toggle("visible");if($("#searchPanel").classList.contains("visible"))$("#searchInput").focus();});
$("#searchClose").addEventListener("click",()=>{$("#searchPanel").classList.remove("visible");$("#searchInput").value="";searchTerm="";renderProducts();});
$("#searchInput").addEventListener("input",e=>{searchTerm=e.target.value.trim();renderProducts();});
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#overlay").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
$("#cartItems").addEventListener("click",e=>{
 const qty=e.target.closest("[data-qty]");const remove=e.target.closest("[data-remove]");
 if(qty){const item=cart.find(x=>x.id===Number(qty.dataset.qty));item.qty+=Number(qty.dataset.delta);if(item.qty<=0)cart=cart.filter(x=>x.id!==item.id);renderCart();}
 if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));renderCart();}
});
$("#checkoutBtn").addEventListener("click",()=>{
 if(!cart.length){$("#checkoutMessage").textContent="أضيفي منتجًا للسلة أولًا.";return;}
 const lines=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `${p.name} × ${item.qty} — ${money(p.price*item.qty)}`;});
 const total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 $("#checkoutMessage").textContent=`طلبك جاهز للمراجعة: ${cart.length} صنف بإجمالي ${money(total)}. اربطي زر التأكيد بوسيلة الطلب الفعلية قبل نشر المتجر.`;
 toast("تم تجهيز ملخص طلبك");
});
$("#themeToggle").addEventListener("click",()=>{
 document.body.classList.toggle("dark");
 const dark=document.body.classList.contains("dark");$("#themeToggle").textContent=dark?"☀":"☾";
 try{localStorage.setItem("laven-theme",dark?"dark":"light")}catch(e){}
});
try{if(localStorage.getItem("laven-theme")==="dark"){document.body.classList.add("dark");$("#themeToggle").textContent="☀"}}catch(e){}
$("#menuToggle").addEventListener("click",()=>{
 const open=$("#mainNav").classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));$("#menuToggle").textContent=open?"×":"☰";
});
$$(".nav-link").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");$("#menuToggle").textContent="☰";}));
window.addEventListener("scroll",()=>$(".site-header").classList.toggle("scrolled",window.scrollY>15),{passive:true});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="شكرًا لاشتراكك! سنخبرك بكل جديد قريبًا.";$("#newsletterEmail").value="";toast("تم تسجيل اشتراكك بنجاح");});
renderProducts();renderCart();

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function esc(t){ const d=document.createElement("div"); d.textContent=t; return d.innerHTML; }

function pintarCatalogo(filtro="Todas"){
  const g=$("#grid"); if(!g) return;
  g.innerHTML=CATALOGO.filter(s=>filtro==="Todas"||s.cat===filtro).map(s=>`
   <article class="card"><span class="tag">${esc(s.cat)}</span><h3>${esc(s.nombre)}</h3><p>${esc(s.desc)}</p>
   <p class="mini"><strong>Alcance:</strong> ${esc(s.alcance)}<br><strong>Tiempo estimado:</strong> ${esc(s.tiempo)}</p>
   <p class="precio">${s.precio?`Desde ${fmt(s.precio)}`:"Solicitar cotización"}</p>
   <div class="acc"><button class="btn sec" data-det="${s.id}">Ver detalles</button>
   ${s.precio?`<button class="btn" data-add="${s.id}">Agregar al carrito</button>`:`<button class="btn" data-con="${s.id}">Consultar disponibilidad</button>`}</div></article>`).join("");
}
function pintarFiltros(){
  const cats=["Todas",...new Set(CATALOGO.map(s=>s.cat))];
  $("#filtros").innerHTML=cats.map((c,i)=>`<button class="chip${i?"":" on"}" data-f="${c}">${c}</button>`).join("");
  const sel=$("#tipo"); if(sel) sel.innerHTML=CATALOGO.map(s=>`<option>${esc(s.nombre)}</option>`).join("")+"<option>Otro</option>";
}
function pintarCarrito(){
  const l=Carrito.items(); $("#cuenta").textContent=Carrito.cantidad();
  $("#lineas").innerHTML=l.length?l.map(i=>`<li><div><strong>${esc(i.nombre)}</strong><br><span class="mini">${i.precio?fmt(i.precio)+" c/u":"Cotización"} · Subtotal: ${i.precio?fmt(i.precio*i.cant):"—"}</span></div>
   <div class="qty"><button data-m="${i.id}" aria-label="Menos">−</button><span>${i.cant}</span><button data-p="${i.id}" aria-label="Más">+</button><button data-q="${i.id}" aria-label="Eliminar">✕</button></div></li>`).join(""):"<li>Tu carrito está vacío. Explora el catálogo para agregar servicios.</li>";
  $("#total").textContent=fmt(Carrito.total());
}
function aviso(t,ok=true){ const a=$("#aviso"); a.textContent=t; a.className="aviso "+(ok?"ok":"err"); a.hidden=false; setTimeout(()=>a.hidden=true,5000); }

document.addEventListener("click",e=>{
  const t=e.target.closest("button"); if(!t) return;
  if(t.dataset.add){ Carrito.agregar(t.dataset.add); aviso("Servicio agregado al carrito."); }
  if(t.dataset.det){ const s=CATALOGO.find(x=>x.id===t.dataset.det); alert(`${s.nombre}\n\n${s.desc}\nAlcance: ${s.alcance}\nTiempo estimado: ${s.tiempo}\n${s.precio?"Precio base: "+fmt(s.precio):"Requiere cotización"}`); }
  if(t.dataset.con){ const s=CATALOGO.find(x=>x.id===t.dataset.con); WA.abrir(`Hola, quisiera consultar disponibilidad y cotización de: ${s.nombre}.`); }
  if(t.dataset.f){ $$(".chip").forEach(c=>c.classList.toggle("on",c===t)); pintarCatalogo(t.dataset.f); }
  if(t.dataset.p) Carrito.cambiar(t.dataset.p,1);
  if(t.dataset.m) Carrito.cambiar(t.dataset.m,-1);
  if(t.dataset.q) Carrito.quitar(t.dataset.q);
});
document.addEventListener("carrito",pintarCarrito);

document.addEventListener("DOMContentLoaded",()=>{
  pintarFiltros(); pintarCatalogo(); pintarCarrito();
  $("#abrirCarrito").onclick=()=>$("#panel").classList.add("abierto");
  $("#cerrarCarrito").onclick=()=>$("#panel").classList.remove("abierto");
  $("#vaciar").onclick=()=>Carrito.vaciar();
  $("#waCarrito").onclick=()=>WA.abrir(WA.resumenCarrito());
  $("#waFlot").href=WA.url("Hola, quisiera una consulta general.");
  $("#menuBtn").onclick=()=>$("#nav").classList.toggle("abierto");
  $$("#nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("abierto"));
  $$(".nombre").forEach(n=>n.textContent=CONFIG.negocio);

  $("#form").onsubmit=e=>{
    e.preventDefault(); const f=e.target, d=Object.fromEntries(new FormData(f)); const er=[];
    if(d.web) return; // honeypot anti-bots
    if(!Val.texto(d.nombre,2,80)) er.push("Escribe tu nombre.");
    if(!Val.correo(d.correo)) er.push("Correo no válido.");
    if(!Val.telefono(d.tel)) er.push("Número de contacto no válido.");
    if(!Val.texto(d.necesidad,10,1500)) er.push("Describe tu necesidad (mínimo 10 caracteres).");
    if(!f.privacidad.checked) er.push("Debes aceptar la política de privacidad.");
    if(er.length) return aviso(er.join(" "),false);
    const c=k=>Val.limpiar(d[k]||"-");
    const texto=`Solicitud de servicio\nNombre: ${c("nombre")}\nCorreo: ${c("correo")}\nContacto: ${c("tel")}\nInstitución: ${c("uni")}\nPrograma: ${c("prog")}\nServicio: ${c("tipo")}\nExtensión: ${c("ext")}\nFecha límite: ${c("fecha")}\nNorma: ${c("norma")}\nNecesidad: ${c("necesidad")}\n\n${Carrito.items().length?WA.resumenCarrito():""}`;
    if(d.via==="correo") location.href=`mailto:${CONFIG.correo}?subject=${encodeURIComponent("Solicitud de servicio")}&body=${encodeURIComponent(texto)}`;
    else WA.abrir(texto);
    aviso("Se abrió tu aplicación para enviar la solicitud. Aún no está enviada hasta que pulses enviar allí.");
  };
});

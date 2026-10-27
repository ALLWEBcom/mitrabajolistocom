// Versión inicial sin API. Para IA: reemplazar responder() por fetch a TU backend (nunca claves en GitHub).
(function(){
 const RESP = [
  {k:["servicio","ofrecen"],r:"Ofrecemos apoyo en redacción, revisión, presentaciones, material de estudio, normas APA, asesoría y tutorías. Puedes verlos en el catálogo.",ir:"#catalogo"},
  {k:["cuesta","precio","costo","tarifa"],r:"Algunos servicios tienen precio base y otros requieren cotización según extensión, complejidad y plazo. No puedo confirmar precios finales aquí; un asesor te los confirma."},
  {k:["cotiza","presupuesto"],r:"Llena el formulario de solicitud o agrega servicios al carrito y envía el resumen por WhatsApp.",ir:"#contacto"},
  {k:["material","enviar","requisito"],r:"Normalmente: tu borrador o tema, instrucciones del docente, norma requerida y fecha límite. No envíes contraseñas ni credenciales institucionales."},
  {k:["tarda","entrega","plazo","tiempo"],r:"Los tiempos son estimados y dependen de extensión y disponibilidad. El asesor confirma el plazo antes de empezar."},
  {k:["pago","pagar"],r:"En esta versión no se procesan pagos en la web. El asesor te indica los medios de pago al confirmar tu solicitud."},
  {k:["correcci"],r:"Para solicitar una corrección, indica en el formulario o por WhatsApp qué debe ajustarse. Las condiciones están en la política de revisiones.",ir:"legal/terminos.html"},
  {k:["asesor","humano","contacto","whatsapp"],r:"Te conecto con un asesor por WhatsApp.",wa:"Hola, quisiera hablar con un asesor."},
  {k:["privacidad","datos"],r:"Usamos tus datos solo para atender tu solicitud. Consulta la política completa.",ir:"legal/privacidad.html"},
  {k:["revisi","proceso"],r:"1) Nos cuentas tu necesidad. 2) Te confirmamos alcance, plazo y valor. 3) Trabajamos con tu material. 4) Recibes y puedes pedir ajustes dentro del alcance."}
 ];
 const RAP=["¿Qué servicios ofrecen?","¿Cuánto cuesta un servicio?","¿Cómo solicito una cotización?","¿Qué materiales debo enviar?","¿Cuánto tarda una entrega?","¿Cómo funciona el pago?","¿Cómo puedo solicitar una corrección?","¿Cómo contacto con un asesor?","¿Cuáles son sus políticas de privacidad?","¿Cómo funciona el proceso de revisión?"];
 const $=s=>document.querySelector(s);
 function msg(t,c){ const d=document.createElement("div"); d.className="m "+c; d.textContent=t; $("#cb-log").appendChild(d); $("#cb-log").scrollTop=1e9; return d; }
 function responder(q){
  const n=q.toLowerCase(); const r=RESP.find(x=>x.k.some(k=>n.includes(k)));
  if(!r){ msg("No tengo esa información. No quiero inventar datos; puedo conectarte con un asesor.","bot"); return; }
  const d=msg(r.r,"bot");
  const a=document.createElement("a"); 
  if(r.wa){ a.href=WA.url(r.wa); a.target="_blank"; a.rel="noopener"; a.textContent="Abrir WhatsApp"; d.append(" ",a); }
  else if(r.ir){ a.href=(location.pathname.includes("/legal/")&&!r.ir.startsWith("#")&&!r.ir.startsWith("legal")?"":"")+ (location.pathname.includes("/legal/")?"../":"")+r.ir; a.textContent="Ir allí"; d.append(" ",a); }
 }
 function init(){
  const w=document.createElement("div"); w.innerHTML=`<button id="cb-btn" aria-label="Abrir asistente virtual">💬</button>
  <section id="cb" role="dialog" aria-label="Asistente virtual" hidden><header><strong>Asistente virtual</strong><button id="cb-x" aria-label="Cerrar">✕</button></header>
  <div id="cb-log" aria-live="polite"></div><div id="cb-q"></div>
  <form id="cb-f"><input id="cb-i" placeholder="Escribe tu pregunta" aria-label="Pregunta" maxlength="200"><button>Enviar</button></form></section>`;
  document.body.append(w);
  msg("¡Hola! Bienvenido. Soy el asistente virtual. ¿En qué servicio académico puedo orientarte?","bot");
  RAP.forEach(q=>{ const b=document.createElement("button"); b.type="button"; b.textContent=q; b.onclick=()=>{msg(q,"yo");responder(q)}; $("#cb-q").append(b); });
  const adv=document.createElement("button"); adv.type="button"; adv.textContent="Hablar con un asesor"; adv.onclick=()=>WA.abrir("Hola, quisiera hablar con un asesor."); $("#cb-q").append(adv);
  $("#cb-btn").onclick=()=>{ $("#cb").hidden=!$("#cb").hidden; };
  $("#cb-x").onclick=()=>{ $("#cb").hidden=true; $("#cb-btn").focus(); };
  $("#cb-f").onsubmit=e=>{ e.preventDefault(); const v=Val.limpiar($("#cb-i").value); if(!v) return; msg(v,"yo"); responder(v); $("#cb-i").value=""; };
 }
 document.addEventListener("DOMContentLoaded",init);
})();

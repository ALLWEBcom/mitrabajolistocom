window.WA = {
  url(texto){ return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`; },
  abrir(texto){ window.open(this.url(texto),"_blank","noopener"); },
  resumenCarrito(){
    const l = Carrito.items();
    if(!l.length) return "Hola, quisiera una consulta general sobre sus servicios académicos.";
    let t = "Hola, quisiera solicitar estos servicios:\n";
    l.forEach(i=>{ t += `- ${i.nombre} x${i.cant}` + (i.precio? ` (${fmt(i.precio*i.cant)})`:" (cotización)") + "\n"; });
    t += `Total estimado de ítems con precio: ${fmt(Carrito.total())}\nNota: el total es estimado y sujeto a confirmación.`;
    return t;
  }
};

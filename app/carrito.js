const fmt = n => new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
window.Carrito = {
  k:"carrito_v1",
  items(){ try{ return JSON.parse(localStorage.getItem(this.k))||[]; }catch(e){ return []; } },
  guardar(l){ try{ localStorage.setItem(this.k,JSON.stringify(l)); }catch(e){} document.dispatchEvent(new Event("carrito")); },
  agregar(id){ const s=CATALOGO.find(x=>x.id===id); if(!s) return; const l=this.items(); const i=l.find(x=>x.id===id);
    if(i) i.cant++; else l.push({id,nombre:s.nombre,precio:s.precio,cant:1}); this.guardar(l); },
  cambiar(id,d){ let l=this.items(); const i=l.find(x=>x.id===id); if(!i) return; i.cant+=d; if(i.cant<1) l=l.filter(x=>x.id!==id); this.guardar(l); },
  quitar(id){ this.guardar(this.items().filter(x=>x.id!==id)); },
  vaciar(){ this.guardar([]); },
  total(){ return this.items().reduce((a,i)=>a+(i.precio||0)*i.cant,0); },
  cantidad(){ return this.items().reduce((a,i)=>a+i.cant,0); }
};

window.Val = {
  correo: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
  telefono: v => /^\+?[0-9\s-]{7,15}$/.test(v),
  texto: (v,min=1,max=2000) => v.trim().length>=min && v.length<=max,
  limpiar: v => String(v).replace(/[<>]/g,"").trim()
};

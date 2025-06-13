


let factura = JSON.parse(localStorage.getItem('factura')) || [];


const form = document.getElementById("formCompra");
const miCompra = document.getElementById('MiCompra');
const pago = document.getElementById("pago");

if (miCompra) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    miCompra.innerHTML = `<li>No hay productos en el carrito.</li>`;
  } else {
    carrito.forEach(item => {
      miCompra.innerHTML += `
        <li> 
          ${item.nombre} - ${item.precio}
        </li>`;
    });
  }

}
document.getElementById("formCompra").addEventListener("submit", function (e) {
  e.preventDefault();

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    alert("⚠️ No hay productos en el carrito.");
    return;
  }

  const nombre = document.getElementById("nombre").value;
  const dni = document.getElementById("dni").value;
  const metodoPago = document.getElementById("metodoPago").value;
  const numTarjeta = document.getElementById("numTarjeta").value;

  if (!nombre || !dni || metodoPago === "" || !numTarjeta) {
    Swal.fire({
      title: "❌ Datos inválidos",
      text: "Por favor, completá todos los campos.",
      icon: "error",
      background: "rgb(37, 37, 37)",
      color: "white",
      confirmButtonColor: "rgb(200, 50, 50)"
    });
    return;
  }

  const datosCompra = {
    nombre,
    dni,
    metodoPago,
    numTarjeta,
    carrito
  };

  Swal.fire({
    title: "✅ Compra realizada",
    text: "Se agregó el producto correctamente",
    background: "rgb(37, 37, 37)",
    color: "white",
    confirmButtonColor: "rgb(12, 165, 12)",
    icon: "success"
  });

  // Guardar factura
  const factura = JSON.parse(localStorage.getItem("factura")) || [];
  factura.push(datosCompra);
  localStorage.setItem("factura", JSON.stringify(factura));

  // Vaciar carrito
  localStorage.removeItem("carrito");
  miCompra.innerHTML = `<li>No hay productos en el carrito.</li>`;
  form.reset();
});

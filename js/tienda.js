let dropdownCarrito = document.getElementById('dropdownCarrito');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


/* Mostrar el contenido del carrito */
function mostrarCarrito() {
  if (carrito.length === 0) {
    dropdownCarrito.innerHTML = `
    <li>No hay productos en tu carrito</li>
    <a href="pages/compra.html"><button>Comprar</button></a>
    <button onclick="vaciarCarrito()" class="btnVaciar">Borrar productos</button>`;
    return;
  }

  dropdownCarrito.innerHTML = `<p>Mi carrito</p>`;

  carrito.forEach((item, index) => {
    dropdownCarrito.innerHTML += `<li>${item.nombre} - $${item.precio}</li>`;
  });

  const total = carrito.reduce((accum, item) => accum + item.precio, 0);

  dropdownCarrito.innerHTML += `
    <p>Total: $${total}</p>
    <a href="pages/compra.html"><button>Comprar</button></a>
    <button onclick="vaciarCarrito()">Borrar productos</button>`;
}

/* Guardar carrito en localStorage */
function guardarCompra() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

/* Vaciar carrito */
function vaciarCarrito() {
  carrito = [];
  guardarCompra();
  mostrarCarrito();
}

/* Mostrar/ocultar el menú */
const menuIcon = document.getElementById('menuIcon');
menuIcon.addEventListener('click', () => {
  dropdownCarrito.classList.toggle('hidden');
});

/* Agregar productos al carrito */
document.querySelectorAll('.btnAgregar').forEach(btn => {
  btn.addEventListener('click', () => {
    Swal.fire({
      title: "Se agrego el producto correctamente",
      background: "rgb(37, 37, 37)",
      color: "white",
      confirmButtonColor: "rgb(12, 165, 12)"
    });
    const nombre = btn.getAttribute('data-nombre');
    const precio = parseFloat(btn.getAttribute('data-precio'));

    carrito.push({ nombre, precio }); // eliminado `img` porque no está definido
    guardarCompra();
    mostrarCarrito();
  });
});

mostrarCarrito(); // solo esta función al final

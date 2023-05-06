//Declaracion de variables

let carrito = [];
let cantidadCarrito=0;
let contenedor = document.getElementById("misprods");

//API
let dolarVenta;
obtenerDolar();

//JSON
let productos= [];
obtenerJSON();


//EVENTOS


const finalizar = document.getElementById('checkout');
const productosComprados= [];

finalizar.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que la página se recargue al enviar el formulario
  const totalCarrito = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
  const compra = {
      id: Date.now(),
      nombre: "Compra #" + (localStorage.getItem("compraCount") || 0),
      descripcion: "Productos comprados",
      total: totalCarrito
  };
  localStorage.setItem("compra" + compra.id, JSON.stringify(compra));
  localStorage.setItem("compraCount", parseInt(localStorage.getItem("compraCount") || 0) + 1);
  Swal.fire({
    title: 'Compra realizada',
    text: 'Su compra ha sido concretada satisfactoriamente',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  })
  
  carrito =[]; // Vacía el carrito
  document.getElementById('tablabody').innerHTML = ``; // Vacía la tabla
  document.getElementById('total').innerText = 'Total a pagar $: 0'; // Reinicia el total a pagar
  cantidadCarrito = carrito.length;
  document.getElementById('cart-count').innerText = cantidadCarrito;
});


//Declaracion de funciones
function renderizarProductos(){
  for(const producto of productos){
      contenedor.innerHTML += `
          <div class="card col-sm-2">
              <img src=${producto.imagen} class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-text">${producto.nombre}</h5>
                  <p class="card-text">${producto.descripcion}</p>
                  <p class="card-text">U$ ${producto.precio}</p>
                  <button id='btn${producto.id}' class="btn btn-primary align-bottom">Comprar</button>
              </div>
          </div>   
      `;
  }
  productos.forEach((producto)=>{
    document.getElementById(`btn${producto.id}`).addEventListener('click',()=>{
        agregarACarrito(producto);
});
});
}

function agregarACarrito(prodAAgregar) {
  carrito.push(prodAAgregar);
  console.table(carrito);
  Swal.fire({
    title: 'Producto agregado al carrito',
    text: `Agregaste ${prodAAgregar.nombre} al carrito ! 💪`,
    imageUrl: `${prodAAgregar.imagen}`,
    imageAlt: 'Imagen del producto agregado',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  })
  
  //agregar fila a la tabla de carrito
  document.getElementById('tablabody').innerHTML += `
    <tr>
      <td>${prodAAgregar.id}</td>
      <td>${prodAAgregar.nombre}</td>
      <td>${prodAAgregar.precio}</td>
    </tr>
  `;
//incrementar el total
  let totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
  document.getElementById('total').innerText = 'Total a pagar usd: ' + totalCarrito+'   Total a pagar $: '+totalCarrito * dolarVenta;
  //storage
  localStorage.setItem("carrito",JSON.stringify(carrito));

  //actualizar cantidad de productos en el carrito
  cantidadCarrito = carrito.length;
  document.getElementById('cart-count').innerText = cantidadCarrito;
  
}


//API
function obtenerDolar(){
  const URLDOLAR='https://api.bluelytics.com.ar/v2/latest';
  fetch(URLDOLAR)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
          const dolarBlue = datos.blue;
          console.log(dolarBlue);
          document.getElementById('panel_header').innerHTML += `
              <p>Dolar compra: $ ${dolarBlue.value_buy} - Dolar venta: $ ${dolarBlue.value_sell}</p>
          `;
          dolarVenta = dolarBlue.value_sell;
      })
} 

//JSON
async function obtenerJSON(){
  try {
    const URLJSON = './js/productos.json';
    const respuesta = await fetch(URLJSON);
    const data = await respuesta.json();
    productos = data;
    //ya tengo los productos, entonces llamo a renderizarlos
    renderizarProductos();
  } catch (error) {
    console.error("Error al obtener el archivo JSON:", error);
  }

}

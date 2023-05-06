
//declaracion de variables
let confirmar = '';

//Definicion de clases de objetos
// Clase Micro
class Micro {
  constructor(microId, microNombre, microPrecio, microStock) {
    this.id = microId;
    this.nombre = microNombre;
    this.precio = microPrecio;
    this.stock = microStock;
  }
}

// Clase Mother
class Mother {
  constructor(motherId, motherNombre, motherPrecio, motherStock) {
    this.id = motherId;
    this.nombre = motherNombre;
    this.precio = motherPrecio;
    this.stock = motherStock;
  }
}

// Clase RAM
class RAM {
  constructor(ramId, ramNombre, ramPrecio, ramStock) {
    this.id = ramId;
    this.nombre = ramNombre;
    this.precio = ramPrecio;
    this.stock = ramStock;
  }
}

// Clase GPU
class GPU {
  constructor(gpuId, gpuNombre, gpuPrecio, gpuStock) {
    this.id = gpuId;
    this.nombre = gpuNombre;
    this.precio = gpuPrecio;
    this.stock = gpuStock;
  }
}

// Clase Fuente
class Fuente {
  constructor(fuenteId, fuenteNombre, fuentePrecio, fuenteStock) {
    this.id = fuenteId;
    this.nombre = fuenteNombre;
    this.precio = fuentePrecio;
    this.stock = fuenteStock;
  }
}

// Generacion de stock de productos
const p1 = new Micro(1, 'AMD Ryzen 3', 30000, 2000);
const p2 = new Micro(2, 'Micro AMD Ryzen 5 3600G 4.2 Ghz AM4', 55000, 50);
const p3 = new Micro(3, 'Micro AMD Ryzen 5 5600G 4.4 Ghz AM4', 70000, 100);
const p4 = new Micro(4, 'Micro AMD Ryzen 7 8000G 4.4 Ghz AM4', 100000, 30);
const p5 = new Micro(5, 'Intel Celeron G5900 ', 33000, 2000);
const p6 = new Micro(6, 'Micro Intel I3 - 10100F 4.3 Ghz 6Mb', 60000, 50);
const p7 = new Micro(7, 'Micro Intel I7 - 10700F 4.8 Ghz 16 Mb', 120000, 100);

const m1 = new Mother(1, 'Asus Prime B450M-A', 8000, 50);
const m2 = new Mother(2, 'Asus TUF B550M-PLUS WIFI', 20000, 20);

const r1 = new RAM(1, 'Corsair Vengeance LPX 8GB DDR4 3200MHz', 5000, 100);
const r2 = new RAM(2, 'G.Skill Ripjaws V 16GB DDR4 3600MHz', 12000, 50);

const g1 = new GPU(1, 'Nvidia GeForce RTX 3060', 50000, 10);
const g2 = new GPU(2, 'AMD Radeon RX 6700 XT', 55000, 20);

const f1 = new Fuente(1, 'EVGA 650W', 8000, 30);
const f2 = new Fuente(2, 'Corsair RM750', 14000, 15);

//creacion de arrays con objetos
const listamicro = [p1, p2, p3, p4, p5, p6, p7];
;
const listamother = [m1, m2];
const listaram = [r1, r2];
const listagpu = [g1, g2];
const listafuente = [f1, f2];


//Capturo los elementos del html para trabajarlos en JS
const productForm = document.getElementById('productForm');

const tipoProducto = document.getElementById('selproducto');

const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productStock = document.getElementById('productStock');

//Evento de escucha para el boton actualizar
productForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir que se recargue la página al enviar el formulario

  const product = tipoProducto.options[tipoProducto.selectedIndex].value;

  // Validar que los campos no estén vacíos y que los numéricos no acepten valores negativos
  if (productName.value === "" || productPrice.value === "" || productStock.value === "" ||
      parseFloat(productPrice.value) < 0 || parseInt(productStock.value) <= 0) {
    
    
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
        
    Swal.fire({
      title: 'Campos obligatorios incompletos',
      text: 'Por favor, rellene todos los campos obligatorios y asegúrese de que los campos numéricos no tengan valores negativos.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    })}
    else{

          // Crear nuevo objeto del tipo de producto correspondiente
    let nuevoProducto;
    if (product === 'micro') {
   listamicro.push(
     new Micro(
       listamicro.length + 1,
       productName.value,
       productPrice.value,
       productStock.value
     )
   );
   
   } else if (product === 'motherboard') {
   nuevoProducto = new Mother(
     listamother.length + 1,
     productName.value,
     productPrice.value,
     productStock.value
   );
   listamother.push(nuevoProducto);
 } else if (product === 'ram') {
   nuevoProducto = new RAM(
     listaram.length + 1,
     productName.value,
     productPrice.value,
     productStock.value
   );
   listaram.push(nuevoProducto);
 } else if (product === 'gpu') {
   nuevoProducto = new GPU(
     listagpu.length + 1,
     productName.value,
     productPrice.value,
     productStock.value
   );
   listagpu.push(nuevoProducto);
 } else if (product === 'fuente') {
   nuevoProducto = new Fuente(
     listafuente.length + 1,
     productName.value,
     productPrice.value,
     productStock.value
   );
   listafuente.push(nuevoProducto);
 }

      Swal.fire({
        title: 'Transaccion Completada',
        text: 'Se ha actualizado el stock',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }
    




// Guardado de listas en LocalStorage
localStorage.setItem('listamicro', JSON.stringify(listamicro));
localStorage.setItem('listamother', JSON.stringify(listamother));
localStorage.setItem('listaram', JSON.stringify(listaram));
localStorage.setItem('listagpu', JSON.stringify(listagpu));
localStorage.setItem('listafuente', JSON.stringify(listafuente));

//Muestra los datos guardados en LocalSTorage
const storedListamicro = JSON.parse(localStorage.getItem('listamicro'));
const storedListamother = JSON.parse(localStorage.getItem('listamother'));
const storedListaram = JSON.parse(localStorage.getItem('listaram'));
const storedListagpu = JSON.parse(localStorage.getItem('listagpu'));
const storedListafuente = JSON.parse(localStorage.getItem('listafuente'));

if (storedListamicro && storedListamother && storedListaram && storedListagpu && storedListafuente) {
  

  const datosGuardadosST = document.getElementById('datosGuardados');
  if (datosGuardadosST) {
    datosGuardadosST.innerHTML = `
      <h3>Lista de microprocesadores:</h3>
      <ul>
        ${storedListamicro.map(micro => `<li>${JSON.stringify(micro)}</li>`).join('')}
      </ul>
      <h3>Lista de motherboards:</h3>
      <ul>
        ${storedListamother.map(mother => `<li>${JSON.stringify(mother)}</li>`).join('')}
      </ul>
      <h3>Lista de RAM:</h3>
      <ul>
        ${storedListaram.map(ram => `<li>${JSON.stringify(ram)}</li>`).join('')}
      </ul>
      <h3>Lista de GPUs:</h3>
      <ul>
        ${storedListagpu.map(gpu => `<li>${JSON.stringify(gpu)}</li>`).join('')}
      </ul>
      <h3>Lista de fuentes de poder:</h3>
      <ul>
        ${storedListafuente.map(fuente => `<li>${JSON.stringify(fuente)}</li>`).join('')}
      </ul>
    `;
  } else {
    console.log('El elemento datosGuardados no existe en el HTML.');
  }
} else {
  console.log('No se han encontrado datos almacenados en el localStorage.');
}
})
































//declaraciones de variables
const registros = [];

//Tomo los elementos del html para trabajarlos
const formPerson = document.getElementById('formContacto');
const namePerson = document.getElementById('inputName');
const mailPerson = document.getElementById('inputEmail');
const phonePerson = document.getElementById('inputPhone');
const messagePerson = document.getElementById('inputMessage');
const registrosTable = document.getElementById('registrosTable');

formPerson.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir que se recargue la página al enviar el formulario

  // Validar que los campos no estén vacíos y que los numéricos no acepten valores negativos
  if (namePerson.value === "" || mailPerson.value === "" || messagePerson.value === "" || phonePerson.value<0) { 
    Swal.fire({
      title: 'Campos obligatorios incompletos',
      text: 'Por favor, rellene todos los campos obligatorios y asegúrese de que los campos numéricos no tengan valores negativos.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    })
    
    return;
  }

  //Guardado de datos en LocalStorage
  const nuevoRegistro = {
    nombre: namePerson.value,
    correo: mailPerson.value,
    telefono: phonePerson.value,
    mensaje: messagePerson.value
  };

  registros.push(nuevoRegistro);

  guardarEnLocalStorage(registros);
  mostrarRegistros(registros);
});

function guardarEnLocalStorage(registros) {
  localStorage.setItem('registros', JSON.stringify(registros));
}



// Muestra los datos guardados en LocalSTorage
function mostrarRegistros(registros) {
    registrosTable.innerHTML="";
    const storedRegistros = JSON.parse(localStorage.getItem('registros'));
    let html = '<thead><tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Mensaje</th></tr></thead><tbody>';
    
    for (let registro of storedRegistros) {
      html += `
        <tr>
          <td>${registro.nombre}</td>
          <td>${registro.correo}</td>
          <td>${registro.telefono}</td>
          <td>${registro.mensaje}</td>
        </tr>
      `;
    }
  
    html += '</tbody>';
    
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    tbody.innerHTML = html;
    table.appendChild(tbody);
    
    document.getElementById('registrosTable').appendChild(table);
  }
  




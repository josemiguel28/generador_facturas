const cantidadProductos = document.querySelector("#cantidadProductos");
const tipoProducto = document.querySelector("#tipo-producto");
const tablaFactura = document.querySelector("#tablaFactura");
const txtIsv = document.querySelector("#isv");
const txtExento = document.querySelector("#exento");
const txtGrabado = document.querySelector("#gravado");
const txtTotal = document.querySelector("#total");
const btnLimpiar = document.querySelector("#generarFactura")
let totalPrecioProductos = 0;
let isv = 0.15;
let exento = 0;
let gravado = 0;
let contador = 0;
const productosGravados = [{
  nombre: "azucar",
  precio: "25",
},
  {
    nombre: "pollo",
    precio: "33",
  },
  {
    nombre: "arroz",
    precio: "15",
  },
];

const productosExentos = [{
  nombre: "camera",
  precio: "550",
},
  {
    nombre: "cobijas",
    precio: "350",
  },
  {
    nombre: "pantalon gino ferreti",
    precio: "750",
  },
];

const cantidadMinima = 1;
const cantidadMaxima = 5;



txtIsv.textContent = 0;
txtExento.textContent = 0;
txtGrabado.textContent = 0;
txtTotal.textContent = 0;

function calcularFactura(tipo_producto) {

  var cantidad = cantidadProductos.value;


  for (let i = 1; i <= cantidad; i++) {
    tipo_producto.forEach((p) => {
      if (contador < cantidad) {
        const cantidadRandom = Math.floor(Math.random() * (cantidadMaxima - cantidadMinima + 1)) + cantidadMinima;

        let fila = document.createElement("tr");
        let td = document.createElement("td");

        td.innerText = cantidadRandom;
        fila.appendChild(td);

        td = document.createElement("td");
        td.innerText = p.nombre;
        fila.appendChild(td);

        td = document.createElement("td");
        td.innerText = p.precio;
        fila.appendChild(td);

        td = document.createElement("td");
        td.innerText = cantidadRandom * parseInt(p.precio);
        totalPrecioProductos += parseFloat((p.precio * cantidadRandom), 2);
        fila.appendChild(td);

        cuerpoTabla.appendChild(fila);

        contador++;
      }
      
    });
  }

  if (tipo_producto === 'gravado') {
    gravado = totalPrecioProductos / 1.15;
    isv = totalPrecioProductos - gravado;

    txtTotal.textContent = totalPrecioProductos.toFixed(2);
    txtGrabado.textContent = gravado.toFixed(2);
    txtIsv.textContent = isv.toFixed(2);
  } else {
    isv = totalPrecioProductos * 0.15;
    exento = totalPrecioProductos - isv

    txtTotal.textContent = totalPrecioProductos.toFixed(2);
    txtExento.textContent = exento.toFixed(2)
    txtIsv.textContent = isv.toFixed(2);
  }
}

function limpiarTabla(){
  var filas = tablaFactura.getElementsByTagName("tr");

  for (var i = 0; i < filas.length; i++) {
    var celdas = filas[i].getElementsByTagName("td");

    for (var j = 0; j < celdas.length; j++) {
      celdas[j].textContent = ""; // Restablecer el contenido de la celda
    }
  }
}

let cuerpoTabla = document.createElement("tbody");
tablaFactura.appendChild(cuerpoTabla);


tipoProducto.addEventListener('change', function(event) {
  let valor = event.target.value
 
  console.log(valor);
  if (event.target.value === 'exento') {

    calcularFactura(productosExentos);

    

  } else if (event.target.value === 'gravado') {
   
    calcularFactura(productosGravados);

  }
})


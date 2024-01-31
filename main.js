const cantidadProductos = document.querySelector("#cantidadProductos");
const tipoProducto = document.querySelector("#tipo-producto");
const calcularFactura = document.querySelector("#generarFactura");
const tablaFactura = document.querySelector("#tablaFactura");
const txtIsv = document.querySelector("#isv");
const txtExento = document.querySelector("#exento");
const txtGrabado = document.querySelector("#grabado");
const txtTotal = document.querySelector("#total");
// Obtén todas las filas de la tabla
const filas = document.querySelector(".totalUnitario");


let filaTotal;
let totalUnitario = 0;
let isv = 0.15;
let exento = 0;
let grabado = 0;
let contador = 0;
const productosGrabados = [
  {
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

const productosExentos = [
  {
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

//indice random del arreglo exento
const indiceRandomExento = Math.floor(Math.random() * productosExentos.length);
const productoAleatorio = productosExentos[indiceRandomExento];

//obtiene el valor de la cantidad de productos
var cantidad = cantidadProductos.value;


//obtienes el valor de exento o grabado
var selectedProduct = tipoProducto.options[tipoProducto.selectedIndex];
//console.log(selectedProduct);



txtIsv.textContent = 0;
txtExento.textContent = 0;
txtGrabado.textContent = 0;
txtTotal.textContent = 0;

calcularFactura.addEventListener("click", function () {
  for (let i = 1; i <= cantidad; i++) {
    productosExentos.forEach((p) => {
      if (contador < cantidad) {
        const cantidadRandom =
          Math.floor(Math.random() * (cantidadMaxima - cantidadMinima + 1)) +
          cantidadMinima;

        let fila = document.createElement("tr");
        let td = document.createElement("td");

        td.innerText = cantidadRandom;
        fila.appendChild(td);
       

        td = document.createElement("td");
        td.innerText = p.nombre;
        fila.appendChild(td);
       

        td = document.createElement("td");
        td.innerText = p.precio;
        totalUnitario += parseFloat(td.innerText = p.precio,2)
        fila.appendChild(td);
        

        td = document.createElement("td");
        td.innerText = cantidadRandom * parseInt(p.precio);
        fila.appendChild(td);

        cuerpoTabla.appendChild(fila);

        contador++;
      } else {
        return;
      }
    });
  }

  
  // Recorre las filas y obtiene el valor de la columna total


  grabado = totalUnitario / 1.15;
  isv = totalUnitario - grabado;

  txtTotal.textContent = totalUnitario.toFixed(2);
  txtGrabado.textContent = grabado.toFixed(2);
  txtIsv.textContent = isv.toFixed(2);
});

let cuerpoTabla = document.createElement("tbody");

tablaFactura.appendChild(cuerpoTabla);

function calcularISV() {}

function calcularExento() {}

function calcularGrabado() {}
function calcularTotal() {}

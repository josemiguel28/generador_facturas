const cantidadProductos = document.querySelector("#cantidadProductos");
const tipoProducto = document.querySelector("#tipo-producto");
const tablaFactura = document.querySelector("#tablaFactura");
const cuerpoTabla = document.querySelector('#tablaFactura tbody');
const txtIsv = document.querySelector("#isv");
const txtExento = document.querySelector("#exento");
const txtGrabado = document.querySelector("#grabado");
const txtTotal = document.querySelector("#total");
const txtTotalFinal = document.querySelector("#totalFinal");
const txtIsvFinal = document.querySelector("#isvFinal");
const txtExentoFinal = document.querySelector("#exentoFinal");
const txtGravadoFinal = document.querySelector("#gravadoFinal");

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
let totalFinal = 0;
let isvFinal = 0;
let gravadoFinal = 0;
let exentoFinal = 0;
function calcularFactura(tipo_producto) {
    var productos = false;
    let totalPrecioProductos = 0;
    let isv; 
    switch (tipo_producto) {
        case 'grabado':
            productos = productosGrabados;
            break;
        case 'exento':
            productos = productosExentos;
            break;
    }
    if (productos) {
        const fragment = document.createDocumentFragment();
        let cantidad = cantidadProductos.value;
        let contador = 0;

        for (let i = 1; i <= cantidad; i++) {
            productos.forEach((p) => {
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
                    fragment.appendChild(fila);
                    contador++;
                }
            });
        }
        
        cuerpoTabla.appendChild(fragment);
        if (tipo_producto === 'grabado') {
            let grabado = totalPrecioProductos / 1.15;
            isv = totalPrecioProductos - grabado;
            txtTotal.textContent = totalPrecioProductos.toFixed(2);
            txtGrabado.textContent = grabado.toFixed(2);
            txtIsv.textContent = isv.toFixed(2);
        } else {
            isv = totalPrecioProductos * 0.15;
            let exento = totalPrecioProductos - isv
            txtTotal.textContent = totalPrecioProductos.toFixed(2);
            txtExento.textContent = exento.toFixed(2)
            txtIsv.textContent = isv.toFixed(2);
        }
    }
    
    totalFinal += totalPrecioProductos;
    isvFinal += isv; 
    
}

function resetElements() {
    txtIsv.textContent = 0;
    txtExento.textContent = 0;
    txtGrabado.textContent = 0;
    txtTotal.textContent = 0;
    cuerpoTabla.innerHTML = "";
}

function granTotal() {
    txtTotalFinal.textContent = totalFinal;
    txtIsvFinal.textContent = isvFinal.toFixed(2);
}


tipoProducto.addEventListener('change', function (event) {
    let valor = event.target.value
    if (valor === "exento" || valor === "grabado") {
        resetElements();
        calcularFactura(valor);
        granTotal()
    }
})
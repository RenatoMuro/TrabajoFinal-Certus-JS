/* Variables */
let arrayCatalogo = new Array();//defrente array vacio
let numPagina;

/* Leer parámetros URL */
let parametrosURL = new URLSearchParams(location.search);

/* Comprobar página */
if (parseInt(parametrosURL.get("page")) == 1 || parametrosURL.get("page") == null) {
    numPagina = 1;
} else {
    numPagina = parametrosURL.get("page") == 1;
}

/* Solicitar datos al servidor */
fetch("productos.json").then(respuesta => respuesta.json()).then(objeto => {
    // quiero que array sea igual a objeto 
    arrayCatalogo = objeto;
    // funcion para cargar catalogo
    cargarCatalogo(numPagina);
})

/* Definir cargar catálogo */
function cargarCatalogo(pagina) {
    /* Referencia de catálogo */
    let filaCatalogo = document.querySelector("#catalogo");
    /* Crear elementos */
    let inicio = (pagina - 1) * 8;
    let final;
    let tmbfinal = pagina * 8;
    if (arrayCatalogo.length < tmbfinal) {
        final = arrayCatalogo.length;
    } else {
        final = tmbfinal;
    }
    for (let index = inicio; index <= final; index++) {
        /* Proceso precios */
        let precio = arrayCatalogo[index].price;
        let oferta = arrayCatalogo[index].offer * 100;
        let precioFinal = precio -(precio * oferta / 100);
        /* Crear artículos */
        let nuevoElemento = document.createElement("article");
        nuevoElemento.setAttribute("class", 'class="col-xs-12 col-sm-6 col-md-4 col-xl-3"');
        nuevoElemento.innerHTML =
            `
        <picture>
        <img class="img-fluid" src="image/productos/${arrayCatalogo[index].image}" alt="${arrayCatalogo[index].name}">
        </picture>
        <h4>${arrayCatalogo[index].name}</h4>
        <p>
        <span class="precioOriginal">S/ ${precio}</span><span class="precioDescuento">-${oferta}%</span> <br>
        <span class="precioFinal">S/ ${precioFinal}</span>
        </p>
        <button onclick="addCarrito(event)" class="btn btn-light">
        <i class="bi bi-plus-square"></i> 
        Agregar Carrito 
        </button>
        `;
        /* Añadir el nuevo elemento al catalogo */
        filaCatalogo.append(nuevoElemento);
    }
}
/* Función para añadir producto al carrito */
function addCarrito(event) {
    const button = event.target;
    const articulo = button.closest('article');
    const name = articulo.querySelector('h4').innerText;
    const precio = articulo.querySelector('.precioFinal').innerText;
    const imagen = articulo.querySelector('img').getAttribute('src');
    const nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = `
      <p>${name}</p>
      <img src="${imagen}"alt="${name}">
      <p>${precio}</p>
    `;
    const carritoProducto = document.getElementById('carritoProducto');
    carritoProducto.appendChild(nuevoElemento);

    const ventanaCarrito = new bootstrap.Modal(document.getElementById('ventanaCarrito'));
    ventanaCarrito.show();
  }

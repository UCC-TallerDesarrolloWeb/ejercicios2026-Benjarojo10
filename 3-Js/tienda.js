const productos = [
  {
    nombre: "Cabezal Sparring",
    description: "Cabezal de Sparring.",
    categoria: "Protectores",
    marca: "Gran Marc",
    talle: ["1", "2", "3"],
    precio: 35000,
    web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/",
    imagen: "cabezal-cerrado.webp",
  },
  {
    nombre: "Dobok Dan",
    description: "Bobok aprobado para torneos internacionales.",
    categoria: "Dobok",
    marca: "Daedo",
    talle: ["1", "2", "3", "4", "5", "6", "7", "8"],
    precio: 115000,
    web: "https://www.daedo.com/products/taitf-10813",
    imagen: "dobok.webp",
  },
  {
    nombre: "Escudo de Potencia",
    description: "Escudo de potencia para entrenamientos.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 51700,
    web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/",
    imagen: "escudo-potencia.webp",
  },
  {
    nombre: "Par de focos redondos",
    description: "Par de focos de 25cm x 25cm para hacer entrenamiento.",
    categoria: "Entrenamiento",
    marca: "Gran Marc",
    talle: ["s/talle"],
    precio: 15000,
    web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/",
    imagen: "foco-con-dedos.webp",
  },
  {
    nombre: "Guantes 10 onzas",
    description:
      "Guantes de Sparring de 10 onzas habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["s/talle"],
    precio: 35000,
    web: "https://www.daedo.com/products/pritf-2020",
    imagen: "protectores-manos.webp",
  },
  {
    nombre: "Protectores Pie",
    description: "Protectores de Pie habilitados para torneos internacionales",
    categoria: "Protectores",
    marca: "Daedo",
    talle: ["XXS", "XS", "S", "M", "L", "XL"],
    precio: 35000,
    web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022",
    imagen: "protectores-manos.webp",
  },
];
const URL_IMAGENES = "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/";

/**
 * Crea una tarjeta por cada producto del array y la muestra en el catálogo.
 * Se ejecuta en el onload del body.
 * @method renderizarProductos
 * @return {void}
 */
const renderizarProductos = () => {
    // 1. Variables
    let html = "";

    // 2. Operaciones: armo una tarjeta por producto
    productos.forEach((producto, indice) => {
        html += `
            <div class="tarjeta">
                <img src="${URL_IMAGENES}${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">$${producto.precio}</p>
                <button class="btn-detalle" onclick="mostrarDialog(${indice})">Ver detalle de Producto</button>
                <button class="btn-detalle" onclick="agregarAlCarrito(${indice})">Agregar al carrito</button>
            </div>
        `;
    });

    // 3. Asignación a la UI
    document.getElementById("catalogo").innerHTML = html;
};

/**
 * Abre el dialog con el detalle del producto seleccionado.
 * @method mostrarDialog
 * @param {number} indice - Posición del producto en el array productos
 * @return {void}
 */
const mostrarDialog = (indice) => {
    // 1. Variables
    const producto = productos[indice];
    let html;

    // 2. Operaciones: armo el contenido del detalle
    html = `
        <h2>${producto.nombre}</h2>
        <img src="${URL_IMAGENES}${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.description}</p>
        <p><strong>Categoría:</strong> ${producto.categoria}</p>
        <p><strong>Marca:</strong> ${producto.marca}</p>
        <p><strong>Talles:</strong> ${producto.talle.join(", ")}</p>
        <p class="precio">$${producto.precio}</p>
        <p><a href="${producto.web}" target="_blank">Ver en la web del fabricante</a></p>
    `;

    // 3. Asignación a la UI
    document.getElementById("detalle").innerHTML = html;
    document.getElementById("dialogo").showModal();
};

/**
 * Cierra el dialog del detalle de producto.
 * @method cerrarDialog
 * @return {void}
 */
const cerrarDialog = () => {
    document.getElementById("dialogo").close();
};
/**
 * Lee el carrito guardado en localStorage.
 * @method obtenerCarrito
 * @return {Array} Array de productos del carrito (vacío si no hay nada)
 */
const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
};

/**
 * Agrega un producto al carrito y lo guarda en localStorage.
 * @method agregarAlCarrito
 * @param {number} indice - Posición del producto en el array productos
 * @return {void}
 */
const agregarAlCarrito = (indice) => {
    // 1. Variables
    const carrito = obtenerCarrito();
    const producto = productos[indice];

    // 2. Operaciones
    carrito.push(producto);

    // 3. Guardado y aviso
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(producto.nombre + " se agregó al carrito");
};

/**
 * Muestra en carrito.html el listado de productos guardados.
 * Se ejecuta en el onload del body de carrito.html.
 * @method renderizarCarrito
 * @return {void}
 */
const renderizarCarrito = () => {
    // 1. Variables
    const carrito = obtenerCarrito();
    let html = "";

    // 2. Operaciones
    if (carrito.length === 0) {
        html = "<p>El carrito está vacío.</p>";
    } else {
        carrito.forEach((producto) => {
            html += `
                <div class="item-carrito">
                    <img src="${URL_IMAGENES}${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p class="precio">$${producto.precio}</p>
                </div>
            `;
        });
    }

    // 3. Asignación a la UI
    document.getElementById("lista-carrito").innerHTML = html;
};
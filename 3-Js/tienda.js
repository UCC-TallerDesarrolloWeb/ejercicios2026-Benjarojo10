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

/* ===================== UTILIDADES ===================== */

/**
 * Formatea un número como precio argentino: $3.123,45
 * @method formatearPrecio
 * @param {number} precio - Precio a formatear
 * @return {string} Precio con formato $X.XXX,XX
 */
const formatearPrecio = (precio) => {
    const formato = new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return "$" + formato.format(precio);
};

/**
 * Actualiza el número del botón del carrito con la suma de todas las cantidades.
 * @method actualizarContador
 * @return {void}
 */
const actualizarContador = () => {
    const totalUnidades = obtenerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
    document.getElementById("contador").innerHTML = totalUnidades;
};

/* ===================== CATÁLOGO ===================== */

/**
 * Crea una tarjeta por cada producto de la lista y la muestra en el catálogo.
 * Si no recibe lista, muestra todos los productos.
 * @method renderizarProductos
 * @param {Array} lista - Productos a mostrar (por defecto, todos)
 * @return {void}
 */
const renderizarProductos = (lista = productos) => {
    // 1. Variables
    let html = "";

    // 2. Operaciones
    if (lista.length === 0) {
        html = "<p>No hay productos que coincidan con la búsqueda.</p>";
    }

    lista.forEach((producto) => {
        const indice = productos.indexOf(producto); // posición en el array original
        html += `
            <div class="tarjeta">
                <img src="${URL_IMAGENES}${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">${formatearPrecio(producto.precio)}</p>
                <button class="btn-detalle" onclick="mostrarDialog(${indice})">Ver detalle de Producto</button>
                <button class="btn-detalle" onclick="agregarAlCarrito(${indice})">Agregar al carrito</button>
            </div>
        `;
    });

    // 3. Asignación a la UI
    document.getElementById("catalogo").innerHTML = html;
};

/**
 * Filtra el catálogo por palabra, rango de precio, marca y categoría,
 * y después lo ordena según lo elegido en el select.
 * Se ejecuta cada vez que cambia algún campo del formulario de filtros.
 * @method filtrarProductos
 * @return {void}
 */
const filtrarProductos = () => {
    // 1. Variables
    const texto = document.getElementById("search").value.toLowerCase();
    const minimo = Number(document.getElementById("precio-min").value) || 0;
    const maximo = Number(document.getElementById("precio-max").value) || Infinity;
    const marca = document.getElementById("marca").value;
    const categorias = Array.from(document.querySelectorAll('input[name="tipo"]:checked'))
        .map((checkbox) => checkbox.value);
    const orden = document.getElementById("orden").value;

    // 2. Operaciones
    const filtrados = productos.filter((producto) =>
        // Por palabra (en nombre o descripción)
        (producto.nombre.toLowerCase().includes(texto) ||
            producto.description.toLowerCase().includes(texto)) &&
        // Por rango de precio
        producto.precio >= minimo &&
        producto.precio <= maximo &&
        // Por marca ("" = todas)
        (marca === "" || producto.marca === marca) &&
        // Por categoría (ninguna tildada = todas)
        (categorias.length === 0 || categorias.includes(producto.categoria.toLowerCase()))
    );

    // 3. Ordenar y asignar a la UI
    renderizarProductos(ordenarProductos(filtrados, orden));
};

/* ===================== DIALOG ===================== */

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
        <p class="precio">${formatearPrecio(producto.precio)}</p>
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

/* ===================== CARRITO ===================== */

/**
 * Lee el carrito guardado en localStorage.
 * @method obtenerCarrito
 * @return {Array} Array de items del carrito (cada uno con su cantidad)
 */
const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
};

/**
 * Agrega un producto al carrito. Si ya estaba, le suma 1 a la cantidad.
 * @method agregarAlCarrito
 * @param {number} indice - Posición del producto en el array productos
 * @return {void}
 */
const agregarAlCarrito = (indice) => {
    // 1. Variables
    const carrito = obtenerCarrito();
    const producto = productos[indice];
    const existente = carrito.find((item) => item.nombre === producto.nombre);

    // 2. Operaciones
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    // 3. Guardado, contador y aviso
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
    alert(producto.nombre + " se agregó al carrito");
};

/**
 * Muestra en carrito.html el listado de productos con cantidad, subtotal y total.
 * Se ejecuta en el onload del body de carrito.html.
 * @method renderizarCarrito
 * @return {void}
 */
const renderizarCarrito = () => {
    // 1. Variables
    const carrito = obtenerCarrito();
    let html = "";
    let total = 0;

    // 2. Operaciones
    if (carrito.length === 0) {
        html = "<p>El carrito está vacío.</p>";
    } else {
        carrito.forEach((item, indice) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            html += `
                <div class="item-carrito">
                    <img src="${URL_IMAGENES}${item.imagen}" alt="${item.nombre}">
                    <h3>${item.nombre}</h3>
                    <p>Cantidad: <strong>${item.cantidad}</strong></p>
                    <p>${formatearPrecio(item.precio)} c/u</p>
                    <p class="precio">${formatearPrecio(subtotal)}</p>
                    <button class="btn-detalle" onclick="eliminarDelCarrito(${indice})">Eliminar</button>
                </div>
            `;
        });
    }

    // 3. Asignación a la UI
    document.getElementById("lista-carrito").innerHTML = html;
    document.getElementById("total").innerHTML = "Total a pagar: " + formatearPrecio(total);
    actualizarContador();
};

/**
 * Borra todo el carrito del localStorage y actualiza la vista.
 * @method vaciarCarrito
 * @return {void}
 */
const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    renderizarCarrito();
};

/**
 * Elimina un producto del carrito según su posición y actualiza la vista.
 * @method eliminarDelCarrito
 * @param {number} indice - Posición del producto dentro del carrito
 * @return {void}
 */
const eliminarDelCarrito = (indice) => {
    // 1. Variables
    const carrito = obtenerCarrito();

    // 2. Operaciones
    carrito.splice(indice, 1); // saca 1 elemento desde la posición indice

    // 3. Guardado y actualización de la UI
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
};
/* ===================== ORDEN ===================== */

/**
 * Devuelve una copia de la lista ordenada según el criterio elegido.
 * @method ordenarProductos
 * @param {Array} lista - Productos a ordenar
 * @param {string} criterio - "precio-asc", "precio-desc", "nombre-asc", "nombre-desc" o "" (sin orden)
 * @return {Array} Nueva lista ordenada
 */
const ordenarProductos = (lista, criterio) => {
    // 1. Variables: copio la lista para no modificar el array original
    const copia = [...lista];

    // 2. Operaciones
    if (criterio === "precio-asc") {
        copia.sort((a, b) => a.precio - b.precio);
    } else if (criterio === "precio-desc") {
        copia.sort((a, b) => b.precio - a.precio);
    } else if (criterio === "nombre-asc") {
        copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (criterio === "nombre-desc") {
        copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    // 3. Resultado
    return copia;
};
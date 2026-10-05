/**
 * Convierte un valor de longitud entre metro, pulgada, pie y yarda.
 * Pasa el valor ingresado a metros y desde ahí calcula las demás unidades.
 * @method convertirUnidades
 * @param {string} id - Id del campo que cambió ("metro", "pulgada", "pie" o "yarda")
 * @param {string} valor - Valor ingresado por el usuario en ese campo
 * @return {void} No retorna valor; escribe los resultados en los inputs
 */
const convertirUnidades = (id, valor) => {
    // 1. Variables
    let metro, pulgada, pie, yarda;

    // 2. Operaciones
    if (isNaN(valor)) {
        alert("Se ingresó un valor incorrecto en: " + id);
        metro = "";
        pulgada = "";
        pie = "";
        yarda = "";
    } else {
        if (id === "metro") {
            metro = Number(valor);
        } else if (id === "pulgada") {
            metro = Number(valor) / 39.3701;
        } else if (id === "pie") {
            metro = Number(valor) / 3.28084;
        } else if (id === "yarda") {
            metro = Number(valor) / 1.09361;
        }
        pulgada = metro * 39.3701;
        pie = metro * 3.28084;
        yarda = metro * 1.09361;
    }

    // 3. Asignación a la UI
    document.getElementById("metro").value = metro;
    document.getElementById("pulgada").value = pulgada;
    document.getElementById("pie").value = pie;
    document.getElementById("yarda").value = yarda;
};

/**
 * Convierte un ángulo entre grados y radianes usando Math.PI.
 * @method convertirGR
 * @param {string} id - Id del campo que cambió ("grados" o "radianes")
 * @param {string} valor - Valor ingresado por el usuario en ese campo
 * @return {void} No retorna valor; escribe los resultados en los inputs
 */
const convertirGR = (id, valor) => {
    // 1. Variables
    let grados, radianes;

    // 2. Operaciones
    if (isNaN(valor)) {
        alert("Se ingresó un valor incorrecto en: " + id);
        grados = "";
        radianes = "";
    } else if (id === "grados") {
        grados = Number(valor);
        radianes = grados * Math.PI / 180;
    } else if (id === "radianes") {
        radianes = Number(valor);
        grados = radianes * 180 / Math.PI;
    }

    // 3. Asignación a la UI
    document.getElementById("grados").value = grados;
    document.getElementById("radianes").value = radianes;
};
/**
 * Muestra u oculta el div según el radio button seleccionado.
 * @method mostrarOcultar
 * @param {string} valor - Valor del radio elegido ("val_mostrar" o "val_ocultar")
 * @return {void} No retorna valor; cambia el display del div
 */
const mostrarOcultar = (valor) => {
    // 1. Variables
    let display;

    // 2. Operaciones
    if (valor === "val_mostrar") {
        display = "block";
    } else if (valor === "val_ocultar") {
        display = "none";
    }

    // 3. Asignación a la UI
    document.getElementById("unDiv").style.display = display;
};
/**
 * Resuelve una operación matemática cuando ambos inputs tienen un número.
 * Usa la letra de la operación para armar los ids (ej: 's' → nums1, nums2, totalS).
 * @method operar
 * @param {string} op - Operación: 's' suma, 'r' resta, 'm' multiplicación, 'd' división
 * @return {void} No retorna valor; escribe el resultado en el input deshabilitado
 */
const operar = (op) => {
    // 1. Variables
    const valor1 = document.getElementById("num" + op + "1").value;
    const valor2 = document.getElementById("num" + op + "2").value;
    let num1, num2, resultado;

    // 2. Operaciones
    if (valor1 === "" || valor2 === "") {
        return; // todavía falta completar uno de los dos
    }

    num1 = Number(valor1); // casteo String → Number
    num2 = Number(valor2);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Ingresá solo números");
        resultado = "";
    } else if (op === "s") {
        resultado = num1 + num2;
    } else if (op === "r") {
        resultado = num1 - num2;
    } else if (op === "m") {
        resultado = num1 * num2;
    } else if (op === "d") {
        resultado = num2 === 0 ? "No se puede dividir por 0" : num1 / num2;
    }

    // 3. Asignación a la UI
    document.getElementById("total" + op.toUpperCase()).value = resultado;
};
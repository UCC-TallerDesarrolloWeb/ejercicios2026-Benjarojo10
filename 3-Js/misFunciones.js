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
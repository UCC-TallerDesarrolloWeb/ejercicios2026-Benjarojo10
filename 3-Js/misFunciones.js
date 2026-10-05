/**
 * Convierte un valor de longitud entre metro, pulgada, pie y yarda.
 * Pasa el valor ingresado a metros y desde ahí calcula las demás unidades.
 * @method convertirUnidades
 * @param {string} id - Id del campo que cambió ("metro", "pulgada", "pie" o "yarda")
 * @param {string} valor - Valor ingresado por el usuario en ese campo
 * @return {void} No retorna valor; escribe los resultados en los inputs
 */
function convertirUnidades(id, valor) {
    if (isNaN(valor)) {
        alert("Se ingresó un valor incorrecto en: " + id);
        document.getElementById("metro").value = "";
        document.getElementById("pulgada").value = "";
        document.getElementById("pie").value = "";
        document.getElementById("yarda").value = "";
        return;
    }

    let metro;
    if (id === "metro") {
        metro = Number(valor);
    } else if (id === "pulgada") {
        metro = valor / 39.3701;
    } else if (id === "pie") {
        metro = valor / 3.28084;
    } else if (id === "yarda") {
        metro = valor / 1.09361;
    }

    document.getElementById("metro").value = metro;
    document.getElementById("pulgada").value = metro * 39.3701;
    document.getElementById("pie").value = metro * 3.28084;
    document.getElementById("yarda").value = metro * 1.09361;
}
/**
 * Convierte un ángulo entre grados y radianes usando Math.PI.
 * @method convertirGR
 * @param {string} id - Id del campo que cambió ("grados" o "radianes")
 * @param {string} valor - Valor ingresado por el usuario en ese campo
 * @return {void} No retorna valor; escribe el resultado en el otro input
 */
function convertirGR(id, valor) {
    if (isNaN(valor)) {
        alert("Se ingresó un valor incorrecto en: " + id);
        document.getElementById("grados").value = "";
        document.getElementById("radianes").value = "";
        return;
    }

    if (id === "grados") {
        document.getElementById("radianes").value = valor * Math.PI / 180;
    } else if (id === "radianes") {
        document.getElementById("grados").value = valor * 180 / Math.PI;
    }
}
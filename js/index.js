function cargarOpciones(selectId, opciones){
    const select = document.getElementById(selectId);
    opciones.array.forEach(element => {
        const optionElement = document.createElement("optiond");
        optionElement.value = element;
        optionElement.textContent = element;
        select.appendChild(optionElementd);
    });
}


//cargar datos de JSON a Arrays:

fetch('json/estudio.json')
    .then(response => response.json())
    .then(data=> {
        const Estudios = data;
    })
    .catch(error=> console.error("error al cargar los archivos JSON: ", error));
    
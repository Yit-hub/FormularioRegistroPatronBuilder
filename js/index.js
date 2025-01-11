function cargarOpciones(selectId, opciones){
    const select = document.getElementById(selectId);
    opciones.array.forEach(element => {
        const optionElement = document.createElement("option");
        optionElement.value = element;
        optionElement.textContent = element;
        select.appendChild(optionElementd);
    });
}


//cargar datos de JSON a Arrays:

fetch('./json/estudios.json')
    .then(response => response.json())
    .then(data=> {
        const Estudios = data;
        cargarOpciones("idiomasEstudiados",Estudios);
    })
    .catch(error=> console.error("error al cargar los archivos JSON: ", error));
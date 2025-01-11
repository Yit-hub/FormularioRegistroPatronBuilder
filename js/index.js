async function fetchJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener ${url}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return null;
    }
  }

  async function cargarDatos() {
    const idiomasData = await fetchJSON('./json/idiomas.json');
    const profesionesData = await fetchJSON('./json/profesiones.json');
    const gradosData = await fetchJSON('./json/estudios.json');
    const alergiasData = await fetchJSON('./json/alergias.json');

    if (idiomasData){
        cargarOpciones("idiomasEstudiados", idiomasData.idiomas);
        cargarOpciones("conocidos", idiomasData.idiomas);
        cargarOpciones("lengua", idiomasData.idiomas);
        cargarOpciones("fConocidos", idiomasData.idiomas);
        cargarOpciones("fLengua", idiomasData.idiomas);



    }
    if (profesionesData) cargarOpciones("profesion", profesionesData.profesiones);
    if (gradosData){
        cargarOpciones("nivelEstudios", gradosData.gradosDeEstudio);
        cargarOpciones("nivelSolicitado", gradosData.gradosDeEstudio);
    } 
    if (alergiasData) cargarOpciones("alergias",alergiasData.alergias);
  }
  
  // Función para cargar opciones en un <select>
  function cargarOpciones(selectId, opciones) {
    const select = document.getElementById(selectId);
    opciones.forEach(opcion => {
      const optionElement = document.createElement("option");
      optionElement.value = opcion;
      optionElement.textContent = opcion;
      select.appendChild(optionElement);
    });
  }
  
  // Ejecutar la carga de datos al cargar la página
  document.addEventListener('DOMContentLoaded', cargarDatos);
  
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
    const ubicacionesData = await fetchJSON('./json/ubicaciones.json');

    if (ubicacionesData) cargarDatos("ciudadNacimiento", ubicacionesData.ciudades)
    if (idiomasData) {
        cargarOpciones("idiomasEstudiados", idiomasData.idiomas);
        cargarOpciones("conocidos", idiomasData.idiomas);
        cargarOpciones("lengua", idiomasData.idiomas);
        cargarOpciones("fConocidos", idiomasData.idiomas);
        cargarOpciones("fLengua", idiomasData.idiomas);
    }

    if (profesionesData) cargarOpciones("profesion", profesionesData.profesiones);
    if (gradosData) {
        cargarOpciones("nivelEstudios", gradosData.gradosDeEstudio);
        cargarOpciones("nivelSolicitado", gradosData.gradosDeEstudio);
    }
    if (alergiasData) cargarOpciones("alergias", alergiasData.alergias);
}

function cargarOpciones(selectId, opciones) {
    const select = document.getElementById(selectId);
    select.innerHTML = ''; // Limpiar opciones existentes
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione una opción';
    select.appendChild(defaultOption);
  
    opciones.forEach(opcion => {
      const optionElement = document.createElement('option');
      optionElement.value = opcion;
      optionElement.textContent = opcion;
      select.appendChild(optionElement);
    });
  }
  
  // Cargar ubicaciones dinámicamente
  async function cargarUbicaciones() {
    const ubicacionesData = await fetchJSON('./json/ubicaciones.json');
    if (!ubicacionesData) return;
  
    // Obtener lista de países
    const paises = ubicacionesData.ubicaciones.map(ubicacion => ubicacion.pais);
    cargarOpciones('pais', paises);
  
    // Manejar cambio de país
    document.getElementById('pais').addEventListener('change', function () {
      const paisSeleccionado = this.value;
      const ubicacion = ubicacionesData.ubicaciones.find(u => u.pais === paisSeleccionado);
  
      if (ubicacion) {
        const ciudades = ubicacion.ciudades.map(ciudad => ciudad.ciudad);
        cargarOpciones('ciudad', ciudades);
        cargarOpciones('poblacion', []); // Limpiar poblaciones
      } else {
        cargarOpciones('ciudad', []);
        cargarOpciones('poblacion', []);
      }
    });
  
    // Manejar cambio de ciudad
    document.getElementById('ciudad').addEventListener('change', function () {
      const paisSeleccionado = document.getElementById('pais').value;
      const ciudadSeleccionada = this.value;
      const ubicacion = ubicacionesData.ubicaciones.find(u => u.pais === paisSeleccionado);
  
      if (ubicacion) {
        const ciudad = ubicacion.ciudades.find(c => c.ciudad === ciudadSeleccionada);
        if (ciudad) {
          cargarOpciones('poblacion', ciudad.poblaciones);
        } else {
          cargarOpciones('poblacion', []);
        }
      }
    });
  }
  
  // Función genérica para realizar fetch
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
  
  // Ejecutar la carga al iniciar
  document.addEventListener('DOMContentLoaded', cargarUbicaciones);
  

    // Ejecutar la carga de datos al cargar la página
    document.addEventListener('DOMContentLoaded', cargarDatos);

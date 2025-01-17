document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    // Helper function to validate NIF
    const validateNIF = (nif) => {
        const nifPattern = /^[0-9]{8}[A-Z]$/;
        return nifPattern.test(nif);
    };

    // Helper function to validate Postal Code
    const validatePostalCode = (cp) => {
        const cpPattern = /^[0-9]{5}$/;
        return cpPattern.test(cp);
    };

    // Generic validation function
    const validateField = (field, validationFn, errorMessage) => {
        const errorContainer = field.nextElementSibling;
        if (!validationFn(field.value.trim())) {
            field.classList.add("invalid");
            if (errorContainer) {
                errorContainer.textContent = errorMessage;
            }
        } else {
            field.classList.remove("invalid");
            if (errorContainer) {
                errorContainer.textContent = "";
            }
        }
    };

    // Field validation setup
    const validateFields = () => {
        // Datos del Alumno
        const alumnoNombre = document.querySelector(".Alumno input[name='nombre']");
        const alumnoApellidos = document.querySelector(".Alumno input[name='apellidos']");
        const alumnoNIF = document.querySelector(".Alumno input[name='nif']");
        const lenguaMaterna = document.querySelector(".Alumno select[name='lengua']");
        const idiomasConocidos = document.querySelector(".Alumno select[name='conocidos']");

        alumnoNombre.addEventListener("blur", () => validateField(alumnoNombre, val => val !== "", "El nombre es obligatorio."));
        alumnoApellidos.addEventListener("blur", () => validateField(alumnoApellidos, val => val !== "", "Los apellidos son obligatorios."));
        alumnoNIF.addEventListener("blur", () => validateField(alumnoNIF, validateNIF, "El NIF no tiene un formato válido."));
        lenguaMaterna.addEventListener("change", () => validateField(lenguaMaterna, val => val !== "", "Seleccione una lengua materna."));
        idiomasConocidos.addEventListener("change", () => validateField(idiomasConocidos, val => val.length > 0, "Seleccione al menos un idioma conocido."));

        // Información de la familia
        const familiares = document.querySelectorAll(".familia");
        familiares.forEach(familia => {
            const nombreFamiliar = familia.querySelector("input[name='nombre']");
            const apellidosFamiliar = familia.querySelector("input[name='apellidos']");
            const nifFamiliar = familia.querySelector("input[name='nif']");
            const ciudadNacimiento = familia.querySelector("select[name='ciudadNacimiento']");
            const profesion = familia.querySelector("select[name='profesion']");
            const lenguaFamiliar = familia.querySelector("select[name='fLengua']");
            const idiomasFamiliar = familia.querySelector("select[name='fConocidos']");

            nombreFamiliar.addEventListener("blur", () => validateField(nombreFamiliar, val => val !== "", "El nombre es obligatorio."));
            apellidosFamiliar.addEventListener("blur", () => validateField(apellidosFamiliar, val => val !== "", "Los apellidos son obligatorios."));
            nifFamiliar.addEventListener("blur", () => validateField(nifFamiliar, validateNIF, "El NIF no tiene un formato válido."));
            ciudadNacimiento.addEventListener("change", () => validateField(ciudadNacimiento, val => val !== "", "Seleccione una ciudad de nacimiento."));
            profesion.addEventListener("change", () => validateField(profesion, val => val !== "", "Seleccione una profesión."));
            lenguaFamiliar.addEventListener("change", () => validateField(lenguaFamiliar, val => val !== "", "Seleccione una lengua materna."));
            idiomasFamiliar.addEventListener("change", () => validateField(idiomasFamiliar, val => val.length > 0, "Seleccione al menos un idioma conocido."));
        });

        // Dirección Actual
        const pais = document.querySelector(".direccion select[name='pais']");
        const ciudad = document.querySelector(".direccion select[name='ciudad']");
        const poblacion = document.querySelector(".direccion select[name='poblacion']");
        const direccionCompleta = document.querySelector(".direccion input[name='direccionCompleta']");
        const codigoPostal = document.querySelector(".direccion input[pattern]");

        pais.addEventListener("change", () => validateField(pais, val => val !== "", "Seleccione un país."));
        ciudad.addEventListener("change", () => validateField(ciudad, val => val !== "", "Seleccione una ciudad."));
        poblacion.addEventListener("change", () => validateField(poblacion, val => val !== "", "Seleccione una población."));
        direccionCompleta.addEventListener("blur", () => validateField(direccionCompleta, val => val !== "", "La dirección es obligatoria."));
        codigoPostal.addEventListener("blur", () => validateField(codigoPostal, validatePostalCode, "El código postal no es válido."));

        // Datos Académicos
        const colegio = document.querySelector(".datos input[name='colegio']");
        const nivelEstudios = document.querySelector(".datos select[name='nivelEstudios']");
        const idiomasEstudiados = document.querySelector(".datos select[name='idiomasEstudiados']");
        const nivelSolicitado = document.querySelector(".datos select[name='nivelSolicitado']");

        colegio.addEventListener("blur", () => validateField(colegio, val => val !== "", "El colegio es obligatorio."));
        nivelEstudios.addEventListener("change", () => validateField(nivelEstudios, val => val !== "", "Seleccione el nivel de estudios."));
        idiomasEstudiados.addEventListener("change", () => validateField(idiomasEstudiados, val => val.length > 0, "Seleccione al menos un idioma estudiado."));
        nivelSolicitado.addEventListener("change", () => validateField(nivelSolicitado, val => val !== "", "Seleccione el nivel solicitado."));

        // Información Médica
        //const alergias = document.querySelector(".medica select[name='alergias']");
        //const medicacion = document.querySelector(".medica textarea[name='medicacion']");

        //alergias.addEventListener("change", () => validateField(alergias, () => true, ""));
        //medicacion.addEventListener("blur", () => validateField(medicacion, () => true, ""));
    };

    validateFields();

// Submit handler
form.querySelector(".enviar").addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el envío por defecto

    // Valida todos los campos manualmente
    const fieldsToValidate = [
        ...document.querySelectorAll(".Alumno input, .Alumno select"),
        ...document.querySelectorAll(".familia input, .familia select"),
        ...document.querySelectorAll(".direccion input, .direccion select"),
        ...document.querySelectorAll(".datos input, .datos select"),
        ...document.querySelectorAll(".medica select, .medica textarea")
    ];

    let formIsValid = true;

    fieldsToValidate.forEach(field => {
        const validationFn = field.getAttribute("pattern") ? 
            (value) => new RegExp(field.getAttribute("pattern")).test(value) :
            (value) => value.trim() !== "";

        const isValid = validationFn(field.value.trim());
        if (!isValid) { 
            field.classList.add("invalid");
            formIsValid = false;

            // Mostrar mensaje de error si corresponde
            const errorContainer = field.nextElementSibling;
            if (errorContainer) {
                const errorMessage = field.getAttribute("data-error-message") || "Este campo es obligatorio.";
                errorContainer.textContent = errorMessage;
            }
        } else {
            field.classList.remove("invalid");
            const errorContainer = field.nextElementSibling;
            if (errorContainer) {
                errorContainer.textContent = "";
            }
        }
    });

    if (!formIsValid) {
        alert("Por favor, corrija los errores antes de enviar el formulario.");
    } else {
        alert("Formulario enviado correctamente.");
        // Aquí puedes manejar el envío del formulario
    }
});

});

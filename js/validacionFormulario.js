document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    // Helper function to validate NIF
    const validateNIF = (nif) => /^[0-9]{8}[A-Z]$/.test(nif);

    // Helper function to validate Postal Code
    //const validatePostalCode = (cp) => /^[0-9]{5}$/.test(cp);

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
        const alumnoFields = [
            { selector: ".Alumno input[name='nombre']", validationFn: val => val !== "", error: "El nombre es obligatorio." },
            { selector: ".Alumno input[name='apellidos']", validationFn: val => val !== "", error: "Los apellidos son obligatorios." },
            { selector: ".Alumno input[name='nif']", validationFn: validateNIF, error: "El NIF no tiene un formato válido." },
            { selector: ".Alumno select[name='lengua']", validationFn: val => val !== "", error: "Seleccione una lengua materna." },
            { selector: ".Alumno select[name='conocidos']", validationFn: val => val.length > 0, error: "Seleccione al menos un idioma conocido." },
        ];

        alumnoFields.forEach(({ selector, validationFn, error }) => {
            const field = document.querySelector(selector);
            field.addEventListener("blur", () => validateField(field, validationFn, error));
        });
    };

    validateFields();

    // Submit handler
    form.querySelector(".enviar").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default submission

        const fieldsToValidate = [
            ...document.querySelectorAll(".Alumno input, .Alumno select"),
            ...document.querySelectorAll(".familia input, .familia select"),
            ...document.querySelectorAll(".direccion input, .direccion select"),
            ...document.querySelectorAll(".datos input, .datos select"),
        ];

        let formIsValid = true;

        fieldsToValidate.forEach((field) => {
            const validationFn = field.getAttribute("pattern")
                ? (value) => new RegExp(field.getAttribute("pattern")).test(value)
                : (value) => value.trim() !== "";

            const isValid = validationFn(field.value.trim());
            if (!isValid) {
                field.classList.add("invalid");
                formIsValid = false;

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
            return;
        }

        alert("Formulario enviado correctamente.");

        // Gather form data
        const alumnoNombre = document.querySelector(".Alumno input[name='nombre']").value;
        const alumnoApellidos = document.querySelector(".Alumno input[name='apellidos']").value;
        const alumnoNIF = document.querySelector(".Alumno input[name='nif']").value;
        const lenguaMaterna = document.querySelector(".Alumno select[name='lengua']").value;
        const idiomasConocidos = Array.from(document.querySelector(".Alumno select[name='conocidos']").selectedOptions).map(opt => opt.value);

        const familiares = Array.from(document.querySelectorAll(".familia")).map(familia => ({
            nombre: familia.querySelector("input[name='nombre']").value,
            apellidos: familia.querySelector("input[name='apellidos']").value,
            nif: familia.querySelector("input[name='nif']").value,
            ciudadNacimiento: familia.querySelector("select[name='ciudadNacimiento']").value,
            profesion: familia.querySelector("select[name='profesion']").value,
            lengua: familia.querySelector("select[name='fLengua']").value,
            idiomas: Array.from(familia.querySelector("select[name='fConocidos']").selectedOptions).map(opt => opt.value),
        }));

        const direccion = {
            pais: document.querySelector(".direccion select[name='pais']").value,
            ciudad: document.querySelector(".direccion select[name='ciudad']").value,
            poblacion: document.querySelector(".direccion select[name='poblacion']").value,
            direccionCompleta: document.querySelector(".direccion input[name='direccionCompleta']").value,
            codigoPostal: document.querySelector(".direccion input[pattern]").value,
        };

        const dAcademicos = {
            colegio: document.querySelector(".datos input[name='colegio']").value,
            nivelEstudios: document.querySelector(".datos select[name='nivelEstudios']").value,
            idiomasEstudiados: Array.from(document.querySelector(".datos select[name='idiomasEstudiados']").selectedOptions).map(opt => opt.value),
            nivelSolicitado: document.querySelector(".datos select[name='nivelSolicitado']").value,
        };

        const dMedicos = {
            alergias: document.querySelector(".medica select[name='alergias']").value,
            medicacion: document.getElementById('medicacion').value,
        }

        // Create Alumno instance
        const alumno = new AlumnoBuilder()
            .setNombre(alumnoNombre)
            .setApellidos(alumnoApellidos)
            .setNif(alumnoNIF)
            .setLengua(lenguaMaterna)
            .setIdiomas(idiomasConocidos)
            .setFamilia(familiares)
            .setDireccion(direccion)
            .setDAcademicos(dAcademicos)
            .setMedica(dMedicos)
            .build();

        console.log(alumno);
    });
});



//Clase alumno
class Alumno {
    constructor(nombre, apellidos, nif, lengua, idiomas, familia, direccion, dAcademicos, medica) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nif = nif;
        this.lengua = lengua;
        this.idiomas = idiomas;
        this.familia = familia;
        this.direccion = direccion;
        this.dAcademicos = dAcademicos;
        this.medica = medica;
    }
}

class AlumnoBuilder {
    constructor() {
        this.nombre = null;
        this.apellidos = null;
        this.nif = null;
        this.lengua = null;
        this.idiomas = null;
        this.familia = null;
        this.direccion = null;
        this.dAcademicos = null;
        this.medica = null;
    }

    setNombre(nombre) {
        this.nombre = nombre;
        return this;
    }

    setApellidos(apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    setNif(nif) {
        this.nif = nif;
        return this;
    }

    setLengua(lengua) {
        this.lengua = lengua;
        return this;
    }

    setIdiomas(idiomas) {
        this.idiomas = idiomas;
        return this;
    }

    setFamilia(familia) {
        this.familia = familia;
        return this;
    }

    setDireccion(direccion) {
        this.direccion = direccion;
        return this;
    }

    setDAcademicos(dAcademicos) {
        this.dAcademicos = dAcademicos;
        return this;
    }

    setMedica(medica) {
        this.medica = medica;
        return this;
    }

    build() {
        return new Alumno(
            this.nombre,
            this.apellidos,
            this.nif,
            this.lengua,
            this.idiomas,
            this.familia,
            this.direccion,
            this.dAcademicos,
            this.medica
        );
    }
}

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

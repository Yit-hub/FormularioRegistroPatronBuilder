class Alumno {
    constructor(builder) {
        this.nombre = builder.nombre;
        this.apellidos = builder.apellidos;
        this.nif = builder.nif;
        this.lenguaMaterna = builder.lenguaMaterna;
        this.idiomasConocidos = builder.idiomasConocidos;
        this.familiares = builder.familiares;
        this.direccion = builder.direccion;
        this.datosAcademicos = builder.datosAcademicos;
        this.informacionMedica = builder.informacionMedica;
    }

    static get Builder() {
        return class {
            constructor() {
                this.familiares = [];
                this.idiomasConocidos = [];
            }

            setNombre(nombre) {
                this.nombre = nombre;
                return this;
            }

            setApellidos(apellidos) {
                this.apellidos = apellidos;
                return this;
            }

            setNIF(nif) {
                this.nif = nif;
                return this;
            }

            setLenguaMaterna(lengua) {
                this.lenguaMaterna = lengua;
                return this;
            }

            setIdiomasConocidos(idiomas) {
                this.idiomasConocidos = idiomas;
                return this;
            }

            addFamiliar(familiar) {
                this.familiares.push(familiar);
                return this;
            }

            setDireccion(direccion) {
                this.direccion = direccion;
                return this;
            }

            setDatosAcademicos(datosAcademicos) {
                this.datosAcademicos = datosAcademicos;
                return this;
            }

            setInformacionMedica(informacionMedica) {
                this.informacionMedica = informacionMedica;
                return this;
            }

            build() {
                return new Alumno(this);
            }
        };
    }
}


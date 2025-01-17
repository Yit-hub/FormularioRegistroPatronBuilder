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
    setNombre(nombre){
        this.nombre = nombre;
    }
    setApellidos(apellidos){
        this.apellidos = apellidos;
    }
    setNif(nif){
        this.nif = nif;
    }
    setLengua(lengua){
        this.lengua = lengua;
    }
    setIdioma(idiomas){
        this.idiomas = idiomas;
    }
    setFamilia(familia){
        this.familia = familia;
    }
    setDireccion(direccion){
        this.direccion = direccion;
    }
    setDacademicos(academicos){
        this.dAcademicos = academicos;
    }
    setMedica(medica){
        this.medica = medica;
    }
    build(){
        return new Alumno(this.nombre, this.apellidos, this.nif, this.lengua, this.idiomas, this.familia, 
            this.direccion, this.idiomas, this.familia, this.direccion,this.dAcademicos,this.medica);
    }
    
}
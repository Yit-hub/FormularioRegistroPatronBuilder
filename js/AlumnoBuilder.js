class Alumno{
    constructor(nombre,apellidos,nif,lengua,conocidos){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nif = nif;
        this.lengua = lengua;
        this.conocidos = conocidos;
    }
}
class AlumnoBuilder{
    constructor(){
        this.nombre = null;
        this.apellidos = null;
        this.nif = null;
        this.lengua = null;
        this.conocidos = null;
    }
}

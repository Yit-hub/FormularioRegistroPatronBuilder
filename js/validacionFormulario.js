document.addEventListener("DOMContentLoaded", ()=>{
    //Alumno
    const nombreAlumno = document.getElementById("nombre");
    const nombreAlumnoError = document.getElementById("nombreError");
    const apellidosAlumno = document.getElementById("apellidos");
    const nifAlumno = document.getElementById("nif");
    const lenguaMaternaAlumno = document.getElementById("lengua");
    const idiomasAlumno = document.getElementById("conocidos");

    nombreAlumno.addEventListener("input", ()=>{
        if(!nombreAlumno.value){
            nombreAlumnoError.textContent("El nombre es obligatorio");
            nombreAlumno.classList.add("error");
            nombreAlumno.classList.remove("valid");
        }else{
            nombreAlumnoError.textContent = "";
            nombreAlumno.classList.remove("error");
            nombreAlumno.classList.add("valid");
        }
    })
})
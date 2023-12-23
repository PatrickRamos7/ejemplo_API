let pagina = 1;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener("click", () =>{
    if(pagina<1000) {
        pagina+= 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener("click", () =>{
    if(pagina>1) {
        pagina-= 1;
        cargarPeliculas();
    }
});


const cargarPeliculas = async () => {
    try{  
const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=59b57852204c09c00969f44522f56f49&language=es-ES&page=${pagina}`);

if(respuesta.status===200){ //se hace la comprobación del status si la respuesta es correcta 
const datos = await respuesta.json();

console.log(datos);

let peliculas = "";
datos.results.forEach(pelicula => {
   peliculas= peliculas +`
   <div class="pelicula">
   <img class="poster" src="https://image.tmbd.org/t/p/w500/${pelicula.poster_path}">
   <h3>${pelicula.title}</h3>
   `;
});
console.log(peliculas);
document.getElementById("contenedor").innerHTML=peliculas;

}else if (respuesta.status===401){
    console.log("pusiste la llave mal")
}else if(respuesta.status===404){
    console.log("La pelicula que buscas no existe");
}else{
    console.log("Hubo un error y no sabemos que paso");
}
}catch(error){
    console.log(error);

}
}
cargarPeliculas();
// VARIABLES

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector ('#lista-tweets');
let tweets = [];

//Event listeners
eventListeners();



function eventListeners(){
    //Cuadno agrega tweets
    formulario.addEventListener ('submit', agregarTweet);

    //cuando el doc este listo

    document.addEventListener('DOMContentLoaded', ()=>{
        tweets=JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}



//Funciones
function agregarTweet(e){
    e.preventDefault();


    const tweet = document.querySelector('#tweet').value;

    if(tweet===''){

        mostrarError('Un mensaje no puede ir vacio');


        return;
    }

    //Añaridr al arreglo twwts

    const tweetObj = {
        id: Date.now(), 
        tweet
    }

    tweets = [...tweets, tweetObj];


    crearHTML();


    //Reiniciar formulario
    formulario.reset();

}

//mostrar mensaje de error
function mostrarError (error){
    const mensajeError = document.createElement ('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){
    limpiarHTML()
    if(tweets.length>0){
        tweets.forEach(tweet=>{

            //AGREGAR BOTON DE ELIMINAR
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add ('borrar-tweet');
            btnEliminar.innerText='X';

            //Añadir funcion de eliminar
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }

            //CREAR HTML
            const li = document.createElement('li');

            //AÑARDIR TEXTO
            li.innerHTML = tweet.tweet;

            //ASIGNAR BOTON
            li.appendChild(btnEliminar);

            //INSERTAR EN HTML
            listaTweets.appendChild(li);
        });

    }

    sincronizarStorage();
}
//LOCAL STORAGE
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//ELIMINA UN TWEET
function borrarTweet(id){
    tweets = tweets.filter (tweet => tweet.id !== id);
    crearHTML();
};

function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
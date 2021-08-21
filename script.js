// -------------------------------------------------------------------------------------------------------------------
//                                                  CANVAS Y CONTEXTO
// -------------------------------------------------------------------------------------------------------------------
const canvas = document.getElementById('villa-platzi');
const ctx = canvas.getContext('2d');

// Tamaño canvas
var window_width = window.innerWidth; // Anchura de la ventana
var window_height = window.innerHeight; // Altura de la ventana
var canvas_width = 800; // Anchura de la imagen utilizada de fondo
var canvas_height = 800; // Altura de la imagen utilizada de fondo

canvas.width = canvas_width;
canvas.height = canvas_height;

// -------------------------------------------------------------------------------------------------------------------
//                                                       OBJETOS
// -------------------------------------------------------------------------------------------------------------------
// Teclas
var tecla = {
    Arriba: 38,
    Abajo: 40,
    Izquierda: 37,
    Derecha: 39
};

// Imagen de fondo
var fondo = {
    src: "img/fondo.png"
};

// Tipos de Cesped
var cespedTipos = [];
var prototipoCesped = {x: 0, y: 0};

// Botones
var botonReiniciar = {
    x: canvas.width - 90,
    y: canvas.height - 70,
    width: 60,
    height: 60,
    src: "img/boton-reiniciar.png"
};

// Personaje
var personaje = {
    x: (canvas.width/2)-40,
    y: (canvas.height/2)-40,
    width: 80,
    height: 80,
    src: {
        izquierda: "",
        derecha: "",
        arriba: "",
        abajo: "img/pollo.png",
        arriba_izquierda: "",
        arriba_derecha: "",
        abajo_izquierda: "",
        abajo_derecha_izquierda: ""
    }
}

// Vacas
var vacas = [];
var prototipoVaca = {
    x: 0,
    y: 0,
    width: 80,
    height: 80,
    src: {
        izquierda: "img/vaca-izquierda.png",
        izquierdaComiendo: "img/vaca-izquierda-comiendo.png",
        derecha: "img/vaca-derecha.png",
        derechaComiendo: "img/vaca-derecha-comiendo.png",
        arriba: "img/vaca-arriba.png",
        arribaComiendo: "img/vaca-arriba-comiendo.png",
        abajo: "img/vaca-abajo.png",
        abajoComiendo: "img/vaca-abajo-comiendo.png"
    },
    ultimaDireccion: "",
    pasosRestantes: 0
};

// Cerdos
var cerdos = [];
var prototipoCerdo = {
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    src: {
        izquierda: "img/cerdo-izquierda.png",
        izquierdaComiendo: "img/cerdo-izquierda-comiendo.png",
        derecha: "img/cerdo-derecha.png",
        derechaComiendo: "img/cerdo-derecha-comiendo.png",
        arriba: "img/cerdo-arriba.png",
        arribaComiendo: "img/cerdo-arriba-comiendo.png",
        abajo: "img/cerdo-abajo.png",
        abajoComiendo: "img/cerdo-abajo-comiendo.png"
    },
    ultimaDireccion: "",
    pasosRestantes: 0
};

// Pollos
var pollos = [];
var prototipoPollo = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    src: {
        izquierda: "img/pollo-izquierda.png",
        izquierdaComiendo: "img/pollo-izquierda-comiendo.png",
        derecha: "img/pollo-derecha.png",
        derechaComiendo: "img/pollo-derecha-comiendo.png",
        arriba: "img/pollo-arriba.png",
        arribaComiendo: "img/pollo-arriba-comiendo.png",
        abajo: "img/pollo-abajo.png",
        abajoComiendo: "img/pollo-abajo-comiendo.png"
    },
    ultimaDireccion: "",
    pasosRestantes: 0
};

// Ovejas
var ovejas = [];
var prototipoOveja = {
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    src: {
        izquierda: "img/oveja-izquierda.png",
        izquierdaComiendo: "img/oveja-izquierda-comiendo.png",
        derecha: "img/oveja-derecha.png",
        derechaComiendo: "img/oveja-derecha-comiendo.png",
        arriba: "img/oveja-arriba.png",
        arribaComiendo: "img/oveja-arriba-comiendo.png",
        abajo: "img/oveja-abajo.png",
        abajoComiendo: "img/oveja-abajo-comiendo.png"
    },
    ultimaDireccion: "",
    pasosRestantes: 0
};

// -------------------------------------------------------------------------------------------------------------------
//                                                      IMAGENES
// -------------------------------------------------------------------------------------------------------------------
// Imagen de fondo
fondo.imagen = new Image();
fondo.imagen.src = fondo.src;

// Imagen del personaje
personaje.imagen = new Image();
personaje.imagen.src = personaje.src.abajo;

// Boton de Reiniciar
botonReiniciar.imagen = new Image();
botonReiniciar.imagen.src = botonReiniciar.src;

// -------------------------------------------------------------------------------------------------------------------
//                                                       AUDIOS
// -------------------------------------------------------------------------------------------------------------------
// Música de Fondo 1
var musica1 = new Audio();
musica1.src = "sounds/background-theme1.wav";
musica1.loop = true;
musica1.volume = 0.3;

// Música de Fondo 2
var musica2 = new Audio();
musica2.src = "sounds/background-theme2.wav";
musica2.loop = true;
musica2.volume = 0.3;

// Música de Fondo 3
var musica3 = new Audio();
musica3.src = "sounds/background-theme3.wav";
musica3.loop = true;
musica3.volume = 0.3;

// Mugido de Vaca
var mugido = new Audio();
//mugido.src = "sounds/mugido-vaca.wav";
mugido.volume = 0.3;

// Gruñido de Cerdo
var gruñido = new Audio();
//gruñido.src = "sounds/gruñido-cerdo.wav";
gruñido.volume = 0.3;

// Boton Presionado
var presionarBoton = new Audio();
presionarBoton.src = "sounds/selection.wav";

// Otros


// -------------------------------------------------------------------------------------------------------------------
//                                              OTRAS VARIABLES
// -------------------------------------------------------------------------------------------------------------------
const pasoPersonaje = 10;  // Distancia de pixeles que recorrerá el personaje
const pasoVaca = 10, pasoCerdo = 10, pasoPollo = 10, pasoOveja = 10; // Distancia de pixeles que caminará los animales

const FPS = 100;    // Frames por segundo establecido (se usará para la repetición de la función del bucle)
var map = {};   // Para las teclas que se presionan
var update, movimientoVaca, movimientoCerdo, movimientoPollo, movimientoOveja; // Son las variables de las funciones que se repiten
var cantidadVacas, cantidadCerdos, cantidadPollos;
var tipoMovimiento, menuPrincipal = true;
var musica, sonandoJuego = false;
var densidadCesped = 5;    // Densidad del cesped: 1=alta, 20=baja, default=5

// -------------------------------------------------------------------------------------------------------------------
//                                                  EVENTOS
// -------------------------------------------------------------------------------------------------------------------
// Llamar a funcion inicial que inicia todo, y es cuando ya cargó la imagen de fondo
fondo.imagen.addEventListener("load", inicio);

// Movimiento con teclas, incluido el movimiento diagonal
window.onkeydown = window.onkeyup = function(evento){
    // Limite del personaje
    var limiteX = canvas.width - personaje.width;
    var limiteY = canvas.height - personaje.height;
    // Establecemos que se está jugando (debido a que se ha presionado una tecla para jugar)
    menuPrincipal = false;
    // Guardamos el codigo de la tecla en "map" y se pone como "true" al presionar
    map[evento.keyCode] = evento.type == 'keydown';
    //console.log(map);
    // Verificamos que teclan se están presionando
    if(map[tecla.Arriba] && map[tecla.Izquierda]){
        tipoMovimiento = "Diagonal_Arriba_Izquierda";
        if((personaje.y - pasoPersonaje - (pasoPersonaje/3)) > -30 && (personaje.x - pasoPersonaje - (pasoPersonaje/3)) > -30){
            personaje.y -= pasoPersonaje - (pasoPersonaje/3);
            personaje.x -= pasoPersonaje - (pasoPersonaje/3);
        }
    } else if(map[tecla.Arriba] && map[tecla.Derecha]){
        movimientoDiagonal = true;
        tipoMovimiento = "Diagonal_Arriba_Derecha";
        if((personaje.y - pasoPersonaje - (pasoPersonaje/3)) > -30 && (personaje.x + pasoPersonaje - (pasoPersonaje/3)) < limiteX){
            personaje.y -= pasoPersonaje - (pasoPersonaje/3);
            personaje.x += pasoPersonaje - (pasoPersonaje/3);
        }
    } else if(map[tecla.Abajo] && map[tecla.Izquierda]){
        tipoMovimiento = "Diagonal_Abajo_Izquierda";
        if((personaje.y + pasoPersonaje - (pasoPersonaje/3)) < limiteY && (personaje.x - pasoPersonaje - (pasoPersonaje/3)) > - 30){
            personaje.y += pasoPersonaje - (pasoPersonaje/3);
            personaje.x -= pasoPersonaje - (pasoPersonaje/3);
        }
    } else if(map[tecla.Abajo] && map[tecla.Derecha]){
        tipoMovimiento = "Diagonal_Abajo_Derecha";
        if((personaje.y + pasoPersonaje - (pasoPersonaje/3)) < limiteY && (personaje.x + pasoPersonaje - (pasoPersonaje/3)) < limiteX){
            personaje.y += pasoPersonaje - (pasoPersonaje/3);
            personaje.x += pasoPersonaje - (pasoPersonaje/3);
        }
    } else if(map[tecla.Arriba]){
        tipoMovimiento = "Arriba";
        if((personaje.y - pasoPersonaje) > 0){
            personaje.y -= pasoPersonaje;
        }
    } else if(map[tecla.Abajo]){
        tipoMovimiento = "Abajo";
        if((personaje.y + pasoPersonaje) < limiteY){
            personaje.y += pasoPersonaje;
        }
    } else if(map[tecla.Izquierda]){
        tipoMovimiento = "Izquierda";
        if((personaje.x - pasoPersonaje) > 0){
            personaje.x -= pasoPersonaje;
        }
    } else if(map[tecla.Derecha]){
        tipoMovimiento = "Derecha";
        if((personaje.x + pasoPersonaje) < limiteX){
            personaje.x += pasoPersonaje;
        }
    }
};

// Cuando se cambia el tamaño del navegador
window.addEventListener("resize", resize);

// Cuando se realiza clic
canvas.addEventListener("mousedown", clicPantalla);

// -------------------------------------------------------------------------------------------------------------------
//                                               FUNCIONES PRINCIPALES
// -------------------------------------------------------------------------------------------------------------------
// -------------- Funcion inicial 
function inicio(){
    // Ajustamos el tamaño de la ventana al canvas
    resize();
    // Generamos cesped
    generarCesped();
    // Ponemos que el juego está en el menu principal
    menuPrincipal = true;
    // Establecemos los datos inciales
    establecerVacas();
    establecerCerdos();
    establecerPollos();
    establecerOvejas();
    // Reproducimos la musica de fondo del menu de juego
    musica3.play();
    // Establecemos el bucle del juego
    update = setInterval(bucle, 1000/FPS);
    // Establecemos el bucle para el movimiento de los animales
    movimientoVaca = setInterval(vacasIA, 400);
    movimientoCerdo = setInterval(cerdosIA, 300);
    movimientoPollo = setInterval(pollosIA, 200);
    movimientoOveja = setInterval(ovejasIA, 300);
}

// Funcion de reinicio
function reiniciarJuego(){
    // Detenemos la musica
    if(musica == 1) {
        musica1.pause();
        musica1.currentTime = 0;
    } else if(musica == 2){
        musica2.pause();
        musica2.currentTime = 0;
    } else {
        musica3.pause();
        musica3.currentTime = 0;
    }
    // Establecemos que la musica de juego ya no esta sonando
    sonandoJuego = false;
    // Detenemos las funciones en bucle;
    clearInterval(update);
    clearInterval(movimientoVaca);
    clearInterval(movimientoCerdo);
    clearInterval(movimientoPollo);
    clearInterval(movimientoOveja);
    // Reiniciamos la posicion del personaje
    personaje.x = (canvas.width/2) - 40;
    personaje.y = (canvas.height/2) -40,
    // Llamamos a la funcion principal que inicia todo
    inicio();
}

// Funcion repetitiva
function bucle(){
    // Limpiamos en cada reinicio del bucle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibujamos el fondo
    ctx.drawImage(fondo.imagen, 0, 0, canvas.width, canvas.height);
    // Dibujamos el cesped generado
    for(var i=0; i<cespedTipos.length; i++){
        ctx.drawImage(cespedTipos[i].imagen, cespedTipos[i].x, cespedTipos[i].y);
    }
    // Verificamos si estamos en el menu principal
    if(menuPrincipal){

    } else {
        // Verificamos si la musica de juego no esta sonando para reproducirlo y cambiar la variable a true
        if(!sonandoJuego){
            // Detenemos la musica del menu
            musica3.pause();
            musica3.currentTime = 0;
            // Reproducimos uno de las dos musicas para cuando se está jugando
            musica = aleatorio(1,2);
            if(musica == 1) {
                musica1.play();
            } else {
                musica2.play();
            }
            sonandoJuego = true;
        }
        // Dibujamos los pollos
        for(var i=0; i < cantidadPollos; i++){
            ctx.drawImage(pollos[i].imagen, pollos[i].x, pollos[i].y);
        }
        // Dibujamos los cerdos
        for(var i=0; i < cantidadCerdos; i++){
            ctx.drawImage(cerdos[i].imagen, cerdos[i].x, cerdos[i].y);
        }
        // Dibujamos las ovejas
        for(var i=0; i < cantidadOvejas; i++){
            ctx.drawImage(ovejas[i].imagen, ovejas[i].x, ovejas[i].y);
        }
        // Dibujamos las vacas
        for(var i=0; i < cantidadVacas; i++){
            ctx.drawImage(vacas[i].imagen, vacas[i].x, vacas[i].y);
        }
        // Dibujamos el boton de reiniciar
        ctx.drawImage(botonReiniciar.imagen, botonReiniciar.x,botonReiniciar.y, botonReiniciar.width, botonReiniciar.height);
    }
    // Dibujamos al personaje (al final de los otros objetos para que esté por encima de estos)
    ctx.drawImage(personaje.imagen, personaje.x, personaje.y);
    // Dibujamos los arboles

}
// -------------------------------------------------------------------------------------------------------------------
//                                       FUNCIONES DE CREACIÓN DE LOS ANIMALES
// -------------------------------------------------------------------------------------------------------------------
// Configuracion de las vacas
function establecerVacas(){
    vacas = [];
    cantidadVacas = aleatorio(3,6);
    for(var i=0; i < cantidadVacas; i++){
        var nuevoAnimal = Object.create(prototipoVaca);
        nuevoAnimal.x = aleatorio(0, (canvas.width - prototipoVaca.width));
        nuevoAnimal.y = aleatorio(0, (canvas.height - prototipoVaca.height));
        
        var direccion = aleatorio(1,4);
        nuevoAnimal.imagen = new Image();
        switch (direccion){
            case 1:
                nuevoAnimal.imagen.src = prototipoVaca.src.arriba;
                nuevoAnimal.ultimaDireccion = "arriba";
                break;
            case 2:
                nuevoAnimal.imagen.src = prototipoVaca.src.abajo;
                nuevoAnimal.ultimaDireccion = "abajo";
                break;
            case 3:
                nuevoAnimal.imagen.src = prototipoVaca.src.izquierda;
                nuevoAnimal.ultimaDireccion = "izquierda";
                break;
            case 4:
                nuevoAnimal.imagen.src = prototipoVaca.src.derecha;
                nuevoAnimal.ultimaDireccion = "derecha";
                break;
        }
        nuevoAnimal.width = prototipoVaca.width;
        nuevoAnimal.height = prototipoVaca.height;
        nuevoAnimal.pasosRestantes = 0;
        
        vacas.push(nuevoAnimal);
    }
    //console.log(vacas);
}
// Configuracion de las cerdos
function establecerCerdos(){
    cerdos = [];
    cantidadCerdos = aleatorio(2,6);
    for(var i=0; i < cantidadCerdos; i++){
        var nuevoAnimal = Object.create(prototipoCerdo);
        nuevoAnimal.x = aleatorio(0, (canvas.width - prototipoCerdo.width));
        nuevoAnimal.y = aleatorio(0, (canvas.height - prototipoCerdo.height));
        
        var direccion = aleatorio(1,4);
        nuevoAnimal.imagen = new Image();
        switch (direccion){
            case 1:
                nuevoAnimal.imagen.src = prototipoCerdo.src.arriba;
                nuevoAnimal.ultimaDireccion = "arriba";
                break;
            case 2:
                nuevoAnimal.imagen.src = prototipoCerdo.src.abajo;
                nuevoAnimal.ultimaDireccion = "abajo";
                break;
            case 3:
                nuevoAnimal.imagen.src = prototipoCerdo.src.izquierda;
                nuevoAnimal.ultimaDireccion = "izquierda";
                break;
            case 4:
                nuevoAnimal.imagen.src = prototipoCerdo.src.derecha;
                nuevoAnimal.ultimaDireccion = "derecha";
                break;
        }
        nuevoAnimal.width = prototipoCerdo.width;
        nuevoAnimal.height = prototipoCerdo.height;
        nuevoAnimal.pasosRestantes = 0;
        
        cerdos.push(nuevoAnimal);
    }
    //console.log(cerdos);
}
// Configuracion de los pollos
function establecerPollos(){
    pollos = [];
    cantidadPollos = aleatorio(2,6);
    for(var i=0; i < cantidadPollos; i++){
        var nuevoAnimal = Object.create(prototipoPollo);
        nuevoAnimal.x = aleatorio(0, (canvas.width - prototipoPollo.width));
        nuevoAnimal.y = aleatorio(0, (canvas.height - prototipoPollo.height));
        
        var direccion = aleatorio(1,4);
        nuevoAnimal.imagen = new Image();
        switch (direccion){
            case 1:
                nuevoAnimal.imagen.src = prototipoPollo.src.arriba;
                nuevoAnimal.ultimaDireccion = "arriba";
                break;
            case 2:
                nuevoAnimal.imagen.src = prototipoPollo.src.abajo;
                nuevoAnimal.ultimaDireccion = "abajo";
                break;
            case 3:
                nuevoAnimal.imagen.src = prototipoPollo.src.izquierda;
                nuevoAnimal.ultimaDireccion = "izquierda";
                break;
            case 4:
                nuevoAnimal.imagen.src = prototipoPollo.src.derecha;
                nuevoAnimal.ultimaDireccion = "derecha";
                break;
        }
        nuevoAnimal.width = prototipoPollo.width;
        nuevoAnimal.height = prototipoPollo.height;
        nuevoAnimal.pasosRestantes = 0;
        
        pollos.push(nuevoAnimal);
    }
    //console.log(pollos);
}
// Configuracion de las ovejas
function establecerOvejas(){
    ovejas = [];
    cantidadOvejas = aleatorio(2,6);
    for(var i=0; i < cantidadOvejas; i++){
        var nuevoAnimal = Object.create(prototipoOveja);
        nuevoAnimal.x = aleatorio(0, (canvas.width - prototipoOveja.width));
        nuevoAnimal.y = aleatorio(0, (canvas.height - prototipoOveja.height));
        
        var direccion = aleatorio(1,4);
        nuevoAnimal.imagen = new Image();
        switch (direccion){
            case 1:
                nuevoAnimal.imagen.src = prototipoOveja.src.arriba;
                nuevoAnimal.ultimaDireccion = "arriba";
                break;
            case 2:
                nuevoAnimal.imagen.src = prototipoOveja.src.abajo;
                nuevoAnimal.ultimaDireccion = "abajo";
                break;
            case 3:
                nuevoAnimal.imagen.src = prototipoOveja.src.izquierda;
                nuevoAnimal.ultimaDireccion = "izquierda";
                break;
            case 4:
                nuevoAnimal.imagen.src = prototipoOveja.src.derecha;
                nuevoAnimal.ultimaDireccion = "derecha";
                break;
        }
        nuevoAnimal.width = prototipoOveja.width;
        nuevoAnimal.height = prototipoOveja.height;
        nuevoAnimal.pasosRestantes = prototipoOveja.pasosRestantes;
        
        ovejas.push(nuevoAnimal);
    }
    //console.log(ovejas);
}
// -------------------------------------------------------------------------------------------------------------------
//                                       FUNCIONES DE MOVIMIENTO DE LOS ANIMALES
// -------------------------------------------------------------------------------------------------------------------
// Funcion repetiva para el movimiento de las vacas
function vacasIA(){
    // Limite de movimiento de la vaca
    var limiteX = canvas.width - prototipoVaca.width;
    var limiteY = canvas.height - prototipoVaca.height;
    // Aleatorio para saber si se mueve o no
    var movimiento = aleatorio(0,1);
    // Aleatorio para saber que vaca se mueve
    var numVaca = aleatorio(0,cantidadVacas-1)

    var direccionVaca, cantidadPasos, comiendo;
    if(vacas[numVaca].pasosRestantes == 0){
        // Aleatorio para direccion del movimiento (1=arriba,2=abajo,3=izquierda,4=derecha)
        direccionVaca = aleatorio(1,4);
        // Aleatorio si hará paso largo (0=no, 1=si)
        var pasoLargo = aleatorio(0,1);
        // Cantidad de pasos a recorrer si es paso largo
        if(pasoLargo == 1){
            cantidadPasos = aleatorio(3,5);
            vacas[numVaca].pasosRestantes = cantidadPasos;
        } else {
            // Aleatorio para ver si comerá o no (0=no,1=si)
            comiendo = aleatorio(0,1);
        }
    } else {
        switch(vacas[numVaca].ultimaDireccion){
            case "arriba":
                direccionVaca = 1; break;
            case "abajo":
                direccionVaca = 2; break;
            case "izquierda":
                direccionVaca = 3; break;
            case "derecha":
                direccionVaca = 4; break;
        }
    }
    if(movimiento == 1){
        if(comiendo == 1){
            switch(vacas[numVaca].ultimaDireccion){
                case "arriba":
                    vacas[numVaca].imagen.src = prototipoVaca.src.arribaComiendo; break;
                case "abajo":
                    vacas[numVaca].imagen.src = prototipoVaca.src.abajoComiendo; break;
                case "izquierda":
                    vacas[numVaca].imagen.src = prototipoVaca.src.izquierdaComiendo; break;
                case "derecha":
                    vacas[numVaca].imagen.src = prototipoVaca.src.derechaComiendo; break;
            }
        } else {
            if(vacas[numVaca].pasosRestantes > 0){
                vacas[numVaca].pasosRestantes -= 1;
            }
            switch(direccionVaca){
                case 1:
                    if(vacas[numVaca].y - pasoVaca > 0){
                        vacas[numVaca].y -= pasoVaca;
                    }
                    vacas[numVaca].imagen.src = prototipoVaca.src.arriba;
                    vacas[numVaca].ultimaDireccion = "arriba";
                    break;
                case 2:
                    if(vacas[numVaca].y + pasoVaca < limiteY){
                        vacas[numVaca].y += pasoVaca;   
                    }
                    vacas[numVaca].imagen.src = prototipoVaca.src.abajo;
                    vacas[numVaca].ultimaDireccion = "abajo";
                    break;
                case 3:
                    if(vacas[numVaca].x - pasoVaca > 0){
                        vacas[numVaca].x -= pasoVaca;
                    }
                    vacas[numVaca].imagen.src = prototipoVaca.src.izquierda;
                    vacas[numVaca].ultimaDireccion = "izquierda";
                    break;
                case 4:
                    if(vacas[numVaca].x + pasoVaca < limiteX){
                        vacas[numVaca].x += pasoVaca;
                    }
                    vacas[numVaca].imagen.src = prototipoVaca.src.derecha;
                    vacas[numVaca].ultimaDireccion = "derecha";
                    break;
            }
        }
    }
}
// Funcion repetiva para el movimiento de los cerdos
function cerdosIA(){
    // Limite de movimiento del cerdo
    var limiteX = canvas.width - prototipoCerdo.width;
    var limiteY = canvas.height - prototipoCerdo.height;
    // Aleatorio para saber si se mueve o no
    var movimiento = aleatorio(0,1);
    // Aleatorio para saber que cerdo se mueve
    var numCerdo = aleatorio(0,cantidadCerdos-1)

    var direccionCerdo, cantidadPasos, comiendo;
    if(cerdos[numCerdo].pasosRestantes == 0){
        // Aleatorio para direccion del movimiento (1=arriba,2=abajo,3=izquierda,4=derecha)
        direccionCerdo = aleatorio(1,4);
        // Aleatorio si hará paso largo (0=no, 1=si)
        var pasoLargo = aleatorio(0,1);
        // Cantidad de pasos a recorrer si es paso largo
        if(pasoLargo == 1){
            cantidadPasos = aleatorio(3,5);
            cerdos[numCerdo].pasosRestantes = cantidadPasos;
        } else {
            // Aleatorio para ver si comerá o no (0=no,1=si)
            comiendo = aleatorio(0,1);
        }
    } else {
        switch(cerdos[numCerdo].ultimaDireccion){
            case "arriba":
                direccionCerdo = 1; break;
            case "abajo":
                direccionCerdo = 2; break;
            case "izquierda":
                direccionCerdo = 3; break;
            case "derecha":
                direccionCerdo = 4; break;
        }
    }
    if(movimiento == 1){
        if(comiendo == 1){
            switch(cerdos[numCerdo].ultimaDireccion){
                case "arriba":
                    cerdos[numCerdo].imagen.src = prototipoCerdo.src.arribaComiendo; break;
                case "abajo":
                    cerdos[numCerdo].imagen.src = prototipoCerdo.src.abajoComiendo; break;
                case "izquierda":
                    cerdos[numCerdo].imagen.src = prototipoCerdo.src.izquierdaComiendo; break;
                case "derecha":
                    cerdos[numCerdo].imagen.src = prototipoCerdo.src.derechaComiendo; break;
            }
        } else {
            if(cerdos[numCerdo].pasosRestantes > 0){
                cerdos[numCerdo].pasosRestantes -= 1;
            }
            switch(direccionCerdo){
                case 1:
                    if(cerdos[numCerdo].y - pasoCerdo > 0){
                        cerdos[numCerdo].y -= pasoCerdo;
                    }
                    cerdos[numCerdo].imagen.src = prototipoCerdo.src.arriba;
                    cerdos[numCerdo].ultimaDireccion = "arriba";
                    break;
                case 2:
                    if(cerdos[numCerdo].y + pasoCerdo < limiteY){
                        cerdos[numCerdo].y += pasoCerdo;   
                    }
                    cerdos[numCerdo].imagen.src = prototipoCerdo.src.abajo;
                    cerdos[numCerdo].ultimaDireccion = "abajo";
                    break;
                case 3:
                    if(cerdos[numCerdo].x - pasoCerdo > 0){
                        cerdos[numCerdo].x -= pasoCerdo;
                    }
                    cerdos[numCerdo].imagen.src = prototipoCerdo.src.izquierda;
                    cerdos[numCerdo].ultimaDireccion = "izquierda";
                    break;
                case 4:
                    if(cerdos[numCerdo].x + pasoCerdo < limiteX){
                        cerdos[numCerdo].x += pasoCerdo;
                    }
                    cerdos[numCerdo].imagen.src = prototipoCerdo.src.derecha;
                    cerdos[numCerdo].ultimaDireccion = "derecha";
                    break;
            }
        }
    }
}
// Funcion repetiva para el movimiento de los pollos
function pollosIA(){
    // Limite de movimiento del pollo
    var limiteX = canvas.width - prototipoPollo.width;
    var limiteY = canvas.height - prototipoPollo.height;
    // Aleatorio para saber si se mueve o no
    var movimiento = aleatorio(0,1);
    // Aleatorio para saber que cerdo se mueve
    var numPollo = aleatorio(0,cantidadPollos-1)

    var direccionPollo, cantidadPasos, comiendo;
    if(pollos[numPollo].pasosRestantes == 0){
        // Aleatorio para direccion del movimiento (1=arriba,2=abajo,3=izquierda,4=derecha)
        direccionPollo = aleatorio(1,4);
        // Aleatorio si hará paso largo (0=no, 1=si)
        var pasoLargo = aleatorio(0,1);
        // Cantidad de pasos a recorrer si es paso largo
        if(pasoLargo == 1){
            cantidadPasos = aleatorio(3,5);
            pollos[numPollo].pasosRestantes = cantidadPasos;
        } else {
            // Aleatorio para ver si comerá o no (0=no,1=si)
            comiendo = aleatorio(0,1);
        }
    } else {
        switch(pollos[numPollo].ultimaDireccion){
            case "arriba":
                direccionPollo = 1; break;
            case "abajo":
                direccionPollo = 2; break;
            case "izquierda":
                direccionPollo = 3; break;
            case "derecha":
                direccionPollo = 4; break;
        }
    }
    if(movimiento == 1){
        if(comiendo == 1){
            switch(pollos[numPollo].ultimaDireccion){
                case "arriba":
                    pollos[numPollo].imagen.src = prototipoPollo.src.arribaComiendo; break;
                case "abajo":
                    pollos[numPollo].imagen.src = prototipoPollo.src.abajoComiendo; break;
                case "izquierda":
                    pollos[numPollo].imagen.src = prototipoPollo.src.izquierdaComiendo; break;
                case "derecha":
                    pollos[numPollo].imagen.src = prototipoPollo.src.derechaComiendo; break;
            }
        } else {
            if(pollos[numPollo].pasosRestantes > 0){
                pollos[numPollo].pasosRestantes -= 1;
            }
            switch(direccionPollo){
                case 1:
                    if(pollos[numPollo].y - pasoPollo > 0){
                        pollos[numPollo].y -= pasoPollo;
                    }
                    pollos[numPollo].imagen.src = prototipoPollo.src.arriba;
                    pollos[numPollo].ultimaDireccion = "arriba";
                    break;
                case 2:
                    if(pollos[numPollo].y + pasoPollo < limiteY){
                        pollos[numPollo].y += pasoPollo;   
                    }
                    pollos[numPollo].imagen.src = prototipoPollo.src.abajo;
                    pollos[numPollo].ultimaDireccion = "abajo";
                    break;
                case 3:
                    if(pollos[numPollo].x - pasoPollo > 0){
                        pollos[numPollo].x -= pasoPollo;
                    }
                    pollos[numPollo].imagen.src = prototipoPollo.src.izquierda;
                    pollos[numPollo].ultimaDireccion = "izquierda";
                    break;
                case 4:
                    if(pollos[numPollo].x + pasoPollo < limiteX){
                        pollos[numPollo].x += pasoPollo;
                    }
                    pollos[numPollo].imagen.src = prototipoPollo.src.derecha;
                    pollos[numPollo].ultimaDireccion = "derecha";
                    break;
            }
        }
    }
}
// Funcion repetiva para el movimiento de las ovejas
function ovejasIA(){
    // Limite de movimiento de la oveja
    var limiteX = canvas.width - prototipoOveja.width;
    var limiteY = canvas.height - prototipoOveja.height;
    // Aleatorio para saber si se mueve o no
    var movimiento = aleatorio(0,1);
    // Aleatorio para saber que cerdo se mueve
    var numOveja = aleatorio(0,cantidadOvejas-1)

    var direccionOveja, cantidadPasos, comiendo;
    if(ovejas[numOveja].pasosRestantes == 0){
        // Aleatorio para direccion del movimiento (1=arriba,2=abajo,3=izquierda,4=derecha)
        direccionOveja = aleatorio(1,4);
        // Aleatorio si hará paso largo (0=no, 1=si)
        var pasoLargo = aleatorio(0,1);
        // Cantidad de pasos a recorrer si es paso largo
        if(pasoLargo == 1){
            cantidadPasos = aleatorio(3,5);
            ovejas[numOveja].pasosRestantes = cantidadPasos;
        } else {
            // Aleatorio para ver si comerá o no (0=no,1=si)
            comiendo = aleatorio(0,1);
        }
    } else {
        switch(ovejas[numOveja].ultimaDireccion){
            case "arriba":
                direccionOveja = 1; break;
            case "abajo":
                direccionOveja = 2; break;
            case "izquierda":
                direccionOveja = 3; break;
            case "derecha":
                direccionOveja = 4; break;
        }
    }
    if(movimiento == 1){
        if(comiendo == 1){
            switch(ovejas[numOveja].ultimaDireccion){
                case "arriba":
                    ovejas[numOveja].imagen.src = prototipoOveja.src.arribaComiendo; break;
                case "abajo":
                    ovejas[numOveja].imagen.src = prototipoOveja.src.abajoComiendo; break;
                case "izquierda":
                    ovejas[numOveja].imagen.src = prototipoOveja.src.izquierdaComiendo; break;
                case "derecha":
                    ovejas[numOveja].imagen.src = prototipoOveja.src.derechaComiendo; break;
            }
        } else {
            if(ovejas[numOveja].pasosRestantes > 0){
                ovejas[numOveja].pasosRestantes -= 1;
            }
            switch(direccionOveja){
                case 1:
                    if(ovejas[numOveja].y - pasoOveja > 0){
                        ovejas[numOveja].y -= pasoOveja;
                    }
                    ovejas[numOveja].imagen.src = prototipoOveja.src.arriba;
                    ovejas[numOveja].ultimaDireccion = "arriba";
                    break;
                case 2:
                    if(ovejas[numOveja].y + pasoOveja < limiteY){
                        ovejas[numOveja].y += pasoOveja;   
                    }
                    ovejas[numOveja].imagen.src = prototipoOveja.src.abajo;
                    ovejas[numOveja].ultimaDireccion = "abajo";
                    break;
                case 3:
                    if(ovejas[numOveja].x - pasoOveja > 0){
                        ovejas[numOveja].x -= pasoOveja;
                    }
                    ovejas[numOveja].imagen.src = prototipoOveja.src.izquierda;
                    ovejas[numOveja].ultimaDireccion = "izquierda";
                    break;
                case 4:
                    if(ovejas[numOveja].x + pasoOveja < limiteX){
                        ovejas[numOveja].x += pasoOveja;
                    }
                    ovejas[numOveja].imagen.src = prototipoOveja.src.derecha;
                    ovejas[numOveja].ultimaDireccion = "derecha";
                    break;
            }
        }
    }
}
// -------------------------------------------------------------------------------------------------------------------
//                                                OTRAS FUNCIONES
// -------------------------------------------------------------------------------------------------------------------
// Funcion para generar el cesped del fondo
function generarCesped(){
    // Limpiamos los valores generados anteriormente
    cespedTipos = [];
    // Basicamente esto actua como matriz de de los 23x25 cuadros que hay en el fondo
    var posX = 32, posY = 160;
    for(var y=0; y < 20; y++){
        posX = 32;  // Resetamos la posicion de posX por cada posY que varia
        for(var x=0; x < 23; x++){
            // Preguntamos si dibujamos cesped el cuadro posX y posY
            var dibujarCesped = aleatorio(1,densidadCesped);
            if(dibujarCesped == 1){
                // Creamos un nuevo objeto tipo cesped
                var nuevoCesped = Object.create(prototipoCesped);
                var tipoCesped = aleatorio(1,4);
                nuevoCesped.imagen = new Image();
                nuevoCesped.imagen.src = "img/cesped-tipo-"+tipoCesped+".png";
                nuevoCesped.x = posX;
                nuevoCesped.y = posY;

                cespedTipos.push(nuevoCesped);
            }
            posX += 32;
        }
        posY += 32;
    }
}
// Funcion de realizar clic
function clicPantalla(evento){
    var clicX = evento.layerX;
    var clicY = evento.layerY;
    //console.log(clicX + " - "+clicY);

    // Boton reiniciar
    if(((clicX > 650 && clicX < 690)) && (clicY > 668 && clicY < 700)) {
        reiniciarJuego();
        presionarBoton.play();
    }
}

// Funcion para datos aleatorios entre un minimo y un maximo establecido
function aleatorio(min, max){
    var resultado;
    resultado = Math.floor(Math.random() * (max - min + 1)) + min; // + 1 para que se incluya el maximo en el rango
    return resultado;
}

// Cuando se reajusta el tamaño de la ventana
function resize(){
    window_height = window.innerHeight;

    canvas.width = canvas_width;
    canvas.height = canvas_height;

    canvas.style.height = ""+window_height+"px";
    //console.log(canvas.width);
    //console.log(canvas.height);
}
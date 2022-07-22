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
// Teclas W-A-S-D
var tecla = {
    Arriba: 87,
    Abajo: 83,
    Izquierda: 65,
    Derecha: 68,
    Seleccionar: 69
};
/*// Flechas
var tecla = {
    Arriba: 38,
    Abajo: 40,
    Izquierda: 37,
    Derecha: 39
};
*/
// Imagen de fondo
var fondo = { src: "img/fondo.png" };

// Imagen del titulo
var titulo = { src: "img/villaPlatzi.png" };

// Imagen de los botones W-A-S-D
var botonesWASD = { src: "img/botonesWASD.png" };

// Imagen del boton E
var botonE = { src: "img/botonE.png" };

// ----------- Botones ------------
var botonReiniciar = {
    x: canvas.width - 90,
    y: canvas.height - 70,
    width: 60,
    height: 60,
    src: "img/boton-reiniciar.png"
};

var botonMusica = {
    x: canvas.width - 90,
    y: 10,
    width: 40,
    height: 40,
    src: "img/boton-musica.png"
};

var botonMusicaMuteada = {
    x: canvas.width - 90,
    y: 10,
    width: 40,
    height: 40,
    src: "img/boton-musica-muteada.png"
};

// ---------- Personaje ------------
var personaje = {
    x: (canvas.width/2) - 40,
    y: (canvas.height/2) - 120,
    width: 80,
    height: 80,
    src: {
        izquierda: "img/personaje-izquierda.png",
        derecha: "img/personaje-derecha.png",
        arriba: "img/personaje-arriba.png",
        abajo: "img/personaje-abajo.png",
        izquierda_caminando: "img/personaje-izquierda-caminando.png",
        derecha_caminando: "img/personaje-derecha-caminando.png",
        arriba_caminando: "img/personaje-arriba-caminando.png",
        abajo_caminando: "img/personaje-abajo-caminando.png"
    },
    animalCercano: "",
    numeroCercano: 0
}
// ----------- Animales ------------
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
    pasosRestantes: 0,
    estadoEXP: false,
    textoEstado: "",
    contador: 0
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
    pasosRestantes: 0,
    estadoEXP: false,
    textoEstado: "",
    contador: 0
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
    pasosRestantes: 0,
    estadoEXP: false,
    textoEstado: "",
    contador: 0
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
    pasosRestantes: 0,
    estadoEXP: false,
    textoEstado: "",
    contador: 0
};

// Tipos de Cesped
var cespedTipos = [];
var prototipoCesped = {x: 0, y: 0};

// -------------------------------------------------------------------------------------------------------------------
//                                                      IMAGENES
// -------------------------------------------------------------------------------------------------------------------
// Imagen de fondo
fondo.imagen = new Image();
fondo.imagen.src = fondo.src;

// Imagen del personaje
personaje.imagen = new Image();
personaje.imagen.src = personaje.src.abajo;

// Imagen del titulo
titulo.imagen = new Image();
titulo.imagen.src = titulo.src;

// Imagen de los botones W-A-S-D
botonesWASD.imagen = new Image();
botonesWASD.imagen.src = botonesWASD.src;

// Imagen del boton E
botonE.imagen = new Image();
botonE.imagen.src = botonE.src;

// Boton de Reiniciar
botonReiniciar.imagen = new Image();
botonReiniciar.imagen.src = botonReiniciar.src;

// Boton de Musica
botonMusica.imagen = new Image();
botonMusica.imagen.src = botonMusica.src;

// Boton de Musica Muteada
botonMusicaMuteada.imagen = new Image();
botonMusicaMuteada.imagen.src = botonMusicaMuteada.src;

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

// Boton Presionado
var presionarBoton = new Audio();
presionarBoton.src = "sounds/selection.wav";

// Subir Puntaje
var subirPuntaje = new Audio();
subirPuntaje.src = "sounds/success.mp3"
subirPuntaje.volume = 0.7;


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
var musica, sonandoJuego = false, musica_muteada = false;   // Variables relacionadas a la musica del juego
var densidadCesped = 3;    // Densidad del cesped: 1=alta, 20=baja, default=5
var puntaje = 0, exp = 5, personajeCerca = false;   // Variables relacionadas al juego
var distanciaBotones = 70;  // La distancia que hay en los botones de la parte superior para no tapar a los animales
var tiempoEstadoEXP = 700; dificultad = 20;     // Dificultad del juego, en el que aparecen las exclamaciones: 50=facil, 25=normal, 10=dificil

// -------------------------------------------------------------------------------------------------------------------
//                                                  EVENTOS
// -------------------------------------------------------------------------------------------------------------------
// Llamar a funcion inicial que inicia todo, y es cuando ya cargó la imagen de fondo
fondo.imagen.addEventListener("load", inicio);

// Movimiento con teclas, incluido el movimiento diagonal
window.onkeydown = window.onkeyup = function(evento){
    // Limite del personaje
    var limiteX = canvas.width - personaje.width + 20;
    var limiteY = canvas.height - personaje.height + 20;
    // Establecemos que se está jugando (debido a que se ha presionado una tecla para jugar)
    menuPrincipal = false;
    // Guardamos el codigo de la tecla en "map" y se pone como "true" al presionar
    map[evento.keyCode] = evento.type == 'keydown';
    //console.log(map);

    // Cambiamos al personaje segun como quedó el tipoMovimiento en la anterior tecla presionada
    switch(tipoMovimiento){
        case "Arriba": personaje.imagen.src = personaje.src.arriba; break;
        case "Abajo": personaje.imagen.src = personaje.src.abajo; break;
        case "Izquierda": personaje.imagen.src = personaje.src.izquierda; break;
        case "Derecha": personaje.imagen.src = personaje.src.derecha; break;
    }
    // Verificamos que teclan se están presionando
    if(map[tecla.Arriba] && map[tecla.Izquierda]){
        tipoMovimiento = "Diagonal_Arriba_Izquierda";
        personaje.imagen.src = personaje.src.arriba_caminando;
        if((personaje.y - pasoPersonaje - (pasoPersonaje/3)) > distanciaBotones && (personaje.x - pasoPersonaje - (pasoPersonaje/3)) > -30){
            personaje.y -= pasoPersonaje - (pasoPersonaje/3);
            personaje.x -= pasoPersonaje - (pasoPersonaje/3);
        }
    } else if(map[tecla.Arriba] && map[tecla.Derecha]){
        movimientoDiagonal = true;
        tipoMovimiento = "Diagonal_Arriba_Derecha";
        personaje.imagen.src = personaje.src.arriba_caminando;
        if((personaje.y - pasoPersonaje - (pasoPersonaje/3)) > distanciaBotones && (personaje.x + pasoPersonaje - (pasoPersonaje/3)) < limiteX){
            personaje.y -= pasoPersonaje - (pasoPersonaje/3);
            personaje.x += pasoPersonaje - (pasoPersonaje/3);
        }
    } else if(map[tecla.Abajo] && map[tecla.Izquierda]){
        tipoMovimiento = "Diagonal_Abajo_Izquierda";
        personaje.imagen.src = personaje.src.abajo_caminando;
        if((personaje.y + pasoPersonaje - (pasoPersonaje/3)) < limiteY && (personaje.x - pasoPersonaje - (pasoPersonaje/3)) > -30){
            personaje.y += pasoPersonaje - (pasoPersonaje/3);
            personaje.x -= pasoPersonaje - (pasoPersonaje/3);
        }
    } else if(map[tecla.Abajo] && map[tecla.Derecha]){
        tipoMovimiento = "Diagonal_Abajo_Derecha";
        personaje.imagen.src = personaje.src.abajo_caminando;
        if((personaje.y + pasoPersonaje - (pasoPersonaje/3)) < limiteY && (personaje.x + pasoPersonaje - (pasoPersonaje/3)) < limiteX){
            personaje.y += pasoPersonaje - (pasoPersonaje/3);
            personaje.x += pasoPersonaje - (pasoPersonaje/3);
        }
    } else if(map[tecla.Arriba]){
        tipoMovimiento = "Arriba";
        personaje.imagen.src = personaje.src.arriba_caminando;
        if((personaje.y - pasoPersonaje) > distanciaBotones){
            personaje.y -= pasoPersonaje;
        }
    } else if(map[tecla.Abajo]){
        tipoMovimiento = "Abajo";
        personaje.imagen.src = personaje.src.abajo_caminando;
        if((personaje.y + pasoPersonaje) < limiteY){
            personaje.y += pasoPersonaje;
        }
    } else if(map[tecla.Izquierda]){
        tipoMovimiento = "Izquierda";
        personaje.imagen.src = personaje.src.izquierda_caminando;
        if((personaje.x - pasoPersonaje) > 0){
            personaje.x -= pasoPersonaje;
        }
    } else if(map[tecla.Derecha]){
        tipoMovimiento = "Derecha";
        personaje.imagen.src = personaje.src.derecha_caminando;
        if((personaje.x + pasoPersonaje) < limiteX){
            personaje.x += pasoPersonaje;
        }
    } else if(map[tecla.Seleccionar]){
        if(personajeCerca){
            switch(personaje.animalCercano){
                case "Vaca":
                    vacas[personaje.numeroCercano].textoEstado = "✨";
                    vacas[personaje.numeroCercano].contador = 250;
                    break;
                case "Cerdo":
                    cerdos[personaje.numeroCercano].textoEstado = "✨";
                    cerdos[personaje.numeroCercano].contador = 250;
                    break;
                case "Pollo":
                    pollos[personaje.numeroCercano].textoEstado = "✨";
                    pollos[personaje.numeroCercano].contador = 250;
                    break;
                case "Oveja":
                    ovejas[personaje.numeroCercano].textoEstado = "✨";
                    ovejas[personaje.numeroCercano].contador = 250;
                    break;
            }
            // Sumamos puntaje y hacemos sonido
            puntaje += exp;
            subirPuntaje.play();
            // Reestablecemos a falso que el personaje no está cerca a un animal que requiera atención
            personajeCerca = false;
        }
    }
};

// Cuando se cambia el tamaño del navegador
window.addEventListener("resize", resize);

// Cuando se realiza clic
canvas.addEventListener("mousedown", clicPantalla);
canvas.addEventListener("mousemove", movimientoMouse);

// -------------------------------------------------------------------------------------------------------------------
//                                               FUNCIONES PRINCIPALES
// -------------------------------------------------------------------------------------------------------------------
// -------------- Funcion inicial --------------
function inicio(){
    // Ajustamos el tamaño de la ventana al canvas
    resize();
    // Generamos cesped
    generarCesped();
    // Ponemos que el juego está en el menu principal
    menuPrincipal = true;
    // Establecemos que la musica no está muteada
    musica_muteada = false;
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

// -------------- Funcion de reinicio --------------
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
    // Reestalecemos el puntaje a 0
    puntaje = 0;
    // Detenemos las funciones en bucle;
    clearInterval(update);
    clearInterval(movimientoVaca);
    clearInterval(movimientoCerdo);
    clearInterval(movimientoPollo);
    clearInterval(movimientoOveja);
    // Reiniciamos la posicion del personaje y su imagen
    personaje.x = (canvas.width/2) - 40;
    personaje.y = (canvas.height/2) - 120,
    personaje.imagen.src = personaje.src.abajo;
    tipoMovimiento = "Abajo";
    // Llamamos a la funcion principal que inicia todo
    inicio();
}

// -------------- Funcion repetitiva --------------
// (IMPORTANTE PARA EL FUNCIONAMIENTO DEL JUEGO)
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
        // Dibujamos la interfaz del juego cuando está en el menú principal
            // - Titulo:
            ctx.drawImage(titulo.imagen, 180, 120);
            // - Botones WASD:
            ctx.drawImage(botonesWASD.imagen, 220, 410);
            // - Boton E:
            ctx.drawImage(botonE.imagen, 270, 550)
            // Explicacion de los botones
            ctx.fillStyle="white";
            ctx.font="30px VT323";
            ctx.fillText(" ->  Para moverse", 390, 470);
            ctx.fillText(" ->  Para seleccionar", 345, 580);
        // Incluimos al personaje principal en el menu
        ctx.drawImage(personaje.imagen, personaje.x, personaje.y);
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
            if(pollos[i].estadoEXP && pollos[i].contador > 0){
                ctx.font="20px VT323"; //estilo de texto
                ctx.fillText(pollos[i].textoEstado, pollos[i].x + 8, pollos[i].y - 3);
                pollos[i].contador--;
            } else {
                pollos[i].estadoEXP = false;
                pollos[i].textoEstado = "";
                pollos[i].contador = 0;
            }
        }
        // Dibujamos los cerdos
        for(var i=0; i < cantidadCerdos; i++){
            ctx.drawImage(cerdos[i].imagen, cerdos[i].x, cerdos[i].y);
            if(cerdos[i].estadoEXP && cerdos[i].contador > 0){
                ctx.font="20px VT323"; //estilo de texto
                ctx.fillText(cerdos[i].textoEstado, cerdos[i].x + 16, cerdos[i].y + 5);
                cerdos[i].contador--;
            } else {
                cerdos[i].estadoEXP = false;
                cerdos[i].textoEstado = "";
                cerdos[i].contador = 0;
            }
        }
        // Dibujamos las ovejas
        for(var i=0; i < cantidadOvejas; i++){
            ctx.drawImage(ovejas[i].imagen, ovejas[i].x, ovejas[i].y);
            if(ovejas[i].estadoEXP && ovejas[i].contador > 0){
                ctx.font="20px VT323"; //estilo de texto
                ctx.fillText(ovejas[i].textoEstado, ovejas[i].x + 17, ovejas[i].y + 5);
                ovejas[i].contador--;
            } else {
                ovejas[i].estadoEXP = false;
                ovejas[i].textoEstado = "";
                ovejas[i].contador = 0;
            }
        }
        // Dibujamos las vacas
        for(var i=0; i < cantidadVacas; i++){
            ctx.drawImage(vacas[i].imagen, vacas[i].x, vacas[i].y);
            if(vacas[i].estadoEXP && vacas[i].contador > 0){
                ctx.font="20px VT323"; //estilo de texto
                ctx.fillText(vacas[i].textoEstado, vacas[i].x + 26, vacas[i].y + 5);
                vacas[i].contador--;
            } else {
                vacas[i].estadoEXP = false;
                vacas[i].textoEstado = "";
                vacas[i].contador = 0;
            }
        }

        // Dibujamos al personaje (al final de los otros objetos para que esté por encima de estos, a excepcion de la interfaz)
        ctx.drawImage(personaje.imagen, personaje.x, personaje.y);
        // Verificamos si el personaje se encuentra cerca de un animal que requiera atención
        for(var i=0; i < cantidadVacas; i++){
            if((personaje.x + 20 > vacas[i].x && personaje.x + 20 < vacas[i].x + 50)
                && (personaje.y + 20 > vacas[i].y && personaje.y + 40 < vacas[i].y + 50)
                    && vacas[i].estadoEXP && vacas[i].textoEstado != "✨"){
                personajeCerca = true;
                personaje.animalCercano = "Vaca";
                personaje.numeroCercano = i;
            }
        }
        for(var i=0; i < cantidadCerdos; i++){
            if((personaje.x + 20 > cerdos[i].x && personaje.x + 20 < cerdos[i].x + 50)
                && (personaje.y + 20 > cerdos[i].y && personaje.y + 40 < cerdos[i].y + 50)
                    && cerdos[i].estadoEXP && cerdos[i].textoEstado != "✨"){
                personajeCerca = true;
                personaje.animalCercano = "Cerdo";
                personaje.numeroCercano = i;
            }
        }
        for(var i=0; i < cantidadPollos; i++){
            if((personaje.x + 20 > pollos[i].x && personaje.x + 20 < pollos[i].x + 50)
                && (personaje.y + 20 > pollos[i].y && personaje.y + 40 < pollos[i].y + 50)
                    && pollos[i].estadoEXP && pollos[i].textoEstado != "✨"){
                personajeCerca = true;
                personaje.animalCercano = "Pollo";
                personaje.numeroCercano = i;
            }
        }
        for(var i=0; i < cantidadOvejas; i++){
            if((personaje.x + 20 > ovejas[i].x && personaje.x + 20 < ovejas[i].x + 50)
                && (personaje.y + 20 > ovejas[i].y && personaje.y + 40 < ovejas[i].y + 50)
                    && ovejas[i].estadoEXP && ovejas[i].textoEstado != "✨"){
                personajeCerca = true;
                personaje.animalCercano = "Oveja";
                personaje.numeroCercano = i;
            }
        }

        // Dibujamos la interfaz del juego cuando se está jugando
        ctx.drawImage(botonReiniciar.imagen, botonReiniciar.x,botonReiniciar.y);    // Boton Reiniciar
        
        if(musica_muteada){
            ctx.drawImage(botonMusicaMuteada.imagen, botonMusicaMuteada.x,botonMusicaMuteada.y);    // Boton Musica muteada
        } else {
            ctx.drawImage(botonMusica.imagen, botonMusica.x,botonMusica.y);     // Boton Musica sonando
        }

        // Puntaje
        ctx.fillStyle="#FEAE35"; //color de relleno
        ctx.font="bold 45px VT323"; //estilo de texto
        ctx.fillText("Puntaje:",50,50);
        ctx.fillStyle="white";
        ctx.fillText(puntaje,215,50);

    }

}
// -------------------------------------------------------------------------------------------------------------------
//                                       FUNCIONES DE CREACIÓN DE LOS ANIMALES
// -------------------------------------------------------------------------------------------------------------------
// Configuracion de las vacas
function establecerVacas(){
    vacas = [];
    cantidadVacas = aleatorio(3,6);
    for(var i=0; i < cantidadVacas; i++){
        // Creamos el objeto Vaca
        var nuevoAnimal = Object.create(prototipoVaca);
        // Añadimos su posicion aleatorio dentro del canvas
        nuevoAnimal.x = aleatorio(15, (canvas.width - prototipoVaca.width));
        nuevoAnimal.y = aleatorio(distanciaBotones, (canvas.height - prototipoVaca.height));
        // Establecemos la direccion de la vaca
        var direccion = aleatorio(1,4);
        // Creamos la imagen
        nuevoAnimal.imagen = new Image();
        // Dependiendo de la direccion se le coloca la imagen correspondiente
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
        // Agregamos los otros atributos de la Vaca
        nuevoAnimal.width = prototipoVaca.width;
        nuevoAnimal.height = prototipoVaca.height;
        nuevoAnimal.estadoEXP = prototipoVaca.estadoEXP;
        nuevoAnimal.textoEstado = prototipoVaca.textoEstado;
        nuevoAnimal.pasosRestantes = prototipoVaca.pasosRestantes;
        nuevoAnimal.contador = prototipoVaca.contador;
        // Añadimos a la vaca creada al array
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
        nuevoAnimal.x = aleatorio(15, (canvas.width - prototipoCerdo.width));
        nuevoAnimal.y = aleatorio(distanciaBotones, (canvas.height - prototipoCerdo.height));
        
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
        nuevoAnimal.estadoEXP = prototipoCerdo.estadoEXP;
        nuevoAnimal.textoEstado = prototipoCerdo.textoEstado;
        nuevoAnimal.pasosRestantes = prototipoCerdo.pasosRestantes;
        nuevoAnimal.contador = prototipoCerdo.contador;
        
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
        nuevoAnimal.x = aleatorio(15, (canvas.width - prototipoPollo.width));
        nuevoAnimal.y = aleatorio(distanciaBotones, (canvas.height - prototipoPollo.height));
        
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
        nuevoAnimal.estadoEXP = prototipoPollo.estadoEXP;
        nuevoAnimal.textoEstado = prototipoPollo.textoEstado;
        nuevoAnimal.pasosRestantes = prototipoPollo.pasosRestantes;
        nuevoAnimal.contador = prototipoPollo.contador;
        
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
        nuevoAnimal.x = aleatorio(15, (canvas.width - prototipoOveja.width));
        nuevoAnimal.y = aleatorio(distanciaBotones, (canvas.height - prototipoOveja.height));
        
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
        nuevoAnimal.estadoEXP = prototipoOveja.estadoEXP;
        nuevoAnimal.textoEstado = prototipoOveja.textoEstado;
        nuevoAnimal.pasosRestantes = prototipoOveja.pasosRestantes;
        nuevoAnimal.contador = prototipoOveja.contador;
        
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
    // Aleatorio para saber que vaca se mueve o es atendida
    var numVaca = aleatorio(0,cantidadVacas-1)
    // Aleatorio para saber si requiere de atención o no
    var requiereAtencion = aleatorio(0, dificultad);    // Varia dependiendo de la dificultad de apareción 
    if(requiereAtencion == 1){
        // Establecemos el estado de EXP en verdadero
        vacas[numVaca].estadoEXP = true;
        vacas[numVaca].contador = tiempoEstadoEXP;
        // Aleatorio para saber que tipo de atencion requiere
        var tipoAtencion = aleatorio(0,8);
        // Definimos la atencion correspondiente
        switch(tipoAtencion){
            case 0: vacas[numVaca].textoEstado = "🥶"; break;   // Tiene frio
            case 1: vacas[numVaca].textoEstado = "🦟"; break;   // Le moslestan los mosquitos
            case 2: vacas[numVaca].textoEstado = "🌾"; break;   // Tiene hambre (1)
            case 3: vacas[numVaca].textoEstado = "🌿"; break;   // Tiene hambre (2)
            case 4: vacas[numVaca].textoEstado = "💉"; break;   // Le toca su inyección
            case 5: vacas[numVaca].textoEstado = "🍎"; break;   // Quiere una fruta
            case 6: vacas[numVaca].textoEstado = "💤"; break;   // Tiene sueño
            case 7: vacas[numVaca].textoEstado = "🦠"; break;   // Está enfermo
            case 8: vacas[numVaca].textoEstado = "💧"; break;    // Tiene sed
        }
    }

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
                    if(vacas[numVaca].y - pasoVaca > distanciaBotones){
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
                    if(vacas[numVaca].x - pasoVaca > 15){
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
    var numCerdo = aleatorio(0,cantidadCerdos-1);
    // Aleatorio para saber si requiere de atención o no
    var requiereAtencion = aleatorio(0, dificultad);    // Varia dependiendo de la dificultad de apareción 
    if(requiereAtencion == 1){
        // Establecemos el estado de EXP en verdadero
        cerdos[numCerdo].estadoEXP = true;
        cerdos[numCerdo].contador = tiempoEstadoEXP;
        // Aleatorio para saber que tipo de atencion requiere
        var tipoAtencion = aleatorio(0,8);
        // Definimos la atencion correspondiente
        switch(tipoAtencion){
            case 0: cerdos[numCerdo].textoEstado = "🥶"; break;   // Tiene frio
            case 1: cerdos[numCerdo].textoEstado = "🦟"; break;   // Le moslestan los mosquitos
            case 2: cerdos[numCerdo].textoEstado = "🌾"; break;   // Tiene hambre (1)
            case 3: cerdos[numCerdo].textoEstado = "🌿"; break;   // Tiene hambre (2)
            case 4: cerdos[numCerdo].textoEstado = "💉"; break;   // Le toca su inyección
            case 5: cerdos[numCerdo].textoEstado = "🍎"; break;   // Quiere una fruta
            case 6: cerdos[numCerdo].textoEstado = "💤"; break;   // Tiene sueño
            case 7: cerdos[numCerdo].textoEstado = "🦠"; break;   // Está enfermo
            case 8: cerdos[numCerdo].textoEstado = "💧"; break;    // Tiene sed
        }
    }

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
                    if(cerdos[numCerdo].y - pasoCerdo > distanciaBotones){
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
                    if(cerdos[numCerdo].x - pasoCerdo > 15){
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
    var numPollo = aleatorio(0,cantidadPollos-1);
    // Aleatorio para saber si requiere de atención o no
    var requiereAtencion = aleatorio(0, dificultad);    // Varia dependiendo de la dificultad de apareción 
    if(requiereAtencion == 1){
        // Establecemos el estado de EXP en verdadero
        pollos[numPollo].estadoEXP = true;
        pollos[numPollo].contador = tiempoEstadoEXP;
        // Aleatorio para saber que tipo de atencion requiere
        var tipoAtencion = aleatorio(0,8);
        // Definimos la atencion correspondiente
        switch(tipoAtencion){
            case 0: pollos[numPollo].textoEstado = "🥶"; break;   // Tiene frio
            case 1: pollos[numPollo].textoEstado = "🦟"; break;   // Le moslestan los mosquitos
            case 2: pollos[numPollo].textoEstado = "🌾"; break;   // Tiene hambre (1)
            case 3: pollos[numPollo].textoEstado = "🌿"; break;   // Tiene hambre (2)
            case 4: pollos[numPollo].textoEstado = "💉"; break;   // Le toca su inyección
            case 5: pollos[numPollo].textoEstado = "🍎"; break;   // Quiere una fruta
            case 6: pollos[numPollo].textoEstado = "💤"; break;   // Tiene sueño
            case 7: pollos[numPollo].textoEstado = "🦠"; break;   // Está enfermo
            case 8: pollos[numPollo].textoEstado = "💧"; break;    // Tiene sed
        }
    }

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
                    if(pollos[numPollo].y - pasoPollo > distanciaBotones){
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
                    if(pollos[numPollo].x - pasoPollo > 15){
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
    var numOveja = aleatorio(0,cantidadOvejas-1);
    // Aleatorio para saber si requiere de atención o no
    var requiereAtencion = aleatorio(0, dificultad);    // Varia dependiendo de la dificultad de apareción 
    if(requiereAtencion == 1){
        // Establecemos el estado de EXP en verdadero
        ovejas[numOveja].estadoEXP = true;
        ovejas[numOveja].contador = tiempoEstadoEXP;
        // Aleatorio para saber que tipo de atencion requiere
        var tipoAtencion = aleatorio(0,8);
        // Definimos la atencion correspondiente
        switch(tipoAtencion){
            case 0: ovejas[numOveja].textoEstado = "🥶"; break;   // Tiene frio
            case 1: ovejas[numOveja].textoEstado = "🦟"; break;   // Le moslestan los mosquitos
            case 2: ovejas[numOveja].textoEstado = "🌾"; break;   // Tiene hambre (1)
            case 3: ovejas[numOveja].textoEstado = "🌿"; break;   // Tiene hambre (2)
            case 4: ovejas[numOveja].textoEstado = "💉"; break;   // Le toca su inyección
            case 5: ovejas[numOveja].textoEstado = "🍎"; break;   // Quiere una fruta
            case 6: ovejas[numOveja].textoEstado = "💤"; break;   // Tiene sueño
            case 7: ovejas[numOveja].textoEstado = "🦠"; break;   // Está enfermo
            case 8: ovejas[numOveja].textoEstado = "💧"; break;    // Tiene sed
        }
    }

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
                    if(ovejas[numOveja].y - pasoOveja > distanciaBotones){
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
                    if(ovejas[numOveja].x - pasoOveja > 15){
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
    var posX = 32, posY = 0;
    for(var y=0; y < 25; y++){
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
    console.log("Clic X: " + clicX + " - Y: "+clicY);

    // Boton reiniciar
    if((clicX > 644 && clicX < 691) && (clicY > 660 && clicY < 713) && !menuPrincipal) {
        reiniciarJuego();
        presionarBoton.play();
    }
    // Boton musica
    if((clicX > 642 && clicX < 694) && (clicY > 9 && clicY < 57) && !menuPrincipal) {
        if(musica_muteada == false){
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
            musica_muteada = true;
        } else {
            if(musica == 1) {
                musica1.play();
            } else if(musica == 2){
                musica2.play();
            } else {
                musica3.play();
            }
            musica_muteada = false;
        }
        presionarBoton.play();
    }
}

// Funcion de mover mouse, relacionado con la funcion de realizar clic (por las posiciones de los botones)
function movimientoMouse(evento){
    var posX = evento.layerX;
    var posY = evento.layerY;

    // Boton reiniciar
    if((posX > 644 && posX < 691) && (posY > 660 && posY < 713) && !menuPrincipal) {
        cambiarPuntero("Mano");
    }
    // Boton musica
    else if((posX > 642 && posX < 694) && (posY > 9 && posY < 57) && !menuPrincipal) {
        cambiarPuntero("Mano");
    } else {
        cambiarPuntero("Mouse");
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
    console.log(canvas.width);
    console.log(canvas.height);
}

// Cuando el mouse está dentro de un botón
function cambiarPuntero(tipoPuntero) {
    var zona = document.getElementById("villa-platzi");
    if(tipoPuntero == "Mano"){
        zona.style.cursor = "pointer";
    } else {
        zona.style.cursor = "default";
    }
}
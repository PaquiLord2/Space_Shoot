var cuad = document.getElementById("space");
var ctx = cuad.getContext("2d");

let $h1Nivel = document.getElementById("nivConteo")
let $h1Cantidad = document.getElementById("dispConteo");


let choqs = 0,nivel = 0,disparos=30,quitar=0;

class Nodo{
    constructor(data,next,prev){
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}
class Cola{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = null;
    }

  agregarCola(data){
    const nuevoNodo = new Nodo(data,null,this.tail)
    if(this.tail){
        nuevoNodo.prev = this.tail;
        this.tail.next = nuevoNodo;
        this.tail = nuevoNodo;
    }
    else{
        this.head = nuevoNodo;
        this.tail = nuevoNodo
    }
    this.size++;
  }
  
  quitarCabeza(){
    if(!this.head){
        return null
    }

    const retorno = this.head.data;
    
    if (this.head === this.tail){
        this.head = null;
        this.tail = null;
    }else{
        this.head = this.head.next;
        this.head.prev = null;
    }
    this.size--;
    return retorno
  }
  quitarCola(){
    if(!this.tail){
        return null
    }

    const retorno = this.tail.data;
    
    if (this.head === this.tail){
        this.head = null;
        this.tail = null;
    }else{
        this.tail = this.tail.prev;
        this.tail.next = null;
    }
    this.size--;
    return retorno
  }
  quitarMedio(data){
     let actual = this.head;
     let anterior = null;
     
     while(actual !== null){
         if(actual.data.x === data.x && actual.data.y === data.y){
            if(!anterior){
               return this.quitarCabeza();
            }else if(!actual.next){
               return this.quitarCola();
            }else{
                anterior.next = actual.next;
                actual.next.prev = anterior;
            };
            this.size--;
            return actual.data
         }
      anterior = actual;
      actual = actual.next;
     }
    return null;
  }

}

class Cursor{
    constructor(){
    this.x = null;
    this.y = null;
    this.xf = null;
    this.yf = null;
}

posicion(x,y,xf,yf){
    this.x = x;
    this.y = y;
    this.xf = xf;
    this.yf = yf;

}

dibujar(contexto,color){
    let r = color;
     contexto.fillStyle = r;
     contexto.fillRect(this.x,this.y,this.xf,this.yf)
}
eliminar(contexto){
    contexto.clearRect(this.x,this.y,this.xf,this.yf);
}
aleatorio(){
   let x = Math.round((Math.random()*(690-10)+10)/10)*10;
   let y = Math.round((Math.random()*(240-10)+10)/10)*10;
    this.posicion(x,y,10,10);
}

mover(contexto,direccion){
    contexto.clearRect(this.x,this.y,this.xf,this.yf);
    console.log(direccion)
    if (direccion === 'w'){
        this.y = this.y - 10;
    }
    if (direccion === 's'){
        this.y = this.y + 10;
    }
    
    if (this.y<0){
        this.y = this.y + 10
    }

    if (this.y>240){
        this.y = this.y - 10
    }

    contexto.fillStyle = 'Red';
    contexto.fillRect(this.x,this.y,this.xf,this.yf)
     
    return [this.x,this.y]
}

movPosicion(contexto){
    contexto.clearRect(this.x,this.y,this.xf,this.yf);
    this.x = this.x + 10;
    contexto.fillStyle = 'Blue';
    contexto.fillRect(this.x,this.y,this.xf,this.yf)
}
colision(disparo,cuadrado,contexto){
    let x1 = disparo.data.x;
    let y1 = disparo.data.y;
     
    while(cuadrado){
    let x2 = cuadrado.data.x;
    let y2 = cuadrado.data.y;
    let x2f = cuadrado.data.xf;
    let y2f = cuadrado.data.yf;
    if(x1 > x2-x2f && x1<x2+x2f && y1>y2-y2f && y1<y2+y2f){
        return true
    }
    if(x1 > contexto.width-10){
        return [true,1]
    }

    cuadrado = cuadrado.next
}
return false
}


}

class Columna1 extends Cola{
    constructor(){  
    super();
    }
     clonCola(data){
      this.agregarCola(data);
     }
    }
class Columna2 extends Cola{
    constructor(){
        super();
    }
    clonCola(data){
        this.agregarCola(data);
    }
}
class Columna3 extends Cola{
    constructor(){
        super();
    }
    ponerBlancos(data){
        this.agregarCola(data);
    }
   
    arreglarBlancos(x,y){
       this.x = x;
       this.y = y;
    }

}
class Columna4 extends Cola{
    constructor(){
        super();
    }
    clonCola(data){
        this.agregarCola(data);
    }
}


class CuadradoColumna {
    constructor(x,y,xf,yf){
        this.x = x;
        this.y = y;
        this.xf = xf;
        this.yf = yf;
    }
   dibujar(contexto){
    contexto.fillStyle = 'Yellow';
    contexto.fillRect(this.x,this.y,this.xf,this.yf)
   }
   moverAbajo(contexto){

         contexto.clearRect(this.x,this.y,this.xf,this.yf)
         this.y = this.y +10;         
         contexto.fillStyle = 'Yellow';
         contexto.fillRect(this.x,this.y,this.xf,this.yf);
         
         if (this.y >250){
            this.y = -10;
         }
   }
   moverArriba(contexto){

    contexto.clearRect(this.x,this.y,this.xf,this.yf)
    this.y = this.y -10;         
    contexto.fillStyle = 'Yellow';
    contexto.fillRect(this.x,this.y,this.xf,this.yf);
    
    if (this.y < 0){
       this.y = 250;
    }
}
}
const disp = new Cursor();
disp.posicion(0,10,10,10);
disp.dibujar(ctx,'Red')
const nuevaCola = new Cola()
const nuevaColumna = new Columna1();
const nuevaColumna2 = new Columna2();
const nuevaColumna3 = new Columna3();
const nuevaColumna4 = new Columna4();
let en = 20,en2 = 100,en3=150;

function aleatorioo(){
for (let u=0;u<20;u++){
    const posi = new Cursor();
    posi.aleatorio();
    posi.dibujar(ctx,'Orange')
    nuevaColumna3.ponerBlancos(posi);

}
}
function eliminar(){
    let tam = nuevaColumna3.size;
           for(let u = 0;u<tam;u++){
            let o = nuevaColumna3.head;
            o.data.eliminar(ctx);
            nuevaColumna3.quitarCabeza();
           }
}
aleatorioo();

function noRepetirse(){
    let blanqs = nuevaColumna3.head;
    let sig = blanqs.next;
 
    while(blanqs){
        if(blanqs.data.x === sig.data.x && blanqs.data.y === sig.data.y){
           this.eliminar();
           this.aleatorioo();
           blanqs = nuevaColumna3.head;
           sig = blanqs.next;
        }else{
            sig = sig.next;
        }
        if(!sig){
            blanqs = blanqs.next;
            sig = blanqs.next
            if(!sig){
                break;
            }
        }
    }
}
noRepetirse();
for(let u = 0;u<6;u++){
    const column = new CuadradoColumna(50,en,10,10);
    nuevaColumna.clonCola(column);
    en = en + 10;
}
for(let u = 0;u<6;u++){
    const column = new CuadradoColumna(250,en2,10,10);
    nuevaColumna2.clonCola(column);
    en2 = en2 + 10;
}
for(let u = 0;u<6;u++){
    const column = new CuadradoColumna(550,en3,10,10);
    nuevaColumna4.clonCola(column);
    en3 = en3 + 10;
}


disp.dibujar(ctx,'Red');
let cabeza,cabeza2,colm,colm2,als;
let idIntervalo = setInterval(mover,150);

function mover(){
     cabeza = nuevaCola.head;
     cabeza2 = nuevaCola.head;
     colm = nuevaColumna.tail;
     colm2 = nuevaColumna2.head;
     colmC = nuevaColumna.head;
     colm2C = nuevaColumna2.head;
     colm3 = nuevaColumna4.tail;
     colm3C = nuevaColumna4.head;
    als = nuevaColumna3.head;

    while(als){
        als.data.dibujar(ctx,'Orange')
        als = als.next
    }
    if(nivel>0){
     while(colm){
        colm.data.moverAbajo(ctx);
        colm = colm.prev;
        
     }
    } 
    if(nivel>1){
     while(colm2){
        colm2.data.moverArriba(ctx);
        colm2 = colm2.next;
     }}
     if(nivel>2){
     while(colm3){
        colm3.data.moverAbajo(ctx);
        colm3 = colm3.prev;
     }
    }
     als = nuevaColumna3.head;
     if(cabeza!==null){
      let entr = 0;
     while(cabeza){
       entr = 0;
        cabeza.data.movPosicion(ctx)
        if(nivel>0){
        if(cabeza.data.colision(cabeza,colmC,cuad)){
              nuevaCola.quitarMedio( cabeza.data);
              entr++;
        }
    }
      if(nivel>1){
    if (cabeza.data.colision(cabeza,colm2C,cuad)){
            nuevaCola.quitarMedio( cabeza.data);
            entr++;
        }
    }
    if(nivel>2){
    if (cabeza.data.colision(cabeza,colm3C,cuad)){
            nuevaCola.quitarMedio( cabeza.data);
            entr++;
        }
    }
        if(entr===0){
            let vi;
        if(vi = cabeza.data.colision(cabeza,als,cuad)){
           if (vi[1]===1){
            nuevaCola.quitarMedio(cabeza.data)
           }else{
            choqs++;
            nuevaColumna3.quitarMedio(cabeza.data)
           }
        }
    }

        cabeza = cabeza.next
        disp.dibujar(ctx,'Red') 
    }

}
if(nivel>=3 && choqs===20){
    window.alert("Has ganado")
    location.reload();
}
if(nivel>0 && disparos===0 && nuevaCola.size===0){
    window.alert("has perdido")
    location.reload();
}
  if(choqs===20){
    choqs = 0;
    nivel++;
    let entr = nuevaCola.size;
    let caa = nuevaCola.head;
    for(let ir = 0;ir<entr;ir++){
        caa.data.eliminar(ctx)
        nuevaCola.quitarCabeza()
        nuevaCola.next;
    caa = caa.next
    }

    aleatorioo();
    noRepetirse();
    
    disparos=30-quitar;
    quitar=quitar+5;
    $h1Cantidad.textContent = disparos;
    $h1Nivel.textContent = nivel + 1; 
  }
   clearInterval(idIntervalo);
   idIntervalo = setInterval(mover,80);
}

let valor = []
this.addEventListener("keypress",(e)=>{
   valor = disp.mover(ctx,e.key)
})

function disparador(llave){
    if (llave === 'k'){
        //const nuevaBala = new Cursor(valor[0],valor[1],10,10)
         const nuevaBala = new Cursor();
         nuevaBala.posicion(valor[0],valor[1],10,10)
        nuevaCola.agregarCola(nuevaBala)
        }
}

this.addEventListener("keypress",(e)=>{
   if(nivel===0){
    this.disparador(e.key);
   }
   if(nivel >= 1 && disparos>0){
    this.disparador(e.key);
    if (e.key === 'k')
    {
    disparos--;
    $h1Cantidad.textContent = disparos;
    }
   
   }
  
    
})

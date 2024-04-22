import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;
  public usuario!:Usuario;

  constructor(private socket:Socket ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(){
 this.socket.on('connect',()=>{
  console.log("Conectado al Servidor");
  this.socketStatus=true;
 });



 this.socket.on('disconnect',()=>{
  console.log("Desconectado del  Servidor");
  this.socketStatus=false;
 });
  }


  emit(evento:string,payload?:any,callback?:Function){

    console.log("Emitiendo",evento);

  this.socket.emit(evento,payload,callback);

  }


  listen(evento:string){
    return this.socket.fromEvent(evento)
  }

  loginWs(nombre:string){

    console.log("Configurando",nombre);
    return new Promise<void>((resolve,reject)=>{

    this.emit('configurar-usuario',{nombre},(resp: any)=>{
      this.usuario=new Usuario(nombre);
      this.guardarStorage();
      resolve();

  });

    });


}



guardarStorage(){
localStorage.setItem('usuario',JSON.stringify(this.usuario));
}

cargarStorage(){
  const usuarioString = localStorage.getItem('usuario');
  if (usuarioString !== null) {
    this.usuario = JSON.parse(usuarioString);
    this.loginWs(this.usuario.nombre);
  }
}


 getUsuario(){
    return this.usuario;
 }


}

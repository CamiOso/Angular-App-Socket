import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus=false;
  public usuario!:Usuario | null;

  constructor(private socket:Socket,
    private router:Router
   ) {
    this.cargarStorage();
    this.checkStatus();
  }

  checkStatus(){
 this.socket.on('connect',()=>{
  console.log("Conectado al Servidor");
  this.socketStatus=true;
  this.cargarStorage();
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
cargarStorage() {
  const usuarioString = localStorage.getItem('usuario');
  if (usuarioString !== null) {
    const usuario = JSON.parse(usuarioString);
    if (usuario && usuario.nombre) {
      this.usuario = usuario;
      this.loginWs(usuario.nombre);
    } else {
      // Aquí puedes manejar el caso en que el usuario almacenado en localStorage no tenga el formato esperado
      console.error('El usuario almacenado en el localStorage no tiene el formato esperado.');
    }
  } else {
    // Aquí puedes manejar el caso en que no hay usuario almacenado en localStorage
    console.log('No se encontró ningún usuario en el localStorage.');
  }
}


 getUsuario(){
    return this.usuario;
 }


 logoutWs() {
  // Asignar null a this.usuario
  if (this.usuario !== null) {
    this.usuario = null;
}

  // Remover 'usuario' del localStorage
  localStorage.removeItem('usuario');

  // Emitir evento 'configurar-usuario' con payload
  const payload = {
      nombre: 'sin-nombre'
  };
  this.emit('configurar-usuario', payload,()=>{
    
  });

  // Navegar a la ruta vacía
  this.router.navigateByUrl('');
}


}

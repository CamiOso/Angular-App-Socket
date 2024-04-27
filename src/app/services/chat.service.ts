import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService:WebsocketService
  ) { }

  sendMessage(mensaje: string) {
    const usuario = this.wsService.getUsuario();
    if (usuario) {
      const payload = {
        de: usuario.nombre,
        cuerpo: mensaje
      };

      this.wsService.emit("mensaje", payload);
    } else {
      console.error("El usuario es nulo. No se puede enviar el mensaje.");
    
    }
  }


  getMessages(){
    return this.wsService.listen("mensaje-nuevo");
  }

  getMessagesPrivate(){
    return this.wsService.listen("mensaje-privado");
  }

  getUsuariosActivos(){
    return this.wsService.listen("usuarios-activos");

  }


  emitirUsuariosActivos(){
    this.wsService.emit("obtener-usuarios");
  }
}

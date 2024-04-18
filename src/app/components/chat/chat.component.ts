import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  texto= "" ;


  constructor(
    public chatService:ChatService
  ){

  }

  enviar(){

     this.chatService.sendMessage(this.texto);
    this.texto="";

  }

}

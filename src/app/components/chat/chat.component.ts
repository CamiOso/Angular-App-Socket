import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,OnDestroy{

  texto= "" ;
  mensajesSubscription!:Subscription;
  mensajes:any[ ]=[ ];
  elemento!:HTMLElement;


  constructor(
    public chatService:ChatService
  ){

  }

  ngOnInit() {
    this.elemento = document.getElementById("chat-mensajes")!;


    if (this.elemento) {
        this.mensajesSubscription = this.chatService.getMessages().subscribe((msg: any) => {
            this.mensajes.push(msg);
            setTimeout(() => {
        this.elemento.scrollTop=this.elemento.scrollHeight;
            }, 50);
        });
    } else {
        console.error("No se encontró ningún elemento con el ID 'chat-mensajes'");
    }
}

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();

  }

  enviar(){


    if(this.texto.trim().length===0){
      return;

    }

     this.chatService.sendMessage(this.texto);
    this.texto="";


  }

}

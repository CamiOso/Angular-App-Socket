import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {

  usuariosActivosObs!:Observable<any>;




  constructor(
    public chatService:ChatService
  ) { }

  ngOnInit(){
    this.usuariosActivosObs=this.chatService.getUsuariosActivos();
    this.chatService.emitirUsuariosActivos();

  }

}

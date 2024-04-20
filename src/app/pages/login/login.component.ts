import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  nombre:string=" ";

constructor(
  public wsService:WebsocketService
) { }



  ingresar(){


    this.wsService.loginWs(this.nombre);


  }
}

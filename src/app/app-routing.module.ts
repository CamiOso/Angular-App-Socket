import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { canActivateGuard } from './guards/usuario-guard.service';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"mensajes",component:MensajesComponent,canActivate: [canActivateGuard] },
  {path:"**",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

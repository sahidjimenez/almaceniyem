import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AutorizacionService } from './autorizacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( public autorizacionService: AutorizacionService) { }

  canActivate() {

    return this.autorizacionService.estaAutenticado();
  }
}

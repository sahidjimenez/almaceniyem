import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  accesoFacturacion = 'https://login.example.com';

  ClaseCambio1 = 'toggled';
  ClaseCambio2 = '';
  ClaseInvisible1 = true;
  ClaseInvisible2 = false;

  ocultar: false;
  constructor() { }
}

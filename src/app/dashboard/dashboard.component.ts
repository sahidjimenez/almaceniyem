import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../compartido/servicios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cambioClase: string;
  constructor(public servicios: ServiciosService) { }

  valor: any;

  ngOnInit() {
    this.valor = this.servicios.accesoFacturacion;
  }



}

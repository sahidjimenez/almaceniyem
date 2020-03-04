import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../autorizacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public autorizacionService: AutorizacionService) { }

  ngOnInit() {
  }
  onSubmit(data: any) {

    console.log(data);
    this.autorizacionService.crearUsuario(data.nombre , data.correo , data.contrasena1);

  }

}

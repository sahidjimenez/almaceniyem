import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private autorizacionService: AutorizacionService) { }

  ngOnInit() {
  }

  onSubmit( data: any ) {

    console.log(data);
    this.autorizacionService.login(data.correo, data.contrasena);

  }
}

import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from './autorizacion/autorizacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor (public autorizacionService: AutorizacionService) {
  }

  ngOnInit() {
    this.autorizacionService.initAuthListerner();
  }

}


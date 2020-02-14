import { Component, OnInit, EventEmitter, Output ,} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // <!--AGREGAR toggled -->
  @Output ()
  claseToggle: EventEmitter <string> = new EventEmitter <string>();


  ClaseCambio1 = 'toggled';
  ClaseCambio2 = '';
  ClaseInvisible1 = true;
  ClaseInvisible2 = false;
 
  constructor() { }

  ngOnInit() {
  }

  cambiarVista1() {
    console.log( this.ClaseInvisible1 + " numero 1");
    this.claseToggle.emit(this.ClaseCambio1);

    this.ClaseInvisible1 = false;
    this.ClaseInvisible2 = true;
    


  }

  cambiarVista2() {

    console.log( this.ClaseInvisible2 + " numero 2");
    this.claseToggle.emit(this.ClaseCambio2);

    this.ClaseInvisible1 = true;
    this.ClaseInvisible2 = false;
   
  }
}

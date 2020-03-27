import { Component, OnInit, EventEmitter, Output ,} from '@angular/core';
import { AutorizacionService } from '../../autorizacion/autorizacion.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from '../../autorizacion/registro/usuario.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
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
  nombreUsuario: string;
  usersSubs: Subscription;
  constructor(public autorizacionService: AutorizacionService,
              private store: Store<AppState>) { }

  ngOnInit() {


    this.usersSubs = this.store.select('user')

    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( ({user}) => {
      console.log( user );
      this.store.select('user').subscribe( user => this.nombreUsuario = user.user.nombre);

    });


  }

  cambiarVista1() {
    console.log( this.ClaseInvisible1 + 'numero 1');
    this.claseToggle.emit(this.ClaseCambio1);
    this.ClaseInvisible1 = false;
    this.ClaseInvisible2 = true;
  }

  cambiarVista2() {

    console.log( this.ClaseInvisible2 + 'numero 2');
    this.claseToggle.emit(this.ClaseCambio2);
    this.ClaseInvisible1 = true;
    this.ClaseInvisible2 = false;
  }

  logout() {

    this.autorizacionService.logout();

  }
}

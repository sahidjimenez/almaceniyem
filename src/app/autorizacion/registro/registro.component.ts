import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutorizacionService } from '../autorizacion.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../compartido/ui.actions';
import { isLoading } from '../../compartido/ui.actions';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {

  cargando = false;
  uiSubs: Subscription;

  constructor(public autorizacionService: AutorizacionService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.uiSubs = this.store.select('ui')
                      .subscribe( ui => this.cargando = ui.isLoading);

  }
  ngOnDestroy() {
    this.uiSubs.unsubscribe();
  }

  onSubmit(data: any) {
    console.log(data);
    this.store.dispatch(ui.isLoading());
    this.autorizacionService.crearUsuario(data.nombre , data.correo, data.apellidos , data.contrasena1);

  }

}

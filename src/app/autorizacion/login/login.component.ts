import { Component, OnInit, OnDestroy } from '@angular/core';
import { AutorizacionService } from '../autorizacion.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../compartido/ui.actions';
import { isLoading } from '../../compartido/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando  = false;
  uiSubs: Subscription;

  constructor(private autorizacionService: AutorizacionService,
              private store: Store<AppState>) { }

  ngOnInit() {

   this.uiSubs = this.store.select('ui')
        .subscribe( ui => {
          this.cargando = ui.isLoading;
          console.log('Cargando subs');
        });
  }

  ngOnDestroy() {
    this.uiSubs.unsubscribe();
  }

  onSubmit( data: any ) {
    this.store.dispatch(isLoading());
    this.autorizacionService.login(data.correo, data.contrasena);

  }
}

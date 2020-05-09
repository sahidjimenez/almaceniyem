import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiciosService } from '../compartido/servicios.service';
import { ArticulosService } from '../ingreso-egreso/articulos/articulos.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { auth } from 'firebase';

import { Subscription } from 'rxjs';
import *as articulosActions from '../ingreso-egreso/articulos.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  cambioClase: string;
  usersSubs: Subscription;
  articulosSubs: Subscription;

  constructor(public servicios: ServiciosService,
              private articulosService: ArticulosService,
              private store: Store<AppState>) { }

  valor: any;

  ngOnInit() {
    this.valor = this.servicios.accesoFacturacion;



    this.usersSubs = this.store.select('user')

    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( ({user}) => {
   //   console.log( user );
      this.articulosSubs = this.articulosService.articulosListener()
      .subscribe(ingresosEgresosFB => {
        this.store.dispatch(articulosActions.setArticulos({items: ingresosEgresosFB }));
      });
    });

  }


  ngOnDestroy() {
    this.articulosSubs.unsubscribe();
    this.usersSubs.unsubscribe();


  }
}

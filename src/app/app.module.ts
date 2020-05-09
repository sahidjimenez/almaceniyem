import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavbarComponent } from './compartido/navbar/navbar.component';
import { FooterComponent } from './compartido/footer/footer.component';
import { SidebarComponent } from './compartido/sidebar/sidebar.component';
import { LoginComponent } from './autorizacion/login/login.component';
import { RegistroComponent } from './autorizacion/registro/registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { ArticulosComponent } from './ingreso-egreso/articulos/articulos.component';
import { DetallesComponent } from './ingreso-egreso/detalles/detalles.component';
import { TotopComponent } from './compartido/totop/totop.component';
import { PrincipalComponent } from './ingreso-egreso/principal/principal.component';
import { AdminComponent } from './ingreso-egreso/admin/admin.component';
import { MovimientosComponent } from './ingreso-egreso/movimientos/movimientos.component';
import { SecundarioComponent } from './ingreso-egreso/secundario/secundario.component';



import { ServiciosService } from './compartido/servicios.service';
import { PrimarioComponent } from './ingreso-egreso/primario/primario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    ArticulosComponent,
    DetallesComponent,
    TotopComponent,
    PrincipalComponent,
    AdminComponent,
    MovimientosComponent,
    SecundarioComponent,
    PrimarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
     StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
     BrowserAnimationsModule,
     NgxPaginationModule,
     Ng2SearchPipeModule
  ],
  providers: [ServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

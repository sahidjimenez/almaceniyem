import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


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



// servicio
import { ServiciosService } from './compartido/servicios.service';

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
    MovimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [ServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './autorizacion/login/login.component';
import { RegistroComponent } from './autorizacion/registro/registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService } from './autorizacion/auth-guard.service';

const routes: Routes = [

  {path: 'login', component: LoginComponent},

  {path: 'registro', component: RegistroComponent},

  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate : [ AuthGuardService ]

  },

  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

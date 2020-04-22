import { Routes } from '@angular/router';
import { ArticulosComponent } from '../ingreso-egreso/articulos/articulos.component';
import { PrincipalComponent } from '../ingreso-egreso/principal/principal.component';
import { DetallesComponent } from '../ingreso-egreso/detalles/detalles.component';
import { AdminComponent } from '../ingreso-egreso/admin/admin.component';
import { MovimientosComponent } from '../ingreso-egreso/movimientos/movimientos.component';
import { SecundarioComponent } from '../ingreso-egreso/secundario/secundario.component';
import { PrimarioComponent } from '../ingreso-egreso/primario/primario.component';

export const dashboardRoutes: Routes = [

{path: '', component : PrincipalComponent},
{path: 'articulos', component: ArticulosComponent},
{path: 'detalles', component: DetallesComponent},
{path: 'admin', component: AdminComponent},
{path: 'movimientos', component: MovimientosComponent},
{path: 'secundario', component: SecundarioComponent},
{path: 'primario', component: PrimarioComponent}

];


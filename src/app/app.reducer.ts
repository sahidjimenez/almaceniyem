import { ActionReducerMap } from '@ngrx/store';
import * as ui from './compartido/ui.reducer';
import * as auth from './autorizacion/autorizacion.reducer';
import * as ingresoEgreso from './ingreso-egreso/articulos.reducer';


export interface AppState {
   ui: ui.State ;
   user: auth.State ;
   ingresosEgreso: ingresoEgreso.State;
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   ingresosEgreso: ingresoEgreso.ingresoEgresoReducer,
}
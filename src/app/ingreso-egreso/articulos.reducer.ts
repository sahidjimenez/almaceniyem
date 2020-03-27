import { createReducer, on } from '@ngrx/store';
import { setArticulos, unSetArticulos } from './articulos.actions';
import { Articulo } from '../modelos/producto.model';

export interface State {
    items: Articulo[];
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setArticulos, (state, {items}) => ({ ...state, items: [... items] })),
    on(unSetArticulos, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
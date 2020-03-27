import { createAction, props } from '@ngrx/store';
import { Articulo } from '../modelos/producto.model';



export const unSetArticulos = createAction('[Articulos] unSetArticulos');

export const setArticulos = createAction(

    '[Articulos] setArticulos',
    props <{items: Articulo[ ]}>()

    );

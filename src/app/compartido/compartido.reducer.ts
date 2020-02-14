import { Action } from '@ngrx/store';


export function compartidoReducer ( state: string = 'toggle', action: Action ) {


    switch (action.type) {
        case 'ABRIRSIDE':
            return state = '';
            break;
        case 'ABRIRSIDE':
            return state ;
            break;

        default:
            return state;
            break;
    }

}
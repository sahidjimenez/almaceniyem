import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Articulo } from 'src/app/modelos/producto.model';
import { AutorizacionService } from '../../autorizacion/autorizacion.service';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  uid: string;
  constructor( private firestore: AngularFirestore,
                private autorizacionService: AutorizacionService) { }


// HACER MODIFICACIONES AQUI
// VER QUE ONDA CON CONMO SE GUARDA EN FIREBASEE
// NO SE SI ESTA BIEN GUARDAR EL UID DEL USUARIO

  crearArticulos( articulo: Articulo) {
    const uid = this.autorizacionService.user.uid;
    const pruebaUIDUSUARIO = '5PAXt1zHiBW9zBoUQHvJATXFXfl1';

   // console.log(this.autorizacionService.user.uid);

  return this.firestore.collection('articulos')

                .add( {... articulo})
                .then ( (ref) => console.log('existo!', ref))
                .catch(err => console.log(err));

  }

  articulosListener() {

    this.firestore.collection(`articulos`).snapshotChanges()
    .subscribe(items => {
      console.log(items);
    })

  }

}


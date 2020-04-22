import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Articulo } from 'src/app/modelos/producto.model';
import { AutorizacionService } from '../../autorizacion/autorizacion.service';
import { map } from 'rxjs/operators';

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


   // console.log(this.autorizacionService.user.uid);

  return this.firestore.collection('articulos')

                .add( {... articulo})
                .then ( (ref) => console.log('existo!', ref))
                .catch(err => console.log(err));

  }

  actualizarArticulo(articulo: Articulo) {
    return this.firestore.collection('articulos')
                .doc(articulo.uid)
                .update({... articulo})
                .then( (ref) => console.log('existo!', ref))
                .catch(err => console.log(err));

  }


  articulosListener() {

   return  this.firestore.collection(`articulos`)
    .snapshotChanges()
    .pipe(
      map( snapshot => {
        return snapshot.map( doc => {

          const data: any = doc.payload.doc.data();
          return ({

            ... data,
            uid: doc.payload.doc.id,

          });
        });
      })
    );

  }
  articulosListenerEditar(uidArticulo:string) {

    return  this.firestore.collection(`articulos`).doc(`${ uidArticulo }`).valueChanges();

   }
 

  deleteArticulo(uid:string){
    return this.firestore.collection('articulos').doc(`${uid}`).delete();
  }

}


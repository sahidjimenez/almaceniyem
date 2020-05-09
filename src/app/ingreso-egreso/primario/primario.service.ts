import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class PrimarioService {



  constructor(private firestore: AngularFirestore, ) { }


  actualizarArticuloCantidad(uid: string , cantidad: number) {

    return this.firestore.collection('articulos')
                .doc(uid)
                .update({cantidad: cantidad})
                .then( (ref) => console.log('Se actualizo!', ref))
                .catch(err => console.log(err));

  }

  crearActividad( actividad: any ) {

  return this.firestore.collection('actividades')
             .add( {... actividad})
             .then ( (ref) => console.log('existo Se guardo el form!', ref))
             .catch(err => console.log(err));

  }

  articuloListenerCantidad(uidArticulo: string, cantidad: number) {

    return  this.firestore.collection(`articulos`).doc(`${ uidArticulo }`).snapshotChanges();


   }

   leer() {
     return this.firestore.collection('articulos', ref => ref.where('mostrar', '==', true)).valueChanges();
   }


   actualizarArticuloMostrar(uid: string , mostrar: boolean) {

    return this.firestore.collection('articulos')
                .doc(uid)
                .update({mostrar: mostrar})
                .then( (ref) => console.log('Se actualizo!', ref))
                .catch(err => console.log(err));

  }

}


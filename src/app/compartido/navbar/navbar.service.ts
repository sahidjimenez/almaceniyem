import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  activo =   true;

  constructor(private firestore: AngularFirestore) { }

  mostrarNotificaciones () {


    return  this.firestore.collection('actividades' , ref => ref.where('notificado', '==', this.activo ) ).valueChanges();


  }


  actualizarVistaNotifiacion(uid: string , notificado: boolean) {

    return this.firestore.collection('actividades')
                .doc(uid)
                .update({notificado: notificado})
                .then( (ref) => console.log('Se actualizo la notifiacion a  OFF!', ref))
                .catch(err => console.log(err));

  }

  actividadesListener() {

    return  this.firestore.collection(`actividades`)
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
}

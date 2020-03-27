import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Usuario } from './registro/usuario.model';

import { Store } from '@ngrx/store';

import { AppState } from '../app.reducer';
import * as ui from '../compartido/ui.actions';
import * as authAction from '../autorizacion/autorizacion.actions';

import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService implements OnDestroy {

  userSubs: Subscription;
  public _user: Usuario;


  get user() {
    return {... this._user};
  }

  constructor(private afAutorizacion: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) { }

        initAuthListerner() {
          this.afAutorizacion.authState.subscribe(fbUser => {

            // console.log(fbUser);
            // console.log(fbUser?.uid);
            // console.log(fbUser?.email);
             if (fbUser) {
             this.userSubs = this.afDB.doc(`usuarios/${ fbUser.uid }`).valueChanges()
              .subscribe((firestoreUser: any ) => {

             //   console.log({firestoreUser});
                const user = Usuario.fromFirebase( firestoreUser );
                this._user = user;
                this.store.dispatch(authAction.setUser( {user}));
              })

             } else {

               //console.log('llamar unset del user');
               this._user = null;

               this.store.dispatch(authAction.unSetUser());
             }
          });
        }

        ngOnDestroy(){
          this.userSubs.unsubscribe();
        }
  crearUsuario( nombre: string , correo: string , contrasena: string) {

    this.afAutorizacion.auth
        .createUserWithEmailAndPassword(correo, contrasena)
        .then(resp => {

          const usuario: Usuario = {
            uid: resp.user.uid,
            nombre: nombre,
            email: resp.user.email
          };

         this.afDB.collection('usuarios').doc(resp.user.uid)
         .set(usuario)
         .then( () => {
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
         });

        })
        .catch(error => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire('Error en el crear', error.message, 'error');
          console.log(error);
        });
  }

  login(correo: string, contrasena: string ) {

        this.afAutorizacion.auth
        .signInWithEmailAndPassword( correo, contrasena )
        .then(resp => {;
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        })
        .catch(error => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire('Error en el login', error.message, 'error');
          console.log(error);
        });

  }

  logout() {

    this.router.navigate(['/login']);
    this.afAutorizacion.auth.signOut();

  }

  estaAutenticado() {
    return this.afAutorizacion.authState
    .pipe(
      map(fbUser => {

        if ( fbUser == null) {
          this.router.navigate(['/']);
        }

       return fbUser != null;
      })
    );
  }
}

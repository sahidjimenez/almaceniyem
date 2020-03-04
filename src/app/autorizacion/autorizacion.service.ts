import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import {map} from 'rxjs/operators';
import { Usuario } from './registro/usuario.model';
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  constructor(private afAutorizacion: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore) { }

        initAuthListerner(){
          this.afAutorizacion.authState.subscribe(fbUser => {
            console.log(fbUser);
          });
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

         this.afDB.collection('usuarios').doc(resp.user.uid).set(usuario).
         then( () => {
          this.router.navigate(['/']);
         });

        })
        .catch(error => {
          Swal.fire('Error en el crear', error.message, 'error');
          console.log(error);
        });

  }

  login(correo: string, contrasena: string ) {

        this.afAutorizacion.auth
        .signInWithEmailAndPassword( correo, contrasena )
        .then(resp => {console.log(resp);
          this.router.navigate(['/']);
        })
        .catch(error => {
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

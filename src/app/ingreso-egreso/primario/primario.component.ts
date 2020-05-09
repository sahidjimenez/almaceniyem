import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ControlValueAccessor } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ArticulosService } from '../articulos/articulos.service';
import { Subscription } from 'rxjs';
import { Articulo } from 'src/app/modelos/producto.model';
import { PrimarioService } from './primario.service';
import Swal from 'sweetalert2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AutorizacionService } from '../../autorizacion/autorizacion.service';


@Component({
  selector: 'app-primario',
  templateUrl: './primario.component.html',
  styleUrls: ['./primario.component.css']
})
export class PrimarioComponent implements OnInit {


  buscarForm: FormGroup;
  actividadForm: FormGroup;
  articulos: any[] = [];
  articuloSubs: Subscription;
  Default =  'escoger';
  fechaHora = new Date();
  items: FormArray;
  nombreArticulo: string;

  cantidadNueva: number;

  algoSubs: Subscription;
  numeroAfuera: number;
  paginaActual = 1;

  lugaresMover = ['Lugar 1', 'Lugar 2', 'Lugar 3', 'Lugar 4', 'Lugar 5', ];

  buscar: '';
 
  mostrar = true ;



  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private articulosService: ArticulosService,
              private primarioService: PrimarioService,
              private autorizacionService:AutorizacionService,
              private db: AngularFirestore
              ) { }

  ngOnInit() {

  

    this.articuloSubs = this.store.select('ingresosEgreso')
    .subscribe( articulos => {
      this.articulos = articulos.items;
    //  console.log(this.articulos);

    });

    this.buscarForm = this.fb.group({
      seleccionarArticulo: [null, Validators.required],
      uid: [null]
    });

    this.actividadForm = this.fb.group({
      nombre: [ '' , Validators.required],
      descripcion: [ '' , Validators.required],
      user_uid: ['', Validators.required],
      activo: [true],
      notificado: [true],
      lugar: [null , Validators.required],
      fechaCreacion: ['', Validators.required],
      articulos: this.fb.array([]),
    });


    
  }

  // Se crea un array con los valores que enviamos
  createItem(nombre: string, cantidad: number, uid: string) {
    return this.fb.group({
      nombreArticulo: [nombre],
      cantidadNueva: [cantidad],
      cantidadVieja: [cantidad],
      uid: [uid]
    });
  }

  get articuloListArray() {
    return <FormArray>this.actividadForm.get('articulos');
  }

  get articulosArray(): FormArray {
  
    return this.actividadForm.get('articulos') as FormArray;
  }

  addItem(nombre: string, cantidad: number, uid: string) {



    console.log(this.mostrar);

    this.mostrar = false;
    console.log(this.mostrar);

    console.log(nombre, cantidad, uid);

    this.items = this.actividadForm.get('articulos') as FormArray;

    this.items.push(this.createItem(nombre, cantidad, uid));

  }

  guardar( form ) {
    const usuario_uid = this.autorizacionService.user.uid;
    this.actividadForm.get('user_uid').setValue(usuario_uid);
    this.actividadForm.get('fechaCreacion').setValue(this.fechaHora.toLocaleString('es-MX'));
    console.log( this.actividadForm.value);

    if (this.actividadForm.invalid) { return; }

    const valorForm = this.actividadForm.value;
    this.primarioService.crearActividad(valorForm);


    for (let i = 0; i < form.value.articulos.length; i++) {
     // console.log(i);
      const uid = form.value.articulos[i].uid;
      const cantidadNueva = form.value.articulos[i].cantidadNueva;
      const cantidadVieja = form.value.articulos[i].cantidadVieja;

      // console.log(uid);
      // console.log(cantidadNueva);
      // console.log(cantidadVieja);

      const cantidadActualizada = cantidadVieja - cantidadNueva;

      this.primarioService.actualizarArticuloCantidad(uid, cantidadActualizada);

    }


    this.actividadForm.reset();
    this.regresarValore();
    Swal.fire('Registro creado!',  'success');

  }


  regresarValore() {

    this.actividadForm = this.fb.group({
      nombre: [ '' , Validators.required],
      descripcion: [ '' , Validators.required],
      user_uid: ['', Validators.required],
      activo: [true],
      notificado: [true],
      lugar: [null , Validators.required],
      fechaCreacion: ['', Validators.required],
      articulos: this.fb.array([]),
    });
  }

  eliminarItem(id: number) {

    
    this.articuloListArray.removeAt(id);
  
  }
  
  articuloSeleccionado() {}

}

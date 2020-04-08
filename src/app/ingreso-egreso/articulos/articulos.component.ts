import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articulo } from '../../modelos/producto.model';
import { ArticulosService } from './articulos.service';

import { AutorizacionService } from '../../autorizacion/autorizacion.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit , OnDestroy{


  productoForm: FormGroup;
  productoFormEditar: FormGroup;
  presentacion = ['Bolsa', 'Botella', 'Caja'];
  unidad = ['Kilo', 'Gramo', 'Litro', ];
  categoria = ['categoria 1', 'categoria 2', 'categoria 3', 'categoria 4', 'categoria 5', ];
  fechaHora = new Date();
  uid: string;
  articulos: any;

  articuloSubs: Subscription;
  articuloEditarSubs: Subscription;
  itemEditado: any;

  uidRecuperado: any;
  
  nombreE: string;
  barcodeE: string;
  descripcionE: string;
  cantidadE: string;
  precioCompraE: string;
  precioVentaE: string;
  presentacionE: string;
  unidadE: string;
  categoriaE: string;
  estaActivadoE: string;
  fechaCreacionE: string;
  uidE: string;







  constructor(public fb: FormBuilder,
              private articulosService: ArticulosService,
              private autorizacionService: AutorizacionService,
              private store: Store<AppState>,

              ) { }

  ngOnInit() {

     const algo = document.getElementById('editarModal');
     //console.log(algo);



   this.articuloSubs = this.store.select('ingresosEgreso')
      .subscribe(articulos => {
      this.articulos = articulos.items;
    });


    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      barcode: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precioVenta: ['', Validators.required],
      presentacion: [null , Validators.required],
      unidad: [null, Validators.required],
      user_uid: [''],
      categoria: [null, Validators.required],
      estaActivado: [false, Validators.required],
      fechaCreacion: [ null],
      uid: [null]
    });

    this.productoFormEditar = this.fb.group({
      nombre: ['', Validators.required],
      barcode: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precioVenta: ['', Validators.required],
      presentacion: [null , Validators.required],
      unidad: [null, Validators.required],
      user_uid: [''],
      categoria: [null, Validators.required],
      estaActivado: [false, Validators.required],
      fechaCreacion: [ null],
      uid: [null]
    });

  }
  
  ngOnDestroy() {
    this.articuloSubs.unsubscribe();
    this.articuloEditarSubs.unsubscribe();
  }

  guardar() {

    if (this.productoForm.invalid) { return; }

    const usuario_uid = this.autorizacionService.user.uid;
    this.productoForm.get('user_uid').setValue(usuario_uid);
    this.productoForm.get('fechaCreacion').setValue(this.fechaHora.toLocaleString('es-MX'));

    console.log( this.productoForm.value);

    const {
      nombre,
      barcode,
      descripcion,
      cantidad,
      precioCompra,
      precioVenta,
      presentacion,
      unidad,
      user_uid,
      categoria,
      estaActivado,
      fechaCreacion,
      uid,

    } = this.productoForm.value;

    const articulo = new Articulo (
      nombre,
      barcode,
      descripcion,
      cantidad,
      precioCompra,
      precioVenta,
      presentacion,
      unidad,
      user_uid,
      categoria,
      estaActivado,
      fechaCreacion,
      uid
      );

    this.articulosService.crearArticulos(articulo)
    .then( () => {
      this.productoForm.reset();
      this.regresarValores();
      Swal.fire('Registro creado!', descripcion , 'success');

    })
    .catch(err => Swal.fire('Error!', err , 'error'));
  }

  editar() {
   
    if (this.productoFormEditar.invalid) { return; }

    //console.log( this.productoFormEditar.value);

    const usuario_uid = this.autorizacionService.user.uid;
    this.uidE = this.uidRecuperado;
    this.productoFormEditar.get('user_uid').setValue(usuario_uid);
    this.productoFormEditar.get('fechaCreacion').setValue(this.fechaHora.toLocaleString('es-MX'));
    this.productoFormEditar.get('uid').setValue(this.uidE);
    const {
      nombre,
      barcode,
      descripcion,
      cantidad,
      precioCompra,
      precioVenta,
      presentacion,
      unidad,
      user_uid,
      categoria,
      estaActivado,
      fechaCreacion,
      uid,

    } = this.productoFormEditar.value;

    const articulo = new Articulo (
      nombre,
      barcode,
      descripcion,
      cantidad,
      precioCompra,
      precioVenta,
      presentacion,
      unidad,
      user_uid,
      categoria,
      estaActivado,
      fechaCreacion,
      uid
      );
      console.log(articulo);

      this.articulosService.actualizarArticulo(articulo)
        .then( () => {

        // Estos dos funciones resetean el formulario
        // this.productoFormEditar.reset();
        // this.regresarValoresE();
        Swal.fire('Registro creado!', descripcion , 'success');
  
      })
      .catch(err => Swal.fire('Error!', err , 'error'));
  }

  mandarvalores(uidR) {


    this.uidRecuperado = uidR;


   // console.log(uidR);

   this.articuloEditarSubs = this.articulosService.articulosListenerEditar(uidR)
      .subscribe(
      itemAeditar => {

      this.itemEditado = itemAeditar;
    //  console.log(this.itemEditado.nombre);

      this.nombreE = this.itemEditado.nombre;
      this.barcodeE = this.itemEditado.barcode;
      this.descripcionE = this.itemEditado.descripcion;
      this.cantidadE = this.itemEditado.cantidad;
      this.precioCompraE = this.itemEditado.precioCompra;
      this.precioVentaE = this.itemEditado.precioVenta;
      this.presentacionE = this.itemEditado.presentacion;
      this.unidadE = this.itemEditado.unidad;
      this.categoriaE = this.itemEditado.categoria;
      this.estaActivadoE = this.itemEditado.estaActivado;

      this.productoFormEditar.get('nombre').setValue(this.nombreE);
      this.productoFormEditar.get('barcode').setValue(this.barcodeE);
      this.productoFormEditar.get('descripcion').setValue(this.descripcionE);
      this.productoFormEditar.get('cantidad').setValue(this.cantidadE);
      this.productoFormEditar.get('precioCompra').setValue(this.precioCompraE);
      this.productoFormEditar.get('precioVenta').setValue(this.precioVentaE);
      this.productoFormEditar.get('presentacion').setValue(this.presentacionE);
      this.productoFormEditar.get('unidad').setValue(this.unidadE);
      this.productoFormEditar.get('fechaCreacion').setValue(this.fechaHora.toLocaleString('es-MX'));
      this.productoFormEditar.get('categoria').setValue(this.categoriaE);
      this.productoFormEditar.get('estaActivado').setValue(this.estaActivadoE);
      this.productoFormEditar.get('uid').setValue(this.uid);


      }

    );

  }


  regresarValores() {
   



    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      barcode: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precioVenta: ['', Validators.required],
      presentacion: [null , Validators.required],
      unidad: [null, Validators.required],
      user_uid: [''],
      categoria: [null, Validators.required],
      estaActivado: [false, Validators.required],
      fechaCreacion: [ null],
      uid: [null]
    });

  }
  regresarValoresE() {

    this.productoFormEditar = this.fb.group({
      nombre: ['', Validators.required],
      barcode: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precioVenta: ['', Validators.required],
      presentacion: [null , Validators.required],
      unidad: [null, Validators.required],
      user_uid: [''],
      categoria: [null, Validators.required],
      estaActivado: [false, Validators.required],
      fechaCreacion: [ null],
      uid: [null]
    });

  }

  
  borrar(uid:string) {
    this.articulosService.deleteArticulo(uid)
    .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
    .catch( err => Swal.fire('Borrado', err, 'success'));
  }

}

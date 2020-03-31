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
export class ArticulosComponent implements OnInit ,OnDestroy{


  productoForm: FormGroup;
  productoFormEditar: FormGroup;
  presentacion = ['Bolsa', 'Botella', 'Caja'];
  unidad = ['Kilo', 'Gramo', 'Litro', ];
  categoria = ['categoria 1', 'categoria 2', 'categoria 3', 'categoria 4', 'categoria 5', ];
  fechaHora = new Date();
  uid: string;
  articulos: any;
  articuloSubs: Subscription;
  itemEditado: any;

  numero:any;

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



  constructor(public fb: FormBuilder,
              private articulosService: ArticulosService,
              private autorizacionService: AutorizacionService,
              private store: Store<AppState>,

              ) { }

  ngOnInit() {
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
      nombreE: ['', Validators.required],
      barcodeE: ['', Validators.required],
      descripcionE: ['', Validators.required],
      cantidadE: ['', Validators.required],
      precioCompraE: ['', Validators.required],
      precioVentaE: ['', Validators.required],
      presentacionE: [null , Validators.required],
      unidadE: [null, Validators.required],
      user_uidE: [''],
      categoriaE: [null, Validators.required],
      estaActivadoE: [false, Validators.required],
      fechaCreacionE: [ null],
      uidE: [null]
    });

    
  }
  ngOnDestroy() {
    this.articuloSubs.unsubscribe();
  }

  guardar() {

    if (this.productoForm.invalid) { return; }

    const usuario_uid = this.autorizacionService.user.uid;
    this.productoForm.get('user_uid').setValue(usuario_uid);
    this.productoForm.get('fechaCreacion').setValue(this.fechaHora.toLocaleString('es-MX'));

    //console.log( this.productoForm.value);

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

  mandarvalores(numero) {

   // console.log(numero);

    this.articulosService.articulosListenerEditar(numero)
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


      this.productoFormEditar.get('nombreE').setValue(this.nombreE);
      this.productoFormEditar.get('barcodeE').setValue(this.barcodeE);
      this.productoFormEditar.get('descripcionE').setValue(this.descripcionE);
      this.productoFormEditar.get('cantidadE').setValue(this.cantidadE);
      this.productoFormEditar.get('precioCompraE').setValue(this.precioCompraE);
      this.productoFormEditar.get('precioVentaE').setValue(this.precioVentaE);
      this.productoFormEditar.get('presentacionE').setValue(this.presentacionE);
      this.productoFormEditar.get('unidadE').setValue(this.unidadE);
      this.productoFormEditar.get('fechaCreacionE').setValue(this.fechaHora.toLocaleString('es-MX'));
      this.productoFormEditar.get('categoriaE').setValue(this.categoriaE);
      this.productoFormEditar.get('estaActivadoE').setValue(this.estaActivadoE);
      this.productoFormEditar.get('uidE').setValue(this.uid);

      }

    );

  }

  editar() {
    console.log( this.productoFormEditar.value);

 
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
  borrar(uid:string) {
    this.articulosService.deleteArticulo(uid)
    .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
    .catch( err => Swal.fire('Borrado', err, 'success'));
  }

}

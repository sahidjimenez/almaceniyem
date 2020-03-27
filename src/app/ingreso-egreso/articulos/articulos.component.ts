import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Articulo } from '../../modelos/producto.model';
import { ArticulosService } from './articulos.service';

import { AutorizacionService } from '../../autorizacion/autorizacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {


  productoForm: FormGroup;
  presentacion = ['Bolsa', 'Botella', 'Caja'];
  unidad = ['Kilo', 'Gramo', 'Litro', ];
  categoria = ['categoria 1', 'categoria 2', 'categoria 3', 'categoria 4', 'categoria 5', ];
  fechaHora = new Date();
  uid: string;

  constructor(public fb: FormBuilder,
              private articulosService: ArticulosService,
              private autorizacionService: AutorizacionService

              ) { }

  ngOnInit() {



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

  guardar() {

    if (this.productoForm.invalid) { return; }

    const usuario_uid = this.autorizacionService.user.nombre;
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

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-primario',
  templateUrl: './primario.component.html',
  styleUrls: ['./primario.component.css']
})
export class PrimarioComponent implements OnInit {


  buscarForm: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {

    this.buscarForm = this.fb.group({
      nombre: ['', Validators.required],
      barcode: ['', Validators],
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

  buscar () {

  }
  algo() {
    console.log('hola');
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ControlValueAccessor } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ArticulosService } from '../articulos/articulos.service';
import { Subscription } from 'rxjs';
import { Articulo } from 'src/app/modelos/producto.model';

@Component({
  selector: 'app-primario',
  templateUrl: './primario.component.html',
  styleUrls: ['./primario.component.css']
})
export class PrimarioComponent implements OnInit {


  buscarForm: FormGroup;
  actividadForm: FormGroup;
  articulos: any = [];
  articuloSubs: Subscription;
  Default =  'escoger';
  items: FormArray;
  nombreArticulo: string;





  countries = ['USA', 'Canada', 'Uk']

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private articulosService: ArticulosService

              ) { }

  ngOnInit() {


    this.articuloSubs = this.store.select('ingresosEgreso')
    .subscribe( articulos => {
      this.articulos = articulos.items;

    });

   // console.log(this.articulos);

    this.buscarForm = this.fb.group({
      seleccionarArticulo: [null, Validators.required],
      uid: [null]
    });
    
    this.actividadForm = this.fb.group({
      nombre: [ '' , Validators.required],
      user_uid: [''],
      lugar: [null],
      articulos: this.fb.array([]),
    });

  }

  // Se crea un array con los valores que enviamos
  createItem(nombre: string, cantidad: number) {
    return this.fb.group({
      nombreArticulo: [nombre],
      cantidad: [cantidad]
    });
  }

  get articuloListArray() {
    return <FormArray>this.actividadForm.get('articulos');
  }

get articulosArray(): FormArray {

  return this.actividadForm.get('articulos') as FormArray;
}

  addItem(nombre: string, cantidad: number, uid: string) {

    console.log(nombre, cantidad,uid);

    this.items = this.actividadForm.get('articulos') as FormArray;
    this.items.push(this.createItem(nombre, cantidad));

  }

  guardar( ) {

    console.log( this.actividadForm.value);
  }


  eliminarItem(id){
    this.articuloListArray.removeAt(id);

  }


}

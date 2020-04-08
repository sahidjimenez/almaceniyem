import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  buscarForm: FormGroup;

  constructor( public fb: FormBuilder,
               private store: Store<AppState> ) { }


  ngOnInit() {

    this.buscarForm = this.fb.group({
      buscar: ['', Validators.required]
    });

  }




  buscar () {
    console.log(this.buscarForm.value);

  }
}

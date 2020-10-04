
import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  miform: FormGroup;

  constructor(private formBuilder: FormBuilder, private heroService:HeroesService) {
    this.crearForm();
  }

  ngOnInit(): void {
  }


  //Método para la creación del formulario
  crearForm() {
    this.miform = this.formBuilder.group({
      id: [{value: '', disabled: true},],
      nombre: [''],
      poder: [''],
      vivo: [true]
    });
  }

  //Método para guardar la info al server
  guardarInfo() {
    //Comprobar que la información del form es válida o no
    if (this.miform.invalid) {
      console.log('Formulario no valido');
      return;
    }
    //Si es válida entonces: obtengo la data del mismo
    const heroe = this.miform.value;

    if(heroe.id){
    //Realizo el posteo para actualizar, mediante el uso de un servicio
    this.heroService.actualizarHeroe(heroe).subscribe((resp:any)=>{
      console.log(resp);
      this.miform.setValue(resp);
    })
    }else{
    //Realizo el posteo para guardar, mediante el uso de un servicio
    this.heroService.crearHeroe(heroe).subscribe((resp:any)=>{
      console.log(resp);
      this.miform.setValue(resp);
    })
    }
  }

  //Método para ocultar y mostrar el boton de vivo o muerto
  updateEstado() {
    let valorActual = this.miform.get('vivo').value;
    this.miform.get('vivo').setValue(!valorActual);
  }

  //Getters para realizar las validaciones de los campos
  get nombreNoValido() { return (this.miform.get('nombre').invalid && this.miform.get('nombre').touched); }
  get poderNoValido() { return (this.miform.get('poder').invalid && this.miform.get('poder').touched); }
}

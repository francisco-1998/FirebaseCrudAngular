
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  miform: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private heroService:HeroesService,
              private route:ActivatedRoute) {
    this.crearForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id != 'nuevo'){
      this.heroService.obtenerUnHeroe(id).subscribe((resp:any)=>{
        this.miform.setValue({
          id: id,
          nombre:resp.nombre,
          poder:resp.poder,
          vivo:resp.vivo,
        });
      })
    }
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

    Swal.fire({
      title: 'Espere',
      titleText: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();


    let peticion: Observable<any>;

    //Si es válida entonces: obtengo la data del mismo
    const heroe = this.miform.value;

    if(heroe.id){
    //Realizo el posteo para actualizar, mediante el uso de un servicio
      peticion = this.heroService.actualizarHeroe(heroe);
    }else{
    //Realizo el posteo para guardar, mediante el uso de un servicio
      peticion= this.heroService.crearHeroe(heroe);
    }

    peticion.subscribe(resp=>{
      Swal.fire({
        title: 'Excelente',
        titleText: 'Información almacenada correctamente',
        icon: 'success',
      })
      this.miform.setValue(resp);
    })
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

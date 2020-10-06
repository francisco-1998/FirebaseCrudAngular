import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:any[]=[]

  constructor( private hero:HeroesService) { }

  ngOnInit(): void {
    this.hero.obtenerHeroes().subscribe((data)=>{
      // console.log(data);
      this.heroes=data;
    })

  }

  borrarHeroe(heroe:any, i:number){

    Swal.fire({
      title: '¿Estaá seguro?',
      titleText: `Está seguro que desea borrar a ${heroe.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp=>{
      if(resp.value){
        this.heroes.splice(i,1);
        this.hero.borrarUnHeroe(heroe.id).subscribe();
      }
    })
  }

}

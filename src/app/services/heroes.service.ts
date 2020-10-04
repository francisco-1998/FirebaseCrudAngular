import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-39b81.firebaseio.com'
  constructor(private http:HttpClient) { }

  crearHeroe(heroe){
    return this.http.post(`${this.url}/heroes.json`,heroe).pipe(
      map((resp:any)=>{
        heroe.id=resp.name;
        return heroe;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-39b81.firebaseio.com'
  constructor(private http: HttpClient) { }

  crearHeroe(heroe) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe,id) {
    const heroeTemp = {
      id: id,
      nombre: heroe.nombre,
      poder: heroe.poder,
      vivo: heroe.vivo
    }
    return this.http.put(`${this.url}/heroes/${id}.json`, heroeTemp)
  }

  obtenerHeroes() {
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map((resp) => { return this.hacerUnObjetoArreglo(resp); })
    );
  }

  obtenerUnHeroe( id:string ){
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  borrarUnHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }

  hacerUnObjetoArreglo(miObjeto: object) {
    //Creo un arreglo vacio para almacenar la transformacion
    const arreglo: any[] = [];

    //Valido que el arreglo que se envia no sea null
    if (miObjeto === null) { return []; }

    //Recorro el objeto recibido usando JS y al mismo tiempo voy tranformando cada objeto en un arreglo
    Object.keys(miObjeto).forEach(key => {//Key en este caso hace referencia a la llave que identifica cada objeto dentro del arreglo recibido en este caso ID
      const valor = miObjeto[key];//Guardo la data que se encuentra en la posicion de key
      valor.id = key; //Finalmente asigno el ID

      //Una vez obtenida la informacion del objeto en dicha iteracion la agrego a la variable arreglo que cree al inicio
      arreglo.push(valor);
    })

    //Finalmente retorno la data transformada
    return arreglo;

  }
}

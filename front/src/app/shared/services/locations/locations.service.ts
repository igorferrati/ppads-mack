// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class LocationsService {
//   private readonly apiUrl: string = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   /**
//    * Faz a requisição de todas as localizações com limite de 20 por página
//    * @param page
//    * @returns
//    */

//   public getAllLocations(page: number = 1): Observable<any> {
//     const url = `${this.apiUrl}/location/?page=${page}`;
//     return this.http.get<any>(url);
//   }

//   /**
//    * Faz a requisição de uma localização por Id
//    * @param id
//    * @returns
//    */
//   public getLocationById(id: number): Observable<Location> {
//     const url = `${this.apiUrl}/location/${id}`;
//     return this.http.get<Location>(url);
//   }

//   /**
//    * Faz a requisição de um intervalo de localizações
//    * @param start
//    * @param end
//    * @returns
//    */
//   public getLocationsRange(start: number, end: number): Observable<Location[]> {
//     const rangeArray = this.generateRangeArray(start, end);
//     const url = `${this.apiUrl}/location/${rangeArray.join(',')}`;
//     return this.http.get<Location[]>(url);
//   }

//   /**
//    * Retorna um intervalo de localizações, a função anonima serve para iteração
//    * @param start
//    * @param end
//    * @returns
//    */
//   private generateRangeArray(start: number, end: number): number[] {
//     return Array.from({ length: end - start + 1 }, (_, index) => start + index);
//   }
// }

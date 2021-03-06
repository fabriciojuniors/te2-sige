import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parceiro } from '../models/parceiro';

@Injectable({
  providedIn: 'root'
})
export class ParceirosService {

  constructor(private httpClient: HttpClient) { }

  save(parceiro : Parceiro): Observable<Parceiro>{
    if(parceiro.id){
      return this.httpClient.put<Parceiro>(`${environment.apiUrl}parceiro/${parceiro.id}`, parceiro);
    }
    return this.httpClient.post<Parceiro>(`${environment.apiUrl}parceiro`, parceiro);
  }

  findById(id : string): Observable<Parceiro>{
    return this.httpClient.get<Parceiro>(`${environment.apiUrl}parceiro/${id}`);
  }

  findAll(): Observable<Parceiro[]>{
    return this.httpClient.get<Parceiro[]>(`${environment.apiUrl}parceiro`);
  }

  delete(id : number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}parceiro/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private httpClient: HttpClient) { }

  save(Evento : Evento): Observable<Evento>{
    if(Evento.id){
      return this.httpClient.put<Evento>(`${environment.apiUrl}eventos/${Evento.id}`, Evento);
    }
    return this.httpClient.post<Evento>(`${environment.apiUrl}eventos`, Evento);
  }

  findById(id : string): Observable<Evento>{
    return this.httpClient.get<Evento>(`${environment.apiUrl}eventos/${id}`);
  }

  findAll(): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(`${environment.apiUrl}eventos`);
  }

  delete(id : number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}eventos/${id}`);
  }
}

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
      return this.httpClient.put<Evento>(`${environment.apiUrl}evento/${Evento.id}`, Evento);
    }
    return this.httpClient.post<Evento>(`${environment.apiUrl}evento`, Evento);
  }

  findById(id : string): Observable<Evento>{
    return this.httpClient.get<Evento>(`${environment.apiUrl}evento/${id}`);
  }

  findAll(): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(`${environment.apiUrl}evento`);
  }

  delete(id : number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}evento/${id}`);
  }
}

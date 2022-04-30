import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root'
})
export class LocaisService {

  constructor(private httpClient : HttpClient) { }

  save(local : Local): Observable<Local>{
    if(local.id){
      return this.httpClient.put<Local>(`${environment.apiUrl}locais/${local.id}`, local);
    }
    return this.httpClient.post<Local>(`${environment.apiUrl}locais`, local);
  }

  findById(id : string): Observable<Local>{
    return this.httpClient.get<Local>(`${environment.apiUrl}locais/${id}`);
  }

  findAll(): Observable<Local[]>{
    return this.httpClient.get<Local[]>(`${environment.apiUrl}locais`);
  }

  delete(id : number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.apiUrl}locais/${id}`);
  }
}

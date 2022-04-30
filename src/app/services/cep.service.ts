import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cep } from '../models/cep';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private httpClient: HttpClient) { }

  find(cep: string): Observable<Cep>{
    return this.httpClient.get<Cep>(`${environment.apiUrlCep}${cep}/json/`);
  }
}

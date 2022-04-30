import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {

  constructor(private httpClient: HttpClient) { }

  getCnpj(cnpj: string):Observable<any> {
    let url = `${environment.apiUrlCnpj}${cnpj}?callback=JSONP_CALLBACK`;

    return this.httpClient.jsonp(url, 'JSONP_CALLBACK');
  }

}

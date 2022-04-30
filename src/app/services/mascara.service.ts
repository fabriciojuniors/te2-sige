import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MascaraService {

  constructor() { }

  formataTelefone(tel: string) {
    if (tel) {
      tel = tel.replace(/\D/g, "");
      tel = tel.replace(/^(\d{2})(\d)/g, "($1) $2");
      tel = tel.replace(/(\d)(\d{4})$/, "$1-$2");
      return tel;
    }
  }

  formataCep(cep: string) {
    if (cep) {
      cep = cep.replace(/\D/g, "");
      cep = cep.replace(/(\d{5})(\d)/, "$1-$2");  
      return cep;
    }
  }

  formataCnpj(cnpj) {
    if (cnpj) {
      cnpj = cnpj.replace(/\D/g, "");
      cnpj = cnpj.replace(/^(\d{2})(\d)/g, "$1.$2");
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
      cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
      return cnpj;
    }
  }
}

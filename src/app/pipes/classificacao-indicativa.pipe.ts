import { Pipe, PipeTransform } from '@angular/core';
import { ClassificacaoIndicativa } from '../models/evento';

@Pipe({
  name: 'classificacaoIndicativa'
})
export class ClassificacaoIndicativaPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case "LIVRE": return 'Livre';
      case "DEZ": return 'Dez anos';
      case "DOZE": return 'Doze anos';
      case "QUATORZE": return 'Quatorze anos';
      case "DEZESSEIS": return 'Dezesseis anos';
      case "DEZOITO": return 'Dezoito anos';
    }
  }

}

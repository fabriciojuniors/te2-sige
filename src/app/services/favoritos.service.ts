import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Evento } from '../models/evento';
import { EventosFavoritosPage } from '../pages/modals/eventos-favoritos/eventos-favoritos.page';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private modalCtrl: ModalController) { }

  async openFavoritos(){
    const modal = await this.modalCtrl.create({
      component: EventosFavoritosPage,
      swipeToClose: true,
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.5, 0.8]
    })

    await modal.present();
  }

  getFavoritos(){
    let favoritos = localStorage.getItem('favoritos');
    if(favoritos){
      return JSON.parse(favoritos);
    }
    return [];
  }

  setFavoritos(favoritos: Evento[]){
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }

  removeFavorito(evento: Evento){
    let favoritos = this.getFavoritos();
    favoritos = favoritos.filter(f => f.id != evento.id);
    this.setFavoritos(favoritos);
  }

  addFavorito(evento: Evento){    
    let favoritos = this.getFavoritos();

    if(favoritos.find(f => f.id == evento.id)){
      this.removeFavorito(evento);
    }else{
      favoritos.push(evento);
      this.setFavoritos(favoritos);
    }
  }
}

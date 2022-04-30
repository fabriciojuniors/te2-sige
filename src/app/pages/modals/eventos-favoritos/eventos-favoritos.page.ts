import { Component, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Evento } from 'src/app/models/evento';
import { FavoritosService } from 'src/app/services/favoritos.service';

@Component({
  selector: 'app-eventos-favoritos',
  templateUrl: './eventos-favoritos.page.html',
  styleUrls: ['./eventos-favoritos.page.scss'],
})
export class EventosFavoritosPage implements OnInit, ViewWillEnter {

  favoritos: Evento[] = [];

  constructor(private favoritosService: FavoritosService,
              private modalCtrl: ModalController) { }

  ionViewWillEnter(): void {
    this.findAll();
  }

  ngOnInit() {
  }

  findAll() {
    this.favoritos = this.favoritosService.getFavoritos();
  }

  close(){
    this.modalCtrl.dismiss();
  }

  removeFavorito(evento: Evento) {
    this.favoritosService.removeFavorito(evento);
    this.findAll();
  }

}

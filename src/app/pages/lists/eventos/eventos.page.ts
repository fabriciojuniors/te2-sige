import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Evento } from 'src/app/models/evento';
import { Local } from 'src/app/models/local';
import { Parceiro } from 'src/app/models/parceiro';
import { CarregamentoService } from 'src/app/services/carregamento.service';
import { EventosService } from 'src/app/services/eventos.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { LocaisService } from 'src/app/services/locais.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ParceirosService } from 'src/app/services/parceiros.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit, ViewWillEnter {

  eventos: Evento[] = [];
  locais: Local[] = [];
  parceiros: Parceiro[] = [];
  favoritos: Evento[] = [];

  constructor(public favoritosService: FavoritosService,
    private eventoService: EventosService,
    private localService: LocaisService,
    private parceiroService: ParceirosService,
    private carregamento: CarregamentoService,
    private mensagem: MensagemService) { }

  ionViewWillEnter(): void {
    this.getLocais();
    this.getParceiros();
    this.getFavoritos();
    this.findAll();
  }

  ngOnInit() {
  }

  async doRefresh(event) {
    await this.findAll();
    event.target.complete();
  }

  async findAll() {
    this.carregamento.showLoading();
    await this.eventoService.findAll().subscribe(
      (eventos) => {
        this.eventos = eventos;
        this.carregamento.dismiss();
      },
      () => {
        this.carregamento.dismiss();
        this.mensagem.showToast('Erro ao buscar eventos!', 'danger', () => { this.findAll() }, true);
      }
    );
  }

  excluir(evento: Evento) {
    this.mensagem.showAlert('Atenção', 'Deseja excluir o evento?', () => {
      this.carregamento.showLoading("Excluindo evento...");
      this.eventoService.delete(evento.id).subscribe(
        () => {
          this.mensagem.showToast('Evento excluído com sucesso!', 'success', () => { }, false);
          this.findAll();
          this.carregamento.dismiss();
        },
        () => {
          this.mensagem.showToast('Erro ao excluir evento!', 'danger');
          this.carregamento.dismiss();
        }
      );
    }, () => { });
  }

  getLocais() {
    this.localService.findAll().subscribe(
      (local) => {
        this.locais = local;
      },
      () => {
        this.mensagem.showToast('Erro ao salvar local!', 'danger', () => { this.getLocais() }, true);
      }
    );
  }

  getParceiros() {
    this.parceiroService.findAll().subscribe(
      (parceiro) => {
        this.parceiros = parceiro;
      },
      () => {
        this.mensagem.showToast('Erro ao salvar parceiro!', 'danger', () => { this.getParceiros() }, true);
      }
    );
  }

  getLocalEvento(id): Local {
    return this.locais.find(local => local.id == id);
  }

  getParceiroEvento(id): Parceiro {
    return this.parceiros.find(parceiro => parceiro.id == id);
  }

  addFavorito(evento: Evento) {
    this.favoritosService.addFavorito(evento);
    this.getFavoritos();
    this.findAll()
  }

  getFavoritos() {
    this.favoritos = this.favoritosService.getFavoritos();
  }

  isFavorito(evento) {
    return this.favoritos.find((favorito) => favorito.id == evento.id) != null;
  }

}

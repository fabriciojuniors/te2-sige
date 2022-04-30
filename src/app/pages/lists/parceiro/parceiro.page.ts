import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Parceiro } from 'src/app/models/parceiro';
import { CarregamentoService } from 'src/app/services/carregamento.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ParceirosService } from 'src/app/services/parceiros.service';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.page.html',
  styleUrls: ['./parceiro.page.scss'],
})
export class ParceiroPage implements OnInit, ViewWillEnter {

  parceiros: Parceiro[] = [];
  isLoading: boolean = false;

  constructor(private parceirosService: ParceirosService,
              private router: Router,
              private carregamento: CarregamentoService,
              private mensagem: MensagemService,
              public favoritosService: FavoritosService) { }

  ionViewWillEnter(): void {
    this.findAll();
  }
  ngOnInit() {
  }

  async findAll() {
    this.carregamento.showLoading();
    await this.parceirosService.findAll().subscribe(
      (parceiros) => {
        this.parceiros = parceiros;
        this.carregamento.dismiss();
        this.isLoading = false;
      },
      () => {
        this.carregamento.dismiss();
        this.isLoading = false;
        this.mensagem.showToast('Erro ao buscar parceiros!', 'danger', () => {this.findAll()}, true);
      }
    );
  }

  editar(parceiro: Parceiro) {
    this.router.navigateByUrl(`register/parceiro/${parceiro.id}`);
  }

  excluir(parceiro: Parceiro) {
    this.mensagem.showAlert('Atenção', 'Deseja excluir o parceiro?', () => {
      this.carregamento.showLoading("Excluindo parceiro...");
      this.parceirosService.delete(parceiro.id).subscribe(
        () => {
          this.mensagem.showToast('Parceiro excluído com sucesso!', 'success', () => { }, false);
          this.findAll();
          this.carregamento.dismiss();
          this.isLoading = false;
        },
        () => {
          this.mensagem.showToast('Erro ao parceiro local!', 'danger');
          this.carregamento.dismiss();
          this.isLoading = false;
        }
      );
    }, () => { });
  }

  async doRefresh(event) {
    await this.findAll();
    event.target.complete();
  }

}

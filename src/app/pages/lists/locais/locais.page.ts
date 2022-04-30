import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRefresher, LoadingController, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Local } from 'src/app/models/local';
import { CarregamentoService } from 'src/app/services/carregamento.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { LocaisService } from 'src/app/services/locais.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { EventosFavoritosPage } from '../../modals/eventos-favoritos/eventos-favoritos.page';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.page.html',
  styleUrls: ['./locais.page.scss'],
})
export class LocaisPage implements OnInit, ViewWillEnter {

  locais: Local[] = [];
  isLoading: boolean = false;

  constructor(private locaisService: LocaisService,
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
    await this.locaisService.findAll().subscribe(
      (locais) => {
        this.locais = locais;
        this.carregamento.dismiss();
        this.isLoading = false;
      },
      () => {
        this.carregamento.dismiss();
        this.isLoading = false;
        this.mensagem.showToast('Erro ao buscar locais!', 'danger', () => {this.findAll()}, true);
      }
    );
  }

  editar(local: Local) {
    this.router.navigateByUrl(`register/locais/${local.id}`);
  }

  excluir(local: Local) {
    this.mensagem.showAlert('Atenção', 'Deseja excluir o local?', () => {
      this.carregamento.showLoading("Excluindo local...");
      this.locaisService.delete(local.id).subscribe(
        () => {
          this.mensagem.showToast('Local excluído com sucesso!', 'success', () => { }, false);
          this.findAll();
          this.carregamento.dismiss();
          this.isLoading = false;
        },
        () => {
          this.mensagem.showToast('Erro ao excluir local!', 'danger');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { zhCN } from 'date-fns/locale';
import { ClassificacaoIndicativa } from 'src/app/models/evento';
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

  cadastro: FormGroup;
  hoje = new Date();
  locais:Local[] = [];
  parceiros:Parceiro[] = [];

  constructor(public favoritosService: FavoritosService,
              private formBuilder: FormBuilder, 
              private localService: LocaisService,
              private parceiroService: ParceirosService,
              private eventoService: EventosService,
              private mensagem: MensagemService,
              private carregamento: CarregamentoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ionViewWillEnter(): void {
    this.getLocais();
    this.getParceiros();

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.carregamento.showLoading()
      this.eventoService.findById(id).subscribe(
        (evento) => {          
          this.cadastro.patchValue(evento);
          setTimeout(() => {
            this.carregamento.dismiss();
          }, 100);
        },
        (error) => {
          this.mensagem.showToast(`Erro ao buscar evento com id ${id}!`, 'danger');
          this.carregamento.dismiss();
        }
      );
      
    }
  }

  ngOnInit() {

    this.cadastro = this.formBuilder.group({
      ['id']: [''],
      ['nome']: ['', [Validators.required, Validators.minLength(3)]],
      ['descricao']: ['', [Validators.required, Validators.minLength(3)]],
      ['data_hora']: ['', [Validators.required]],
      ['local']: ['', [Validators.required]],
      ['parceiro']: ['', [Validators.required]],
      ['status']: ['', [Validators.required]],
      ['classificacao']: ['', [Validators.required]],
      ['imagem']: ['', []]
    });

  }  

  getLocais(){
    this.localService.findAll().subscribe(
      (local) => {
        this.locais = local;      
      },
      () => {
        this.mensagem.showToast('Erro ao salvar local!', 'danger', () => { this.getLocais() }, true);
      }
    );
  }

  getParceiros(){
    this.parceiroService.findAll().subscribe(
      (parceiro) => {
        this.parceiros = parceiro;      
      },
      () => {
        this.mensagem.showToast('Erro ao salvar parceiro!', 'danger', () => { this.getParceiros() }, true);
      }
    );
  }

  limpar() {
    this.mensagem.showAlert('Atenção', 'Deseja limpar os dados?', () => {
      this.cadastro.reset();
    }, () => { });
  }

  salvar() {
    this.carregamento.showLoading("Salvando dados...");
    if (this.cadastro.valid) {
      this.eventoService.save(this.cadastro.value).subscribe(
        (evento) => {
          this.mensagem.showToast('Evento salvo com sucesso!');
          this.cadastro.reset();
          this.carregamento.dismiss();
          this.router.navigateByUrl("/list/eventos");
        },
        (error) => {
          this.mensagem.showToast('Erro ao salvar evento!', 'danger', () => { this.salvar() }, true);
          this.carregamento.dismiss();
        }
      );
    } else {
      this.mensagem.showToast('Preencha os campos obrigatórios!');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, ViewWillEnter } from '@ionic/angular';
import { CarregamentoService } from 'src/app/services/carregamento.service';
import { CepService } from 'src/app/services/cep.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { LocaisService } from 'src/app/services/locais.service';
import { MascaraService } from 'src/app/services/mascara.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.page.html',
  styleUrls: ['./locais.page.scss'],
})
export class LocaisPage implements OnInit, ViewWillEnter {

  cadastro: FormGroup;
  buscarCep = false;

  customActionSheetOptions: any = {
    header: 'Selecione o estado'
  };

  constructor(private formBuild: FormBuilder,
    private locaisService: LocaisService,
    private activatedRoute: ActivatedRoute,
    private cepService: CepService,
    private carregamento: CarregamentoService,
    private mensagem: MensagemService,
    private mascara: MascaraService,
    private router: Router,
    public favoritosService: FavoritosService) { }

  ionViewWillEnter(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.carregamento.showLoading()
      this.locaisService.findById(id).subscribe(
        (local) => {
          this.carregamento.dismiss();
          this.cadastro.patchValue(local);
          setTimeout(() => {
            this.buscarCep = true;
          }, 100);
        },
        (error) => {
          this.mensagem.showToast(`Erro ao buscar local com id ${id}!`, 'danger');
          this.carregamento.dismiss();
          this.buscarCep = true;
        }
      );
      
    }else{
      this.buscarCep = true;
    }
    
  }

  ngOnInit() {
    this.cadastro = this.formBuild.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      capacidade: ['', [Validators.required, Validators.min(1)]],
      telefone: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      foto: [''],
      endereco: this.formBuild.group({
        id: [''],
        logradouro: ['', [Validators.required, Validators.minLength(3)]],
        numero: [''],
        complemento: [''],
        bairro: ['', [Validators.required, Validators.minLength(3)]],
        cidade: ['', [Validators.required, Validators.minLength(3)]],
        estado: ['', [Validators.required, Validators.minLength(2)]],
        cep: ['', [Validators.required, Validators.minLength(8)]]
      })
    });
  }

  limpar() {
    this.mensagem.showAlert('Atenção', 'Deseja limpar os dados?', () => {
      this.cadastro.reset();
    }, () => { });
  }

  salvar() {
    this.carregamento.showLoading("Salvando dados...");
    if (this.cadastro.valid) {
      this.locaisService.save(this.cadastro.value).subscribe(
        (local) => {
          this.mensagem.showToast('Local salvo com sucesso!');
          this.cadastro.reset();
          this.carregamento.dismiss();
          this.router.navigateByUrl("/list/locais");
        },
        (error) => {
          this.mensagem.showToast('Erro ao salvar local!', 'danger', () => { this.salvar() }, true);
          this.carregamento.dismiss();
        }
      );
    } else {
      this.mensagem.showToast('Preencha os campos obrigatórios!');
    }
  }

  buscaEndereco() {
    let cep = this.cadastro.get('endereco.cep').value;
    if (cep && this.buscarCep) {
      cep = cep.replace(/\D/g, "");
      this.carregamento.showLoading("Buscando endereço...");
      this.cepService.find(cep).subscribe(
        (data) => {
          this.cadastro.get('endereco.logradouro').setValue(data.logradouro);
          this.cadastro.get('endereco.bairro').setValue(data.bairro);
          this.cadastro.get('endereco.cidade').setValue(data.localidade);
          this.cadastro.get('endereco.estado').setValue(data.uf);
          setTimeout(() => {
            this.carregamento.dismiss();
          }, 100);
        },
        () => {
          this.mensagem.showToast('CEP não encontrado!', 'danger');
          this.carregamento.dismiss();
        }
      );
    }
  }

  formataTelefone() {
    let tel = this.cadastro.get('telefone').value;
    this.cadastro.get('telefone').setValue(this.mascara.formataTelefone(tel));
  }

  formataCep() {
    let cep = this.cadastro.get('endereco.cep').value;
    if (cep) {
      cep = this.mascara.formataCep(cep);
      if (cep.length == 9) {
        this.buscaEndereco();
      }
      this.cadastro.get('endereco.cep').setValue(cep);
    }
  }

}

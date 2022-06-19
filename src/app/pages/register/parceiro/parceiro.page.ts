import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CarregamentoService } from 'src/app/services/carregamento.service';
import { CepService } from 'src/app/services/cep.service';
import { CnpjService } from 'src/app/services/cnpj.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { MascaraService } from 'src/app/services/mascara.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ParceirosService } from 'src/app/services/parceiros.service';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.page.html',
  styleUrls: ['./parceiro.page.scss'],
})
export class ParceiroPage implements OnInit {

  cadastro: FormGroup;
  buscarCnpj = false;
  buscarCep = false;

  constructor(private formBuild: FormBuilder,
    private mensagem: MensagemService,
    private carregamento: CarregamentoService,
    private mascara: MascaraService,
    private parceirosService: ParceirosService,
    private cepService: CepService,
    private cnpjService: CnpjService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public favoritosService: FavoritosService) { }

  ngOnInit() {
    this.cadastro = this.formBuild.group({
      ['id']: ['0'],
      ['nomeFantasia']: ['', [Validators.required, Validators.minLength(3)]],
      ['razaoSocial']: ['', [Validators.required, Validators.minLength(3)]],
      ['cnpj']: ['', [Validators.required, Validators.minLength(18)]],
      ['telefone']: ['', [Validators.required, Validators.minLength(8)]],
      ['email']: ['', [Validators.required, Validators.email]],
      ['endereco']: this.formBuild.group({
        ['id']: ['0'],
        ['logradouro']: ['', [Validators.required, Validators.minLength(3)]],
        ['numero']: ['0'],
        ['complemento']: [''],
        ['bairro']: ['', [Validators.required, Validators.minLength(3)]],
        ['cidade']: ['', [Validators.required, Validators.minLength(3)]],
        ['estado']: ['', [Validators.required, Validators.minLength(2)]],
        ['cep']: ['', [Validators.required, Validators.minLength(8)]]
      })
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.carregamento.showLoading()
      this.parceirosService.findById(id).subscribe(local => {
        this.carregamento.dismiss();
        this.cadastro.patchValue(local);
        setTimeout(() => {
          this.buscarCnpj = true;
          this.buscarCep = true;
        }, 500);
      },
        () => {
          this.mensagem.showToast(`Erro ao buscar parceiro com id ${id}!`, 'danger');
          this.carregamento.dismiss();
        });
    } else {
      this.buscarCnpj = true;
      this.buscarCep = true;
    }
  }

  limpar() {
    this.mensagem.showAlert('Atenção', 'Deseja limpar os dados?', () => {
      this.cadastro.reset();
    }, () => { });
  }

  salvar() {
    this.carregamento.showLoading("Salvando dados...");
    if (this.cadastro.valid) {
      this.parceirosService.save(this.cadastro.value).subscribe(() => {
        this.mensagem.showToast('Parceiro salvo com sucesso!');
        this.cadastro.reset();
        setTimeout(() => this.carregamento.dismiss(), 500);
        this.router.navigateByUrl("/list/parceiro");
      },
        (error) => {
          this.mensagem.showToast(` ${error.error.mensagem ?? 'Erro ao salvar parceiro!'} `, 'danger', () => {this.salvar()}, true);
          this.carregamento.dismiss();
        });
    } else {
      this.mensagem.showToast('Preencha os campos obrigatórios!');
    }
  }

  buscaEndereco() {
    let cep = this.cadastro.get('endereco.cep').value;
    if (cep) {
      cep = cep.replace(/\D/g, "");
      this.cepService.find(cep).subscribe(data => {
        this.cadastro.get('endereco.logradouro').setValue(data.logradouro);
        this.cadastro.get('endereco.bairro').setValue(data.bairro);
        this.cadastro.get('endereco.cidade').setValue(data.localidade);
        this.cadastro.get('endereco.estado').setValue(data.uf);
      });
    }
  }

  formataTelefone() {
    let tel = this.cadastro.get('telefone').value;
    this.cadastro.get('telefone').setValue(this.mascara.formataTelefone(tel));
  }

  formataCep() {
    let cep = this.cadastro.get('endereco.cep').value;
    if(cep){
      cep = this.mascara.formataCep(cep);
      if (cep.length == 9 && this.buscarCep) {
        this.buscaEndereco();
      }
      this.cadastro.get('endereco.cep').setValue(cep);
    }
  }

  buscaCnpj(cnpj) {
    if (this.buscarCnpj) {
      this.cnpjService.getCnpj(cnpj).subscribe(data => {
        this.cadastro.get('nomeFantasia').setValue(data.fantasia != "" ? data.fantasia : data.nome);
        this.cadastro.get('razaoSocial').setValue(data.nome);
        this.cadastro.get('telefone').setValue(data.telefone);
        this.cadastro.get('email').setValue(data.email);
        this.cadastro.get('endereco.cep').setValue(data.cep);
      });
    }

  }

  formataCnpj() {
    let cnpj = this.cadastro.get('cnpj').value;
    if (cnpj) {
      cnpj = this.mascara.formataCnpj(cnpj);
      this.cadastro.get('cnpj').setValue(cnpj);

      if (cnpj.length == 18) {
        this.buscaCnpj(cnpj.replace(/\D/g, ""));
      }
    }
  }

}

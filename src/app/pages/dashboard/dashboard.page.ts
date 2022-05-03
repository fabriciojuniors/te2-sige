import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CarregamentoService } from 'src/app/services/carregamento.service';
import { EventosService } from 'src/app/services/eventos.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { LocaisService } from 'src/app/services/locais.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { ParceirosService } from 'src/app/services/parceiros.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  labelParceiros = [];
  labelLocais = [];
  parceiros = [];
  locais = [];
  eventos = [];
  backgroundColorGrafico1 = [];
  borderColorGrafico1 = [];
  dadosGrafico1 = [];
  dadosGrafico2 = [];
  backgroundColorGrafico2 = [];
  borderColorGrafico2 = [];

  //graficos
  grafico1: any;
  grafico2: any;

  constructor(private parceiroService: ParceirosService,
    private locaisService: LocaisService,
    public favoritosService: FavoritosService,
    private eventoService: EventosService,
    private carregamento: CarregamentoService,
    private mensagem: MensagemService) { }

  async ngOnInit() {
    this.carregamento.showLoading("Gerando gráficos");
    await this.getGrafico1();
    await this.getGrafico2();    
  }

  atualizar() {
    this.carregamento.showLoading("Atualizando gráficos");
    this.labelParceiros = [];
    this.labelLocais = [];
    this.backgroundColorGrafico1 = [];
    this.borderColorGrafico1 = [];
    this.backgroundColorGrafico2 = [];
    this.borderColorGrafico2 = [];
    this.grafico1.destroy()
    this.grafico2.destroy()
    this.getGrafico1();
    this.getGrafico2();
  }

  async getGrafico1() {
    this.parceiroService.findAll().subscribe(async response => {
      this.parceiros = response;
      response.forEach(parceiro => {
        this.labelParceiros.push(parceiro.nomeFantasia.split(" ")[0])
        this.getRandomColor(1);
      });
      let dados1 = [];
      this.eventoService.findAll().subscribe(response => {
        this.parceiros.forEach(parceiro => {
          dados1.push(response.filter(evento => evento.parceiro == parceiro.id).length);
        })

        this.dadosGrafico1 = dados1;
        const ctx = <HTMLCanvasElement>document.getElementById('grafico1');
        const chartData = {
          labels: this.labelParceiros,
          datasets: [{
            label: 'Parceiros X Qtd de Eventos',
            data: this.dadosGrafico1,
            backgroundColor: this.backgroundColorGrafico1,
            borderColor: this.borderColorGrafico1,
            borderWidth: 1
          }]
        };

        this.grafico1 = new Chart(ctx.getContext('2d'), {
          type: 'bar',
          data: chartData
        });

      });
    });
  }

  getGrafico2() {
    this.locaisService.findAll().subscribe(response => {
      this.locais = response;
      response.forEach(local => {
        this.labelLocais.push(local.nome)
        this.getRandomColor(2);
      });
      let dados2 = [];
      this.eventoService.findAll().subscribe(response => {
        this.locais.forEach(local => {
          dados2.push(response.filter(evento => evento.local == local.id).length);
        });
        this.dadosGrafico2 = dados2;
        const ctx = <HTMLCanvasElement>document.getElementById('grafico2');
        const chartData = {
          labels: this.labelLocais,
          datasets: [{
            label: 'Locais X Qtd de Eventos',
            data: this.dadosGrafico2,
            backgroundColor: this.backgroundColorGrafico2,
            borderColor: this.borderColorGrafico2,
            borderWidth: 1
          }]
        };

        this.grafico2 = new Chart(ctx.getContext('2d'), {
          type: 'doughnut',
          data: chartData
        });

        this.carregamento.dismiss();
      });
    }, () => { 
      this.carregamento.dismiss();
      this.mensagem.showToast("Erro ao carregar gráficos", "danger");
     });
  }

  getRandomColor(grafico) {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    switch (grafico) {
      case 1:
        this.backgroundColorGrafico1.push('rgba(' + r + ', ' + g + ', ' + b + ', 0.2)');
        this.borderColorGrafico1.push('rgba(' + r + ', ' + g + ', ' + b + ', 1)');
        break;
      case 2:
        this.backgroundColorGrafico2.push('rgba(' + r + ', ' + g + ', ' + b + ', 1)');
        this.borderColorGrafico2.push('rgba(' + r + ', ' + g + ', ' + b + ', 1)');
        break;
    }
  }

}

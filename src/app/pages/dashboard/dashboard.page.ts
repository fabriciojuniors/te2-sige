import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CarregamentoService } from 'src/app/services/carregamento.service';
import { DashboardService } from 'src/app/services/dashboard.service';
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
    public favoritosService: FavoritosService,
    private carregamento: CarregamentoService,
    private dashboard: DashboardService,
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
    this.dashboard.findByParceiro().subscribe(dados => {
      let labels = [];
      this.dadosGrafico1 = []
      dados.forEach(d => {
        this.getRandomColor(1);
        labels.push(d.parceiro);
        this.dadosGrafico1.push(d.quantidade);
      });

      const ctx = <HTMLCanvasElement>document.getElementById('grafico1');
        const chartData = {
          labels: labels,
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

        setTimeout(() => this.carregamento.dismiss(), 500);
    });
  }

  async getGrafico2() {
    this.dashboard.findByLocal().subscribe(dados => {
      let labels = []
      this.dadosGrafico2 = [];
      dados.forEach(d => {
        this.getRandomColor(2);
        labels.push(d.local);
        this.dadosGrafico2.push(d.quantidade);
      });

      const ctx = <HTMLCanvasElement>document.getElementById('grafico2');
      const chartData = {
        labels: labels,
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

      setTimeout(() => this.carregamento.dismiss(), 500);
    });
  }

  // getGrafico2() {
  //   this.locaisService.findAll().subscribe(response => {
  //     this.locais = response;
  //     response.forEach(local => {
  //       this.labelLocais.push(local.nome)
  //       this.getRandomColor(2);
  //     });
  //     let dados2 = [];
  //     this.eventoService.findAll().subscribe(response => {
  //       this.locais.forEach(local => {
  //         dados2.push(response.filter(evento => evento.local == local.id).length);
  //       });
  //       this.dadosGrafico2 = dados2;
  //       const ctx = <HTMLCanvasElement>document.getElementById('grafico2');
  //       const chartData = {
  //         labels: this.labelLocais,
  //         datasets: [{
  //           label: 'Locais X Qtd de Eventos',
  //           data: this.dadosGrafico2,
  //           backgroundColor: this.backgroundColorGrafico2,
  //           borderColor: this.borderColorGrafico2,
  //           borderWidth: 1
  //         }]
  //       };

  //       this.grafico2 = new Chart(ctx.getContext('2d'), {
  //         type: 'doughnut',
  //         data: chartData
  //       });

  //       this.carregamento.dismiss();
  //     });
  //   }, () => { 
  //     this.carregamento.dismiss();
  //     this.mensagem.showToast("Erro ao carregar gráficos", "danger");
  //    });
  // }

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

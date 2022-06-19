import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarregamentoService {

  constructor(private loadingCtrl: LoadingController) { }

  async showLoading(message: string = 'Buscando dados...') {
    const loading = await this.loadingCtrl.create({
      message: message
    });
    loading.present();
  }

  dismiss() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 500);
  }
}

import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  async showToast(message: string, color: string = 'dark', handler = () => { }, showRetry = false) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      buttons: showRetry ? [
        {
          icon: 'refresh-outline',
          side: 'start',
          handler: () => handler(),
        }
      ] : []
    });
    toast.present();
  }

  async showAlert(header: string, message: string, handleOK, handleCancel) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            handleOK();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            handleCancel();
          }
        }
      ]
    });
    alert.present();
  }

  dismissToast() {
    return this.toastCtrl.dismiss();
  }

  dismissAlert() {
    return this.alertCtrl.dismiss();
  }
}

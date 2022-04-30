import { Component, ViewChild } from '@angular/core';
import { IonAccordionGroup, MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonAccordionGroup) accordionGroup: IonAccordionGroup;

  constructor(private navCtrl: NavController,
              private menuCtrl: MenuController) {}

  acessar(rota: string){
    const url = `/${rota}`;
    this.navCtrl.setDirection('root');
    this.menuCtrl.toggle();
    this.accordionGroup.value = '';
  }
}

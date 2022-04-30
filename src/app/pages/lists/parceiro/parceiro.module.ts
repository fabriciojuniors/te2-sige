import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParceiroPageRoutingModule } from './parceiro-routing.module';

import { ParceiroPage } from './parceiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParceiroPageRoutingModule
  ],
  declarations: [ParceiroPage]
})
export class ParceiroPageModule {}

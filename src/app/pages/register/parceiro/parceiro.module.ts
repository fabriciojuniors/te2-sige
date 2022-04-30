import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParceiroPageRoutingModule } from './parceiro-routing.module';

import { ParceiroPage } from './parceiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ParceiroPageRoutingModule
  ],
  declarations: [ParceiroPage]
})
export class ParceiroPageModule {}

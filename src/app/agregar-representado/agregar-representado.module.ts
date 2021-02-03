import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarRepresentadoPageRoutingModule } from './agregar-representado-routing.module';

import { AgregarRepresentadoPage } from './agregar-representado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarRepresentadoPageRoutingModule
  ],
  declarations: [AgregarRepresentadoPage]
})
export class AgregarRepresentadoPageModule {}

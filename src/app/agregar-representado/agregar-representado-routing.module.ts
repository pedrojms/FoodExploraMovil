import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarRepresentadoPage } from './agregar-representado.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarRepresentadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarRepresentadoPageRoutingModule {}

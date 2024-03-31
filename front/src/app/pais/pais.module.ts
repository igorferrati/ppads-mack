import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisRoutingModule } from './pais-routing.module';
import { PaisComponent } from './pais.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PaisComponent
  ],
  imports: [
    CommonModule,
    PaisRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    PoModule,
    SharedModule,
  ],
  exports: [PaisComponent]
})
export class PaisModule { }

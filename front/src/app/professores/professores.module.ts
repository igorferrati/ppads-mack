import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessoresRoutingModule } from './professores-routing.module';
import { ProfessoresComponent } from './professores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProfessoresComponent],
  imports: [
    CommonModule,
    ProfessoresRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    PoModule,
    SharedModule,
  ],
  exports: [ProfessoresComponent]
})
export class ProfessoresModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PoModule } from '../po/po.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ErrorRoutingModule, SharedModule, PoModule],
  exports: [PageNotFoundComponent],
})
export class ErrorModule {}

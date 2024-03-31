import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '../core/po/po.module';
import { ContainerComponent } from './container/container.component';
import { PoToolbarModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [ContainerComponent],
  imports: [CommonModule, PoModule, PoToolbarModule],
  exports: [ContainerComponent],
})
export class SharedModule {}

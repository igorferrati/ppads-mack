import { NgModule } from '@angular/core';
import { PoLoadingModule, PoPageModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { PoInfoModule } from '@po-ui/ng-components';
import { PoTableModule } from '@po-ui/ng-components';
import { PoAvatarModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoBreadcrumbModule } from '@po-ui/ng-components';

@NgModule({
  exports: [
    PoBreadcrumbModule,
    PoButtonModule,
    PoFieldModule,
    PoAvatarModule,
    PoPageModule,
    PoNotificationModule,
    PoInfoModule,
    PoTableModule,
    PoLoadingModule
  ],
})
export class PoModule {}

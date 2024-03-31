import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PoModule } from '../core/po/po.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoginRoutingModule,
    PoModule,
    SharedModule,
  ],
})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './core/error/error.module';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { ErrorInterceptor } from './core/error/error.interceptor';

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    ErrorModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

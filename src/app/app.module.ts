import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRouting } from './app-routing.module';
import { NotificationService } from './services/notification.service';
import { NotificationModule } from './notification.module';
import { StoreModule } from '@ngrx/store';
import * as AppStore from './store/app.store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './services/auth-store/auth.effects';
import { ProductEffects } from './admin/product-store/product.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    NotificationModule,
    StoreModule.forRoot(AppStore.appReducer),
    EffectsModule.forRoot([AuthEffects,ProductEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

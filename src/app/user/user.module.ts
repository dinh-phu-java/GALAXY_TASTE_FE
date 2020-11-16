import { NgModule } from '@angular/core';
import { UserRouting } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareComponent } from '../shared-component/shared-component.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { CheckoutComponent } from './user-cart/checkout/checkout.component';
import { CartComponent } from './user-cart/cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { HomeModule } from '../home/home.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { SocialLoginComponent } from './social-login/social-login.component';

@NgModule({
    declarations:[
        UserComponent,
        UserLoginComponent,
        UserRegisterComponent,
        UserCartComponent,
        CheckoutComponent,
        CartComponent,
        UserProfileComponent,
        SocialLoginComponent
    ],
    providers:[
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    '451451600267-psdp1uqhca32972vnd2ldsmfg5lt9nep.apps.googleusercontent.com'
                  )
                },
                {
                  id: FacebookLoginProvider.PROVIDER_ID,
                  provider: new FacebookLoginProvider('2400624253571139')
                }
              ]
            } as SocialAuthServiceConfig,
          }
    ],
    imports:[
        UserRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareComponent,
        HomeModule,
        SocialLoginModule
    ],
    exports:[UserComponent]
})

export class UserModule{
}
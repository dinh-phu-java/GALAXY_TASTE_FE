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

@NgModule({
    declarations:[
        UserComponent,
        UserLoginComponent,
        UserRegisterComponent,
        UserCartComponent,
        CheckoutComponent,
        CartComponent
    ],
    imports:[
        UserRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareComponent
    ],
    exports:[UserComponent]
})

export class UserModule{
}
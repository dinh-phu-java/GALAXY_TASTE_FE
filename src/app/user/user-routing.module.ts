import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './user-cart/cart/cart.component';
import { CheckoutComponent } from './user-cart/checkout/checkout.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserComponent } from './user.component';

const userRoutes: Routes = [
    { path: '', redirectTo: '/user/login', pathMatch: 'full' },
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegisterComponent },
    {
        path: 'cart', component: UserCartComponent, children: [
            { path: '', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRouting {
}
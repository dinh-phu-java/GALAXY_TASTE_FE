import { NgModule } from "@angular/core";
import { AdminRouting } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { ShareComponent } from '../shared-component/shared-component.module';
import { ActionComponent } from './action/action.component';
import { StartComponent } from './action/start/start.component';
import { CreateProductComponent } from './action/create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations:[AdminComponent, ActionComponent, StartComponent, CreateProductComponent],
    imports:[AdminRouting,ShareComponent,ReactiveFormsModule,CommonModule],
    exports:[AdminComponent]
})

export class AdminModule{
}


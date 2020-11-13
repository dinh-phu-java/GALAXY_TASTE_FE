import { NgModule } from "@angular/core";
import { AdminRouting } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { ShareComponent } from '../shared-component/shared-component.module';
import { ActionComponent } from './action/action.component';
import { StartComponent } from './action/start/start.component';
import { CreateProductComponent } from './action/create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './action/list-product/list-product.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { EditProductComponent } from './action/edit-product/edit-product.component';

@NgModule({
    declarations:[AdminComponent, ActionComponent, StartComponent, CreateProductComponent, ListProductComponent, EditProductComponent],
    imports:[AdminRouting,
        ShareComponent,
        ReactiveFormsModule,
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        FormsModule
    ],
    exports:[AdminComponent]
})

export class AdminModule{
}


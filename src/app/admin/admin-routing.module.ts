import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from '../services/product.resolver';
import { ActionComponent } from './action/action.component';
import { CreateProductComponent } from './action/create-product/create-product.component';
import { EditProductComponent } from './action/edit-product/edit-product.component';
import { ListProductComponent } from './action/list-product/list-product.component';
import { StartComponent } from './action/start/start.component';
import { AdminGuard } from './admin-guard.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    { path: '', component: AdminComponent },
    {
        path: 'action', component: ActionComponent, canActivateChild: [AdminGuard], children: [
            { path: '', component: StartComponent },
            { path: 'create-product', component: CreateProductComponent },
            { path: 'list-product', component: ListProductComponent },
            { path: 'edit-product/:code', component: EditProductComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRouting { }
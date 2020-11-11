import { NgModule } from '@angular/core';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { WeeklyFeatureComponent } from './weekly-feature/weekly-feature.component';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { FeatureComponent } from './feature/feature.component';
import { SuggestComponent } from './suggest/suggest.component';
import { LoginComponent } from './login/login.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';


@NgModule({
    declarations:[
        HomeCarouselComponent, 
        WeeklyFeatureComponent, 
        BestSellingProductComponent, 
        FeatureComponent, SuggestComponent, LoginComponent,AdminNavbarComponent,AdminSidebarComponent,AdminFooterComponent
    ],
    imports:[
        ReactiveFormsModule,
        CommonModule,
        RouterModule
        
    ],
    
    exports:[
        HomeCarouselComponent,
        WeeklyFeatureComponent,
        BestSellingProductComponent,
        FeatureComponent,
        SuggestComponent,
        LoginComponent,AdminNavbarComponent,AdminSidebarComponent,AdminFooterComponent
    ]
})
export class ShareComponent{
}
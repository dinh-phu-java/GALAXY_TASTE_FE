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


// const notifierCustomOptions: NotifierOptions = {
//     position: {
//         horizontal: {
//             position: "left",
//             distance: 12
//         },
//         vertical: {
//             position: "bottom",
//             distance: 12,
//             gap: 10
//         }
//     },
//     theme: "material",
//     behaviour: {
//         autoHide: 5000,
//         onClick: false,
//         onMouseover: "pauseAutoHide",
//         showDismissButton: true,
//         stacking: 4
//     },
//     animations: {
//         enabled: true,
//         show: {
//             preset: "slide",
//             speed: 300,
//             easing: "ease"
//         },
//         hide: {
//             preset: "fade",
//             speed: 300,
//             easing: "ease",
//             offset: 50
//         },
//         shift: {
//             speed: 300,
//             easing: "ease"
//         },
//         overlap: 150
//     }
//   };

@NgModule({
    declarations:[
        HomeCarouselComponent, 
        WeeklyFeatureComponent, 
        BestSellingProductComponent, 
        FeatureComponent, SuggestComponent, LoginComponent,AdminNavbarComponent,AdminSidebarComponent,AdminFooterComponent
    ],
    imports:[
        ReactiveFormsModule,CommonModule
        
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
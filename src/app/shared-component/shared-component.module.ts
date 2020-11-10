import { NgModule } from '@angular/core';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { WeeklyFeatureComponent } from './weekly-feature/weekly-feature.component';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { FeatureComponent } from './feature/feature.component';
import { SuggestComponent } from './suggest/suggest.component';

@NgModule({
    declarations:[
        HomeCarouselComponent, 
        WeeklyFeatureComponent, 
        BestSellingProductComponent, 
        FeatureComponent, SuggestComponent
    ],
    imports:[],
    exports:[
        HomeCarouselComponent,
        WeeklyFeatureComponent,
        BestSellingProductComponent,
        FeatureComponent,
        SuggestComponent
    ]
})
export class ShareComponent{
}
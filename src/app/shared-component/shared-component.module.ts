import { NgModule } from '@angular/core';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { WeeklyFeatureComponent } from './weekly-feature/weekly-feature.component';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { FeatureComponent } from './feature/feature.component';

@NgModule({
    declarations:[
        HomeCarouselComponent, 
        WeeklyFeatureComponent, 
        BestSellingProductComponent, 
        FeatureComponent],
    imports:[],
    exports:[
        HomeCarouselComponent,
        WeeklyFeatureComponent,
        BestSellingProductComponent,
        FeatureComponent
    ]
})
export class ShareComponent{
}
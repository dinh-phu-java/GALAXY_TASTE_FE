import { NgModule } from '@angular/core';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { WeeklyFeatureComponent } from './weekly-feature/weekly-feature.component';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';

@NgModule({
    declarations:[HomeCarouselComponent, WeeklyFeatureComponent, BestSellingProductComponent],
    imports:[],
    exports:[HomeCarouselComponent,WeeklyFeatureComponent,BestSellingProductComponent]
})
export class ShareComponent{
}
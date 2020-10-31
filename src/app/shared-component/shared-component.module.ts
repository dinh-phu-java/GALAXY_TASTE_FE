import { NgModule } from '@angular/core';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { WeeklyFeatureComponent } from './weekly-feature/weekly-feature.component';

@NgModule({
    declarations:[HomeCarouselComponent, WeeklyFeatureComponent],
    imports:[],
    exports:[HomeCarouselComponent,WeeklyFeatureComponent]
})
export class ShareComponent{
}
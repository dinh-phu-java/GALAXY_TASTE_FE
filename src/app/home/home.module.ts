import { NgModule } from "@angular/core";
import { ShareComponent } from '../shared-component/shared-component.module';
import { HomeRouting } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
    declarations:[HomeComponent],
    imports:[HomeRouting,ShareComponent],
    exports:[HomeComponent]
})

export class HomeModule{
}


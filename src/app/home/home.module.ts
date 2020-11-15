import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FooterComponent } from '../layout/footer/footer.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { ShareComponent } from '../shared-component/shared-component.module';
import { HomeRouting } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
    declarations:[HomeComponent,NavbarComponent,FooterComponent],
    imports:[HomeRouting,ShareComponent,CommonModule],
    exports:[HomeComponent]
})

export class HomeModule{
}


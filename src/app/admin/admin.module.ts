import { NgModule } from "@angular/core";
import { AdminRouting } from './admin-routing.module';
import { AdminComponent } from './admin.component';


@NgModule({
    declarations:[AdminComponent],
    imports:[AdminRouting],
    exports:[AdminComponent]
})

export class AdminModule{
}


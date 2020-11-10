import { NgModule } from "@angular/core";
import { AdminRouting } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { ShareComponent } from '../shared-component/shared-component.module';


@NgModule({
    declarations:[AdminComponent, AdminNavbarComponent, AdminSidebarComponent, AdminFooterComponent],
    imports:[AdminRouting,ShareComponent],
    exports:[AdminComponent]
})

export class AdminModule{
}


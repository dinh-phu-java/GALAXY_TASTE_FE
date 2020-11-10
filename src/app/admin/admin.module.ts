import { NgModule } from "@angular/core";
import { AdminRouting } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';


@NgModule({
    declarations:[AdminComponent, AdminNavbarComponent, AdminSidebarComponent, AdminFooterComponent],
    imports:[AdminRouting],
    exports:[AdminComponent]
})

export class AdminModule{
}


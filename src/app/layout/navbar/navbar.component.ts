import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AppStore from 'src/app/store/app.store';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navHeight: number;
  navElement: HTMLElement;
  isLoggedIn: boolean = false;
  subscription:Subscription;
  constructor(private store: Store<AppStore.AppState>) { }

  ngOnInit(): void {
    this.navElement = document.getElementById("mainNavbar");

    this.navHeight = +this.navElement.offsetHeight;

    
    this.subscription=this.store.select('user').subscribe((stateData)=>{
      this.isLoggedIn=stateData.isLoggedIn;
    })
    
  }

  onScroll(event: Event) {

    if (window.scrollY > this.navHeight) {
      this.navElement.style.opacity = "0";
      this.navElement.classList.add("sticky-top");
    } else {
      this.navElement.classList.remove("sticky-top");
      this.navElement.style.transition = "all 0s";
      this.navElement.style.opacity = "1";
    }

    if (window.scrollY > this.navHeight * 1.5) {
      this.navElement.style.transition = "all .2s";
      this.navElement.style.opacity = "1";
    }

  }

}

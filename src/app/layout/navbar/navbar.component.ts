import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navHeight: number;
  navElement: HTMLElement;
  constructor() { }

  ngOnInit(): void {
    this.navElement = document.getElementById("mainNavbar");

    this.navHeight = +this.navElement.offsetHeight;

    console.log('inner height: ' + window.innerHeight);
    console.log('outer height: ' + window.outerHeight);
    console.log('pageYOffset: ' + window.pageYOffset);
    console.log('scrollY: ' + window.scrollY);
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

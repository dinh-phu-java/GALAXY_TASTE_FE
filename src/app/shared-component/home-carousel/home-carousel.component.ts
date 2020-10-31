import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (function($){
      // $('#homeCarousel').on('slid.bs.carousel', function () {
      //   // do something…
      //   $('.content-item').css({"animation":"carouselAnimate 1.5s ease-out"});
      // })

      // $('#homeCarousel').on('slide.bs.carousel', function () {
      //   // do something…
      //   $('.content-item').css({"opacity":"1"});
      // })
    })(jQuery)
  }

}

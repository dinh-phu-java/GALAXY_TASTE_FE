import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private producService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.producService.bestSellingProduct()
      .subscribe(
        (resData) => {
          console.log(resData);
        },
        (errorRes) => {
          console.log(errorRes);
        })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
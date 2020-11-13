import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as AppStore from 'src/app/store/app.store';
import * as ProductAction from 'src/app/admin/product-store/product.actions';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Product } from 'src/app/model/product.model';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, AfterViewInit, OnDestroy {
  public products: Product[] = [];

  public displayedColumns: string[] = ['productCode', 'productName', 'productPrice', 'tag', 'edit', 'delete'];
  public subscription: Subscription[]=[];
  public dataSource: any;
  public spinner: boolean = false;

  constructor(
    private store: Store<AppStore.AppState>,
    private router: Router,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ProductAction.GetProductList());
    this.subscription.push(
      this.store.select('product').subscribe(
        (productState => {
          this.products = productState.listProduct;
          this.dataSource = new MatTableDataSource<Product>(this.products);
          this.dataSource.paginator = this.paginator;
        })
      )
    )

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

  }

  onEdit(productCode: string) {

    this.store.dispatch(new ProductAction.StartUpdateProduct(productCode));
    this.subscription.push(
      this.store.select('product').subscribe(
        productState => {
          if (productState.currentProduct) {
            this.router.navigate([`/admin/action/edit-product/${productCode}`]);
            this.spinner = false;
          } else {
            this.spinner = true;
          }
        }
      )
    )

  }

  onDelete(productCode: string) {
    this.store.dispatch(new ProductAction.DeleteProduct(productCode));
    
  }

  searchProduct(searchInput: string) {
    const results: Product[] = [];
    for (const product of this.products) {
      if (
        product.productName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        product.tag.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      ) {
        results.push(product);
      }
    }

    if (results.length === 0 || !searchInput) {
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource = new MatTableDataSource<Product>(results);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    for(let sub of this.subscription){
      if(sub){
        sub.unsubscribe();
      }
    }
  }

}


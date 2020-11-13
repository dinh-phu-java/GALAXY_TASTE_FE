import { Component, OnDestroy, OnInit } from '@angular/core';
import * as AppStore from '../../../store/app.store';
import * as AuthActions from '../../../services/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import * as ProductAction from 'src/app/admin/product-store/product.actions';
import { Product } from 'src/app/model/product.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category.model';
import { FileService } from 'src/app/services/file.services';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  public createForm: FormGroup;
  public categories: Category[] = [];
  public maxImage: number = 5;
  public countImage: number = 1;
  public imageFileName: string[] = [];
  public fileType: string[] = [];
  public maxFileSize: number;
  public isButtonDisabled: boolean = false;
  public imageFiles: File[] = [];
  public isLoading: boolean = false;
  public subscription: Subscription;
  constructor(
    private store: Store<AppStore.AppState>,
    private categoryService: CategoryService,
    private fileService: FileService,
    private notifier: NotificationService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategory();
    this.fileType = this.fileService.getFileType();
    this.maxFileSize = this.fileService.getFileSize();

    this.createForm = new FormGroup({
      'productName': new FormControl(null, Validators.required),
      'productPrice': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,4}){0,1}$')]),
      'tag': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'productImageUrl': new FormArray([
        new FormControl(null, [Validators.required, this.fileTypeAccepted.bind(this)])
      ]),
      'categoryId': new FormControl(null, Validators.required)
    })

    this.createForm.get('categoryId').setValue(1, { onlySelf: true });
    this.subscription = this.store.select('product').subscribe(productState => {
      this.isLoading = productState.loading;
    })
  }

  createProduct() {
    let product = new Product();
    product = this.createForm.value;
    product.imageFiles = this.imageFiles.slice();
    product.productImageUrl = this.imageFileName;
    console.log(product);
    const formData = this.productService.createProductFormData(product);
    this.store.dispatch(new ProductAction.CreateProduct(formData));
    this.createForm.reset();
    this.createForm.get('categoryId').setValue(1, { onlySelf: true });
    this.imageFileName=[]
    this.imageFiles=[]
  }

  addImageControl() {
    let imageControl = new FormControl(null, [Validators.required, this.fileTypeAccepted.bind(this)]);

    (<FormArray>this.createForm.get('productImageUrl')).push(imageControl);
    this.countImage++;
  }

  getImageControls() {
    return (<FormArray>this.createForm.get('productImageUrl')).controls;
  }

  removeImageControl(index: number) {
    (<FormArray>this.createForm.get('productImageUrl')).removeAt(index);
    this.imageFileName.splice(index, 1);
    this.imageFiles.splice(index, 1);
    this.countImage--;
  }

  onImageControlChange(fileName: string, fileImage: File, index: number) {
    this.imageFileName.push(fileName);
    this.imageFiles.push(fileImage);
    if (fileImage.size > this.maxFileSize) {
      this.isButtonDisabled = true;
      this.notifier.notify(NotificationType.ERROR, `File Size Should be less than ${this.maxFileSize / 1024 / 1024}MB`.toUpperCase());
    } else {
      this.isButtonDisabled = false;
    }

  }

  fileTypeAccepted(control: FormControl): { [s: string]: boolean } {
    if (control.value !== null) {
      let file = control.value;
      let startIndex = file.indexOf('.') + 1;
      let suffix = file.substring(startIndex).toLowerCase();
      if (this.fileType.indexOf(suffix) !== -1) {
        return null;
      } else {
        return { 'fileTypeForbidden': true };
      }
    }
    return { 'fileTypeForbidden': true };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}



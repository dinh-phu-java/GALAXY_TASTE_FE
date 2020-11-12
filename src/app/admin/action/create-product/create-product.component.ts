import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public createForm: FormGroup;
  public categories: Category[] = [];
  public maxImage: number = 5;
  public countImage: number = 1;
  public imageFileName: string[] = [];
  public fileType: string[] = [];
  public maxFileSize:number;
  public isButtonDisabled:boolean=false;
  constructor(private store: Store<AppStore.AppState>, private categoryService: CategoryService, private fileService: FileService,private notifier:NotificationService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategory();
    this.fileType = this.fileService.getFileType();
    this.maxFileSize=this.fileService.getFileSize();
    this.createForm = new FormGroup({
      'productName': new FormControl(null, Validators.required),
      'productPrice': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+\.[0-9]{1,}$')]),
      'tag': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'productImageUrl': new FormArray([
        new FormControl(null, [Validators.required, this.fileTypeAccepted.bind(this)])
      ]),
      'categoryId': new FormControl(null, Validators.required)
    })
    this.createForm.get('categoryId').setValue(1, { onlySelf: true });
  }

  createProduct() {
    // this.createForm.get('productImageUrl')
    console.log(this.createForm);
    let product = new Product();
    product = this.createForm.value;
    product.productImageUrl = this.imageFileName;
    console.log(product);
    // const product = new Product(null, 'product name', 234.2, '#product tag', 'product description', ['image1', 'image2'], 1);
    // const product = new Product();
    // this.store.dispatch(new ProductAction.CreateProduct(product));
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

    this.countImage--;
  }

  onImageControlChange(fileName: string, fileImage: File, index: number) {
    this.imageFileName.push(fileName);
    if(fileImage.size > this.maxFileSize){
      this.isButtonDisabled=true;
      this.notifier.notify(NotificationType.ERROR,`File Size Should be less than ${this.maxFileSize/1024/1024}MB`.toUpperCase());
    }else{
      this.isButtonDisabled=false;
    }
    console.log(fileName);
    console.log(fileImage.size);
    console.log(index);

  }

  fileTypeAccepted(control: FormControl): { [s: string]: boolean } {
    if (control.value !== null) {
      let file = control.value;
      let startIndex = file.indexOf('.') + 1;
      let suffix = file.substring(startIndex).toLowerCase();
      console.log(this.fileType);
      if (this.fileType.indexOf(suffix) !== -1) {
        return null;
      } else {
        return { 'fileTypeForbidden': true };
      }
    }
    return { 'fileTypeForbidden': true };
  }
}



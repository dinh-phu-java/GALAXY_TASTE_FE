import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({providedIn:'root'})
export class ProductService{


    public createProductFormData( product: Product): FormData {
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('productPrice', product.productPrice);
        formData.append('tag', product.tag);
        formData.append('description', product.description);
        formData.append('categoryId', product.categoryId);
        for(let i=0;i<product.productImageUrl.length;i++){
            formData.append('productImageUrl', product.productImageUrl[i]);
        }
        for(let i=0;i<product.imageFiles.length;i++){
            formData.append('imageFiles', product.imageFiles[i]);
        }
        
        return formData;
      }
}
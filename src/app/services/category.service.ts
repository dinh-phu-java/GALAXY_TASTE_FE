import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';

@Injectable({providedIn:'root'})
export class CategoryService{

    private category= [
        new Category(1,'Pants'),
        new Category(2,'Shock')
    ]


    constructor(){}


    public getCategory(){
        return this.category.slice();
    }
    
}
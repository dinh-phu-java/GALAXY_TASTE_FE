export class Product{
    constructor(
        public productCode?:string,
        public productName?:string,
        public productPrice?:string,
        public tag?:string,
        public description?:string,
        public productImageUrl?:string[],
        public categoryId?:string,
        public imageFiles?:File[]){}

        
}
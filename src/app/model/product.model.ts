export class Product{
    constructor(
        public productCode?:string,
        public productName?:string,
        public productPrice?:number,
        public tag?:string,
        public description?:string,
        public productImageUrl?:string[],
        public categoryId?:number){}
}
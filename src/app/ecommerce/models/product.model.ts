export interface Product {
    id : number;
    name : string;
    description : string;
    price: number;
    imageUrl : string
    productCode : string;
}



export class Product {
    id : number;
    name : string;
    description : string;
    price: number;
    imageUrl : string
    productCode : string;

     
    constructor(id: number, name: string,description : string, price: number, imageUrl: string, productCode : string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.productCode = productCode;
    }
}
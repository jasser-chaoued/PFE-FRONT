import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductOrder } from '../models/product-order.model';
import { ProductOrders } from '../models/product-orders.model';

@Injectable()
export class EcommerceService {

    private host = environment.apiUrl;
   // private productsUrl = "/products";
 //   private ordersUrl = "/orders";

    private productOrder: ProductOrder;
    private orders: ProductOrders = new ProductOrders();

    private productOrderSubject = new Subject;
    private ordersSubject = new Subject();
    private totalSubject = new Subject();

    private total: number;

    ProductOrderChanged = this.productOrderSubject.asObservable();
    OrdersChanged = this.ordersSubject.asObservable();
    TotalChanged = this.totalSubject.asObservable();

    constructor(private http: HttpClient) {}

    getAllProducts( ) {
        return this.http.get(`${this.host}/products/list`);
    }

    saveOrder(order: ProductOrders) {
        return this.http.post(`${this.host}/orders`, order);
    }
    set SelectedProductOrder(value: ProductOrder) {
        this.productOrder = value;
        this.productOrderSubject.next();
    }

    get SelectedProductOrder() {
        return this.productOrder;
    }

    set ProductOrders(value: ProductOrders) {
        this.orders = value;
        this.ordersSubject.next();
    }

    get ProductOrders() {
        return this.orders;
    }

    get Total() {
        return this.total;
    }

    set Total(value: number) {
        this.total = value;
        this.totalSubject.next();
    }
}

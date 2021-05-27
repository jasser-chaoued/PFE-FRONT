import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductOrder } from '../models/product-order.model';
import { ProductOrders } from '../models/product-orders.model';
import { EcommerceService } from '../services/EcommerceService';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  orderFinished: boolean;
  orders: ProductOrders;
  total: number;
  sub: Subscription;

  @Output() onOrderFinished: EventEmitter<boolean>;

  constructor(private ecommerceService: EcommerceService,
    private authenticationService: AuthenticationService) {
    this.total = 0;
    this.orderFinished = false;
    this.onOrderFinished = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.orders = new ProductOrders();
        this.loadCart();
        this.loadTotal();
  }

  public get isLoggedIn() :boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  private calculateTotal(products: ProductOrder[]): number {
    let sum = 0;
    products.forEach(value => {
        sum += (value.product.price * value.quantity);
    });
    return sum;
}

ngOnDestroy() {
    this.sub.unsubscribe();
}

finishOrder() {
    this.orderFinished = true;
    this.ecommerceService.Total = this.total;
    this.onOrderFinished.emit(this.orderFinished);
}

loadTotal() {
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
        this.total = this.calculateTotal(this.orders.productOrders);
    });
}

loadCart() {
    this.sub = this.ecommerceService.ProductOrderChanged.subscribe(() => {
        let productOrder = this.ecommerceService.SelectedProductOrder;
        if (productOrder) {
            this.orders.productOrders.push(new ProductOrder(
                productOrder.product, productOrder.quantity));
        }
        this.ecommerceService.ProductOrders = this.orders;
        this.orders = this.ecommerceService.ProductOrders;
        this.total = this.calculateTotal(this.orders.productOrders);
    });
}

reset() {
    this.orderFinished = false;
    this.orders = new ProductOrders();
    this.orders.productOrders = []
    this.loadTotal();
    this.total = 0;
}

}

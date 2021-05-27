import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';
import { EcommerceService } from 'src/app/ecommerce/services/EcommerceService';
import { environment } from 'src/environments/environment';
import { ProductOrders } from '../models/product-orders.model';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: ProductOrders;
  total: number;
  paid: boolean;
  sub: Subscription;
  stripePromise = loadStripe(environment.stripe);
  productNames = ' ';
  quantity = 0;
  price = 0;


  constructor(private ecommerceService: EcommerceService, 
                    private http:HttpClient) {
      this.orders = this.ecommerceService.ProductOrders;
  }

  ngOnInit() {
    let  productOrders = this.orders.productOrders;
      this.paid = false;
      this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
          this.orders = this.ecommerceService.ProductOrders;
      });
      this.loadTotal();
  }


  async pay(): Promise<void> {
      this.paid = true;
      let pr = this.orders.productOrders;
      pr.forEach(element => {
        this.productNames += element.product.name;
        this.quantity += element.quantity;
        this.price += element.product.price * element.quantity;

      });
      const payment = {
        name : this.productNames,
        currency: 'usd',
        amount: this.price,
        quantity : this.quantity,
        cancelUrl: 'http://localhost:4200/cancel',
        successUrl: 'http://localhost:4200/success',
      };

      const stripe = await this.stripePromise;

      this.http
      .post(`${environment.apiUrl}/checkout/payment`, payment)
      .subscribe((data: any)=> {
          stripe.redirectToCheckout({
            sessionId: data.id,
          });
      });

      console.log(payment);
      this.ecommerceService.saveOrder(this.orders).subscribe();
  }

  loadTotal() {
      this.sub = this.ecommerceService.TotalChanged.subscribe(() => {
          this.total = this.ecommerceService.Total;
      });
  }
  
}

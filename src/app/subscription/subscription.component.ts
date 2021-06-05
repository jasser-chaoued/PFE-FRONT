import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  monthlyPriceId = 'price_1IvWhlEWWeT3KBsD0UMXUQnP';
  monthlyPricedId2 = 'price_1IywtxEWWeT3KBsD2y19I5AH';
  yearlyPriceId = 'price_1IvW9tEWWeT3KBsDkO9ECm5x';

  stripePromise = loadStripe(environment.stripe);

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public get isLoggedIn() :boolean {
    return this.authenticationService.isUserLoggedIn();
  }

  async checkoutMonthly(): Promise<void> {
this.checkout(this.monthlyPriceId);
  }
  async checkoutMonthly2(): Promise<void> {
    this.checkout(this.monthlyPricedId2);
      }
  async checkoutYearly(): Promise<void> {
this.checkout(this.yearlyPriceId);
  }

  private async checkout(priceId: string): Promise<void> {
    const checkout = {
      priceId: priceId,
      cancelUrl: 'http://localhost:4200/canceled',
      successUrl: 'http://localhost:4200/success',
    };
    const stripe = await this.stripePromise;
    this.http
      .post(`${environment.apiUrl}/checkout/subscription`, checkout)
      .subscribe((data: any) => {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
  }
}

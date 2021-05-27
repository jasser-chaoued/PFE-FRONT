import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';
import { EcommerceService } from './ecommerce/services/EcommerceService';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProductService } from './ecommerce/services/ProductService';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CancelComponent } from './ecommerce/cancel/cancel.component';
import { SucessComponent } from './ecommerce/sucess/sucess.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HomeComponent,
    EcommerceComponent,
    ProductsComponent,
    OrdersComponent,
    ShoppingCartComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    SettingComponent,
    ProductManagementComponent,
    CancelComponent,
    SucessComponent,
    SubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule

  ],
  providers: [NotificationService , AuthenticationGuard, AuthenticationService, UserService,EcommerceService,ProductService ,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

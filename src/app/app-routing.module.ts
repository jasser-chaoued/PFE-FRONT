import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelComponent } from './ecommerce/cancel/cancel.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { SucessComponent } from './ecommerce/sucess/sucess.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'settings', component: SettingComponent},
  {path: 'products/management', component: ProductManagementComponent},
  {path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard]},
  {path: 'ecommerce', component: EcommerceComponent},
  { path: 'cancel', component: CancelComponent },
  { path: 'success', component: SucessComponent },
  { path: 'subscription', component: SubscriptionComponent },
  {path: '', redirectTo : '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

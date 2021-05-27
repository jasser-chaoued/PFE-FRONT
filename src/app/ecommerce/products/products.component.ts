import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EcommerceService } from 'src/app/ecommerce/services/EcommerceService';
import { Role } from 'src/app/enum/role.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProductOrder } from '../models/product-order.model';
import { ProductOrders } from '../models/product-orders.model';
import { Product } from '../models/product.model';
import { ProductService } from '../services/ProductService';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  editProduct: Product;
  deleteProduct: Product;
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  sub: Subscription;
  productSelected = false;
  filterTerm: string;

  constructor(private ecommerceService: EcommerceService,
    private productService: ProductService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.productOrders = [];
    this.getProducts();
    this.loadOrders();
  }


  public getProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products);
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProduct(addForm: NgForm): void {
    document.getElementById('add-product-form').click();
    this.productService.addProduct(addForm.value).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProducts(key: string): void {
    console.log(key);
    const results: Product[] = [];
    for (const product of this.products) {
      if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || product.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(product);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getProducts();
    }
  }

  public onOpenModal(product: Product, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addproductModal');
    }
    if (mode === 'edit') {
      this.editProduct = product;
      button.setAttribute('data-target', '#updateproductModal');
    }
    if (mode === 'delete') {
      this.deleteProduct = product;
      button.setAttribute('data-target', '#deleteproductModal');
    }
    container.appendChild(button);
    button.click();
  }




  addToCart(order: ProductOrder) {
    this.ecommerceService.SelectedProductOrder = order;
    this.selectedProductOrder = this.ecommerceService.SelectedProductOrder;
    this.productSelected = true;
  }

  removeFromCart(productOrder: ProductOrder) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
    }
    this.ecommerceService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.ecommerceService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }


  loadOrders() {
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    });
  }

  reset() {
    this.productOrders = [];
    this.getProducts();
    this.ecommerceService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
  }


  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }


  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  public get isLoggedIn() :boolean {
    return this.authenticationService.isUserLoggedIn();
  }
}

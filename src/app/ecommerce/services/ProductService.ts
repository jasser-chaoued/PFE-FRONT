import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Product} from '../models/product.model';
import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ProductService {
private host = environment.apiUrl;


constructor(private http: HttpClient) {}

public getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.host}/products/list`);
}

public addProduct(product: Product) : Observable<Product> {
  return this.http.post<Product>(`${this.host}/products/add`, product) ;
}

public updateProduct(product: Product) : Observable<Product> {
  return this.http.put<Product>(`${this.host}/products/update`, product) ;
}

public deleteProduct(id: number) : Observable<void> {
  return this.http.delete<void>(`${this.host}/products/delete/${id}`) ;
}
 

}

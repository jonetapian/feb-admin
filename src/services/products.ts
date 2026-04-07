import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseUrl;

  // Products endpoints
  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  criarProduto(value: any) {
    return this.http.post(`${this.apiUrl}/products`, value);
  }

  updateProduct(id: string, value: any) {
    return this.http.patch(`${this.apiUrl}/products/${id}`, value);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  // Stock endpoints
  getStocks() {
    return this.http.get(`${this.apiUrl}/stock`);
  }

  getStockById(id: string) {
    return this.http.get(`${this.apiUrl}/stock/${id}`);
  }

  getStockByProductId(productId: string) {
    return this.http.get(`${this.apiUrl}/stock/product/${productId}`);
  }

  updateStock(id: string, value: any) {
    return this.http.patch(`${this.apiUrl}/stock/${id}`, value);
  }

  updateStockByProductId(productId: string, value: any) {
    return this.http.patch(`${this.apiUrl}/stock/product/${productId}`, value);
  }

  // Suppliers endpoints
  getSuppliers() {
    return this.http.get(`${this.apiUrl}/suppliers`);
  }

  getSupplierById(id: string) {
    return this.http.get(`${this.apiUrl}/suppliers/${id}`);
  }

  createSupplier(value: any) {
    return this.http.post(`${this.apiUrl}/suppliers`, value);
  }

  updateSupplier(id: string, value: any) {
    return this.http.patch(`${this.apiUrl}/suppliers/${id}`, value);
  }

  deleteSupplier(id: string) {
    return this.http.delete(`${this.apiUrl}/suppliers/${id}`);
  }

  // Categories endpoints
  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: string) {
    return this.http.get(`${this.apiUrl}/categories/${id}`);
  }

  createCategory(value: any) {
    return this.http.post(`${this.apiUrl}/categories`, value);
  }

  updateCategory(id: string, value: any) {
    return this.http.patch(`${this.apiUrl}/categories/${id}`, value);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  // Sales endpoints
  getSales() {
    return this.http.get(`${this.apiUrl}/sales`);
  }

  getSaleById(id: string) {
    return this.http.get(`${this.apiUrl}/sales/${id}`);
  }

  createSale(value: any) {
    return this.http.post(`${this.apiUrl}/sales`, value);
  }
}

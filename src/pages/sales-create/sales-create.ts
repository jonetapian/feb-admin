import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Product, CreateSaleRequest } from '../../interfaces/product';

@Component({
  selector: 'app-sales-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-create.html',
  styleUrls: ['./sales-create.scss']
})
export class SalesCreateComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);

  products: Product[] = [];

  saleForm = this.fb.group({
    items: this.fb.array([], Validators.required)
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  get items(): FormArray {
    return this.saleForm.get('items') as FormArray;
  }

  addItem() {
    const itemForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.items.push(itemForm);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  getProductName(productId: string): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : '';
  }

  getProductPrice(productId: string): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.salePrice : 0;
  }

  getItemTotal(index: number): number {
    const item = this.items.at(index);
    const productId = item.get('productId')?.value;
    const quantity = item.get('quantity')?.value || 0;
    return this.getProductPrice(productId) * quantity;
  }

  getTotalAmount(): number {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      total += this.getItemTotal(i);
    }
    return total;
  }

  onSubmit() {
    if (this.saleForm.valid && this.saleForm.value.items) {
      const formValue = this.saleForm.value;
      const saleData: CreateSaleRequest = {
        items: formValue.items!.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

      this.productsService.createSale(saleData).subscribe({
        next: () => {
          this.router.navigate(['/sales-list']);
        },
        error: (error) => {
          console.error('Error creating sale:', error);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/sales-list']);
  }
}
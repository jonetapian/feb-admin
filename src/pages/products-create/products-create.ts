import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products';
import { CreateProductRequest, Supplier, Category } from '../../interfaces/product';

@Component({
  selector: 'app-products-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './products-create.html',
  styleUrl: './products-create.scss',
})
export class ProductsCreateComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  public form: FormGroup;
  public loading = false;
  public suppliers: Supplier[] = [];
  public categories: Category[] = [];

  constructor() {
    this.form = this.formBuilder.group({
      name: new FormControl(null),
      sku: new FormControl(null),
      barcode: new FormControl(null),
      costPrice: new FormControl(null),
      salePrice: new FormControl(null),
      initialQuantity: new FormControl(0),
      minStock: new FormControl(0),
      unitsPerBox: new FormControl(null),
      supplierId: new FormControl(null),
      categoryId: new FormControl(null),
    });
  }

  ngOnInit() {
    this.loadSuppliers();
    this.loadCategories();
  }

  loadSuppliers() {
    this.productsService.getSuppliers().subscribe({
      next: (data: any) => {
        this.suppliers = data;
      },
      error: (error) => {
        console.error('Erro ao carregar fornecedores:', error);
      },
    });
  }

  loadCategories() {
    this.productsService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
      },
    });
  }

  confirm() {
    if (this.form.valid) {
      this.loading = true;
      const productData: CreateProductRequest = this.form.value;
      this.productsService.criarProduto(productData).subscribe({
        next: () => {
          alert('Produto criado com sucesso!');
          this.loading = false;
          this.router.navigate(['/products-list']);
        },
        error: (error) => {
          console.error('Erro ao criar produto:', error);
          alert('Erro ao criar produto!');
          this.loading = false;
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/products-list']);
  }
}

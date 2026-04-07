import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Product, Supplier, Category } from '../../interfaces/product';

@Component({
  selector: 'app-products-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './products-edit.html',
  styleUrl: './products-edit.scss',
})
export class ProductsEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public form: FormGroup;
  public loading = false;
  public productId = '';
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
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.loadSuppliers();
        this.loadCategories();
        this.loadProduct();
      }
    });
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

  loadProduct() {
    this.loading = true;
    this.productsService.getProductById(this.productId).subscribe({
      next: (product: any) => {
        // Mapear dados do produto para o formato do formulário
        const formData = {
          ...product,
          initialQuantity: product.stock?.quantity || 0,
          minStock: product.stock?.minStock || 0,
        };
        this.form.patchValue(formData);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produto:', error);
        alert('Erro ao carregar produto!');
        this.loading = false;
        this.router.navigate(['/products-list']);
      },
    });
  }

  confirm() {
    if (this.form.valid) {
      this.loading = true;
      const formValue = this.form.value;

      // Dados para atualizar o produto (PATCH /products/:id)
      const updateProductData = {
        name: formValue.name,
        costPrice: formValue.costPrice,
        salePrice: formValue.salePrice,
        sku: formValue.sku,
        barcode: formValue.barcode,
        unitsPerBox: formValue.unitsPerBox,
        supplierId: formValue.supplierId,
        categoryId: formValue.categoryId,
        initialQuantity: formValue.initialQuantity,
        minStock: formValue.minStock,
      };

      this.productsService.updateProduct(this.productId, updateProductData).subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.loading = false;
          this.router.navigate(['/products-list']);
        },
        error: (error) => {
          console.error('Erro ao atualizar produto:', error);
          alert('Erro ao atualizar produto!');
          this.loading = false;
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/products-list']);
  }
}

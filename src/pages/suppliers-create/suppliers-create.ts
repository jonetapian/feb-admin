import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Supplier } from '../../interfaces/product';

@Component({
  selector: 'app-suppliers-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './suppliers-create.html',
  styleUrl: './suppliers-create.scss',
})
export class SuppliersCreateComponent {
  private formBuilder = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  public form: FormGroup;
  public loading = false;

  constructor() {
    this.form = this.formBuilder.group({
      name: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      address: new FormControl(null),
      cnpj: new FormControl(null),
    });
  }

  confirm() {
    if (this.form.valid) {
      this.loading = true;
      const supplier: Partial<Supplier> = this.form.value;
      this.productsService.createSupplier(supplier).subscribe({
        next: () => {
          alert('Fornecedor criado com sucesso!');
          this.loading = false;
          this.router.navigate(['/suppliers-list']);
        },
        error: (error) => {
          console.error('Erro ao criar fornecedor:', error);
          alert('Erro ao criar fornecedor!');
          this.loading = false;
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/suppliers-list']);
  }
}

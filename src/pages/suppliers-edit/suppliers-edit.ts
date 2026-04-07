import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Supplier } from '../../interfaces/product';

@Component({
  selector: 'app-suppliers-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './suppliers-edit.html',
  styleUrl: './suppliers-edit.scss',
})
export class SuppliersEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public form: FormGroup;
  public loading = false;
  public supplierId = '';

  constructor() {
    this.form = this.formBuilder.group({
      name: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      address: new FormControl(null),
      cnpj: new FormControl(null),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.supplierId = params['id'];
      if (this.supplierId) {
        this.loadSupplier();
      }
    });
  }

  loadSupplier() {
    this.loading = true;
    this.productsService.getSupplierById(this.supplierId).subscribe({
      next: (supplier: any) => {
        this.form.patchValue(supplier);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar fornecedor:', error);
        alert('Erro ao carregar fornecedor!');
        this.loading = false;
        this.router.navigate(['/suppliers-list']);
      },
    });
  }

  confirm() {
    if (this.form.valid) {
      this.loading = true;
      const supplier: Partial<Supplier> = this.form.value;
      this.productsService.updateSupplier(this.supplierId, supplier).subscribe({
        next: () => {
          alert('Fornecedor atualizado com sucesso!');
          this.loading = false;
          this.router.navigate(['/suppliers-list']);
        },
        error: (error) => {
          console.error('Erro ao atualizar fornecedor:', error);
          alert('Erro ao atualizar fornecedor!');
          this.loading = false;
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/suppliers-list']);
  }
}

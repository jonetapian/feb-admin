import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Category } from '../../interfaces/product';

@Component({
  selector: 'app-categories-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categories-create.html',
  styleUrl: './categories-create.scss',
})
export class CategoriesCreateComponent {
  private formBuilder = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  public form: FormGroup;
  public loading = false;

  constructor() {
    this.form = this.formBuilder.group({
      name: new FormControl(null),
      description: new FormControl(null),
    });
  }

  confirm() {
    if (this.form.valid) {
      this.loading = true;
      const category: Partial<Category> = this.form.value;
      this.productsService.createCategory(category).subscribe({
        next: () => {
          alert('Categoria criada com sucesso!');
          this.loading = false;
          this.router.navigate(['/categories-list']);
        },
        error: (error) => {
          console.error('Erro ao criar categoria:', error);
          alert('Erro ao criar categoria!');
          this.loading = false;
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/categories-list']);
  }
}

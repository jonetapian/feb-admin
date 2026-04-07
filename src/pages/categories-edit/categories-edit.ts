import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Category } from '../../interfaces/product';

@Component({
  selector: 'app-categories-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categories-edit.html',
  styleUrl: './categories-edit.scss',
})
export class CategoriesEditComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public form: FormGroup;
  public loading = false;
  public categoryId = '';

  constructor() {
    this.form = this.formBuilder.group({
      name: new FormControl(null),
      description: new FormControl(null),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params['id'];
      if (this.categoryId) {
        this.loadCategory();
      }
    });
  }

  loadCategory() {
    this.loading = true;
    this.productsService.getCategoryById(this.categoryId).subscribe({
      next: (category: any) => {
        this.form.patchValue(category);
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar categoria:', error);
        alert('Erro ao carregar categoria!');
        this.loading = false;
        this.router.navigate(['/categories-list']);
      },
    });
  }

  confirm() {
    if (this.form.valid) {
      this.loading = true;
      const category: Partial<Category> = this.form.value;
      this.productsService.updateCategory(this.categoryId, category).subscribe({
        next: () => {
          alert('Categoria atualizada com sucesso!');
          this.loading = false;
          this.router.navigate(['/categories-list']);
        },
        error: (error) => {
          console.error('Erro ao atualizar categoria:', error);
          alert('Erro ao atualizar categoria!');
          this.loading = false;
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/categories-list']);
  }
}

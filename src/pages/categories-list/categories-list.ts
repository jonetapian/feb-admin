import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Category } from '../../interfaces/product';

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './categories-list.html',
  styleUrls: ['./categories-list.scss'],
})
export class CategoriesListComponent implements OnInit {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  public categories: Category[] = [];
  public filteredCategories: Category[] = [];
  public loading = false;
  public searchId = '';

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.productsService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.filteredCategories = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
        this.loading = false;
      },
    });
  }

  searchById() {
    if (!this.searchId.trim()) {
      this.filteredCategories = this.categories;
      return;
    }

    this.loading = true;
    this.productsService.getCategoryById(this.searchId).subscribe({
      next: (category: any) => {
        this.filteredCategories = [category];
        this.loading = false;
      },
      error: (error) => {
        console.error('Categoria não encontrada:', error);
        this.filteredCategories = [];
        this.loading = false;
      },
    });
  }

  editCategory(id: string) {
    this.router.navigate(['/categories-edit', id]);
  }

  deleteCategory(id: string) {
    if (confirm('Tem certeza que deseja deletar esta categoria?')) {
      this.productsService.deleteCategory(id).subscribe({
        next: () => {
          alert('Categoria deletada com sucesso!');
          this.loadCategories();
        },
        error: (error) => {
          console.error('Erro ao deletar categoria:', error);
          alert('Erro ao deletar categoria!');
        },
      });
    }
  }

  clearSearch() {
    this.searchId = '';
    this.filteredCategories = this.categories;
  }
}

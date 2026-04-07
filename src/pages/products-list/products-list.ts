import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.scss'],
})
export class ProductsListComponent implements OnInit {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public loading = false;
  public searchId = '';

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.loading = false;
      },
    });
  }

  searchById() {
    if (!this.searchId.trim()) {
      this.filteredProducts = this.products;
      return;
    }

    this.loading = true;
    this.productsService.getProductById(this.searchId).subscribe({
      next: (product: any) => {
        this.filteredProducts = [product];
        this.loading = false;
      },
      error: (error) => {
        console.error('Produto não encontrado:', error);
        this.filteredProducts = [];
        this.loading = false;
      },
    });
  }

  editProduct(id: string) {
    this.router.navigate(['/products-edit', id]);
  }

  deleteProduct(id: string) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          alert('Produto deletado com sucesso!');
          this.loadProducts();
        },
        error: (error) => {
          console.error('Erro ao deletar produto:', error);
          alert('Erro ao deletar produto!');
        },
      });
    }
  }

  clearSearch() {
    this.searchId = '';
    this.filteredProducts = this.products;
  }
}

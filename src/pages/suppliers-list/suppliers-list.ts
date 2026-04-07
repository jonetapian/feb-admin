import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Supplier } from '../../interfaces/product';

@Component({
  selector: 'app-suppliers-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './suppliers-list.html',
  styleUrls: ['./suppliers-list.scss'],
})
export class SuppliersListComponent implements OnInit {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  public suppliers: Supplier[] = [];
  public filteredSuppliers: Supplier[] = [];
  public loading = false;
  public searchId = '';

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading = true;
    this.productsService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data as Supplier[];
        this.filteredSuppliers = data as Supplier[];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar fornecedores:', error);
        this.loading = false;
      },
    });
  }

  searchById() {
    if (!this.searchId.trim()) {
      this.filteredSuppliers = this.suppliers;
      return;
    }

    this.loading = true;
    this.productsService.getSupplierById(this.searchId).subscribe({
      next: (supplier: any) => {
        this.filteredSuppliers = [supplier as Supplier];
        this.loading = false;
      },
      error: (error) => {
        console.error('Fornecedor não encontrado:', error);
        this.filteredSuppliers = [];
        this.loading = false;
      },
    });
  }

  editSupplier(id: string) {
    this.router.navigate(['/suppliers-edit', id]);
  }

  deleteSupplier(id: string) {
    if (confirm('Tem certeza que deseja deletar este fornecedor?')) {
      this.productsService.deleteSupplier(id).subscribe({
        next: () => {
          alert('Fornecedor deletado com sucesso!');
          this.loadSuppliers();
        },
        error: (error) => {
          console.error('Erro ao deletar fornecedor:', error);
          alert('Erro ao deletar fornecedor!');
        },
      });
    }
  }

  clearSearch() {
    this.searchId = '';
    this.filteredSuppliers = this.suppliers;
  }
}

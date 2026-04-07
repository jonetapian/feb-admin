import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products';
import { Sale } from '../../interfaces/product';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sales-list.html',
  styleUrls: ['./sales-list.scss']
})
export class SalesListComponent implements OnInit {
  private router = inject(Router);
  private productsService = inject(ProductsService);

  sales: Sale[] = [];
  filteredSales: Sale[] = [];
  searchTerm = '';

  ngOnInit() {
    this.loadSales();
  }

  loadSales() {
    this.productsService.getSales().subscribe({
      next: (data: any) => {
        this.sales = data;
        this.filteredSales = data;
      },
      error: (error) => {
        console.error('Error loading sales:', error);
      }
    });
  }

  filterSales() {
    if (!this.searchTerm) {
      this.filteredSales = this.sales;
    } else {
      this.filteredSales = this.sales.filter(sale =>
        sale.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        sale.totalAmount.toString().includes(this.searchTerm)
      );
    }
  }

  viewSale(sale: Sale) {
    this.router.navigate(['/sales-edit', sale.id]);
  }

  createSale() {
    this.router.navigate(['/sales-create']);
  }
}
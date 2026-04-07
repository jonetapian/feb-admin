import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products-list',
    loadComponent: () =>
      import('./../pages/products-list/products-list').then(
        (m) => m.ProductsListComponent,
      ),
  },
  {
    path: 'products-create',
    loadComponent: () =>
      import('./../pages/products-create/products-create').then(
        (m) => m.ProductsCreateComponent,
      ),
  },
  {
    path: 'products-edit/:id',
    loadComponent: () =>
      import('./../pages/products-edit/products-edit').then(
        (m) => m.ProductsEditComponent,
      ),
  },
  {
    path: 'suppliers-list',
    loadComponent: () =>
      import('./../pages/suppliers-list/suppliers-list').then(
        (m) => m.SuppliersListComponent,
      ),
  },
  {
    path: 'suppliers-create',
    loadComponent: () =>
      import('./../pages/suppliers-create/suppliers-create').then(
        (m) => m.SuppliersCreateComponent,
      ),
  },
  {
    path: 'suppliers-edit/:id',
    loadComponent: () =>
      import('./../pages/suppliers-edit/suppliers-edit').then(
        (m) => m.SuppliersEditComponent,
      ),
  },
  {
    path: 'categories-list',
    loadComponent: () =>
      import('./../pages/categories-list/categories-list').then(
        (m) => m.CategoriesListComponent,
      ),
  },
  {
    path: 'categories-create',
    loadComponent: () =>
      import('./../pages/categories-create/categories-create').then(
        (m) => m.CategoriesCreateComponent,
      ),
  },
  {
    path: 'categories-edit/:id',
    loadComponent: () =>
      import('./../pages/categories-edit/categories-edit').then(
        (m) => m.CategoriesEditComponent,
      ),
  },
  {
    path: 'sales-list',
    loadComponent: () =>
      import('./../pages/sales-list/sales-list').then(
        (m) => m.SalesListComponent,
      ),
  },
  {
    path: 'sales-create',
    loadComponent: () =>
      import('./../pages/sales-create/sales-create').then(
        (m) => m.SalesCreateComponent,
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./../pages/dashboard/dashboard').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: '',
    redirectTo: '/products-list',
    pathMatch: 'full',
  },
];

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DashboardKPIs,
  SalesByDate,
  TopProduct,
  SlowProduct,
  LowStockProduct,
  ComparisonData
} from '../../interfaces/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/dashboard`;

  getKPIs(startDate?: string, endDate?: string): Observable<DashboardKPIs> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<DashboardKPIs>(`${this.apiUrl}/kpis`, { params });
  }

  getSalesByDate(startDate: string, endDate: string): Observable<SalesByDate[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<SalesByDate[]>(`${this.apiUrl}/sales-by-date`, { params });
  }

  getTopProducts(startDate: string, endDate: string): Observable<TopProduct[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<TopProduct[]>(`${this.apiUrl}/top-products`, { params });
  }

  getSlowProducts(startDate: string, endDate: string): Observable<SlowProduct[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<SlowProduct[]>(`${this.apiUrl}/slow-products`, { params });
  }

  getLowStock(): Observable<LowStockProduct[]> {
    return this.http.get<LowStockProduct[]>(`${this.apiUrl}/low-stock`);
  }

  getComparison(startDate: string, endDate: string): Observable<ComparisonData> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<ComparisonData>(`${this.apiUrl}/comparison`, { params });
  }
}
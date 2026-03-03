import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider, SearchFilters, SearchResponse, FilterOptions } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private readonly apiUrl = 'http://localhost:3000/api/providers';

  constructor(private http: HttpClient) { }

  searchProviders(filters: SearchFilters): Observable<SearchResponse> {
    let params = new HttpParams();
    
    // Adicionar parâmetros obrigatórios
    if (filters.plan) params = params.set('plan', filters.plan);
    if (filters.city) params = params.set('city', filters.city);
    
    // Adicionar parâmetros opcionais
    if (filters.type) params = params.set('type', filters.type);
    if (filters.specialty) params = params.set('specialty', filters.specialty);
    if (filters.name) params = params.set('name', filters.name);
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.sortOrder) params = params.set('sortOrder', filters.sortOrder);

    return this.http.get<SearchResponse>(`${this.apiUrl}/search`, { params });
  }

  getFilterOptions(): Observable<FilterOptions> {
    return this.http.get<FilterOptions>(`${this.apiUrl}/filters`);
  }

  getProviderById(id: string): Observable<Provider> {
    return this.http.get<Provider>(`${this.apiUrl}/${id}`);
  }
}

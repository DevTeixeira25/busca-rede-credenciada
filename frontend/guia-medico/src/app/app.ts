import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SearchForm } from './components/search-form/search-form';
import { ProviderList } from './components/provider-list/provider-list';
import { ProviderDetailsComponent } from './components/provider-details/provider-details.component';
import { ProviderService } from './services/provider';
import { SearchFilters, SearchResponse, Provider } from './models/provider.model';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SearchForm,
    ProviderList,
    ProviderDetailsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Guia Médico - Rede Credenciada');
  
  searchResponse: SearchResponse | null = null;
  loading = false;
  currentFilters: SearchFilters | null = null;
  selectedProvider: Provider | null = null;

  constructor(private providerService: ProviderService) {}

  onSearch(filters: SearchFilters) {
    this.loading = true;
    this.currentFilters = filters;
    
    this.providerService.searchProviders(filters).subscribe({
      next: (response) => {
        this.searchResponse = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro na busca:', error);
        this.loading = false;
        // Aqui você pode implementar tratamento de erro mais sofisticado
      }
    });
  }

  onSortChange(sortOptions: { sortBy: string, sortOrder: 'asc' | 'desc' }) {
    if (this.currentFilters) {
      const updatedFilters = {
        ...this.currentFilters,
        sortBy: sortOptions.sortBy,
        sortOrder: sortOptions.sortOrder,
        page: 1 // Reset para primeira página quando ordenar
      };
      this.onSearch(updatedFilters);
    }
  }

  onPageChange(pageOptions: { page: number, limit: number }) {
    if (this.currentFilters) {
      const updatedFilters = {
        ...this.currentFilters,
        page: pageOptions.page,
        limit: pageOptions.limit
      };
      this.onSearch(updatedFilters);
    }
  }

  onProviderSelected(provider: Provider) {
    this.selectedProvider = provider;
  }

  backToResults() {
    this.selectedProvider = null;
  }
}

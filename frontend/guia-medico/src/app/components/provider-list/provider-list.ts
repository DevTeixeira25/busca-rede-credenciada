import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchResponse, SearchFilters } from '../../models/provider.model';
import { Provider } from '../../models/provider.model';

@Component({
  selector: 'app-provider-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.scss',
})
export class ProviderList {
  @Input() searchResponse: SearchResponse | null = null;
  @Input() loading = false;
  @Output() sortChange = new EventEmitter<{ sortBy: string, sortOrder: 'asc' | 'desc' }>();
  @Output() pageChange = new EventEmitter<{ page: number, limit: number }>();
  @Output() providerSelected = new EventEmitter<Provider>();
  
  sortBy = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  
  sortOptions = [
    { value: 'name', label: 'Nome' },
    { value: 'rating', label: 'Avaliação' },
    { value: 'type', label: 'Tipo' },
    { value: 'city', label: 'Cidade' }
  ];

  get hasResults(): boolean {
    return !!(this.searchResponse?.providers?.length);
  }

  get totalResults(): number {
    return this.searchResponse?.pagination?.total || 0;
  }

  get currentPage(): number {
    return (this.searchResponse?.pagination?.page || 1) - 1; // Mat-paginator é 0-indexed
  }

  get pageSize(): number {
    return this.searchResponse?.pagination?.limit || 10;
  }

  onSortChange() {
    this.sortChange.emit({ sortBy: this.sortBy, sortOrder: this.sortOrder });
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onSortChange();
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit({ 
      page: event.pageIndex + 1, // Converter de volta para 1-indexed
      limit: event.pageSize 
    });
  }

  selectProvider(provider: Provider) {
    this.providerSelected.emit(provider);
  }

  getProviderDistance(provider: any): string | undefined {
    // Aqui você pode implementar cálculo de distância baseado na localização do usuário
    // Por enquanto, retorna undefined ou uma distância mockada
    if (provider.address?.city === 'Brasília') {
      return '1.4 km';
    }
    return undefined;
  }

  getSpecialtiesText(provider: Provider): string {
    return provider.specialties.slice(0, 4).join(', ') + 
           (provider.specialties.length > 4 ? '...' : '');
  }

  getFullAddress(provider: Provider): string {
    const addr = provider.address;
    return `${addr.street}, ${addr.number} - ${addr.district}, ${addr.city}/${addr.state}`;
  }

  trackByProviderId(index: number, provider: any): string {
    return provider._id;
  }
}

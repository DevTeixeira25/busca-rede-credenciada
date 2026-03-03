import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Provider } from '../../models/provider.model';

@Component({
  selector: 'app-provider-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, 
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule
  ],
  template: `
    <div class="provider-details-container">
      <!-- Informações Principais -->
      <div class="provider-main-info">
        <div class="provider-info-left">
          <!-- Especialidades -->
          <div class="specialties-container">
            <ng-container *ngFor="let specialty of provider.specialties.slice(0, 4); let i = index">
              {{ specialty }}<span *ngIf="i < provider.specialties.slice(0, 4).length - 1">, </span>
            </ng-container>
            <button mat-button class="ver-mais" *ngIf="provider.specialties.length > 4">
              ...VER MAIS
            </button>
          </div>

          <!-- Mapa -->
          <div class="map-container">
            <div class="map-placeholder">
              <div class="map-fallback">
                <mat-icon>map</mat-icon>
                <p>Mapa não disponível</p>
                <small>{{ getFullAddress() }}</small>
              </div>
            </div>
            <button mat-button class="map-link" (click)="getDirections()">Ver mapa ampliado</button>
          </div>
        </div>

        <div class="provider-info-right">
          <!-- Endereço -->
          <div class="address-info">
            <mat-icon>location_on</mat-icon>
            <div class="address-text">
              {{ getFullAddress() }}
            </div>
          </div>

          <!-- Contatos -->
          <div class="contact-info">
            <div class="phone-number" *ngIf="provider.contact.phone">
              <mat-icon>phone</mat-icon>
              <span>{{ provider.contact.phone }}</span>
            </div>
            <div class="phone-number" *ngIf="provider.contact.whatsapp">
              <mat-icon>phone</mat-icon>
              <span>{{ provider.contact.whatsapp }}</span>
            </div>
          </div>

          <!-- Website -->
          <div class="website-info" *ngIf="provider.contact.website">
            <mat-icon>language</mat-icon>
            <a [href]="provider.contact.website" target="_blank" class="website-link">
              {{ getWebsiteDomain() }}
            </a>
          </div>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="action-buttons">
        <button mat-stroked-button class="action-btn" (click)="getDirections()">
          <mat-icon>directions</mat-icon>
          ROTAS
        </button>
        <button mat-stroked-button class="action-btn" (click)="printInfo()">
          <mat-icon>print</mat-icon>
          IMPRIMIR
        </button>
        <button mat-stroked-button class="action-btn" (click)="shareInfo()">
          <mat-icon>share</mat-icon>
          COMPARTILHAR
        </button>
      </div>

      <!-- Seções Expansíveis -->
      <mat-accordion class="expansion-panels">
        <!-- Horários de Atendimento -->
        <mat-expansion-panel class="custom-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>Horários de atendimento</mat-panel-title>
          </mat-expansion-panel-header>
          <div class="panel-content">
            <div *ngIf="provider.workingHours; else noHours">
              <div class="working-hours">
                <div *ngFor="let day of getWorkingDays()" class="hour-row">
                  <span class="day-name">{{ getDayName(day.key) }}</span>
                  <span class="hour-time">
                    <span *ngIf="!day.value.closed">{{ day.value.open }} às {{ day.value.close }}</span>
                    <span *ngIf="day.value.closed" class="closed">Fechado</span>
                  </span>
                </div>
              </div>
            </div>
            <ng-template #noHours>
              <p class="no-info">Informações de horário não disponíveis</p>
            </ng-template>
          </div>
        </mat-expansion-panel>

        <!-- Equipe Médica -->
        <mat-expansion-panel class="custom-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>Equipe médica</mat-panel-title>
          </mat-expansion-panel-header>
          <div class="panel-content">
            <p class="no-info">Informações da equipe médica não disponíveis</p>
          </div>
        </mat-expansion-panel>

        <!-- Planos Atendidos -->
        <mat-expansion-panel class="custom-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>Planos atendidos</mat-panel-title>
          </mat-expansion-panel-header>
          <div class="panel-content">
            <div class="plans-list">
              <mat-chip-set>
                <mat-chip *ngFor="let plan of provider.plans">{{ plan }}</mat-chip>
              </mat-chip-set>
            </div>
          </div>
        </mat-expansion-panel>

        <!-- Especialidades -->
        <mat-expansion-panel class="custom-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>Especialidades</mat-panel-title>
          </mat-expansion-panel-header>
          <div class="panel-content">
            <div class="specialties-list">
              <div *ngFor="let specialty of provider.specialties" class="specialty-item">
                {{ specialty }}
              </div>
            </div>
          </div>
        </mat-expansion-panel>

        <!-- Mais Detalhes -->
        <mat-expansion-panel class="custom-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>Mais detalhes</mat-panel-title>
          </mat-expansion-panel-header>
          <div class="panel-content">
            <div class="additional-info">
              <div class="info-row" *ngIf="provider.services?.length">
                <strong>Serviços:</strong>
                <span>{{ provider.services.join(', ') }}</span>
              </div>
              <div class="info-row" *ngIf="provider.rating">
                <strong>Avaliação:</strong>
                <span>{{ provider.rating }}/5.0</span>
              </div>
              <div class="info-row">
                <strong>Tipo:</strong>
                <span>{{ getProviderType() }}</span>
              </div>
            </div>
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styleUrl: './provider-details.component.scss'
})
export class ProviderDetailsComponent {
  @Input() provider!: Provider;
  @Output() back = new EventEmitter<void>();

  getFullAddress(): string {
    const addr = this.provider.address;
    return `${addr.street}, ${addr.number} - ${addr.district}, ${addr.city}/${addr.state}`;
  }

  getWebsiteDomain(): string {
    if (!this.provider.contact.website) return '';
    try {
      return new URL(this.provider.contact.website).hostname.toUpperCase();
    } catch {
      return this.provider.contact.website.toUpperCase();
    }
  }

  getMapUrl(): string {
    const addr = this.provider.address;
    const address = encodeURIComponent(`${addr.street}, ${addr.number}, ${addr.city}, ${addr.state}`);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${address}`;
  }

  getWorkingDays(): Array<{key: string, value: any}> {
    if (!this.provider.workingHours) return [];
    return Object.entries(this.provider.workingHours)
      .map(([key, value]) => ({ key, value }));
  }

  getDayName(key: string): string {
    const days: {[key: string]: string} = {
      'segunda': 'Segunda-feira',
      'terca': 'Terça-feira', 
      'quarta': 'Quarta-feira',
      'quinta': 'Quinta-feira',
      'sexta': 'Sexta-feira',
      'sabado': 'Sábado',
      'domingo': 'Domingo'
    };
    return days[key] || key;
  }

  getProviderType(): string {
    const types: {[key: string]: string} = {
      'HOSPITAL': 'Hospital',
      'CLINICA': 'Clínica',
      'CONSULTORIO': 'Consultório',
      'LABORATORIO': 'Laboratório'
    };
    return types[this.provider.type] || this.provider.type;
  }

  getDirections(): void {
    const addr = this.provider.address;
    const address = encodeURIComponent(`${addr.street}, ${addr.number}, ${addr.city}, ${addr.state}`);
    window.open(`https://www.google.com/maps/dir//${address}`, '_blank');
  }

  printInfo(): void {
    window.print();
  }

  shareInfo(): void {
    if (navigator.share) {
      navigator.share({
        title: this.provider.name,
        text: `Confira este prestador: ${this.provider.name}`,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que não suportam Web Share API
      const text = `${this.provider.name} - ${this.getFullAddress()}`;
      navigator.clipboard.writeText(text).then(() => {
        alert('Informações copiadas para a área de transferência!');
      });
    }
  }
}
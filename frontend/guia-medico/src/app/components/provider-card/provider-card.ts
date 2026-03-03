import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { Provider } from '../../models/provider.model';

@Component({
  selector: 'app-provider-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './provider-card.html',
  styleUrl: './provider-card.scss',
})
export class ProviderCard {
  @Input() provider!: Provider;
  @Input() distance?: string;

  getProviderTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'HOSPITAL': 'Hospital',
      'CLINICA': 'Clínica',
      'LABORATORIO': 'Laboratório',
      'CONSULTORIO': 'Consultório'
    };
    return labels[type] || type;
  }

  getProviderTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'HOSPITAL': 'local_hospital',
      'CLINICA': 'medical_services',
      'LABORATORIO': 'biotech',
      'CONSULTORIO': 'person_search'
    };
    return icons[type] || 'business';
  }

  getRatingStars(rating?: number): string[] {
    const stars: string[] = [];
    const rate = rating || 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars.push('star');
      } else if (i - 0.5 <= rate) {
        stars.push('star_half');
      } else {
        stars.push('star_border');
      }
    }
    
    return stars;
  }

  formatPhone(phone?: string): string {
    if (!phone) return '';
    
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Formatar telefone brasileiro
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone;
  }

  openPhone(phone?: string) {
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  }

  openWhatsApp(whatsapp?: string) {
    if (whatsapp) {
      const cleaned = whatsapp.replace(/\D/g, '');
      window.open(`https://wa.me/55${cleaned}`, '_blank');
    }
  }

  openWebsite(website?: string) {
    if (website) {
      window.open(website, '_blank');
    }
  }
}

export interface Provider {
  _id: string;
  name: string;
  type: 'HOSPITAL' | 'CLINICA' | 'LABORATORIO' | 'CONSULTORIO';
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
    website?: string;
  };
  specialties: string[];
  plans: string[];
  services: string[];
  rating?: number;
  isActive: boolean;
  workingHours?: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  plan: string;
  city: string;
  type?: string;
  specialty?: string;
  name?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResponse {
  providers: Provider[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  filters: SearchFilters;
}

export interface FilterOptions {
  cities: string[];
  specialties: string[];
  plans: string[];
  types: string[];
  neighborhoods: string[];
}
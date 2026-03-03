// In-memory data store for development
export interface Provider {
  _id: string;
  name: string;
  type: 'HOSPITAL' | 'CLINICA' | 'LABORATORIO' | 'CONSULTORIO' | 'MEDICO' | 'SERVICO_ESPECIALIZADO';
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    neighborhood?: string;
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
      open?: string;
      close?: string;
      closed?: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export const providersData: Provider[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Hospital OftalmolÃ³gico de BrasÃ­lia',
    type: 'HOSPITAL',
    address: {
      street: 'SGAS Q 607 CON J',
      number: 'S/N',
      district: 'Asa Sul',
      city: 'BrasÃ­lia',
      state: 'DF',
      zipCode: '70200-670',
      coordinates: {
        lat: -15.8267,
        lng: -47.9218
      }
    },
    contact: {
      phone: '(61) 3442-4000',
      whatsapp: '(61) 3442-4034',
      website: 'https://hob.com.br'
    },
    specialties: ['Biometria UltrassÃ´nica', 'Campimetria Computadorizada', 'Ceratoscopia Computadorizada', 'Curva Tensional DiÃ¡ria'],
    plans: ['Plano Premium', 'Plano Standard', 'Plano Basic'],
    services: ['Consultas', 'Exames', 'Cirurgias', 'EmergÃªncia'],
    rating: 4.5,
    isActive: true,
    workingHours: {
      'segunda': { open: '07:00', close: '18:00' },
      'terca': { open: '07:00', close: '18:00' },
      'quarta': { open: '07:00', close: '18:00' },
      'quinta': { open: '07:00', close: '18:00' },
      'sexta': { open: '07:00', close: '18:00' },
      'sabado': { open: '08:00', close: '12:00' },
      'domingo': { closed: true }
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Hospital Brasiliense',
    type: 'HOSPITAL',
    address: {
      street: 'SEPS 713/913 0 - QUADRN SEPS 713/913',
      number: '0',
      district: 'Asa Sul',
      city: 'BrasÃ­lia',
      state: 'DF',
      zipCode: '70390-145',
      coordinates: {
        lat: -15.8195,
        lng: -47.8956
      }
    },
    contact: {
      phone: '(61) 3255-4106',
      whatsapp: '(61) 99999-0000'
    },
    specialties: ['Alergia e Imunologia', 'Anestesiologia', 'Cardiologia', 'Cirurgia Buco Maxilo Facial - Dent', 'Cirurgia do Aparelho Digestivo', 'Cirurgia Vascular'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas', 'Exames', 'Cirurgias', 'UTI', 'Pronto Socorro'],
    rating: 4.2,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'Hospital Pacini',
    type: 'HOSPITAL',
    address: {
      street: 'SEPS 715/915 715',
      number: 'A',
      district: 'Asa Sul',
      city: 'BrasÃ­lia',
      state: 'DF',
      zipCode: '70390-155',
      coordinates: {
        lat: -15.8201,
        lng: -47.8945
      }
    },
    contact: {
      phone: '61-3214-4777'
    },
    specialties: ['Angiofluoresceinografia', 'Avaliacao de Vias Lacrimais', 'Betarapia', 'Biometria UltrassÃ´nica', 'Campimetria Computadorizada'],
    plans: ['Plano Premium', 'Plano Standard', 'Plano Basic'],
    services: ['Consultas', 'Exames', 'Cirurgias'],
    rating: 4.0,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'Mantevida Servicos Hospitalares',
    type: 'HOSPITAL',
    address: {
      street: 'SGAN 608 MÃ“DULO F',
      number: '1',
      district: 'Asa Norte',
      city: 'BrasÃ­lia',
      state: 'DF',
      zipCode: '70830-030'
    },
    contact: {
      phone: '6132221111'
    },
    specialties: ['Angiologia', 'Cardiologia', 'Cirurgia da Mao', 'Cirurgia de Cabeca e Pescoco', 'Cirurgia Oncologica', 'Cirurgia Vascular', 'Clinica'],
    plans: ['Plano Premium', 'Plano Basic'],
    services: ['Consultas', 'Exames', 'Cirurgias', 'InternaÃ§Ã£o'],
    rating: 3.8,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439015',
    name: 'ClÃ­nica CardiolÃ³gica BrasÃ­lia',
    type: 'CLINICA',
    address: {
      street: 'SQN 210 Bloco H',
      number: '105',
      district: 'Asa Norte',
      city: 'BrasÃ­lia',
      state: 'DF',
      zipCode: '70852-080'
    },
    contact: {
      phone: '(61) 3274-8900',
      whatsapp: '(61) 99988-7766'
    },
    specialties: ['Cardiologia', 'Cardiologia Intervencionista', 'Ecocardiografia', 'Eletrocardiograma'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas', 'Exames CardiolÃ³gicos'],
    rating: 4.7,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'LaboratÃ³rio Sabin',
    type: 'LABORATORIO',
    address: {
      street: 'SMHN Quadra 2 Conjunto A Bloco 1',
      number: 'TÃ©rreo',
      district: 'Asa Norte',
      city: 'BrasÃ­lia',
      state: 'DF',
      zipCode: '70710-100'
    },
    contact: {
      phone: '(61) 3445-8000',
      website: 'https://sabin.com.br'
    },
    specialties: ['AnÃ¡lises ClÃ­nicas', 'BioquÃ­mica', 'Hematologia', 'Microbiologia', 'Parasitologia'],
    plans: ['Plano Premium', 'Plano Standard', 'Plano Basic'],
    services: ['Exames Laboratoriais', 'Coleta Domiciliar'],
    rating: 4.3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439017',
    name: 'ConsultÃ³rio Dr. Silva - Ortopedia',
    type: 'CONSULTORIO',
    address: {
      street: 'SQS 116 Bloco F',
      number: '201',
      district: 'Asa Sul',
      city: 'BrasÃ­lia',
      state: 'DF',
      zipCode: '70390-060'
    },
    contact: {
      phone: '(61) 3245-9876',
      whatsapp: '(61) 99876-5432'
    },
    specialties: ['Ortopedia', 'Traumatologia', 'Medicina do Esporte'],
    plans: ['Plano Premium'],
    services: ['Consultas', 'Pequenos Procedimentos'],
    rating: 4.9,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439018',
    name: 'Hospital das ClÃ­nicas',
    type: 'HOSPITAL',
    address: {
      street: 'Rua Dr. OvÃ­dio Pires de Campos',
      number: '225',
      district: 'Cerqueira CÃ©sar',
      city: 'SÃ£o Paulo',
      state: 'SP',
      zipCode: '05403-010'
    },
    contact: {
      phone: '(11) 2661-0000'
    },
    specialties: ['Cardiologia', 'Neurologia', 'Oncologia', 'Pediatria', 'Ginecologia'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas', 'Exames', 'Cirurgias', 'UTI', 'EmergÃªncia'],
    rating: 4.6,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439019',
    name: 'Hospital Copacabana',
    type: 'HOSPITAL',
    address: {
      street: 'Rua Figueiredo MagalhÃ£es',
      number: '875',
      district: 'Copacabana',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22031-011'
    },
    contact: {
      phone: '(21) 2545-4000'
    },
    specialties: ['Cardiologia', 'Gastroenterologia', 'Urologia', 'Dermatologia'],
    plans: ['Plano Premium', 'Plano Standard', 'Plano Basic'],
    services: ['Consultas', 'Exames', 'Cirurgias', 'Check-up'],
    rating: 4.4,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439020',
    name: 'Dr. Carlos Silva',
    type: 'MEDICO',
    address: {
      street: 'Av. Paulista',
      number: '1000',
      district: 'Bela Vista',
      city: 'SÃ£o Paulo',
      state: 'SP',
      zipCode: '01311-100',
      neighborhood: 'Bela Vista',
      coordinates: {
        lat: -23.5505,
        lng: -46.6333
      }
    },
    contact: {
      phone: '(11) 3283-1234'
    },
    specialties: ['ClÃ­nica Geral', 'Dermatologia'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas'],
    rating: 4.7,
    isActive: true,
    workingHours: {
      'segunda': { open: '08:30', close: '17:00' },
      'terca': { open: '08:30', close: '17:00' },
      'quarta': { open: '08:30', close: '17:00' },
      'quinta': { open: '08:30', close: '17:00' },
      'sexta': { open: '08:30', close: '17:00' },
      'sabado': { closed: true },
      'domingo': { closed: true }
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439021',
    name: 'ClÃ­nica de Fisioterapia Especializada',
    type: 'SERVICO_ESPECIALIZADO',
    address: {
      street: 'Rua das Flores',
      number: '500',
      district: 'Vila Mariana',
      city: 'SÃ£o Paulo',
      state: 'SP',
      zipCode: '04006-000',
      neighborhood: 'Vila Mariana',
      coordinates: {
        lat: -23.6035,
        lng: -46.5858
      }
    },
    contact: {
      phone: '(11) 5555-6789'
    },
    specialties: ['Fisioterapia', 'Pilates TerapÃªutico', 'ReabilitaÃ§Ã£o'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas', 'SessÃµes de Fisioterapia'],
    rating: 4.5,
    isActive: true,
    workingHours: {
      'segunda': { open: '07:00', close: '20:00' },
      'terca': { open: '07:00', close: '20:00' },
      'quarta': { open: '07:00', close: '20:00' },
      'quinta': { open: '07:00', close: '20:00' },
      'sexta': { open: '07:00', close: '20:00' },
      'sabado': { open: '08:00', close: '14:00' },
      'domingo': { closed: true }
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439022',
    name: 'Clinica Santa Helena DF',
    type: 'CLINICA',
    address: {
      street: 'SHIS QI 15 Conjunto 8',
      number: '12',
      district: 'Lago Sul',
      city: 'Brasilia',
      state: 'DF',
      zipCode: '71635-280',
      neighborhood: 'Lago Sul',
      coordinates: {
        lat: -15.8435,
        lng: -47.8611
      }
    },
    contact: {
      phone: '(61) 3344-1001',
      whatsapp: '(61) 99810-1001'
    },
    specialties: ['Clinica Geral', 'Ginecologia', 'Pediatria'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas', 'Exames'],
    rating: 4.4,
    isActive: true,
    workingHours: {
      'segunda': { open: '08:00', close: '19:00' },
      'terca': { open: '08:00', close: '19:00' },
      'quarta': { open: '08:00', close: '19:00' },
      'quinta': { open: '08:00', close: '19:00' },
      'sexta': { open: '08:00', close: '19:00' },
      'sabado': { open: '08:00', close: '13:00' },
      'domingo': { closed: true }
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439023',
    name: 'Laboratorio Vida Norte',
    type: 'LABORATORIO',
    address: {
      street: 'CLN 312 Bloco B',
      number: '22',
      district: 'Asa Norte',
      city: 'Brasilia',
      state: 'DF',
      zipCode: '70765-520',
      neighborhood: 'Asa Norte',
      coordinates: {
        lat: -15.7588,
        lng: -47.8894
      }
    },
    contact: {
      phone: '(61) 3030-2200'
    },
    specialties: ['Analises Clinicas', 'Hematologia', 'Bioquimica'],
    plans: ['Plano Premium', 'Plano Standard', 'Plano Basic'],
    services: ['Exames Laboratoriais', 'Check-up'],
    rating: 4.1,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439024',
    name: 'Hospital Paulista Prime',
    type: 'HOSPITAL',
    address: {
      street: 'Rua Vergueiro',
      number: '2250',
      district: 'Vila Mariana',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: '04101-200',
      neighborhood: 'Vila Mariana',
      coordinates: {
        lat: -23.5874,
        lng: -46.6345
      }
    },
    contact: {
      phone: '(11) 4004-2200',
      whatsapp: '(11) 99876-2200'
    },
    specialties: ['Ortopedia', 'Cardiologia', 'Neurologia'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas', 'Exames', 'Internacao', 'Cirurgias'],
    rating: 4.6,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '507f1f77bcf86cd799439025',
    name: 'Centro Medico Paulista Sul',
    type: 'SERVICO_ESPECIALIZADO',
    address: {
      street: 'Avenida Santo Amaro',
      number: '4550',
      district: 'Brooklin',
      city: 'Sao Paulo',
      state: 'SP',
      zipCode: '04556-300',
      neighborhood: 'Brooklin',
      coordinates: {
        lat: -23.6289,
        lng: -46.6978
      }
    },
    contact: {
      phone: '(11) 3333-9090',
      website: 'https://centromedicopaulistasul.com.br'
    },
    specialties: ['Endocrinologia', 'Clinica Geral', 'Nutrologia'],
    plans: ['Plano Premium', 'Plano Basic'],
    services: ['Consultas', 'Programas Preventivos'],
    rating: 4.3,
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

// Helper functions for in-memory operations
export function getAllProviders(): Provider[] {
  return providersData.filter(p => p.isActive);
}

export function getProviderById(id: string): Provider | undefined {
  return providersData.find(p => p._id === id && p.isActive);
}

export function getDistinctCities(): string[] {
  const cities = [...new Set(providersData.filter(p => p.isActive).map(p => p.address.city))];
  return cities.sort();
}

export function getDistinctSpecialties(): string[] {
  const specialties = [...new Set(providersData.filter(p => p.isActive).flatMap(p => p.specialties))];
  return specialties.sort();
}

export function getDistinctPlans(): string[] {
  const plans = [...new Set(providersData.filter(p => p.isActive).flatMap(p => p.plans))];
  return plans.sort();
}

export function getDistinctTypes(): string[] {
  const types = [...new Set(providersData.filter(p => p.isActive).map(p => p.type))];
  return types.sort();
}

export function getDistinctNeighborhoods(): string[] {
  const neighborhoods = [...new Set(providersData.filter(p => p.isActive).map(p => p.address.neighborhood || p.address.district))];
  return neighborhoods.sort();
}

export function searchProviders(filters: any): { providers: Provider[], total: number } {
  let results = getAllProviders();

  // Filter by plan
  if (filters.plan) {
    results = results.filter(p => p.plans.includes(filters.plan));
  }

  // Filter by city
  if (filters.city && filters.city !== 'mais-proxima') {
    results = results.filter(p => p.address.city.toLowerCase().includes(filters.city.toLowerCase()));
  }

  // Filter by type
  if (filters.type) {
    results = results.filter(p => p.type === filters.type);
  }

  // Filter by specialty
  if (filters.specialty) {
    results = results.filter(p => p.specialties.includes(filters.specialty));
  }

  // Filter by name (search in name and specialties)
  if (filters.name) {
    const searchTerm = filters.name.toLowerCase();
    results = results.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.specialties.some(s => s.toLowerCase().includes(searchTerm))
    );
  }

  // Sort results
  if (filters.sortBy) {
    const sortField = filters.sortBy;
    const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
    
    results.sort((a, b) => {
      let aVal: any, bVal: any;
      
      if (sortField === 'city') {
        aVal = a.address.city;
        bVal = b.address.city;
      } else {
        aVal = (a as any)[sortField];
        bVal = (b as any)[sortField];
      }
      
      if (typeof aVal === 'string') {
        return aVal.localeCompare(bVal) * sortOrder;
      }
      
      if (aVal < bVal) return -1 * sortOrder;
      if (aVal > bVal) return 1 * sortOrder;
      return 0;
    });
  }

  const total = results.length;
  
  // Pagination
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 10;
  const skip = (page - 1) * limit;
  
  results = results.slice(skip, skip + limit);

  return { providers: results, total };
}

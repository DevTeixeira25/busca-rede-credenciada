import mongoose from 'mongoose';
import Provider from '../models/Provider';
import dotenv from 'dotenv';

dotenv.config();

const sampleProviders = [
  {
    name: 'Hospital Oftalmológico de Brasília',
    type: 'HOSPITAL',
    address: {
      street: 'SGAS Q 607 CON J',
      number: 'S/N',
      district: 'Asa Sul',
      city: 'Brasília',
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
    specialties: ['Biometria Ultrassônica', 'Campimetria Computadorizada', 'Ceratoscopia Computadorizada', 'Curva Tensional Diária'],
    plans: ['Plano Premium', 'Plano Standard', 'Plano Basic'],
    services: ['Consultas', 'Exames', 'Cirurgias', 'Emergência'],
    rating: 4.5,
    workingHours: {
      'segunda': { open: '07:00', close: '18:00' },
      'terca': { open: '07:00', close: '18:00' },
      'quarta': { open: '07:00', close: '18:00' },
      'quinta': { open: '07:00', close: '18:00' },
      'sexta': { open: '07:00', close: '18:00' },
      'sabado': { open: '08:00', close: '12:00' },
      'domingo': { closed: true }
    }
  },
  {
    name: 'Hospital Brasiliense',
    type: 'HOSPITAL',
    address: {
      street: 'SEPS 713/913 0 - QUADRN SEPS 713/913',
      number: '0',
      district: 'Asa Sul',
      city: 'Brasília',
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
    rating: 4.2
  },
  {
    name: 'Hospital Pacini',
    type: 'HOSPITAL',
    address: {
      street: 'SEPS 715/915 715',
      number: 'A',
      district: 'Asa Sul',
      city: 'Brasília',
      state: 'DF',
      zipCode: '70390-155',
      coordinates: {
        lat: -15.8201,
        lng: -47.8945
      }
    },
    contact: {
      phone: '61-3214-4777',
      phone2: '(61) 3214-4760'
    },
    specialties: ['Angiofluoresceinografia', 'Avaliacao de Vias Lacrimais', 'Betarapia', 'Biometria Ultrassônica', 'Campimetria Computadorizada'],
    plans: ['Plano Premium', 'Plano Standard', 'Plano Basic'],
    services: ['Consultas', 'Exames', 'Cirurgias'],
    rating: 4.0
  },
  {
    name: 'Mantevida Servicos Hospitalares',
    type: 'HOSPITAL',
    address: {
      street: 'SGAN 608 MÓDULO F',
      number: '1',
      district: 'Asa Norte',
      city: 'Brasília',
      state: 'DF',
      zipCode: '70830-030'
    },
    contact: {
      phone: '6132221111'
    },
    specialties: ['Angiologia', 'Cardiologia', 'Cirurgia da Mao', 'Cirurgia de Cabeca e Pescoco', 'Cirurgia Oncologica', 'Cirurgia Vascular', 'Clinica'],
    plans: ['Plano Premium', 'Plano Basic'],
    services: ['Consultas', 'Exames', 'Cirurgias', 'Internação'],
    rating: 3.8
  },
  {
    name: 'Clínica Cardiológica Brasília',
    type: 'CLINICA',
    address: {
      street: 'SQN 210 Bloco H',
      number: '105',
      district: 'Asa Norte',
      city: 'Brasília',
      state: 'DF',
      zipCode: '70852-080'
    },
    contact: {
      phone: '(61) 3274-8900',
      whatsapp: '(61) 99988-7766'
    },
    specialties: ['Cardiologia', 'Cardiologia Intervencionista', 'Ecocardiografia', 'Eletrocardiograma'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas', 'Exames Cardiológicos'],
    rating: 4.7
  },
  {
    name: 'Laboratório Sabin',
    type: 'LABORATORIO',
    address: {
      street: 'SMHN Quadra 2 Conjunto A Bloco 1',
      number: 'Térreo',
      district: 'Asa Norte',
      city: 'Brasília',
      state: 'DF',
      zipCode: '70710-100'
    },
    contact: {
      phone: '(61) 3445-8000',
      website: 'https://sabin.com.br'
    },
    specialties: ['Análises Clínicas', 'Bioquímica', 'Hematologia', 'Microbiologia', 'Parasitologia'],
    plans: ['Plano Premium', 'Plano Standard', 'Plano Basic'],
    services: ['Exames Laboratoriais', 'Coleta Domiciliar'],
    rating: 4.3
  },
  {
    name: 'Consultório Dr. Silva - Ortopedia',
    type: 'CONSULTORIO',
    address: {
      street: 'SQS 116 Bloco F',
      number: '201',
      district: 'Asa Sul',
      city: 'Brasília',
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
    rating: 4.9
  },
  // São Paulo
  {
    name: 'Hospital das Clínicas',
    type: 'HOSPITAL',
    address: {
      street: 'Rua Dr. Ovídio Pires de Campos',
      number: '225',
      district: 'Cerqueira César',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '05403-010'
    },
    contact: {
      phone: '(11) 2661-0000'
    },
    specialties: ['Cardiologia', 'Neurologia', 'Oncologia', 'Pediatria', 'Ginecologia'],
    plans: ['Plano Premium', 'Plano Standard'],
    services: ['Consultas', 'Exames', 'Cirurgias', 'UTI', 'Emergência'],
    rating: 4.6
  },
  // Rio de Janeiro
  {
    name: 'Hospital Copacabana',
    type: 'HOSPITAL',
    address: {
      street: 'Rua Figueiredo Magalhães',
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
    rating: 4.4
  }
];

async function seedDatabase() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guia-medico');
    console.log('📅 Connected to MongoDB for seeding');

    // Limpar dados existentes
    await Provider.deleteMany({});
    console.log('🗑️  Cleared existing providers');

    // Inserir dados de exemplo
    await Provider.insertMany(sampleProviders);
    console.log(`✅ Inserted ${sampleProviders.length} sample providers`);

    console.log('🌱 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Executar seed apenas se chamado diretamente
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
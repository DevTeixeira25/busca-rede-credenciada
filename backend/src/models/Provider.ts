import mongoose, { Schema, Document } from 'mongoose';

export interface IProvider extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProviderSchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['HOSPITAL', 'CLINICA', 'LABORATORIO', 'CONSULTORIO'],
    index: true
  },
  address: {
    street: { type: String, required: true },
    number: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  contact: {
    phone: { type: String },
    whatsapp: { type: String },
    email: { type: String },
    website: { type: String }
  },
  specialties: [{ type: String, index: true }],
  plans: [{ type: String, required: true, index: true }],
  services: [{ type: String }],
  rating: { type: Number, min: 0, max: 5 },
  isActive: { type: Boolean, default: true },
  workingHours: {
    type: Map,
    of: {
      open: String,
      close: String,
      closed: { type: Boolean, default: false }
    }
  }
}, {
  timestamps: true
});

// Índices compostos para busca otimizada
ProviderSchema.index({ city: 1, type: 1 });
ProviderSchema.index({ city: 1, specialties: 1 });
ProviderSchema.index({ plans: 1, city: 1 });
ProviderSchema.index({ name: 'text', specialties: 'text' });

export default mongoose.model<IProvider>('Provider', ProviderSchema);
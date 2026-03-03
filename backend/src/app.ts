import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import providersRoutes from './routes/providers';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200'
}));
app.use(express.json());

// Routes
app.use('/api/providers', providersRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Guia Médico API está funcionando! 🏥' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📅 Database: In-Memory (para desenvolvimento)`);
});

export default app;
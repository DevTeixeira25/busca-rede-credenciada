import express from 'express';
import { 
  getAllProviders, 
  searchProviders, 
  getDistinctCities, 
  getDistinctSpecialties, 
  getDistinctPlans, 
  getDistinctTypes,
  getDistinctNeighborhoods,
  getProviderById
} from '../data/providers';
import { searchProvidersOracle } from '../data/providers.oracle';

const router = express.Router();

// GET /api/providers/search - Busca avançada com filtros obrigatórios
router.get('/search', async (req, res) => {
  try {
    const {
      plan,
      city,
      type,
      specialty,
      name,
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Validação dos campos obrigatórios
    if (!plan || !city) {
      return res.status(400).json({
        error: 'Campos obrigatórios: plano e cidade devem ser informados'
      });
    }

    if (!type && !specialty) {
      return res.status(400).json({
        error: 'Deve ser informado pelo menos um: tipo de prestador ou especialidade'
      });
    }

    // Executar busca com filtros
    const dataSource = (process.env.DATA_SOURCE || 'inmemory').toLowerCase();
    const result = dataSource === 'oracle'
      ? await searchProvidersOracle({
          plan: plan as string,
          city: city as string,
          type: type as string,
          specialty: specialty as string,
          name: name as string,
          page: page as string,
          limit: limit as string,
          sortBy: sortBy as string,
          sortOrder: sortOrder as string
        })
      : searchProviders({
          plan,
          city,
          type,
          specialty,
          name,
          page,
          limit,
          sortBy,
          sortOrder
        });

    res.json({
      providers: result.providers,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: result.total,
        pages: Math.ceil(result.total / parseInt(limit as string))
      },
      filters: {
        plan,
        city,
        type,
        specialty,
        name
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/providers/filters - Obter opções para filtros
router.get('/filters', async (req, res) => {
  try {
    const filters = {
      cities: getDistinctCities(),
      specialties: getDistinctSpecialties(),
      plans: getDistinctPlans(),
      types: getDistinctTypes(),
      neighborhoods: getDistinctNeighborhoods()
    };

    res.json(filters);
  } catch (error) {
    console.error('Filters error:', error);
    res.status(500).json({ error: 'Erro ao carregar filtros' });
  }
});

// GET /api/providers/:id - Obter detalhes de um prestador
router.get('/:id', async (req, res) => {
  try {
    const provider = getProviderById(req.params.id);
    
    if (!provider) {
      return res.status(404).json({ error: 'Prestador não encontrado' });
    }

    res.json(provider);
  } catch (error) {
    console.error('Get provider error:', error);
    res.status(500).json({ error: 'Erro ao buscar prestador' });
  }
});

// GET /api/providers - Listar todos os prestadores
router.get('/', async (req, res) => {
  try {
    const providers = getAllProviders();
    
    res.json({
      success: true,
      data: providers,
      total: providers.length
    });
  } catch (error) {
    console.error('List providers error:', error);
    res.status(500).json({ error: 'Erro ao listar prestadores' });
  }
});

export default router;

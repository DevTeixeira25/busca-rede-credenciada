import type { Provider } from './providers';

type SearchFilters = {
  plan?: string;
  city?: string;
  type?: string;
  specialty?: string;
  name?: string;
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: string;
};

type OracleRow = Record<string, unknown>;

function toStringValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value);
}

function toStringArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => String(item));
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toNumberValue(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não definida: ${name}`);
  }
  return value;
}

function getOracleModule(): any {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const oracledb = require('oracledb');
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    return oracledb;
  } catch (error) {
    throw new Error(
      'Driver Oracle não encontrado. Instale a dependência "oracledb" no backend.'
    );
  }
}

async function withOracleConnection<T>(handler: (connection: any) => Promise<T>): Promise<T> {
  const oracledb = getOracleModule();
  const connection = await oracledb.getConnection({
    user: getRequiredEnv('ORACLE_USER'),
    password: getRequiredEnv('ORACLE_PASSWORD'),
    connectString: getRequiredEnv('ORACLE_CONNECT_STRING')
  });

  try {
    return await handler(connection);
  } finally {
    await connection.close();
  }
}

function getSearchSql(): string {
  // Query padrão: exige que o prestador esteja na rede (itrede_atendimento).
  return (
    process.env.ORACLE_SEARCH_SQL ||
    `
      SELECT
        p.CD_PRESTADOR AS PROVIDER_ID,
        p.NM_PRESTADOR AS PROVIDER_NAME,
        p.TP_PRESTADOR AS PROVIDER_TYPE,
        p.DS_LOGRADOURO AS STREET,
        p.NR_ENDERECO AS NUMBER_VALUE,
        p.DS_BAIRRO AS DISTRICT,
        p.DS_CIDADE AS CITY,
        p.SG_UF AS STATE,
        p.NR_CEP AS ZIP_CODE,
        p.NR_TELEFONE AS PHONE,
        p.NR_WHATSAPP AS WHATSAPP,
        p.DS_SITE AS WEBSITE,
        p.DS_ESPECIALIDADES AS SPECIALTIES,
        p.DS_PLANOS AS PLANS,
        p.DS_SERVICOS AS SERVICES,
        p.NR_AVALIACAO AS RATING
      FROM IPRESTADOR p
      WHERE EXISTS (
        SELECT 1
        FROM ITREDE_ATENDIMENTO ra
        WHERE ra.CD_PRESTADOR = p.CD_PRESTADOR
      )
      AND (:plan IS NULL OR p.DS_PLANOS LIKE '%' || :plan || '%')
      AND (:city IS NULL OR UPPER(p.DS_CIDADE) LIKE '%' || UPPER(:city) || '%')
      AND (:type IS NULL OR p.TP_PRESTADOR = :type)
      AND (:specialty IS NULL OR p.DS_ESPECIALIDADES LIKE '%' || :specialty || '%')
      AND (:name IS NULL OR UPPER(p.NM_PRESTADOR) LIKE '%' || UPPER(:name) || '%')
      ORDER BY p.NM_PRESTADOR
      OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
    `
  );
}

function getCountSql(): string {
  return (
    process.env.ORACLE_COUNT_SQL ||
    `
      SELECT COUNT(1) AS TOTAL
      FROM IPRESTADOR p
      WHERE EXISTS (
        SELECT 1
        FROM ITREDE_ATENDIMENTO ra
        WHERE ra.CD_PRESTADOR = p.CD_PRESTADOR
      )
      AND (:plan IS NULL OR p.DS_PLANOS LIKE '%' || :plan || '%')
      AND (:city IS NULL OR UPPER(p.DS_CIDADE) LIKE '%' || UPPER(:city) || '%')
      AND (:type IS NULL OR p.TP_PRESTADOR = :type)
      AND (:specialty IS NULL OR p.DS_ESPECIALIDADES LIKE '%' || :specialty || '%')
      AND (:name IS NULL OR UPPER(p.NM_PRESTADOR) LIKE '%' || UPPER(:name) || '%')
    `
  );
}

function mapOracleRowToProvider(row: OracleRow): Provider {
  return {
    _id: toStringValue(row.PROVIDER_ID || row.CD_PRESTADOR),
    name: toStringValue(row.PROVIDER_NAME || row.NM_PRESTADOR),
    type: (toStringValue(row.PROVIDER_TYPE || row.TP_PRESTADOR || 'CLINICA') as Provider['type']),
    address: {
      street: toStringValue(row.STREET || row.DS_LOGRADOURO),
      number: toStringValue(row.NUMBER_VALUE || row.NR_ENDERECO),
      district: toStringValue(row.DISTRICT || row.DS_BAIRRO),
      city: toStringValue(row.CITY || row.DS_CIDADE),
      state: toStringValue(row.STATE || row.SG_UF),
      zipCode: toStringValue(row.ZIP_CODE || row.NR_CEP),
      neighborhood: toStringValue(row.NEIGHBORHOOD || row.DS_BAIRRO) || undefined
    },
    contact: {
      phone: toStringValue(row.PHONE || row.NR_TELEFONE) || undefined,
      whatsapp: toStringValue(row.WHATSAPP || row.NR_WHATSAPP) || undefined,
      website: toStringValue(row.WEBSITE || row.DS_SITE) || undefined
    },
    specialties: toStringArray(row.SPECIALTIES || row.DS_ESPECIALIDADES),
    plans: toStringArray(row.PLANS || row.DS_PLANOS),
    services: toStringArray(row.SERVICES || row.DS_SERVICOS),
    rating: toNumberValue(row.RATING || row.NR_AVALIACAO),
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export async function searchProvidersOracle(
  filters: SearchFilters
): Promise<{ providers: Provider[]; total: number }> {
  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);
  const offset = (page - 1) * limit;

  const binds = {
    plan: filters.plan || null,
    city: filters.city || null,
    type: filters.type || null,
    specialty: filters.specialty || null,
    name: filters.name || null,
    offset,
    limit
  };

  return withOracleConnection(async (connection) => {
    const [rowsResult, countResult] = await Promise.all([
      connection.execute(getSearchSql(), binds),
      connection.execute(getCountSql(), binds)
    ]);

    const rows = (rowsResult.rows || []) as OracleRow[];
    const countRows = (countResult.rows || []) as OracleRow[];
    const total = Number(countRows[0]?.TOTAL || 0);

    return {
      providers: rows.map(mapOracleRowToProvider),
      total
    };
  });
}


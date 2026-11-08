// CORS compartilhado das Edge Functions.
// Só ecoa o header Access-Control-Allow-Origin quando o origin da request está na lista permitida.

const DEFAULT_PRODUCTION_ORIGIN = 'https://www.mathops.com.br'

// Domínios de produção conhecidos do site (além da URL definida em ALLOWED_ORIGIN).
const KNOWN_PRODUCTION_ORIGINS = [
  'https://www.mathops.com.br',
  'https://mathops.com.br',
  'https://www.mathopsstrategy.com.br',
  'https://mathopsstrategy.com.br',
]

const LOCALHOST_ORIGIN_PATTERN = /^http:\/\/localhost(:\d+)?$/

const ALLOW_METHODS = 'GET, POST, PUT, DELETE, OPTIONS'
const ALLOW_HEADERS =
  'authorization, x-client-info, x-supabase-client-platform, apikey, content-type'

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/+$/, '')
}

// ALLOWED_ORIGIN pode trazer uma ou mais URLs separadas por vírgula.
function getEnvOrigins(): string[] {
  const raw = Deno.env.get('ALLOWED_ORIGIN') ?? ''
  return raw
    .split(',')
    .map(normalizeOrigin)
    .filter((origin) => origin.length > 0)
}

function getAllowedOrigins(): string[] {
  const envOrigins = getEnvOrigins()
  const primary = envOrigins.length > 0 ? envOrigins : [DEFAULT_PRODUCTION_ORIGIN]
  return Array.from(new Set([...primary, ...KNOWN_PRODUCTION_ORIGINS]))
}

function isAllowedOrigin(origin: string): boolean {
  if (LOCALHOST_ORIGIN_PATTERN.test(origin)) return true
  return getAllowedOrigins().includes(normalizeOrigin(origin))
}

/**
 * Headers CORS para a request recebida. O Allow-Origin só aparece se o origin
 * da request estiver na lista permitida; caso contrário, nenhum header de origin é emitido.
 */
export function getCorsHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': ALLOW_METHODS,
    'Access-Control-Allow-Headers': ALLOW_HEADERS,
    Vary: 'Origin',
  }

  const origin = request.headers.get('Origin')
  if (origin && isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = normalizeOrigin(origin)
  }

  return headers
}

/**
 * Mantido para compatibilidade com funções que ainda importam `corsHeaders`.
 * Aponta apenas para a origin de produção; para respostas dinâmicas use getCorsHeaders(request).
 */
export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': getEnvOrigins()[0] ?? DEFAULT_PRODUCTION_ORIGIN,
  'Access-Control-Allow-Methods': ALLOW_METHODS,
  'Access-Control-Allow-Headers': ALLOW_HEADERS,
  Vary: 'Origin',
}

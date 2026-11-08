// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from 'jsr:@supabase/server@^1'
import { randomUUID } from 'node:crypto'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Whitelist de tipos permitidos. O file.type informado pelo cliente só é usado
// para a checagem inicial; a validação real é feita pelos magic bytes abaixo.
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

type DetectedType = { mime: string; ext: string; matches: (b: Uint8Array) => boolean }

const SIGNATURES: DetectedType[] = [
  {
    mime: 'image/jpeg',
    ext: 'jpg',
    matches: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  {
    mime: 'image/png',
    ext: 'png',
    matches: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  {
    mime: 'image/webp',
    ext: 'webp',
    // "RIFF" nos bytes 0..3 e "WEBP" nos bytes 8..11
    matches: (b) =>
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 &&
      b[8] === 0x57 &&
      b[9] === 0x45 &&
      b[10] === 0x42 &&
      b[11] === 0x50,
  },
  {
    mime: 'image/gif',
    ext: 'gif',
    matches: (b) => b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38,
  },
]

function detectImageType(head: Uint8Array): DetectedType | null {
  return SIGNATURES.find((sig) => sig.matches(head)) ?? null
}

// Remove diretórios (../, /, \), e qualquer caractere fora de [A-Za-z0-9._-].
function sanitizeFileName(rawName: string): string {
  const base = rawName.split(/[\\/]/).pop() ?? ''
  const cleaned = base
    .replace(/\.\.+/g, '.')
    .replace(/[^A-Za-z0-9._-]+/g, '_')
    .replace(/^[._]+/, '')
    .slice(0, 100)
  return cleaned || 'arquivo'
}

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 })
}

export default {
  fetch: withSupabase({ auth: 'publishable' }, async (req, { supabase }) => {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return badRequest('Nenhum arquivo enviado.')
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return badRequest('Tipo de arquivo não permitido. Envie apenas JPEG, PNG, WebP ou GIF.')
    }

    if (file.size <= 0) {
      return badRequest('O arquivo enviado está vazio.')
    }

    if (file.size > MAX_FILE_SIZE) {
      return badRequest('Arquivo muito grande. O limite é de 5MB.')
    }

    // Validação pelo conteúdo real do arquivo (magic bytes), não pelo tipo informado.
    const head = new Uint8Array(await file.slice(0, 12).arrayBuffer())
    const detected = detectImageType(head)
    if (!detected) {
      return badRequest(
        'O conteúdo do arquivo não corresponde a uma imagem JPEG, PNG, WebP ou GIF válida.',
      )
    }

    const safeName = sanitizeFileName(file.name)

    // TODO: update your-bucket to the bucket you want to write files
    const { data, error } = await supabase.storage
      .from('Imagens')
      .upload(`${safeName}-${randomUUID()}`, file, { contentType: detected.mime })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ data })
  }),
}

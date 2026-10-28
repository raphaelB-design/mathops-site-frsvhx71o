import React, { useState } from 'react'
import { MapPin, ExternalLink, Navigation } from 'lucide-react'

// URL segura e oficial para navegação no Google Maps sem iframe ou APIs externas pagas
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Avenida+Brigadeiro+Faria+Lima,+1811+-+Jardim+Paulistano,+S%C3%A3o+Paulo+-+SP'

interface LocationMapVisualProps {
  className?: string
}

export const LocationMapVisual: React.FC<LocationMapVisualProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative w-full rounded-lg overflow-hidden border border-[#1E293B] bg-[#0F1626] transition-all duration-300 group hover:border-[#3B82F6]/50 shadow-md shadow-black/40 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Estético do Mapa em SVG - Tema Dark MathOps */}
      <div className="relative w-full h-36 select-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 320 150"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        >
          <defs>
            {/* Gradiente de fundo escuro premium */}
            <linearGradient id="map-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B1120" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#0A0F1D" />
            </linearGradient>

            {/* Gradiente sutil para Rio Pinheiros */}
            <linearGradient id="river-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
            </linearGradient>

            {/* Gradiente para a Av. Faria Lima */}
            <linearGradient id="faria-lima-glow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.75" />
            </linearGradient>

            {/* Pulso radial do pin */}
            <radialGradient id="pin-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>

            {/* Padrão quadriculado sutil de quadras urbanas */}
            <pattern id="urban-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#1E293B"
                strokeWidth="0.4"
                strokeOpacity="0.3"
              />
            </pattern>
          </defs>

          {/* Fundo base */}
          <rect width="320" height="150" fill="url(#map-bg)" />

          {/* Quadriculado urbano sutil */}
          <rect width="320" height="150" fill="url(#urban-grid)" />

          {/* Blocos urbanos / quadras estilizadas em tons sutis */}
          <g fill="#141E33" opacity="0.6">
            <rect x="18" y="16" width="38" height="26" rx="2" />
            <rect x="62" y="14" width="46" height="28" rx="2" />
            <rect x="18" y="48" width="48" height="32" rx="2" />
            <rect x="72" y="48" width="42" height="30" rx="2" />
            <rect x="22" y="86" width="42" height="36" rx="2" />
            <rect x="70" y="84" width="50" height="38" rx="2" />

            {/* Lado Leste / Jardins */}
            <rect x="206" y="16" width="48" height="34" rx="2" />
            <rect x="260" y="20" width="46" height="36" rx="2" />
            <rect x="194" y="58" width="52" height="36" rx="2" />
            <rect x="252" y="64" width="56" height="38" rx="2" />
            <rect x="188" y="102" width="56" height="36" rx="2" />
            <rect x="250" y="108" width="58" height="34" rx="2" />

            {/* Parque / Área verde estilizada próxima (ex: Parque do Povo / Hebraica) */}
            <path
              d="M 20 128 C 30 126, 45 130, 60 126 C 70 123, 85 125, 95 129 L 95 146 L 20 146 Z"
              fill="#102A2B"
              opacity="0.55"
            />
          </g>

          {/* Rio Pinheiros / Marginal (curva representativa a oeste de SP) */}
          <path
            d="M 4 -10 C 12 40, -4 90, 8 160"
            fill="none"
            stroke="url(#river-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Malha viária secundária (ruas transversais do Jardim Paulistano / Itaim / Pinheiros) */}
          <g stroke="#1E293B" strokeWidth="1.2" opacity="0.75" strokeLinecap="round">
            {/* Ruas transversais */}
            <line x1="10" y1="44" x2="130" y2="44" />
            <line x1="14" y1="80" x2="135" y2="80" />
            <line x1="20" y1="122" x2="140" y2="122" />

            <line x1="175" y1="28" x2="310" y2="28" />
            <line x1="170" y1="54" x2="315" y2="54" />
            <line x1="168" y1="96" x2="315" y2="96" />
            <line x1="175" y1="130" x2="310" y2="130" />

            {/* Ruas verticais e diagonais secundárias */}
            <line x1="60" y1="6" x2="60" y2="144" />
            <line x1="118" y1="8" x2="118" y2="142" />
            <line x1="200" y1="6" x2="200" y2="144" />
            <line x1="254" y1="8" x2="254" y2="142" />

            {/* Av. Rebouças / Eusébio Matoso cruzamento distante */}
            <line
              x1="10"
              y1="20"
              x2="150"
              y2="130"
              stroke="#25354E"
              strokeWidth="2.2"
              opacity="0.6"
            />
          </g>

          {/* Avenida Brigadeiro Faria Lima - Eixo viário principal (diagonal destacada com glow) */}
          {/* Sombra / Glow da via */}
          <line
            x1="126"
            y1="-10"
            x2="182"
            y2="160"
            stroke="#3B82F6"
            strokeWidth="5"
            strokeOpacity="0.18"
            strokeLinecap="round"
          />
          {/* Pista da Av. Faria Lima */}
          <line
            x1="126"
            y1="-10"
            x2="182"
            y2="160"
            stroke="url(#faria-lima-glow)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Rótulo elegante e sutil da via na vertical/diagonal */}
          <text
            x="146"
            y="26"
            fill="#64748B"
            fontSize="5.5"
            fontWeight="600"
            letterSpacing="0.8"
            transform="rotate(69 146 26)"
            className="uppercase select-none"
          >
            Av. Brig. Faria Lima
          </text>

          {/* Marcador MathOps Strategy - Pin no número 1811 (coordenada central x=154, y=74) */}
          <g transform="translate(154, 74)">
            {/* Halo pulsante animado (desativado se prefers-reduced-motion) */}
            <circle
              r="18"
              fill="url(#pin-glow)"
              className="motion-safe:animate-ping opacity-40 origin-center"
              style={{ animationDuration: '3s' }}
            />
            {/* Círculo de radar intermediário */}
            <circle
              r="10"
              fill="#3B82F6"
              fillOpacity="0.2"
              stroke="#3B82F6"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
            {/* Ponto central vivo */}
            <circle r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle r="1.5" fill="#FFFFFF" />
          </g>

          {/* Badge flutuante de localização no mapa */}
          <g transform="translate(162, 54)">
            <rect
              x="0"
              y="0"
              width="82"
              height="20"
              rx="4"
              fill="#0A0F1D"
              fillOpacity="0.9"
              stroke="#1E293B"
              strokeWidth="0.8"
            />
            <circle cx="9" cy="10" r="3" fill="#22D3EE" />
            <text x="17" y="13" fill="#F8FAFC" fontSize="7" fontWeight="600" letterSpacing="0.3">
              MathOps #1811
            </text>
          </g>

          {/* Rosa dos ventos / bússola discreta no canto superior direito */}
          <g transform="translate(300, 16)" opacity="0.5">
            <circle cx="0" cy="0" r="7" fill="none" stroke="#334155" strokeWidth="0.6" />
            <path d="M 0 -6 L 2 0 L -2 0 Z" fill="#3B82F6" />
            <path d="M 0 6 L 2 0 L -2 0 Z" fill="#475569" />
            <text x="-2" y="-8" fill="#94A3B8" fontSize="5" fontWeight="700">
              N
            </text>
          </g>

          {/* Vinheta escura nas bordas para profundidade e integração */}
          <rect
            width="320"
            height="150"
            fill="none"
            stroke="#0A0F1D"
            strokeWidth="3"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Gradiente sutil na parte inferior para mesclar com o rodapé do card */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0F1626] to-transparent pointer-events-none" />
      </div>

      {/* Barra de ação inferior para abrir direções no mapa com link externo seguro */}
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ver localização da MathOps Strategy no Google Maps (abre em nova aba)"
        className="flex items-center justify-between px-3 py-2 bg-[#0B1120]/90 border-t border-[#1E293B] text-xs text-zinc-300 hover:text-white transition-colors duration-200"
      >
        <span className="flex items-center gap-1.5 font-medium truncate">
          <Navigation className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
          <span className="truncate">Jardim Paulistano · SP</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 group-hover:text-[#3B82F6] transition-colors shrink-0">
          <span>Ver mapa</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </a>
    </div>
  )
}

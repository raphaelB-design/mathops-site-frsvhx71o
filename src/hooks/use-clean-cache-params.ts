import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Remove parâmetros de cache espúrios (como ?v=eefaa12 adicionado pela hospedagem)
 * da barra de endereço usando window.history.replaceState, sem recarregar a página
 * e sem interferir na navegação ou no scroll.
 * Se a rota for a Home ('/'), remove silenciosamente qualquer query string residual
 * ou apenas os parâmetros de cache conhecidos mantendo outros se existirem.
 */
export function cleanCacheQueryParams(pathname: string, search: string, hash: string) {
  if (typeof window === 'undefined' || !search) return

  try {
    const urlParams = new URLSearchParams(search)

    // Lista de chaves de query de cache conhecidas injetadas por CDNs / proxies / hosting
    const cacheKeys = ['v', 'version', '_v', 'cb', 'cache_bust']

    let hasCacheParam = false
    for (const key of cacheKeys) {
      if (urlParams.has(key)) {
        urlParams.delete(key)
        hasCacheParam = true
      }
    }

    // Na Home ('/'), se restarem apenas parâmetros vazios ou se a intenção for limpar
    // a barra de endereço da Home sem recarregar a página:
    if (pathname === '/') {
      // Se não sobrou nenhum parâmetro ou se havia o parâmetro v:
      // Se sobrou algum parâmetro não-cache (ex: utm_*), mantemos os úteis; se não, limpamos tudo.
      const remainingSearch = urlParams.toString()
      const newSearch = remainingSearch ? `?${remainingSearch}` : ''
      const newUrl = `${pathname}${newSearch}${hash}`
      const currentFull = `${pathname}${search}${hash}`

      if (newUrl !== currentFull) {
        window.history.replaceState(window.history.state, '', newUrl)
      }
      return
    }

    // Em outras rotas: se encontramos algum parâmetro de cache, removemos apenas ele
    if (hasCacheParam) {
      const remainingSearch = urlParams.toString()
      const newSearch = remainingSearch ? `?${remainingSearch}` : ''
      const newUrl = `${pathname}${newSearch}${hash}`
      const currentFull = `${pathname}${search}${hash}`

      if (newUrl !== currentFull) {
        window.history.replaceState(window.history.state, '', newUrl)
      }
    }
  } catch {
    // Falha silenciosa para nunca quebrar a execução do site
  }
}

export function useCleanCacheParams() {
  const location = useLocation()

  useEffect(() => {
    cleanCacheQueryParams(location.pathname, location.search, location.hash)
  }, [location.pathname, location.search, location.hash])
}

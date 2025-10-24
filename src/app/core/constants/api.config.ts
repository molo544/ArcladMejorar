/**
 * Configuración de API y constantes globales
 */

export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      ME: '/auth/me'
    },
    ALERTS: {
      BASE: '/alerts',
      BY_ID: (id: string) => `/alerts/${id}`
    }
  },
  TIMEOUT: 30000
};

export const STORAGE_KEYS = {
  TOKEN: 'arclad_token',
  REFRESH_TOKEN: 'arclad_refresh_token',
  USER: 'arclad_user',
  LANGUAGE: 'arclad_language'
};

export const DEFAULT_LANGUAGE = 'es';
export const AVAILABLE_LANGUAGES = ['es', 'pt'];

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100]
};

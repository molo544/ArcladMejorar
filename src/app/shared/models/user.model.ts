import { UserRole } from '../../core/enums/app.enums';

/**
 * Interface para el usuario autenticado
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

/**
 * Interface para la respuesta de autenticación
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

/**
 * Interface para las credenciales de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

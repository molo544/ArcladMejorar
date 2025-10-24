/**
 * Enumeraciones globales de la aplicación
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  VIEWER = 'VIEWER'
}

export enum AlertStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RESOLVED = 'RESOLVED',
  PENDING = 'PENDING'
}

export enum AlertPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum AlertType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

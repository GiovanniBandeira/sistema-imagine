// src/types/user.ts
/**
 * Basic user information used across the application.
 */
export interface User {
  uid: string;
  displayName: string;
  email: string;
  /** Optional role – e.g., 'admin' or 'operator' */
  role?: string;
}

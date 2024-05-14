export interface User {
  email: string;
  password: string;
  username: string;
  rol?: UserRole;
  id:string
}

// create a enum for the user roles, SUPER_ADMIN, ADMIN, USER
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user'
}

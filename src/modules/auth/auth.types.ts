export interface AdminUser {
  id: number;
  email: string;
  name: string;
  roles: string[];
}

export interface AdminAccount extends AdminUser {
  password: string;
  token: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AdminProfile = Omit<AdminAccount, 'password' | 'token'>;

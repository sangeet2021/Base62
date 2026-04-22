import { api } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/me');
    return response.data;
  },
};

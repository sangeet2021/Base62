import { api } from './api';

export interface Link {
  id: number;
  user_id: number;
  long_url: string;
  short_id: string;
  clicks: number;
  created_at: string;
}

export interface ShortenRequest {
  long_url: string;
}

export const linkService = {
  getAllLinks: async (): Promise<Link[]> => {
    const response = await api.get('/api/links');
    return response.data;
  },

  shortenUrl: async (data: ShortenRequest): Promise<Link> => {
    const response = await api.post('/api/shorten', data);
    return response.data;
  },

  getLinkDetails: async (id: number): Promise<Link> => {
    const response = await api.get(`/api/links/${id}`);
    return response.data;
  },
};

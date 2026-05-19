import { create } from 'zustand';
import { linkService, type Link } from '@/services/links';

interface LinkState {
  links: Link[];
  isLoading: boolean;
  error: string | null;

  fetchLinks: () => Promise<void>;
  createShortLink: (longUrl: string) => Promise<boolean>;
}

export const useLinkStore = create<LinkState>((set) => ({
  links: [],
  isLoading: false,
  error: null,

  fetchLinks: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await linkService.getAllLinks();
      set({ links: data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.error || 'Failed to fetch links',
        isLoading: false,
      });
    }
  },

  createShortLink: async (longUrl: string) => {
    set({ isLoading: true, error: null });
    try {
      const newLink = await linkService.shortenUrl({ long_url: longUrl });
      set((state) => ({
        links: [newLink, ...state.links],
        isLoading: false,
      }));
      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.error || 'Failed to shorten link',
        isLoading: false,
      });
      return false;
    }
  },
}));

import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Memo } from '@/types';

interface MemosState {
  memos: Memo[];
  isLoading: boolean;
  createMemo: (content: string) => Promise<void>;
  fetchMemos: () => Promise<void>;
  deleteMemo: (id: string) => Promise<void>;
}

export const useMemos = create<MemosState>((set, get) => ({
  memos: [],
  isLoading: true,
  createMemo: async (content) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('memos')
      .insert({
        content,
        user_id: user.id,
      });

    if (error) {
      console.error('Error creating memo:', error);
      throw new Error('Failed to create memo');
    }

    // Refresh memos after creating
    const { data, error: fetchError } = await supabase
      .from('memos')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;
    set({ memos: data || [] });
  },
  fetchMemos: async () => {
    try {
      const { data, error } = await supabase
        .from('memos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ memos: data || [], isLoading: false });
    } catch (error) {
      console.error('Error fetching memos:', error);
      set({ memos: [], isLoading: false });
      throw error;
    }
  },
  deleteMemo: async (id: string) => {
    try {
      const { error } = await supabase
        .from('memos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      const currentMemos = get().memos;
      set({ memos: currentMemos.filter(memo => memo.id !== id) });
    } catch (error) {
      console.error('Error deleting memo:', error);
      throw error;
    }
  },
}));
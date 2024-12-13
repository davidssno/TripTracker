import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { City } from '../types';
import toast from 'react-hot-toast';

interface CityStore {
  cities: City[];
  loading: boolean;
  fetchCities: () => Promise<void>;
  addCity: (city: Omit<City, 'id' | 'user_id'>) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
  updateCity: (id: string, updates: Partial<City>) => Promise<void>;
}

export const useCityStore = create<CityStore>((set, get) => ({
  cities: [],
  loading: false,

  fetchCities: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // First ensure profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        // Create profile if it doesn't exist
        const { error: insertError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: user.id,
              email: user.email,
              username: user.email?.split('@')[0],
              total_points: 0,
              total_cities: 0,
            }
          ]);

        if (insertError) throw insertError;
      }

      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('user_id', user.id)
        .order('visit_date', { ascending: false });

      if (error) throw error;
      set({ cities: data || [] });
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Failed to load cities');
    } finally {
      set({ loading: false });
    }
  },

  addCity: async (city) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Ensure profile exists before adding city
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        // Create profile if it doesn't exist
        const { error: insertError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: user.id,
              email: user.email,
              username: user.email?.split('@')[0],
              total_points: 0,
              total_cities: 0,
            }
          ]);

        if (insertError) throw insertError;
      }

      const { data, error } = await supabase
        .from('cities')
        .insert([{ ...city, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      set({ cities: [data, ...get().cities] });
      toast.success('City added successfully');
    } catch (error) {
      console.error('Error adding city:', error);
      toast.error('Failed to add city');
      throw error;
    }
  },

  deleteCity: async (id) => {
    try {
      const { error } = await supabase
        .from('cities')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set({ cities: get().cities.filter((city) => city.id !== id) });
      toast.success('City deleted successfully');
    } catch (error) {
      console.error('Error deleting city:', error);
      toast.error('Failed to delete city');
    }
  },

  updateCity: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('cities')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      set({
        cities: get().cities.map((city) =>
          city.id === id ? { ...city, ...updates } : city
        ),
      });
      toast.success('City updated successfully');
    } catch (error) {
      console.error('Error updating city:', error);
      toast.error('Failed to update city');
    }
  },
}));
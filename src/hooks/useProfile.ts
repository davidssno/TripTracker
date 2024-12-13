import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export function useProfile() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?.id) return;

    async function fetchProfile() {
      try {
        // First, check if profile exists
        const { data: existingProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            // Profile doesn't exist, create one
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .upsert([
                {
                  id: authUser.id,
                  email: authUser.email,
                  username: authUser.email?.split('@')[0],
                  total_points: 0,
                  total_cities: 0,
                }
              ])
              .select()
              .single();

            if (insertError) throw insertError;
            setProfile(newProfile);
          } else {
            throw fetchError;
          }
        } else {
          setProfile(existingProfile);
        }
      } catch (error) {
        console.error('Error fetching/creating profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [authUser?.id, authUser?.email]);

  const updateProfile = async (updates: Partial<User>) => {
    if (!authUser?.id) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authUser.id);

      if (error) throw error;
      setProfile((prev) => prev ? { ...prev, ...updates } : null);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return { profile, loading, updateProfile };
}
export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  cover_photo_url?: string;
  travel_style?: string;
  created_at: string;
  total_points: number;
  total_cities: number;
}

export interface City {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  visit_date: string;
  rating: number;
  notes?: string;
  photos?: string[];
  is_favorite: boolean;
  user_id: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  user_id: string;
  unlocked_at: string;
}
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { MapPin, Trophy, Users } from 'lucide-react';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.email}!
        </h1>
        <p className="mt-2 text-gray-600">Ready for your next adventure?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h2 className="text-xl font-semibold">Cities Visited</h2>
          </div>
          <p className="mt-4 text-3xl font-bold">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <h2 className="text-xl font-semibold">Achievements</h2>
          </div>
          <p className="mt-4 text-3xl font-bold">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-green-600" />
            <h2 className="text-xl font-semibold">Following</h2>
          </div>
          <p className="mt-4 text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="text-gray-600 text-center py-8">
          No recent activity to show. Start by adding your first city!
        </div>
      </div>
    </div>
  );
}
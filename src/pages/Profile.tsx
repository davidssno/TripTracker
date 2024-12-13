import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Camera, Edit } from 'lucide-react';

export function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
          <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
            <Camera className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <div className="h-32 w-32 bg-white rounded-full p-1">
              <div className="h-full w-full bg-gray-200 rounded-full">
                {/* Avatar will go here */}
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{user?.email}</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-600">
            No bio yet. Tell others about your travel experiences!
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-600">Cities</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Travel Timeline</h2>
        <div className="text-gray-600 text-center py-8">
          No travels recorded yet. Start adding your adventures!
        </div>
      </div>
    </div>
  );
}
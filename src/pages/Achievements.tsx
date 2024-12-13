import React from 'react';
import { Trophy } from 'lucide-react';

export function Achievements() {
  const placeholderAchievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Visit your first city',
      icon: '🌟',
      locked: true,
    },
    {
      id: 2,
      title: 'Globe Trotter',
      description: 'Visit 10 different cities',
      icon: '🌍',
      locked: true,
    },
    {
      id: 3,
      title: 'Speed Demon',
      description: 'Visit 3 cities in one day',
      icon: '⚡',
      locked: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="h-8 w-8 text-yellow-600" />
          <h1 className="text-2xl font-bold">Achievements</h1>
        </div>
        <p className="text-gray-600">
          Complete challenges and earn badges as you explore the world!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4"
          >
            <div className="text-3xl">{achievement.icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{achievement.title}</h3>
              <p className="text-gray-600 text-sm">{achievement.description}</p>
              {achievement.locked ? (
                <span className="inline-block mt-2 text-sm text-gray-500">
                  🔒 Locked
                </span>
              ) : (
                <span className="inline-block mt-2 text-sm text-green-600">
                  ✓ Unlocked
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
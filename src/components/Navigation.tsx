import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Compass, LogOut, Map, Trophy, User } from 'lucide-react';

export function Navigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">DayTrekker</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/map" className="p-2 hover:bg-gray-100 rounded-full">
              <Map className="h-6 w-6" />
            </Link>
            <Link to="/achievements" className="p-2 hover:bg-gray-100 rounded-full">
              <Trophy className="h-6 w-6" />
            </Link>
            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-6 w-6" />
            </Link>
            <button
              onClick={() => {
                signOut();
                navigate('/login');
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
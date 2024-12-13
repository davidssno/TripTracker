import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useCityStore } from '../stores/cityStore';
import { geocodeCity } from '../lib/geocoding';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCityModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [rating, setRating] = useState('5');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const addCity = useCityStore((state) => state.addCity);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const coordinates = await geocodeCity(name, country);
      
      if (!coordinates) {
        setLoading(false);
        return;
      }

      await addCity({
        name,
        country,
        visit_date: new Date(visitDate).toISOString(),
        rating: parseInt(rating),
        notes,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        is_favorite: false,
      });
      
      onClose();
      setName('');
      setCountry('');
      setVisitDate('');
      setRating('5');
      setNotes('');
    } catch (error) {
      toast.error('Failed to add city');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add New City</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-500 p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="city-name" className="block text-sm font-medium text-gray-700">
              City Name
            </label>
            <input
              id="city-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., Paris"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              id="country"
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., France"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="visit-date" className="block text-sm font-medium text-gray-700">
              Visit Date
            </label>
            <input
              id="visit-date"
              type="date"
              required
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              disabled={loading}
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? 's' : ''} {'⭐'.repeat(num)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              disabled={loading}
              placeholder="Share your experience in this city..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{loading ? 'Adding...' : 'Add City'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
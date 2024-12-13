import toast from 'react-hot-toast';

interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

export async function geocodeCity(city: string, country: string): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const query = `${city}, ${country}`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=1`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data: GeocodingResult[] = await response.json();

    if (data.length === 0) {
      toast.error('City not found. Please check the spelling.');
      return null;
    }

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    toast.error('Failed to get city coordinates');
    return null;
  }
}
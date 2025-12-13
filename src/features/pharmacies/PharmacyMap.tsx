// src/features/pharmacies/PharmacyMap.tsx
// Pharmacy map component (placeholder for future implementation)

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  phone?: string;
  hours?: string;
}

interface Props {
  pharmacies?: Pharmacy[];
  onSelect?: (pharmacy: Pharmacy) => void;
}

export default function PharmacyMap({ pharmacies = [], onSelect }: Props) {
  if (pharmacies.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <div className="text-4xl mb-4">🏥</div>
        <h3 className="text-lg font-medium text-gray-700">Pharmacy Finder</h3>
        <p className="text-gray-500 mt-1">
          Find nearby pharmacies (coming soon)
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
        <span className="text-gray-500">Map view coming soon</span>
      </div>
      
      <div className="space-y-2">
        {pharmacies.map((pharmacy) => (
          <button
            key={pharmacy.id}
            onClick={() => onSelect?.(pharmacy)}
            className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
          >
            <div className="font-medium text-gray-900">{pharmacy.name}</div>
            <div className="text-sm text-gray-500">{pharmacy.address}</div>
            {pharmacy.phone && (
              <div className="text-xs text-gray-400 mt-1">{pharmacy.phone}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { Pharmacy };

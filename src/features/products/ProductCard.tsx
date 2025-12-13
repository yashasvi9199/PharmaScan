// src/features/products/ProductCard.tsx
// Product/Medicine card component

import type { MedicineInfo } from "../../lib/api/lookupApi";

interface Props {
  product: MedicineInfo;
  onClick?: (product: MedicineInfo) => void;
}

export default function ProductCard({ product, onClick }: Props) {
  const handleClick = () => {
    onClick?.(product);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          {product.alternateNames && product.alternateNames.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {product.alternateNames.slice(0, 2).join(", ")}
            </p>
          )}
        </div>
        {product.atc && (
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
            {product.atc}
          </span>
        )}
      </div>
      {product.atcCategory && (
        <p className="text-xs text-gray-400 mt-2">{product.atcCategory}</p>
      )}
    </div>
  );
}

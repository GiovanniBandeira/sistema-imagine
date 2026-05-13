import React from 'react';

export default function MaterialSelector({ materials, selectedMaterial, onSelect }: {
  materials: string[];
  selectedMaterial: string;
  onSelect: (material: string) => void;
}) {
  return (
    <div className="p-4 bg-black/30 backdrop-blur-sm rounded-lg shadow-lg">
      <label className="block text-gray-200 mb-2">Select Material</label>
      <select
        value={selectedMaterial}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-3 py-2 bg-gray-800 text-white rounded"
      >
        {materials.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}

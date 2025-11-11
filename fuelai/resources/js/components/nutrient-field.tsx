import React from "react";

interface NutrientFieldProps {
  field: string; // e.g. "protein", "carbs", etc.
  value: string;
  onChange: (field: string, val: string) => void;
}

const NutrientField: React.FC<NutrientFieldProps> = ({ field, value, onChange }) => {
  // Convert field name → user-friendly label
  const formatLabel = (name: string) =>
    name
      .replace(/_/g, " ")         // replace underscores
      .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letters

  const label = formatLabel(field);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}...`}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default NutrientField;

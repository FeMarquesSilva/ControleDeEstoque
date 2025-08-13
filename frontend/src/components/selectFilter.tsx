import React from "react";
import { optionSelect } from "../pages/RoutesProduto/Interface";

interface SelectProps {
  options: optionSelect[];
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SelectFilter = ({ options, value, onChange, placeholder }: SelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        padding: "5px",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectFilter;

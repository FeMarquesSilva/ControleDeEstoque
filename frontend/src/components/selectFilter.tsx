import React from "react";
import { optionSelect } from "../pages/RoutesProduto/Interface";
import { stylesInputs } from "../pages/Styles";

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
      style={stylesInputs}
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

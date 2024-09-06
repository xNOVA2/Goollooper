"use client";
import React from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

const SelectInput = ({
  options,
  loading,
  handleInputChange,
  handleChange,
  isMulti = false,
  placeholder,
}: {
  options: Option[];
  loading: boolean;
  handleInputChange: (inputValue: string) => void;
  handleChange: () => void;
  isMulti?: boolean;
  placeholder?: string;
}) => {
  return (
    <Select
      options={options}
      isLoading={loading}
      onInputChange={handleInputChange}
      onChange={handleChange}
      isMulti={isMulti}
      className="h-16 rounded-lg pt-7 text-gray-400"
      placeholder={placeholder || "Select..."}
    />
  );
};

export default SelectInput;

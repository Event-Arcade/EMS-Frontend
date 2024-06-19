import React from "react";
import Form from "react-bootstrap/Form";

interface SelectBoxProps {
  options: { label: string; value: string }[];
  defaultLabel: string;
  value: string;
  onChange: (value: string) => void;
  style: React.CSSProperties;
  className?: string;
}

function SelectBox({ options, defaultLabel, value, onChange, style ,className,...props }: SelectBoxProps) {
  return (
    <Form.Select aria-label="Default select example" style={style} value={value} onChange={(e) => onChange(e.target.value)}>
      <option>{defaultLabel}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectBox;

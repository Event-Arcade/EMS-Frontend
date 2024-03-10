import React from "react";
import Form from "react-bootstrap/Form";

function SelectBox({
  options,
  defaultLabel,
  style,
}: {
  options: any[];
  defaultLabel: string;
  style: React.CSSProperties;
}) {
  return (
    <Form.Select aria-label="Default select example" style={style}>
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

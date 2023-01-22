import React from "react";

const FormRow = ({
  type,
  name,
  value,
  labelText,
  handleChange,
  placeholder,
  required
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="talk-label">{labelText || name}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="talk-input"
      />
    </div>
  );
};

export default FormRow;

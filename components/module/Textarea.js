import React from "react";


  const Textarea = ({ label, name ,type, value, onChange, placeholder }) => {
  return (
    <div className="textarea-input">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Textarea;

import React from 'react';
import "./input.scss"

const Input = ({register, name, errors, pattern, placeholder, label,isRequired=false}) => {
  return (
    <div className={"input-container "}>
      <label>{label}</label>
      <input placeholder={placeholder}
             {...register(name, {
               required:isRequired && 'This is required field',
               pattern: pattern
             })}/>
      {errors[name] && (
        <span>{errors[name].message}</span>
      )}
    </div>
  );
};

export default Input;
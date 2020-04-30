import React from 'react';

const Input = (props) => {
  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      <input type="text"
        name={props.name}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(props.id, e.target.value)}
      />
    </div>
  );
}

export default Input;
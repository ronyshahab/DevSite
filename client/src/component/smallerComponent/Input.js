import React from "react";

const Input = ({
  type = "text",
  value,
  placeholder,
  name,
  onBlur,
  onChange,
  error,
  inputType = "normal",
  title,
  options = [],
}) => {
  // const {type} = props
  // console.log(props)
  return (
    <>
      {inputType == "normal" && (
        <div>
            <label htmlFor={name} className="label" >{title}</label>
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
          ></input>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
       {inputType == "textarea" && (
        <div>
             <label htmlFor={name} className="label" >{title}</label>
          <textarea
              value={value}
              cols={5}
              rows={10}
              placeholder={placeholder}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
            ></textarea>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
        {inputType == "checkbox" && (
        <div>
            <label htmlFor={name} className="label" >{title}</label>
          <input
            type={inputType}
            checked={value}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
          ></input>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
      {
        inputType == "dropdown" && (
          <div>
             <select
              name="status"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
            >
              {
                options.map((i)=>{
                 return <option key={i} value={i=="Select Professional Status"? "Fresher": i}>{i}</option>
                })
              }
            </select>
          </div>
        )
      }
    </>
  );
};

export default Input;

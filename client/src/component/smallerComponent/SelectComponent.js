import React from "react";
import Select from "react-select";

const SelectComponent = ({
  error,
  values,
  isMulti = false,
  onChange,
  data,
  disabled = false,
  name,
  className,
  onBlur,
  placeholder = "Select",
  hideSelectedOptions = false,
  getOptionLabel,
  getOptionValue,
  closeMenuOnSelect = true,
  allowSelectAll = false,
  isClearable = false,
  isOptionDisabled = false,
}) => {
  return (
    <>
      <Select
        className={`form-control selectDrop ${
          error && "is-invalid"
        } ${className}  `}
        placeholder={placeholder}
        classNamePrefix="react-select"
        defaultValue={values}
        onChange={onChange}
        isDisabled={disabled}
        isOptionDisabled={
          isOptionDisabled ? isOptionDisabled : () => isOptionDisabled
        }
        options={data}
        name={name}
        value={values}
        onBlur={onBlur}
        isMulti={isMulti}
        isClearable={isClearable}
        hideSelectedOptions={hideSelectedOptions}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        closeMenuOnSelect={closeMenuOnSelect}
        allowSelectAll={allowSelectAll}
        styles={{
          option: (base, state) => ({
            ...base,
            height: "100%",
            padding: "8px 10px",
            borderBottom: "1px solid rgba(169, 208, 246, 0.75)",
            backgroundColor: state.isSelected ? "transparent" : "transparent",
            color: state.isDisabled ? "gray" : "black",
          }),
          menu: (o) => {
            return {
              ...o,
              "div:last-child>div": { borderBottom: 0 },
            };
          },
        }}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </>
  );
};

export default SelectComponent;

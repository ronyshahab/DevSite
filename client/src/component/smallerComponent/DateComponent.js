import React from "react";
import DatePicker from "react-datepicker";
import LeftArrow from "../../assets/icons/u_arrow-left.svg";
import RightArrow from "../../assets/icons/u_arrow-right.svg";
import { getMonth, getYear } from "date-fns";
import { months, years } from "../helper/jsonData";

const DatePickerComponent = ({
  placeholderText,
  selected,
  maxDate,
  onChange,
  minDate,
  onBlur,
  rangeApply = true,
  yearApply = false,
  excludeDate = false,
}) => {
  return (
    <div>
      {yearApply === false ? (
        <DatePicker
          placeholderText={placeholderText}
          className="form-control"
          dateFormat="dd/MM/yyyy"
          selected={selected}
          maxDate={maxDate}
          minDate={minDate}
          onChange={onChange}
          onBlur={onBlur}
          inline={rangeApply ? false : true}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <>
              <div
                style={{
                  marginBlock: 16,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginRight: "3px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    onClick={() => {
                      decreaseMonth();
                    }}
                    disabled={prevMonthButtonDisabled}
                  >
                    <img src={LeftArrow} alt="monthDecrease" />
                  </span>
                </div>

                <select
                  className="form-select monthsSelect form-control"
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select yearSelect "
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <div
                  style={{
                    marginLeft: "3px",
                    cursor: "pointer",
                  }}
                >
                  <span
                    onClick={() => {
                      increaseMonth();
                    }}
                    disabled={nextMonthButtonDisabled}
                  >
                    <img src={RightArrow} alt="monthIncrease" />
                  </span>
                </div>
              </div>
            </>
          )}
        />
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <DatePicker
              placeholderText={placeholderText}
              className="form-control calender"
              dateFormat="MM/yyyy"
              selected={selected}
              showMonthYearPicker
              onChange={onChange}
              renderCustomHeader={({
                date,
                changeYear,
                decreaseYear,
                increaseYear,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <>
                  <div
                    style={{
                      margintop: 10,
                      marginbottom: 10,
                      display: "flex",
                      justifyContent: "space-center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        onClick={() => {
                          decreaseYear();
                        }}
                        disabled={prevMonthButtonDisabled}
                      >
                        <img src={LeftArrow} alt="monthDecrease" />
                      </span>
                    </div>
                    <select
                      className="form-select yearSelect "
                      value={getYear(date)}
                      onChange={({ target: { value } }) => {
                        changeYear(value);
                      }}
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <span
                        onClick={() => {
                          increaseYear();
                        }}
                        disabled={nextMonthButtonDisabled}
                      >
                        <img src={RightArrow} alt="monthIncrease" />
                      </span>
                    </div>
                  </div>
                </>
              )}
            ></DatePicker>
          </div>
        </>
      )}
    </div>
  );
};

export default DatePickerComponent;

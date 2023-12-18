import { getYear } from "date-fns";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const range = (a, b) => {
  let year = [];
  for (let i = a; i <= b; i++) {
    year.push(i);
  }
  return year;
};
export const years = range(
  getYear(new Date()) - 100,
  getYear(new Date()) + 1,
  1
);

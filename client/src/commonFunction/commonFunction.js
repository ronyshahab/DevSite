import Swal from "sweetalert2";

export const capitalize = (string) => {
  if (string) {
    let testString = string.trim();
    let resultString = "";
    testString = testString.split(" ");
    testString.forEach((element) => {
      if (element !== "") {
        element = element.split("");
        element[0] = element[0].toUpperCase();
        element = element.join("");
        resultString = resultString + element + " ";
      }
    });
    return resultString;
  }
  return null;
};

export const dateFormate = (date) => {
  const dateObject = new Date(date);
  let day = dateObject.getDate();
  let month = dateObject.getMonth();
  month = month + 1;
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  const year = dateObject.getFullYear();

  const humanReadableDate = `${year}-${month}-${day}`;
  return humanReadableDate;
};

export const formateObject = (id, name) => {
  const user = [];
  for (let i = 0; i < id.length; i++) {
    const obj = {};
    const element = id[i];
    const element2 = name[i];
    obj["id"] = element;
    obj["value"] = element2;
    user.push(obj);
  }
  return user;
};

export const alertUser = async (type) => {
  switch (type) {
    case "deleteItem":
      const result = await Swal.fire({
        title: "Item will be deleted permanently?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });

      return result.isConfirmed;
    case "logoutUser":
      const result2 = await Swal.fire({
        title: "Do you really want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });

      return result2.isConfirmed;

    default:
      break;
  }
};

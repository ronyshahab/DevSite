/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef } from "react";
import {
  dateFormate,
  capitalize,
} from "../../../commonFunction/commonFunction";
import { setEducationFormData } from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getData from "../../../commonFunction/getDataFromAxios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const EducationTable = ({ data }) => {
  const tableInheritorRef = useRef();
  // console.log(data)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdateIcon = async (data) => {
    const updatable = true;

    dispatch(setEducationFormData(data));

    navigate(`/add-education/${updatable}`);
  };
  const showAlert = async () => {
    const result = await Swal.fire({
      title: "Item will be deleted permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      return true;
    } else if (result.isDismissed) {
      return false;
    }
  };
  const handleDeleteIcon = async (data) => {
    if (await showAlert()) {
      try {
        const res = await getData("delete", `/profile/education/${data}`);
        location.reload();
        console.log(res);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleDescriptionClick = (data) => {
    alert(data);
  };
  const load = () => {
    tableInheritorRef.current.innerHTML = "";

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.border = "box";
    const result = data;
    const headerRaw = Object.keys(result[0]);
    headerRaw.pop();
    const header = [...headerRaw, "actions"];
    const tr = document.createElement("tr");
    header.forEach((i) => {
      if (i == "fieldofstudy") {
        i = "Field";
        const text = document.createTextNode(capitalize(i));
        const th = document.createElement("th");
        th.appendChild(text);
        tr.appendChild(th);
      } else {
        const text = document.createTextNode(capitalize(i));
        const th = document.createElement("th");
        th.appendChild(text);
        tr.appendChild(th);
      }
    });
    table.appendChild(tr);
    result.forEach((i) => {
      const data = Object.values(i);
      // console.log(data)
      const tr = document.createElement("tr");
      for (let j = 0; j <= data.length - 1; j++) {
        const td = document.createElement("td");
        if (data[j] == undefined) {
          let text = document.createTextNode("No");
          td.appendChild(text);
        }
        if (j == 3) {
          let text = document.createTextNode(dateFormate(data[j]));
          td.appendChild(text);
        } else if (j == 4) {
          let text = document.createTextNode(dateFormate(data[j]));
          td.appendChild(text);
        } else if (j == 5) {
          let description = data[j];
          if (description.length > 100) {
            description = description.substring(0, 100);
            let text = document.createTextNode(description + "......");
            td.appendChild(text);
            td.onclick = () => handleDescriptionClick(data[j]);
          } else {
            let text = document.createTextNode(description);

            td.appendChild(text);
          }
        } else if (j == 6) {
          const icon1 = document.createElement("i");
          const icon2 = document.createElement("i");
          icon1.className = "icon";
          icon1.style.color = "red";
          icon2.style.color = "#0099ff";
          icon1.classList.add("fa-solid", "fa-trash");
          icon2.classList.add("fa-solid", "fa-pencil");
          // console.log(data)
          icon1.onclick = () => handleDeleteIcon(data[data.length - 1]);
          icon2.onclick = () => handleUpdateIcon(data);
          td.appendChild(icon1);
          td.appendChild(icon2);
        } else {
          let text = document.createTextNode(data[j]);
          td.appendChild(text);
        }

        tr.appendChild(td);
      }
      table.appendChild(tr);
    });
    tableInheritorRef.current.appendChild(table);
  };

  useEffect(() => {
    if (data !== undefined && data !== null && data.length !== 0) {
      load();
    }
  }, []);

  return (
    <div
      className="eduTableContainer"
      id="eduTableContainer"
      ref={tableInheritorRef}
    ></div>
  );
};

export default EducationTable;

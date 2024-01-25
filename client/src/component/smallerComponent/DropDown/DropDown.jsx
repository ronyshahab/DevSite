import React, { useEffect, useRef, useState } from 'react'
import "./dropDown.css"
import { useNavigate } from 'react-router-dom';
const DropDown = ({mainButton, mainButtonRef, buttons }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownContentRef = useRef(null);
    const navigate = useNavigate()
 
    useEffect(() => {
      if (mainButtonRef && mainButtonRef.current){

        mainButtonRef.current.style.transition = "transform 0.3s";
    
        if (showDropDown) {
          dropdownContentRef.current.classList.add("active");
          mainButtonRef.current.style.transform = "rotate(65deg)";
        } else {
          dropdownContentRef.current.classList.remove("active");
          mainButtonRef.current.style.transform = "rotate(0deg)";
        }
      }
           
      }, [showDropDown]);

      useEffect(()=>{
        setShowDropDown(false)
      }, [navigate])

      const handleDropDownClick = () => {
        setShowDropDown((pre) => !pre);
      };
  return (
    <div className="DropDownContainer">
           {React.cloneElement(mainButton, { onClick: handleDropDownClick, ref: mainButtonRef })}
 <div
    ref={dropdownContentRef}
    className="navbarDropDownContentContainer"
  >
    {showDropDown && (
      <div className="navbarDropDownContent">
         {buttons.map((button, index) => (
              <button className='btn btnPrimary'  key={index} onClick={button.onClick} dangerouslySetInnerHTML={{ __html: button.label }} />
            ))}
      </div>
    )}
  </div>
    </div>
   
  )
}

export default DropDown

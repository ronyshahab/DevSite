import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function BootStrapDropDown({ mainButton, buttonList }) {

    const handleDropDownItemClick = (mainFunction, url)=>{
        mainFunction()
    }
  return (
    <Dropdown>
      <Dropdown.Toggle className='textEditorButton' id="dropdown-basic">
        {mainButton.hasIcon?  <img src={mainButton.src} className="icon" alt="" />: mainButton.src}
      </Dropdown.Toggle>

      <Dropdown.Menu >
        {buttonList.map((button, index) => (
          <Dropdown.Item key={index} onClick={() => handleDropDownItemClick(button.onClick)}>
           {
            button.hasIcon ?
            <img src={button.src} className="icon" alt="" />: button.src
           } 
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BootStrapDropDown;

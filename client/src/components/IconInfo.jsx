// import { Html } from '@react-three/drei';
import { TextureLoader } from 'three'; 
import popupImage from "/assets/3d/npc-pop.svg"; 
import React, {useState} from "react"
import { npcPopup } from "../store/npc-store";

export const IconInfo = () => {
  const {  isPopupOpen, setPopupOpen } = npcPopup();


  const popups = {
   
  }
  const handleClick = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <>

    {isPopupOpen && (
        <div className="modal-background2" onClick={(e) => e.stopPropagation()}>
        <div className="modal-container2">
        <div >
            <img src={popupImage}  alt="Popup Image"  style={{  marginTop: "200px" , marginLeft: "-450px" , width: "400px", height: "auto" }} onClick={handleClick} />
          </div>
          </div>
        </div>
      )}
      
    </>
  );
};

import React from "react";
import ReactModal from "react-modal";

const Modal = ({ isOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div className="absolute left-0 top-0 border-2 border-gray-600 w-11/12  bg-gray-800 w-">
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;

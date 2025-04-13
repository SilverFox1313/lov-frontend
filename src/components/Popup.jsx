import React from "react";

const Popup = ({ isOpen, onClose, vendor }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full relative">
        <h2 className="text-lg mb-2 font-semibold text-center">Vendor details</h2>
        <h3 className="mb-2"><i className="font-semibold">- Name: </i>{vendor.name}</h3>
        <h3 className="mb-2"><i className="font-semibold">- Charge type: </i>{vendor.charge}</h3>
        <h3 className="mb-2"><i className="font-semibold">- Document type: </i>{vendor.document}</h3>
        <h3 className="mb-2"><i className="font-semibold">- Confirmation number: </i>{vendor.confirmation}</h3>
        <h3 className="mb-2"><i className="font-semibold">- Additional info: </i>{vendor.info}</h3>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;

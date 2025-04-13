import React from "react";
import { useVendorsContext } from "../hooks/useVendorsContext";
import { useAuthContext } from "../hooks/useAuthContext"

const DeleteConfirmation = ({isDelete, onClose, vendor}) => {
  if (!isDelete) return null;
  const { dispatch } = useVendorsContext()
  const {user} = useAuthContext()

  const deleteVendor = async () => {
    if (!user) {
      return
    }
    try {
        const response = await fetch('https://lov-backend.onrender.com/api/vendors/' + vendor._id, {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'DELETE_VENDOR', payload: json})
        }
    } catch (error) {
        console.log('Error deleting this vendor')
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <h2 className="text-center font-semibold text-lg">Are you sure you want to delete this?</h2>
        <div className="flex gap-4">
          <button
            onClick={() => { deleteVendor(); onClose(); }}
            className="mt-4 w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="mt-4 w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

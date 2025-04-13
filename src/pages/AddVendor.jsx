import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { charge_type, document_type, confirmation_number } from "../constants";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"

const AddVendor = () => {
  const [name, setName] = useState('');
  const [info, setInfo] = useState('There is not more info');
  const [charge, setCharge] = useState('No assigned');
  const [document, setDocument] = useState('No assigned');
  const [confirmation, setConfirmation] = useState('No assigned');
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const navigate = useNavigate();
  const {user} = useAuthContext()

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  const handleDocument = (e) => {
    setDocument(e.target.value)
  }

  const handleConfirmation = (e) => {
    setConfirmation(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      setError('You must be logged in')
      return
    }

    try {
      const response = await fetch("https://lov-backend.onrender.com/api/vendors/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ name, info, charge, document, confirmation }),
      });

      const json = await response.json();

      if(!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      if(response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al crear la colección:", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="py-16">
        <span className="text-6xl font-bold orange-gradient">Add a new vendor</span>
        <form onSubmit={handleSubmit} className="mt-10 w-[585px] flex flex-col gap-4 p-6 rounded-xl shadow-xl bg-white">
          <label className="font-semibold text-xl">Vendor's name</label>
          <input
            className={emptyFields.includes('name') ? 'placeholder-red-600 border-red-500 border rounded-md p-2' : 'border rounded-md p-2'}
            type="text"
            placeholder="Type the vendor's name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-wrap gap-3 items-center">
            <select value={charge} onChange={handleCharge} className="border-2  py-1 w-auto text-xs">
              {charge_type.map((charge) => (
                <option key={charge.id} value={charge.value}>
                  {charge.name}
                </option>
              ))}
            </select>
            <select value={document} onChange={handleDocument} className="border-2 py-1 w-auto text-xs">
              {document_type.map((document) => (
                <option key={document.id} value={document.value}>
                  {document.name}
                </option>
              ))}
            </select>
            <select value={confirmation} onChange={handleConfirmation} className="border-2 py-1 w-auto text-xs">
              {confirmation_number.map((confirmation) => (
                <option key={confirmation.id} value={confirmation.value}>
                  {confirmation.name}
                </option>
              ))}
            </select>
          </div>
          <label className="font-semibold text-xl">
            Additional information
          </label>
          <textarea
            className="border rounded-md min-h-44 p-2"
            placeholder="Add any additional information related to this vendor..."
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
          <div className="flex justify-end gap-4 mt-10 text-xs">
            <Link
              to="/"
              className="secondary-btn"
            >
              Cancel
            </Link>
            <button className="primary-btn">Create now</button>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default AddVendor;

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { charge_type, document_type, confirmation_number } from "../constants";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const UpdateVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 👈 Nuevo estado
  const { user } = useAuthContext();

  const [vendor, setVendor] = useState({
    name: "",
    info: "",
    charge: "",
    document: "",
    confirmation: "",
  });

  useEffect(() => {
    const fetchVendor = async () => {
      if (!user) {
        setError("You must be logged in");
        return;
      }
      const response = await fetch(`https://lov-backend.onrender.com/api/vendors/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVendor(data);
      }
    };
    fetchVendor();
  }, [id, user]);

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    setIsLoading(true); // 👈 Activamos el loading

    const response = await fetch(`https://lov-backend.onrender.com/api/vendors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(vendor),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      navigate("/");
    }

    setIsLoading(false); // 👈 Desactivamos el loading
  };

  return (
    <>
      <Navbar />
      <div className="py-16">
        <span className="text-6xl font-bold orange-gradient">
          Update vendor's info
        </span>
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-[585px] flex flex-col gap-4 p-6 rounded-xl shadow-xl bg-white"
        >
          <label className="font-semibold text-xl">Vendor's name</label>
          <input
            name="name"
            className={
              emptyFields.includes("name")
                ? "placeholder-red-600 border-red-500 border rounded-md p-2"
                : "border rounded-md p-2"
            }
            type="text"
            placeholder="Type the vendor's name"
            value={vendor.name}
            onChange={handleChange}
          />
          <div className="flex flex-wrap gap-3 items-center">
            <select
              name="charge"
              value={vendor.charge}
              onChange={handleChange}
              className="border-2 py-1 w-auto text-xs"
            >
              {charge_type.map((charge) => (
                <option key={charge.id} value={charge.value}>
                  {charge.name}
                </option>
              ))}
            </select>
            <select
              name="document"
              value={vendor.document}
              onChange={handleChange}
              className="border-2 py-1 w-auto text-xs"
            >
              {document_type.map((document) => (
                <option key={document.id} value={document.value}>
                  {document.name}
                </option>
              ))}
            </select>
            <select
              name="confirmation"
              value={vendor.confirmation}
              onChange={handleChange}
              className="border-2 py-1 w-auto text-xs"
            >
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
            name="info"
            className="border rounded-md min-h-44 p-2"
            placeholder="Add some additional information..."
            value={vendor.info}
            onChange={handleChange}
          ></textarea>
          <div className="flex justify-end gap-4 mt-10 text-xs">
            <Link to="/" className="secondary-btn">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className={`primary-btn ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Updating..." : "Update now"}
            </button>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default UpdateVendor;
import { useState, useEffect } from "react";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
import { useVendorsContext } from "../hooks/useVendorsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { vendors, dispatch } = useVendorsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchVendors = async () => {
      const response = await fetch("https://lov-backend.onrender.com/api/vendors/", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_VENDORS", payload: json });
        setLoading(false);
      }
    };
    if (user) {
      fetchVendors();
    }
  }, [dispatch, user]);

  const filteredVendors = vendors?.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section className="mt-24">
        <div className="flex justify-center">
          <div>
            <span className="text-6xl">The List </span>
            <span className="text-6xl orange-gradient">Of</span>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <span className="text-4xl">Vendors</span>
        </div>
        <div className="mt-8 flex justify-between gap-2 bg-white border-white rounded-full px-4 py-2 max-w-xl m-auto">
          <input
            type="text"
            placeholder="Search for vendor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <div className="mt-8 w-full">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 via-yellow-500 to-yellow-300 font-semibold text-center">
                <th className="px-2 py-2 border border-gray-300">
                  Vendor's name
                </th>
                <th className="px-2 py-2 border border-gray-300">
                  Charge Type
                </th>
                <th className="px-2 py-2 border border-gray-300">
                  Document type
                </th>
                <th className="px-2 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            {vendors &&
              vendors
                .filter((vendor) =>
                  vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((vendor) => <Table key={vendor._id} vendor={vendor} />)}
          </table>
        </div>
      </section>
    </>
  );
};

export default Home;

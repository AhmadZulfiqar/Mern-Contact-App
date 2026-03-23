import React, { useEffect, useState } from "react"; // Added useState

const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let deleteContact = async (id) => {

    try {
      console.log("Deleting contact with id:", id);

      // 1. Send delete request to backend
    //   await axios.delete(`http://localhost:3000/delete-contact/${id}`);
    await axios.delete(`${API_URL}/delete-contact/${id}`);
      // 2. Update the UI immediately by filtering out the deleted contact
      setData((prevData) => prevData.filter((contact) => contact._id !== id));

      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact.");
    }
  };
  let editContact = async (id) => {
    try {
      console.log("Editing contact with id:", id);
      navigate(`/edit-contact/${id}`);
    } catch (error) {
      console.error("Error editing contact:", error);
      alert("Failed to edit contact.");
    }
  };

  const navigate = useNavigate();
  // 1. Create a state to store the contacts
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // const res = await axios.get("http://localhost:3000/contacts");
        const res = await axios.get(`${API_URL}/contacts`);
        // 2. Save the response into your state
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="w-full h-screen bg-slate-900 flex justify-center items-start pt-20">
      <div className="w-96 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-4 flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">My Contacts</h1>
          {/* 3. Added a button to go to the Add Contact page */}
          <button
            onClick={() => navigate("/add-contact")}
            className="w-8 h-8 flex justify-center items-center rounded-full pb-0.5 bg-white text-blue-600 font-bold"
          >
            +
          </button>
        </div>

        {/* 4. Map through the data state */}
        {data.length > 0 ? (
          data.map((item) => (
            <div className="p-2">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                {/* Grouping Image and Text together */}
                <div className="flex items-center gap-4   ">
                  <div className="flex w-10 h-10 justify-center items-center rounded-full bg-blue-500 text-white font-bold">
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-slate-800 leading-tight">
                      {item.name}
                    </h2>
                    <h3 className="text-sm text-slate-500 font-medium">
                      {item.phone}
                    </h3>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-xl"
                      onClick={() => editContact(item._id)}
                    >
                      edit
                    </span>
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                    <span
                      className="material-symbols-outlined text-xl"
                      onClick={() => deleteContact(item._id)}
                    >
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No contacts found</p>
        )}
      </div>
    </div>
  );
};

export default Home;

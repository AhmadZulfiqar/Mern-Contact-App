import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//Connecting to backend using env variable for better security and flexibility
const API_URL = import.meta.env.VITE_API_URL;

const AddContact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Create FormData (The 'envelope' for files)
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);

  try {
    // 2. Send formData directly (NOT inside { })
    // const res = await axios.post("http://localhost:3000/add-contact",
    const res = await axios.post(`${API_URL}/add-contact`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Success:", res.data);
    alert("Contact Saved!");
    navigate('/'); 
  } catch (error) {
    console.error("Error saving contact:", error);
    alert("Failed to save contact. Check console.");
  }
};
  return (
    <>
      <div className="w-full h-screen bg-slate-900 flex justify-center items-start pt-20 p-4">
        {/* Main Container */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-100 p-6">
            <h1 className="text-center text-xl font-bold text-slate-800 tracking-tight">
              Add New Contact
            </h1>
            <p className="text-center text-slate-500 text-sm mt-1">
              Fill in the details below
            </p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            {/* Form Body */}
            <div className="p-6 space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Zulfiqar Ahmad"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-slate-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="03XX XXXXXXX"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              

              {/* Submit Button */}
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200">
                Save Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;

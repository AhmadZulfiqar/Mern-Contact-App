import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
const AddContact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const {id}= useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 2. Use axios.put or axios.patch for updating
      const res = await axios.put(
        `http://localhost:3000/update-contact/${id}`, 
        { name, phone } // Sending as JSON since there's no new file here
      );

      console.log("Updated:", res.data);
      alert("Contact Updated!");
      navigate("/");
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Update failed.");
    }
  };

  useEffect(() => {
    let getData=async()=>{
        try{
            const res=await axios.get(`http://localhost:3000/contacts/${id}`);
            setName(res.data.name);
            setPhone(res.data.phone);
        }catch(err){
            console.log(err);
        }
    }
    getData();
  }, []);
  return (
    <>
      <div className="w-full h-screen bg-slate-900 flex justify-center items-start pt-20 p-4">
        {/* Main Container */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-100 p-6">
            <h1 className="text-center text-xl font-bold text-slate-800 tracking-tight">
              Edit Contact
            </h1>
            <p className="text-center text-slate-500 text-sm mt-1">
              Update the details below
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
                Update Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;

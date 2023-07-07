"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "../store/index";
import DataTable from "./components/DataTable";

const Page: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const addFormData = useStore((state) => state.addFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !age) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    addFormData({
      name,
      email,
      age,
    });
    setName("");
    setEmail("");
    setAge("");

    const formDataToSave = {
      name,
      email,
      age,
    };

    // Save form data to localStorage
    localStorage.setItem("formData", JSON.stringify(formDataToSave));

    toast.success("Form data saved successfully!");
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div
        className="bg-transparent rounded-lg shadow-md p-8  "
        style={{ width: "900px" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center border-b ">
          SomyKoron Assessment
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div>
            <label htmlFor="name" className="font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="age" className="font-bold">
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-4 py-2 w-full"
          >
            Submit
          </button>
        </form>
        <DataTable />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;

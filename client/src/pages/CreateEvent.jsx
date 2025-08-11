import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import baseUrl from "../baseUrl";
// const baseUrl = import.meta.env.VITE_BASE_URL;

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       if (!formData.title.trim() || !formData.date.trim() || !formData.location.trim() || !formData.description.trim()) {
            toast.error("Please fill all mandatory fields");
            return;
          }
      await axios.post(`${baseUrl}/events/createEvents`, formData);
      toast.success(" Event created successfully!");
      setFormData({ title: "", date: "", location: "", description: "" });
      navigate("/")
    } catch (error) {
      console.error(error);
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title <span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Event title"
            
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium mb-1">Date <span style={{ color: "red" }}>*</span> </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location <span style={{ color: "red" }}>*</span></label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Event location"
            
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description<span style={{ color: "red" }}>*</span></label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2"
            placeholder="Event description"
            
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

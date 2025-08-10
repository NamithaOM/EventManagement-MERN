import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${baseUrl}/events/getEventById/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const updatedStatus = !event.registerStatus;

  if (updatedStatus) {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in both name and email");
      return;
    }
  }

  try {
    const res = await axios.patch(`${baseUrl}/events/${id}/register-event`, {
      registerStatus: updatedStatus,
      name: formData.name,
      email: formData.email,
    });

    toast.success(res.data.message);

    setEvent((prev) => ({
      ...prev,
      registerStatus: updatedStatus,
      name: updatedStatus ? formData.name : "",
      email: updatedStatus ? formData.email : "",
    }));

    if (updatedStatus) {
      navigate(`/message/${id}`);
    }
  } catch (error) {
    console.error("Error updating registration:", error);
    toast.error("Failed to update registration status");
  }
};


  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!event) return <p className="text-center mt-8">Event not found</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Event Details</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Side - Event Details */}
        <div>
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-gray-700 break-words">{event.description}</p>

          <div className="flex items-center gap-2 text-gray-600 mt-4">
            <FaCalendarAlt className="text-green-600" />
            <span>
              {new Date(event.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {!event.registerStatus && (
              <>
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className={`w-full px-4 py-2 rounded text-white transition ${
                event.registerStatus
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {event.registerStatus ? "Registered" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

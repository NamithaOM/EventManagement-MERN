import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import baseUrl from "../baseUrl";


export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${baseUrl}/events/getAllevents`);

      // Filter upcoming events
      const today = new Date();
      const upcomingEvents = res.data.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today.setHours(0, 0, 0, 0); // remove time for accurate comparison
      });

      upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  fetchEvents();
}, []);


  const handleView = (id) => {
    navigate(`/viewEvent/${id}`);
  };

  const handleCreate = () => {
    navigate("/addEvent");
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <button
          onClick={handleCreate}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          + Create Event
        </button>
      </div>

      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="p-4 bg-white shadow rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-500 text-sm">
                  📅 {event.date ? new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }) : "No date"}
                </p>
                <button
                  onClick={() => handleView(event._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No upcoming events found.</p>
      )}
    </div>
  );
}

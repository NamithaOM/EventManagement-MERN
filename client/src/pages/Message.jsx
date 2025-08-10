import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Message() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get event ID from URL

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        id="success-alert"
        className="p-6 max-w-xl text-green-800 border border-green-300 rounded-xl bg-green-50 shadow-lg"
        role="alert"
      >
        {/* Icon + Title */}
        <div className="flex items-center">
          <svg
            className="shrink-0 w-6 h-6 me-2 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <h3 className="text-xl font-bold text-green-700">
            Registration Successful!
          </h3>
        </div>

        <p className="mt-3 text-gray-700">
          Thank you for registering. We’ll see you at the event!
        </p>

        {/* Buttons */}
        <div className="flex mt-5 space-x-3">
          <button
            onClick={() => navigate(`/viewEvent/${id}`)} // Go back to the current event details
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")} // Go to all events
            className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            View Events
          </button>
        </div>
      </div>
    </div>
  );
}

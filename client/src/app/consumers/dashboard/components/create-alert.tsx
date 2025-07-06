"use client";

import { DialogContext } from "@/app/context/dailog-context";
import React, { useState, useEffect } from "react"; // Import useState and useEffect

export default function CreateAlertForm() {
  const { setComponent } = React.useContext(DialogContext);

  // State to store latitude and longitude
  const [latitude, setLatitude] = useState<number | string>("");
  const [longitude, setLongitude] = useState<number | string>("");
  const [locationError, setLocationError] = useState<string | null>(null);

  // Effect hook to get current location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationError(null); // Clear any previous error
        },
        (error) => {
          console.error("Error getting location:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError("Location permission denied. Please enable it in your browser settings if you want to autofill.");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable. Please check your device settings.");
              break;
            case error.TIMEOUT:
              setLocationError("The request to get user location timed out.");
              break;
            default:
              setLocationError("An unknown error occurred while trying to get your location.");
              break;
          }
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      title: data.get("title") as string,
      description: data.get("description") as string,
      categoryId: data.get("category") as string,
      skillId: data.get("skill") as string,
      location: {
        lat: parseFloat(data.get("lat") as string),
        lng: parseFloat(data.get("lng") as string),
      },
      pincode: data.get("pincode") as string,
      minPrice: parseFloat(data.get("minPrice") as string),
      maxPrice: parseFloat(data.get("maxPrice") as string),
    };

    console.log("✅ Payload:", payload);

    // TODO: Call your createAlert API with this payload
    // await createAlert(payload);

    alert("✅ Alert created!");
    setComponent(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create New Alert</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          required
          placeholder="e.g., Fix leaking faucet"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-y"
          placeholder="Provide more details about the job..."
        ></textarea>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          name="category"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white"
          required
        >
          <option value="">Select category</option>
          <option value="plumbing-id">Plumbing</option>
          <option value="electrical-id">Electrical</option>
          <option value="cleaning-id">Cleaning</option>
        </select>
      </div>

      <div>
        <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
        <select
          id="skill"
          name="skill"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-white"
          required
        >
          <option value="">Select skill</option>
          <option value="pipe-fitting-id">Pipe Fitting</option>
          <option value="circuit-repair-id">Circuit Repair</option>
          <option value="deep-cleaning-id">Deep Cleaning</option>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
          <input
            id="lat"
            name="lat"
            type="number"
            step="any"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., 12.9716"
            value={latitude} // Bind value to state
            onChange={(e) => setLatitude(e.target.value)} // Update state on change
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
          <input
            id="lng"
            name="lng"
            type="number"
            step="any"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., 77.5946"
            value={longitude} // Bind value to state
            onChange={(e) => setLongitude(e.target.value)} // Update state on change
            required
          />
        </div>
      </div>
      {locationError && (
        <p className="text-red-600 text-sm italic mt-2">{locationError}</p>
      )}

      <div>
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode (Optional)</label>
        <input
          id="pincode"
          name="pincode"
          type="text"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="e.g., 560001"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price (Optional)</label>
          <input
            id="minPrice"
            name="minPrice"
            type="number"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., 500"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price (Optional)</label>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., 1500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Create Alert
      </button>
    </form>
  );
}
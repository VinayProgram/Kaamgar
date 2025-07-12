"use client";

import { DialogContext } from "@/app/context/dailog-context";
import React, { useState, useEffect } from "react";
import { gql, useMutation } from '@apollo/client';
import { CreateAlertDto } from "../graphql/create-alert.dto"; // Ensure this path is correct
import { UserType } from "@/constants/enums"; // Ensure this path is correct
import { createAlert } from "../graphql/create-alert";
import { useCategories, useSkills } from "../graphql/get-categories.dto";
import { getSessionConsumer } from "../../common-api/get-session";

export default function CreateAlertForm() {
  const { setComponent } = React.useContext(DialogContext);
  const [latitude, setLatitude] = useState<number | string>("");
  const [longitude, setLongitude] = useState<number | string>("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const { categories } = useCategories();
  const { skills } = useSkills();
  const { data: session } = getSessionConsumer();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationError(null);
          // For reverse geocoding (getting address from lat/lng),
          // you would make an API call here.
          // Example (pseudocode, requires a geocoding service like Google Maps API):
          // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOUR_API_KEY`)
          //   .then(res => res.json())
          //   .then(data => {
          //     if (data.results && data.results.length > 0) {
          //       // setAddress(data.results[0].formatted_address);
          //     }
          //   })
          //   .catch(err => console.error("Reverse geocoding error:", err));
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Location permission denied or unavailable. Please enter manually.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const variables: CreateAlertDto = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || "",
      categoryId: formData.get("category") as string,
      skillId: formData.get("skillId") as string,
      location: {
        latitude: parseFloat(formData.get("lat") as string),
        longitude: parseFloat(formData.get("lng") as string),
      },
      pincode: formData.get("pincode") as string || "",
      minPrice: formData.get("minPrice") ? parseFloat(formData.get("minPrice") as string) : 0,
      maxPrice: formData.get("maxPrice") ? parseFloat(formData.get("maxPrice") as string) : 0,
      active: true,
      address: formData.get("address") as string || "", // <-- CORRECTED: Get address directly from formData
      alertBy: session?.data.userId || "", // You'll need to populate this dynamically from user context
      alertUserType: UserType.CONSUMER,
      selfDestroy: false,
    };

    try {
      const { data } = await createAlert( variables );
      console.log("GraphQL Mutation Result:", data);
      alert("✅ Alert created!");
      setComponent(null); // Close the dialog
    } catch (err: any) {
      console.error("Failed to create alert:", err);
      alert(`❌ Error creating alert: ${err.message || err}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create New Alert</h2>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="e.g., Need a plumber"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="Detailed description of your alert..."
        ></textarea>
      </div>

      {/* Category (Example - you'd likely fetch these dynamically) */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          name="category"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          
          
          {/* Add more categories dynamically */}
        </select>
      </div>

      {/* Skill (Example - you'd likely fetch these dynamically based on category) */}
      <div>
        <label htmlFor="skillId" className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
        <select
          id="skillId"
          name="skillId"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          required
        >
          <option value="">Select a skill</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>{skill.name}</option>
          ))}
          {/* Add more skills dynamically */}
        </select>
      </div>

      {/* Latitude and Longitude */}
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
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
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
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
      </div>
      {locationError && (
        <p className="text-red-600 text-sm italic mt-2">{locationError}</p>
      )}

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          id="address"
          name="address" // IMPORTANT: This name attribute maps to formData.get("address")
          type="text"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="e.g., 123 Main St, Anytown"
          required // Make address required
        />
      </div>

      {/* Pincode */}
      <div>
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode (Optional)</label>
        <input
          id="pincode"
          name="pincode"
          type="text"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="e.g., 123456"
        />
      </div>

      {/* Min Price and Max Price */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price (Optional)</label>
          <input
            id="minPrice"
            name="minPrice"
            type="number"
            step="0.01"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., 50.00"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price (Optional)</label>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            step="0.01"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="e.g., 200.00"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        {"Create Alert"}
      </button>
    </form>
  );
}
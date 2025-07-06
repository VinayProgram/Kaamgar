"use client";

import { DialogContext } from "@/app/context/dailog-context";
import React, { useState, useEffect } from "react";
import { gql, useMutation } from '@apollo/client'; // Import gql and useMutation

// Define your GraphQL mutation string using gql tag
const CREATE_ALERT_MUTATION = gql`
  mutation CreateAlert(
    $title: String!
    $description: String
    $categoryId: ID!
    $skillId: ID!
    $location: LocationInput!
    $pincode: String
    $minPrice: Float
    $maxPrice: Float
  ) {
    createAlert(
      input: {
        title: $title
        description: $description
        categoryId: $categoryId
        skillId: $skillId
        location: $location
        pincode: $pincode
        minPrice: $minPrice
        maxPrice: $maxPrice
      }
    ) {
      id
      title
      # Add any other fields you want to receive back after mutation
    }
  }
`;

export default function CreateAlertForm() {
  const { setComponent } = React.useContext(DialogContext);
  const [latitude, setLatitude] = useState<number | string>("");
  const [longitude, setLongitude] = useState<number | string>("");
  const [locationError, setLocationError] = useState<string | null>(null);

  // Use the useMutation hook
  const [createAlert, { loading, error, data }] = useMutation(CREATE_ALERT_MUTATION);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationError(null);
        },
        (error) => {
          console.error("Error getting location:", error);
          // ... (your existing error handling for geolocation)
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

    const variables = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || null, // Optional fields can be null
      categoryId: formData.get("category") as string,
      skillId: formData.get("skill") as string,
      location: {
        lat: parseFloat(formData.get("lat") as string),
        lng: parseFloat(formData.get("lng") as string),
      },
      pincode: formData.get("pincode") as string || null,
      minPrice: formData.get("minPrice") ? parseFloat(formData.get("minPrice") as string) : null,
      maxPrice: formData.get("maxPrice") ? parseFloat(formData.get("maxPrice") as string) : null,
    };

    try {
      // Call the mutation function with the variables
      const { data } = await createAlert({ variables });
      console.log("GraphQL Mutation Result:", data);
      alert("✅ Alert created!");
      setComponent(null); // Close the dialog
    } catch (err) {
      console.error("Failed to create alert:", err);
      alert(`❌ Error creating alert: ${err}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create New Alert</h2>

      {/* ... Your form fields ... */}

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

      {/* ... Rest of your form fields ... */}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Creating..." : "Create Alert"}
      </button>
      {error && <p className="text-red-600 text-sm mt-2">Error: {error.message}</p>}
    </form>
  );
}
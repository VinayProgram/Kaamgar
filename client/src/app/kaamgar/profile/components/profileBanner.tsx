import UserProfile from "./subnavbar";

// Dummy data for a skilled Housemaker with Indian Cuisine expertise
const housemakerData = {
  name: "Priya Sharma",
  title: "Experienced Housemaker & Indian Cuisine Specialist",
  profilePicture: "https://images.unsplash.com/photo-1596700543666-3d29a531f9b3?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with an appropriate image
  bannerImage: "https://images.unsplash.com/photo-1543360443-4318d1844b7d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Optional: A banner image related to home/cooking
  experience: [
    "10+ years managing households efficiently",
    "Specialized in authentic North and South Indian cuisine",
    "Expert in home organization and cleanliness",
    "Managed household budgets and supplies effectively",
    "Skilled in childcare and elderly care (as needed)",
  ],
  skills: [
    "Indian Cooking (North Indian, South Indian)",
    "Baking",
    "Meal Planning & Preparation",
    "Kitchen Management",
    "Home Organization",
    "Cleaning & Sanitization",
    "Laundry & Ironing",
    "Time Management",
    "Gardening (Basic)",
    "Budgeting",
    "Childcare Support",
    "Elderly Care Support",
    "Event Catering (Small Scale)",
    "Customer Service (Household)", // If working for multiple clients
  ],
  jobsCompleted: 58, // Number of households managed or long-term assignments completed
  bio: "Dedicated and meticulous housemaker with a passion for creating warm, organized, and healthy living environments. My expertise in traditional Indian cuisine ensures delicious and wholesome meals every day. Committed to providing reliable and high-quality household support.",
  lastUpdated: "June 28, 2025", // Current date
};

export default function BannerProfile() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <UserProfile user={housemakerData} />
      {/* You can add other components here */}
    </div>
  );
}
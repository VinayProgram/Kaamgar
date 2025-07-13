import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";

// Define the type for the user data
interface UserProfileProps {
  user: {
    name: string;
    title: string;
    profilePicture: string; // URL to the profile image
    bannerImage?: string; // Optional: URL to a custom banner image
    experience: string[]; // List of experience points/roles
    skills: string[]; // List of skills
    jobsCompleted: number;
    bio?: string; // Optional: A short bio or description
    lastUpdated?: string; // Optional: Last updated date
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card className="w-full max-w-5xl mx-auto shadow-xl rounded-xl overflow-hidden bg-white">
      {/* Banner Section */}
      <div
        className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-700 md:h-60"
        style={{
          backgroundImage: user.bannerImage ? `url(${user.bannerImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Subtle overlay for better readability of text/profile pic */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-8 md:-bottom-20 md:left-12">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-lg ring-4 ring-blue-300 ring-opacity-70">
            <AvatarImage src={user.profilePicture} alt={`${user.name}'s profile`} />
            {/* Fallback for when image fails to load */}
            <AvatarFallback className="text-4xl font-semibold bg-gray-200 text-gray-700">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="pt-20 px-8 pb-6 md:pt-24 md:px-12 md:pb-8">
        {/* Name and Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
          {user.name}
        </h2>
        <p className="text-xl text-gray-600 mt-1 mb-6">{user.title}</p>

        {/* Optional Bio */}
        {user.bio && (
          <CardDescription className="text-gray-700 leading-relaxed mb-6 max-w-2xl">
            {user.bio}
          </CardDescription>
        )}

        {/* Experience, Skills, Jobs Completed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 border-t border-gray-200 pt-8">
          {/* Experience */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2 text-blue-600">💼</span> Experience
            </h3>
            <ul className="list-none space-y-2 text-gray-700">
              {user.experience.length > 0 ? (
                user.experience.map((exp, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 text-lg mr-2">&bull;</span>
                    {exp}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No experience listed yet.</p>
              )}
            </ul>
          </div>

          {/* Skills */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2 text-purple-600">🛠️</span> Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 rounded-full text-base font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* Jobs Completed */}
          <div className="flex flex-col items-start justify-center text-center md:text-left p-4 bg-blue-50 bg-opacity-70 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2 w-full flex items-center justify-center md:justify-start">
              <span className="mr-2 text-green-600">✅</span> Jobs Completed
            </h3>
            <p className="text-6xl font-extrabold text-blue-700 w-full">
              {user.jobsCompleted}
            </p>
            <p className="text-lg text-gray-600 mt-1 w-full">
              projects successfully delivered
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-8 py-4 bg-gray-50 border-t flex justify-between items-center text-sm text-gray-500">
        <p>
          {user.lastUpdated ? `Last updated: ${user.lastUpdated}` : 'Information current.'}
        </p>
        {/* You can add action buttons or more info here */}
        <div>
          {/* <Button variant="outline" className="mr-2">Message</Button>
          <Button>View Portfolio</Button> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
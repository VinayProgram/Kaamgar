"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { useState } from "react";

const mockUser = {
  name: "Ravi Kumar",
  phone: "+91 9876543210",
  location: "Kothrud, Pune",
};

const allSkills = [
  "Electrician",
  "Plumber",
  "Painter",
  "Carpenter",
  "AC Technician",
  "Driver",
  "Cook",
  "Tailor",
  "Cleaner",
  "Mason",
];

const ProfilePage = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Top Section - Basic Info */}
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profilePic || "/default-avatar.png"} alt="profile" />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{mockUser.name}</h2>
          <p className="text-sm text-gray-600">{mockUser.phone}</p>
          <p className="text-sm text-gray-600">{mockUser.location}</p>
        </div>
      </div>

      {/* Upload Profile Image */}
      <div className="mb-4">
        <Label>Upload Profile Photo</Label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* Bio */}
      <div className="mb-4">
        <Label>Bio (short line)</Label>
        <Input
          placeholder="E.g. Experienced electrician from Pune"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      {/* About */}
      <div className="mb-4">
        <Label>Tell us about yourself</Label>
        <Textarea
          placeholder="Describe your work, experience, and why people should hire you..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>

      {/* Skills Multi-select */}
      <div className="mb-4">
        <Label>Select your professions/skills (max 5)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between mt-2">
              {selectedSkills.length > 0
                ? selectedSkills.join(", ")
                : "Select skills"}
              <span className="ml-auto text-gray-500">▼</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] max-h-64 overflow-y-auto">
            {allSkills.map((skill) => (
              <div
                key={skill}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => toggleSkill(skill)}
              >
                <Checkbox checked={selectedSkills.includes(skill)} />
                <span>{skill}</span>
              </div>
            ))}
            {selectedSkills.length >= 5 && (
              <p className="text-xs text-red-500 mt-2">
                You can only select up to 5 skills.
              </p>
            )}
          </PopoverContent>
        </Popover>

        {/* Show selected as badges */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>


      {/* Aadhaar Card Upload */}
<div className="mb-4">
  <Label htmlFor="aadhar">Upload Aadhaar Card</Label>
  <Input
    type="file"
    accept="application/pdf,image/*"
    id="aadhar"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        console.log("Aadhaar uploaded:", file.name); // Replace with your handler
      }
    }}
  />
</div>

{/* PAN Card Upload */}
<div className="mb-4">
  <Label htmlFor="pan">Upload PAN Card</Label>
  <Input
    type="file"
    accept="application/pdf,image/*"
    id="pan"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        console.log("PAN uploaded:", file.name); // Replace with your handler
      }
    }}
  />
</div>

      {/* Save Button */}
      <Button className="w-full mt-4" disabled={selectedSkills.length === 0 || !bio}>
        Save and Activate Profile
      </Button>
    </div>
  );
};

export default ProfilePage;

import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const jobs = [
  {
    id: 1,
    title: "Electrician Needed",
    location: "Kothrud, Pune",
    budget: "₹500",
    description: "Fix ceiling fan and 2 switches.",
  },
  {
    id: 2,
    title: "Painter Required",
    location: "Erandwane, Pune",
    budget: "₹3000",
    description: "1 BHK house painting job.",
  },
  {
    id: 3,
    title: "AC Repair Technician",
    location: "Deccan, Pune",
    budget: "₹800",
    description: "Split AC cooling issue.",
  },
];

const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛠️ Jobs Around You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-xl transition-all">
            <CardContent className="p-4 space-y-2">
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <p className="text-muted-foreground">{job.location}</p>
              <p className="text-sm">{job.description}</p>
              <p className="font-semibold text-green-600">{job.budget}</p>
              <Button className="mt-2 w-full">Apply</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

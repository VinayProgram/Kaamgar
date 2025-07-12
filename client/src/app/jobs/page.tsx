// app/jobs/page.tsx (or any Server Component)

import api from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Wrench,
  Truck,
  UtensilsCrossed,
  MapPin,
  Clock,
  Paintbrush,
  Scissors,
} from "lucide-react";
import {  GetAllPublicAlerts_Jobs_Response } from "./graphql/get-alets-jobs";


const getJobVisuals = (title: string) => {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("electrical") || lowerTitle.includes("delivery")) {
    return { Icon: Truck, color: "blue" };
  }
  if (lowerTitle.includes("cleaning") || lowerTitle.includes("mechanic") || lowerTitle.includes("technician") || lowerTitle.includes("electrician")) {
    return { Icon: Wrench, color: "orange" };
  }
  if (lowerTitle.includes("plumbing") || lowerTitle.includes("chef") || lowerTitle.includes("kitchen")) {
    return { Icon: UtensilsCrossed, color: "red" };
  }
  if (lowerTitle.includes("painter") || lowerTitle.includes("artist") || lowerTitle.includes("designer")) {
    return { Icon: Paintbrush, color: "purple" };
  }
  if (lowerTitle.includes("beautician") || lowerTitle.includes("salon") || lowerTitle.includes("stylist") || lowerTitle.includes("barber")) {
    return { Icon: Scissors, color: "pink" };
  }
  
  // Default for other jobs
  return { Icon: Briefcase, color: "green" };
};

// We define full class names here so Tailwind CSS can detect them
const colorVariants = {
    blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/50',
        text: 'text-blue-600 dark:text-blue-400'
    },
    orange: {
        bg: 'bg-orange-100 dark:bg-orange-900/50',
        text: 'text-orange-600 dark:text-orange-400'
    },
    red: {
        bg: 'bg-red-100 dark:bg-red-900/50',
        text: 'text-red-600 dark:text-red-400'
    },
    purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/50',
        text: 'text-purple-600 dark:text-purple-400'
    },
    pink: {
        bg: 'bg-pink-100 dark:bg-pink-900/50',
        text: 'text-pink-600 dark:text-pink-400'
    },
    green: {
        bg: 'bg-green-100 dark:bg-green-900/50',
        text: 'text-green-600 dark:text-green-400'
    }
}

export default async function JobsPage() {

  let jobs: GetAllPublicAlerts_Jobs_Response = {data: {GetAllPublicAlerts_Jobs: []}};
  let error: string | null = null;

  try {
    const res = await api.post('/jobs/graphql', { query: `query GetAllPublicAlerts_Jobs {
    GetAllPublicAlerts_Jobs {
        alerts {
            description
            id
            minPrice
            title
            maxPrice
        }
        categories {
            name
        }
        skills {
            name
        }
    }
}` });
    const jobsResponse: GetAllPublicAlerts_Jobs_Response = res.data;
    if (jobsResponse && jobsResponse.data) {
      jobs = jobsResponse;
    }
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    error = "We couldn't load the jobs right now. Please try again later.";
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Wrench className="mx-auto h-12 w-12 text-orange-500" />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Find Your Next Local Job
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Great opportunities for skilled workers are waiting for you right here in your community.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mx-auto max-w-3xl mt-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Oh no! Something went wrong.</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mt-12 mx-auto max-w-4xl space-y-6">
          {!error && jobs.data.GetAllPublicAlerts_Jobs.length > 0 ? (
            jobs.data.GetAllPublicAlerts_Jobs.map((job) => {
              const { Icon, color } = getJobVisuals(job.categories.name);
              const variants = colorVariants[color as keyof typeof colorVariants];

              return (
                <Card key={job.alerts.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.03] dark:bg-slate-900">
                  <div className="flex">
                    {/* Icon Section */}
                    <div className={`flex items-center justify-center p-6 ${variants.bg}`}>
                      <Icon className={`h-10 w-10 ${variants.text}`} />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                         {/* Job Title & Details */}
                         <div className="flex-1 pr-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.alerts.title}</h3>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>Local Area</span> {/* Placeholder */}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>Full-time</span> {/* Placeholder */}
                                </div>
                            </div>
                         </div>
                         {/* Apply Button */}
                         <div className="mt-4 sm:mt-0 flex-shrink-0">
                           <Button size="lg">
                                View & Apply
                                <ArrowRight className="ml-2 h-5 w-5" />
                           </Button>
                         </div>
                      </div>
                       {/* Description */}
                       <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {job.alerts.description}
                       </p>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            !error && (
              <div className="text-center mt-16 py-8 px-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Openings Right Now</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Please check back soon for new job opportunities!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
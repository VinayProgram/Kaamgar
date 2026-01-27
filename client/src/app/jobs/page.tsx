'use client';

import { useAlertsJobsPublic } from "./graphql/get-alets-jobs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  ChevronRight,
  Star,
  Zap,
  ArrowLeft,
  Wrench,
  Truck,
  UtensilsCrossed,
  Paintbrush,
  Scissors
} from "lucide-react";
import Link from "next/link";

const getJobVisuals = (categoryName: string) => {
  const lowerName = categoryName.toLowerCase();
  if (lowerName.includes("electrical") || lowerName.includes("delivery")) return { Icon: Truck, color: "text-blue-400", bg: "bg-blue-400/10" };
  if (lowerName.includes("cleaning") || lowerName.includes("mechanic") || lowerName.includes("electrician")) return { Icon: Wrench, color: "text-orange-400", bg: "bg-orange-400/10" };
  if (lowerName.includes("plumbing") || lowerName.includes("chef")) return { Icon: UtensilsCrossed, color: "text-red-400", bg: "bg-red-400/10" };
  if (lowerName.includes("painter") || lowerName.includes("artist")) return { Icon: Paintbrush, color: "text-purple-400", bg: "bg-purple-400/10" };
  if (lowerName.includes("beautician") || lowerName.includes("salon")) return { Icon: Scissors, color: "text-pink-400", bg: "bg-pink-400/10" };
  return { Icon: Briefcase, color: "text-indigo-400", bg: "bg-indigo-400/10" };
};

export default function JobsPage() {
  const { alerts, loading, error } = useAlertsJobsPublic();

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-indigo-500">
      {/* Header / Nav Area */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="font-bold tracking-tighter uppercase italic tracking-wider text-lg">Jobs <span className="text-indigo-500">Hub</span></span>
          </div>
          <div className="w-24 hidden md:block"></div> {/* Spacer */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title and Search */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Find Your Next <span className="text-indigo-500 italic">Kaam</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">
            Browse through verified local opportunities. From one-day gigs to long-term contracts.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input 
                placeholder="Search by job title, skill or category..." 
                className="pl-12 bg-white/5 border-white/10 h-14 rounded-2xl focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder:text-gray-600"
              />
            </div>
            <Button className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold">
              Search Jobs
            </Button>
            <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-white/5 text-white">
              <Filter className="mr-2 w-5 h-5" />
              Filters
            </Button>
          </div>
        </div>

        {/* Categories Bar (Static UI) */}
        <div className="flex space-x-3 overflow-x-auto pb-6 scrollbar-hide mb-8">
          {["All", "Electrical", "Plumbing", "Delivery", "Painting", "Cleaning", "Construction"].map((cat) => (
             <button 
              key={cat} 
              className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${cat === "All" ? 'bg-indigo-600 text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}
             >
               {cat}
             </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          {/* Main List */}
          <div className="space-y-6">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-40 bg-white/5 rounded-3xl animate-pulse border border-white/5" />
              ))
            ) : error ? (
              <div className="p-12 text-center bg-red-500/5 border border-red-500/20 rounded-3xl">
                <p className="text-red-400 font-medium">Failed to load jobs. Please try again later.</p>
              </div>
            ) : alerts.length === 0 ? (
              <div className="p-12 text-center bg-white/5 border border-white/10 rounded-3xl">
                <p className="text-gray-400 text-lg">No jobs found matching your criteria.</p>
                <Button variant="link" className="mt-4 text-indigo-400">Clear all filters</Button>
              </div>
            ) : (
              alerts.map((job: any) => {
                const { Icon, color, bg } = getJobVisuals(job.categories?.name || "");
                return (
                  <Card key={job.alerts.id} className="bg-white/5 border-white/10 hover:border-indigo-500/50 transition-all group rounded-3xl overflow-hidden cursor-pointer">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className={`p-8 flex items-center justify-center ${bg} md:w-32`}>
                          <Icon className={`w-10 h-10 ${color}`} />
                        </div>
                        <div className="p-8 flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                               <div className="flex items-center space-x-2 mb-1">
                                  <Badge className="bg-indigo-500/10 text-indigo-400 border-none hover:bg-indigo-500/20 transition-colors uppercase text-[10px] tracking-widest font-bold">Verified</Badge>
                                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Ref: {job.alerts.id.slice(0, 8)}</span>
                               </div>
                               <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{job.alerts.title}</h3>
                            </div>
                            <div className="text-right">
                               <p className="text-xl font-black text-indigo-400">₹{job.alerts.maxPrice || "Negotiable"}</p>
                               <span className="text-[10px] text-gray-500 uppercase font-black">Estimated Pay</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-400 text-sm line-clamp-2 mb-6 max-w-2xl leading-relaxed">
                            {job.alerts.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1.5 text-indigo-500" />
                              <span>Hyperlocal (Near You)</span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1.5 text-indigo-500" />
                              <span>Immediate Service</span>
                            </div>
                            <div className="flex items-center">
                              <Star size={14} className="mr-1.5 text-yellow-500 fill-yellow-500" />
                              <span className="text-white">4.8 Rating Required</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-8 md:border-l border-white/5 flex items-center">
                            <Button className="w-full md:w-auto px-6 bg-white text-black hover:bg-indigo-500 hover:text-white font-bold rounded-xl h-12 flex items-center group/btn">
                              Apply <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="bg-indigo-600 rounded-3xl border-none p-8 text-white relative overflow-hidden group">
               <Zap className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-500/50 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
               <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 leading-tight">Post Your Custom Task</h3>
                  <p className="text-indigo-100 mb-6 text-sm leading-relaxed">Can't find what you're looking for? Post a job and let verified workers reach out to you.</p>
                  <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold h-12 rounded-xl">Create Listing</Button>
               </div>
            </Card>

            <Card className="bg-white/5 border-white/10 rounded-3xl p-8">
               <h4 className="text-lg font-bold mb-6">Why Kaamgar?</h4>
               <div className="space-y-6">
                  {[
                    { icon: ShieldCheck, title: "Verified Identity", desc: "Every user goes through mandatory KYC." },
                    { icon: Star, title: "Skill Validation", desc: "Ratings from real users in your area." },
                    { icon: Zap, title: "Instant Payment", desc: "No delays. Get paid as soon as work is done." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                       <div className="p-2 bg-indigo-500/10 rounded-lg">
                          <item.icon size={20} className="text-indigo-400" />
                       </div>
                       <div>
                          <p className="font-bold text-sm mb-1">{item.title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 py-12 border-t border-white/5 text-center text-gray-600 text-[10px] font-black tracking-[0.2em] uppercase">
        © {new Date().getFullYear()} KAAMGAR PROJECT • LOCAL SERVICE HUB
      </footer>
    </div>
  );
}

// Re-defining for local usage just in case types aren't perfectly aligned
const ShieldCheck = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  UserCircle, 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  Zap,
  ShieldCheck,
  Globe
} from 'lucide-react';
import api from '@/lib/axios';

interface Job {
  id: string;
  title: string;
  description: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}

export default function DashboardLandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    fetchJobs();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.post('/jobs/graphql', {
        query: `query GetAllPublicAlerts_Jobs {
          GetAllPublicAlerts_Jobs {
            alerts {
              description
              id
              minPrice
              title
              maxPrice
            }
          }
        }`
      });
      // The structure from jobs/page.tsx: res.data.data.GetAllPublicAlerts_Jobs
      const fetched = res.data?.data?.GetAllPublicAlerts_Jobs?.map((item: any) => ({
        id: item.alerts.id,
        title: item.alerts.title,
        description: item.alerts.description,
        minPrice: item.alerts.minPrice,
        maxPrice: item.alerts.maxPrice,
      })) || [];
      setJobs(fetched.slice(0, 3)); // Just show top 3
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      // Mock data if API fails to show something premium
      setJobs([
        { id: '1', title: 'Experienced Electrician', description: 'Need urgent wiring fix for a residence in Mumbai.', location: 'Mumbai' },
        { id: '2', title: 'Professional House Painter', description: 'Painting 3BHK apartment with premium finish.', location: 'Delhi' },
        { id: '3', title: 'Local Delivery Partner', description: 'Immediate requirement for delivery packages in Bengaluru.', location: 'Bengaluru' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Kaamgar - Dashboard</title>
        <meta name="description" content="Welcome to Kaamgar - Your Local Job and Service Hub." />
      </Head>

      <main className="min-h-screen w-full bg-[#0a0a0c] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">
        
        {/* Modern Navbar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${scrollY > 20 ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Briefcase className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white uppercase italic">Kaamgar</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/jobs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Find Jobs</Link>
              <Link href="/consumers" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Register as User</Link>
              <Link href="/kaamgar/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Register as Worker</Link>
              <Link href="/kaamgar/login">
                <Button variant="outline" className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-full px-6">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4">
              <Link href="/jobs" className="text-lg text-gray-300">Browse Jobs</Link>
              <Link href="/consumers" className="text-lg text-gray-300">Consumer Portal</Link>
              <Link href="/kaamgar/login" className="text-lg text-gray-300">Kaamgar Portal</Link>
              <div className="pt-4 flex flex-col space-y-3">
                <Link href="/consumers"><Button className="w-full bg-indigo-600 uppercase font-bold tracking-widest text-xs">Join as User</Button></Link>
                <Link href="/kaamgar/login"><Button className="w-full variant-outline border-white/20 uppercase font-bold tracking-widest text-xs text-white">Join as Worker</Button></Link>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 mb-6 text-indigo-400 text-xs font-semibold uppercase tracking-widest">
                <Zap size={14} />
                <span>Now Live in Your Locality</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                Empowering the <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Local Workforce</span>
              </h1>
              <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
                Connect with verified local experts for any task or find reliable work opportunities right in your neighborhood. Fast, trusted, and transparent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/consumers" className="flex-1">
                  <div className="group relative p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                    <UserCircle className="text-indigo-500 mb-4 h-10 w-10 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Hire a Expert</h3>
                    <p className="text-sm text-gray-400 mb-4">Post a task and find verified workers near you today.</p>
                    <div className="flex items-center text-indigo-400 text-sm font-bold group-hover:translate-x-2 transition-transform">
                      I'm a Customer <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
                
                <Link href="/kaamgar/login" className="flex-1">
                  <div className="group relative p-8 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl hover:bg-indigo-600/20 transition-all cursor-pointer">
                    <Briefcase className="text-cyan-400 mb-4 h-10 w-10 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">Find Local Work</h3>
                    <p className="text-sm text-gray-400 mb-4">Complete your profile and start getting job alerts nearby.</p>
                    <div className="flex items-center text-cyan-400 text-sm font-bold group-hover:translate-x-2 transition-transform">
                      I'm a Kaamgar <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              {/* Feature grid display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                   <div className="p-6 bg-white/5 border border-white/10 rounded-2xl aspect-square flex flex-col justify-center items-center text-center">
                      <ShieldCheck className="h-12 w-12 text-green-400 mb-4" />
                      <h4 className="font-bold">Verified Only</h4>
                   </div>
                   <div className="p-6 bg-white/5 border border-white/10 rounded-2xl aspect-[3/4] flex flex-col justify-center items-center text-center translate-x-4">
                      <MapPin className="h-12 w-12 text-indigo-400 mb-4" />
                      <h4 className="font-bold"> hyperlocal</h4>
                      <p className="text-xs text-gray-500 mt-2">Work within 5km of your location</p>
                   </div>
                </div>
                <div className="space-y-4 mt-8">
                   <div className="p-6 bg-white/5 border border-white/10 rounded-2xl aspect-[3/4] flex flex-col justify-center items-center text-center">
                      <Globe className="h-12 w-12 text-cyan-400 mb-4" />
                      <h4 className="font-bold">Multilingual</h4>
                      <p className="text-xs text-gray-500 mt-2">Support for 12+ regional languages</p>
                   </div>
                   <div className="p-6 bg-white/5 border border-white/10 rounded-2xl aspect-square flex flex-col justify-center items-center text-center -translate-x-4">
                      <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                      <h4 className="font-bold">Instant Pay</h4>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Jobs Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-[#0a0a0c] to-[#0d0d11]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h2 className="text-3xl font-bold mb-4">Latest Job Openings</h2>
                  <p className="text-gray-400">Discover fresh opportunities added by our community recently.</p>
               </div>
               <Link href="/jobs">
                  <Button variant="link" className="text-indigo-400 hover:text-white group font-bold px-0">
                    See All Openings <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
               </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />
                ))
              ) : (
                jobs.map(job => (
                  <Card key={job.id} className="bg-white/5 border-white/10 hover:border-indigo-500/50 transition-colors group">
                    <CardContent className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-2 uppercase tracking-widest font-bold">
                        <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded">New</span>
                        <div className="flex items-center text-gray-500">
                           <MapPin size={12} className="mr-1" />
                           <span>{job.location || 'Near You'}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                      <p className="text-sm text-gray-400 mb-6 line-clamp-2">{job.description}</p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <div className="text-sm font-bold text-white">
                           {job.minPrice ? `₹${job.minPrice} - ₹${job.maxPrice}` : 'Price on Request'}
                        </div>
                        <Link href={`/jobs`} className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-500 transition-colors">
                          <ArrowRight size={18} className="text-white" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Feature Checkmarks Section */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-4xl font-bold mb-8 italic tracking-tighter uppercase italic tracking-tighter">Why Choose Kaamgar?</h2>
               <div className="space-y-6">
                  {[
                    { title: 'Trusted Network', desc: 'Every worker and consumer has a verified rating based on past performance.' },
                    { title: 'Secure Escrow', desc: 'Secure payment system that only releases funds when the task is marked as complete.' },
                    { title: 'In-app Chat', desc: 'Seamlessly communicate with experts or customers through our localized chat.' },
                    { title: 'Smart Matching', desc: 'Our AI finds the best person for your specific needs based on location and skills.' }
                  ].map((item, id) => (
                    <div key={id} className="flex space-x-4">
                       <CheckCircle2 className="h-6 w-6 text-indigo-500 flex-shrink-0" />
                       <div>
                          <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="p-1 bgColor rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-500 to-cyan-500 group">
               <div className="bg-[#0a0a0c] p-12 rounded-[inherit]">
                  <h3 className="text-3xl font-bold mb-6 tracking-tight">Ready to start?</h3>
                  <p className="text-gray-400 mb-8">Join thousands of others in the first truly modern platform for the Indian unorganized workforce.</p>
                  <div className="space-y-4">
                     <Link href="/kaamgar/login"><Button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-6 rounded-xl">Register as a Worker</Button></Link>
                     <Link href="/consumers"><Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5 font-bold py-6 rounded-xl">Register as a Consumer</Button></Link>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-12 px-6 border-t border-white/5 text-center">
          <div className="flex justify-center items-center space-x-2 mb-8">
            <Briefcase className="text-indigo-600 w-5 h-5" />
            <span className="text-xl font-bold tracking-tighter uppercase italic">Kaamgar</span>
          </div>
          <p className="text-gray-500 text-sm max-w-lg mx-auto mb-8">
            Built to provide dignity and technology to the roots of our economy. 🇮🇳
          </p>
          <div className="flex justify-center space-x-8 text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
             <Link href="#" className="hover:text-white">Privacy</Link>
             <Link href="#" className="hover:text-white">Terms</Link>
             <Link href="#" className="hover:text-white">Contact</Link>
          </div>
          <p className="text-[10px] text-gray-600 font-mono tracking-widest">© {new Date().getFullYear()} KAAMGAR PROJECT. ALL RIGHTS RESERVED.</p>
        </footer>

      </main>
    </>
  );
}


// styles/globals.css additions
// .animate-spin-slow {
//   animation: spin 20s linear infinite;
// }
// @keyframes spin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }

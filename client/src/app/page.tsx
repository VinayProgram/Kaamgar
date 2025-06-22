'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function page() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Kaamgar - Find Trusted Contract Jobs</title>
        <meta name="description" content="Kaamgar helps you find trusted contract jobs and workers in your locality. A platform to connect verified freelancers with reliable opportunities." />
        <meta name="keywords" content="kaamgar, contract jobs, freelance, gig work, local jobs, skilled workers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen w-full overflow-x-hidden font-sans bg-gradient-to-br from-gray-50 to-gray-200">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center">
          <div className="absolute inset-0 -z-10 transform-gpu bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 blur-2xl scale-150 opacity-60 animate-pulse" style={{ transform: `translateY(-${scrollY * 0.2}px)` }} />
          <div className="px-6 md:px-20">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight drop-shadow-xl">
              Welcome to <span className="text-indigo-600">Kaamgar</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Your local platform for finding trusted freelance workers and short-term jobs.
            </p>
            <Button className="mt-8 px-6 py-3 text-lg rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
              Coming Soon 🚀
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white px-6 md:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About Kaamgar</h2>
            <p className="text-gray-600 text-lg">
              Kaamgar is a modern platform built for the Indian workforce to easily discover short-term gigs and services. Whether you're a skilled worker or someone looking to get things done, Kaamgar ensures trust, transparency, and local reach.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-6 md:px-20 bg-gradient-to-br from-indigo-100 to-purple-200">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
            {[
              { title: 'Verified Workers', desc: 'Find only verified and rated workers near you.' },
              { title: 'Location Based Matching', desc: 'Get matched with jobs or workers in your area.' },
              { title: 'Future-Ready AI Tools', desc: 'Smart algorithms to find the right task-person fit.' },
            ].map((feat, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">{feat.title}</h3>
                <p className="text-gray-600">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3D-Like Footer with Parallax */}
        <footer className="relative py-20 text-center text-white bg-black overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-80 -z-10" />
          <div className="transform-gpu scale-[1.2] blur-[100px] bg-indigo-400 absolute top-1/3 left-1/2 -translate-x-1/2 -z-20 h-96 w-96 rounded-full animate-spin-slow opacity-40" />
          <h2 className="text-3xl md:text-5xl font-bold">Join the Kaamgar Movement</h2>
          <p className="mt-6 text-lg max-w-xl mx-auto">
            Empowering the unorganized sector with tech-driven solutions. Be the first to experience Kaamgar.
          </p>
          <Button className="mt-8 px-6 py-3 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-500">
            Notify Me
          </Button>
          <p className="mt-12 text-sm text-gray-400">© {new Date().getFullYear()} Kaamgar. All rights reserved.</p>
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

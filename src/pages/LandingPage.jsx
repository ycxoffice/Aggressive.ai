import React, { useState, useEffect } from "react";
import {
  X,
  Menu,
  Search,
  ChevronRight,
  Database,
  Zap,
  BarChart3,
  Rocket,
} from "lucide-react";
import { Link } from "react-router-dom";

const AggressiveAILanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-red-500"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  filter: "blur(70px)",
                  opacity: Math.random() * 0.4,
                  animation: `pulse ${
                    Math.random() * 10 + 5
                  }s infinite alternate`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black bg-opacity-80 backdrop-blur-md py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-red-500">AGGRESSIVE</span>.AI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Database
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Sales
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Marketing
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Lead Gen
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Growth
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Search className="h-5 w-5 text-gray-300" />
            </button>
            <button className="hidden md:flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Get Access
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
          <div className="flex justify-between items-center p-6">
            <span className="text-xl font-bold">
              <span className="text-red-500">AGGRESSIVE</span>.AI
            </span>
            <button onClick={() => setMenuOpen(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-6 p-6 text-lg">
            <a href="#" className="py-2 border-b border-gray-800">
              Database
            </a>
            <a href="#" className="py-2 border-b border-gray-800">
              Sales
            </a>
            <a href="#" className="py-2 border-b border-gray-800">
              Marketing
            </a>
            <a href="#" className="py-2 border-b border-gray-800">
              Lead Generation
            </a>
            <a href="#" className="py-2 border-b border-gray-800">
              Growth
            </a>
            <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Get Access
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              The Ultimate <span className="text-red-500">Intelligence</span>{" "}
              Database for Growth Companies
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Track, analyze, and dominate your competition with the most
              comprehensive AI-powered database.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={'/CompanyList'} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors flex items-center justify-center">
                Access Database
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="bg-transparent border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors">
                See Demo
              </button>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                10,000+ Companies Tracked
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                Real-time Updates
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                AI-Powered Analysis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Database className="h-10 w-10 text-red-500" />,
                title: "Sales",
                description:
                  "Comprehensive sales intelligence on top-performing companies.",
              },
              {
                icon: <Zap className="h-10 w-10 text-red-500" />,
                title: "Marketing",
                description:
                  "Track cutting-edge marketing strategies and campaigns.",
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-red-500" />,
                title: "Lead Generation",
                description:
                  "Discover how the best companies generate qualified leads.",
              },
              {
                icon: <Rocket className="h-10 w-10 text-red-500" />,
                title: "Growth",
                description:
                  "Analyze growth trajectories and success patterns.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-800 p-8 rounded-xl hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <button className="mt-6 flex items-center text-red-500 hover:text-red-400 font-medium">
                  Explore
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Demo */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful Database <span className="text-red-500">Search</span>
            </h2>
            <p className="text-lg text-gray-300">
              Find exactly what you need with our advanced filtering system.
              Search by industry, size, location, and growth metrics.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gray-900 bg-opacity-70 backdrop-blur-md border border-gray-800 rounded-xl p-6 md:p-8">
              <div className="flex items-center bg-gray-800 rounded-lg px-4 py-3 mb-6">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search for companies by name, industry, or technology..."
                  className="bg-transparent border-0 outline-none text-white flex-1"
                  defaultValue="AI-powered sales automation"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Industry
                  </label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white">
                    <option>All Industries</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Company Size
                  </label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white">
                    <option>Any Size</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Growth Rate
                  </label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white">
                    <option>All Rates</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Technology
                  </label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white">
                    <option>All Tech</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Search Database
                </button>
              </div>
            </div>

            {/* Floating "results" preview */}
            <div className="absolute -bottom-16 -right-8 -left-8 h-32 bg-gradient-to-b from-gray-900 to-transparent rounded-xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-red-500">Dominate</span> Your
              Market?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the elite companies using Aggressive.ai to outperform their
              competition.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors">
              Request Access Now
            </button>
            <p className="mt-6 text-gray-500">
              Limited spots available. Enterprise-grade security.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-red-500">AGGRESSIVE</span>.AI
              </span>
              <p className="mt-2 text-sm text-gray-500">
                The ultimate intelligence database for growth companies
              </p>
            </div>

            <div className="flex space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Aggressive.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AggressiveAILanding;

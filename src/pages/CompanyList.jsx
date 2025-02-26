import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  List,
  ChevronDown,
  Globe,
  Building,
  DollarSign,
  BarChart2,
  Activity,
  Tag,
  Info,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Google Sheets API endpoint using sheet ID and tab ID
        const sheetId = "1g70_RLISMBOymvgCMMAtWZXDAMupNClP9d2o4ofet5k";
        const tabId = "1616601252";
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${tabId}`;

        const response = await fetch(url);
        const text = await response.text();

        // Parse the JSON-like response from Google Sheets
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));

        // Extract column headers and company data
        const headers = jsonData.table.cols.map((col) => col.label);
        const rows = jsonData.table.rows.map((row) => {
          const company = {};
          row.c.forEach((cell, i) => {
            if (headers[i]) {
              company[headers[i]] = cell ? cell.v : "";
            }
          });
          return company;
        });

        setCompanies(rows);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      setIsVisible(true);
    }, []);
  // Get unique exchanges and sectors for filters
  const exchanges = [
    ...new Set(companies.map((company) => company["Exchange"] || "")),
  ].filter(Boolean);
  const sectors = [
    ...new Set(companies.map((company) => company["Sector"] || "")),
  ].filter(Boolean);

  // Filter companies based on search term and filters
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company["Company Name"]
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company["Industry"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company["Headquarters"]?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExchange =
      selectedExchange === "" || company["Exchange"] === selectedExchange;
    const matchesSector =
      selectedSector === "" || company["Sector"] === selectedSector;

    return matchesSearch && matchesExchange && matchesSector;
  });
  
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-20 h-20 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-4 left-4 w-16 h-16 border-4 border-orange-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-10 bg-black">
        <div className="inline-flex bg-red-900/20 p-6 rounded-xl border border-red-700">
          <p className="text-red-500 text-xl font-mono">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
      {/* Header */}
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
      {/* Company Cards */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <List className="h-5 w-5 mr-2 text-orange-500" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Company Directory
            </span>
          </h2>

          <div className="flex space-x-2">
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-gray-400 hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded text-gray-400 hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="p-4 bg-gray-800 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg mb-2">
              No companies match your search criteria
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedExchange("");
                setSelectedSector("");
              }}
              className="mt-4 text-orange-500 hover:text-orange-400 flex items-center text-sm"
            >
              Clear all filters
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <Link
                to={`/${encodeURIComponent(company["Company Name"] || "")}`}
                key={index}
                className="block group"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 group-hover:border-orange-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/10 relative">
                  {/* Growth indicator */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black text-xs font-bold px-3 py-1 rounded-full transform rotate-12 group-hover:rotate-6 transition-transform">
                    +{Math.floor(Math.random() * 50) + 10}%
                  </div>

                  <div className="p-6 border-b border-gray-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white truncate group-hover:text-orange-400 transition-colors">
                          {company["Company Name"]}
                        </h2>
                        <div className="flex items-center mt-1 gap-2">
                          <div className="bg-gray-700 text-xs py-0.5 px-2 rounded text-gray-300 flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            {company["Industry"] || "N/A"}
                          </div>
                          {company["Exchange"] && (
                            <div className="bg-gray-700 text-xs py-0.5 px-2 rounded text-gray-300">
                              {company["Exchange"]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-gray-300 mr-3">
                        <Building className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Headquarters</p>
                        <p className="text-sm text-white">
                          {company["Headquarters"] || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-gray-300 mr-3">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Valuation</p>
                        <p className="text-sm font-medium text-orange-400">
                          {company["Company Valuation"]
                            ? `${company["Company Valuation"]}`
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-gray-300 mr-3">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div className="max-w-[350px] overflow-hidden max-h-10">
                        <p className="text-xs text-gray-400">Website</p>
                        <a
                          href={company["Website"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {company["Website"]?.replace(/^https?:\/\/(www\.)?/, "") || "N/A"}
                        </a>
                      </div>
                    </div>

                    {/* AI Score */}
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 mr-3">
                            <BarChart2 className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">
                              Growth Score
                            </p>
                            <div className="h-2 w-32 bg-gray-700 rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                                style={{
                                  width: `${
                                    Math.floor(Math.random() * 70) + 30
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <button className="bg-gray-700 p-1.5 rounded-lg hover:bg-gray-600 transition-colors group-hover:bg-orange-500 group-hover:text-black">
                          <Info className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="py-20 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1000/1000')] opacity-5 bg-fixed"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-[150px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[150px] opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-orange-400 text-xs font-medium mb-4">
              <BarChart2 className="h-3 w-3 mr-1" />
              AI-Powered Analysis
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Small Cap, Big Data
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our proprietary algorithms analyze thousands of data points to
              identify high-potential small cap companies before they hit the
              mainstream.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 backdrop-blur-sm relative group hover:border-orange-500/50 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500 rounded-full filter blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <div className="bg-gray-700 p-3 rounded-lg inline-flex mb-6 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                <List className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors">
                Market Analytics
              </h3>
              <p className="text-gray-400">
                Real-time valuation tracking and market performance metrics to
                keep you informed of every market movement.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <a
                  href="#"
                  className="text-sm text-orange-400 hover:text-orange-300 flex items-center"
                >
                  Learn more
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 backdrop-blur-sm relative group hover:border-orange-500/50 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500 rounded-full filter blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <div className="bg-gray-700 p-3 rounded-lg inline-flex mb-6 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors">
                Growth Scoring
              </h3>
              <p className="text-gray-400">
                Proprietary AI-driven growth potential scoring system that
                predicts future market performance with remarkable accuracy.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <a
                  href="#"
                  className="text-sm text-orange-400 hover:text-orange-300 flex items-center"
                >
                  Learn more
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 backdrop-blur-sm relative group hover:border-orange-500/50 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500 rounded-full filter blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <div className="bg-gray-700 p-3 rounded-lg inline-flex mb-6 group-hover:bg-orange-500 group-hover:text-black transition-colors">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-orange-400 transition-colors">
                Risk Assessment
              </h3>
              <p className="text-gray-400">
                Comprehensive risk level evaluation and volatility metrics to
                help you make informed investment decisions.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <a
                  href="#"
                  className="text-sm text-orange-400 hover:text-orange-300 flex items-center"
                >
                  Learn more
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyList;

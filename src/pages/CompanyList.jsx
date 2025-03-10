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
        const sheetId = "1g70_RLISMBOymvgCMMAtWZXDAMupNClP9d2o4ofet5k";
        const tabId = "1616601252";
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${tabId}`;

        const response = await fetch(url);
        const text = await response.text();
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));

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
        </div>
      </nav>

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
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg blur opacity-50"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-lg flex items-center p-2 border border-orange-500/30">
            <Search className="w-6 h-6 text-orange-400 ml-2" />
            <input
              type="text"
              placeholder="Search companies, industries, or headquarters..."
              className="w-full bg-transparent border-0 focus:ring-0 text-white px-4 py-2 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

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
              <Search className="h-8 w-8 text-orange-400" />
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
                          {company["Website"]?.replace(
                            /^https?:\/\/(www\.)?/,
                            ""
                          ) || "N/A"}
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
    </div>
  );
}

export default CompanyList;

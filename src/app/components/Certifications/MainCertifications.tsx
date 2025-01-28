"use client";
import React, { useState, useEffect } from "react";
import { CertificationData, fetchCertifications } from "@/app/utils/api";
import { setMultipleCookies, getCookie } from "@/app/utils/cookies";
import { Link as RouterLink } from "react-router-dom";

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<CertificationData[]>([]);
  const [filteredCertifications, setFilteredCertifications] = useState<CertificationData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCertifications = async () => {
      try {
        const data = await fetchCertifications();
          // Set cookies for visit
          const cookiesToSet = {
            visited_page: "Certifications",
            visited_time: new Date().toISOString(),
            message: "Visited certifications page",
          };
          setMultipleCookies(cookiesToSet, 7);
          console.log(cookiesToSet.message);
        if (Array.isArray(data)) {
          setCertifications(data);
          setFilteredCertifications(data);
        } else {
          console.error("API response is not an array:", data);
        }
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    getCertifications();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = certifications.filter((cert) =>
      cert.title.toLowerCase().includes(query)
    );
    setFilteredCertifications(filtered);
  };

  const cookieTitle = getCookie("visited_page");
  console.log("Cookie Title:", cookieTitle);

  if (loading) {
    return <div className="text-center text-gray-400">Loading certifications...</div>;
  }

  if (certifications.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No certifications available at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search certifications..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:border-lavender-500 focus:ring-2 focus:ring-lavender-600/25 transition-all"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((certification) => (
          <RouterLink
            key={certification.slug}
            to={`/certifications/${certification.slug}`}
          >
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-lavender-900/20 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
              <h3 className="text-lg font-bold text-gray-200">
                {certification.title}
              </h3>
            </div>
          </RouterLink>
        ))}
      </div>
    </div>
  );
};

export default Certifications;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const sharksInit = [
  { id: "S-203", location: "27.5°N, 72.3°W", status: "Active", event: "Danger Event" },
  { id: "S-204", location: "28.0°N, 73.0°W", status: "Idle", event: "Normal" },
  { id: "S-205", location: "26.8°N, 71.5°W", status: "Active", event: "Feed Event" },
  { id: "S-206", location: "29.1°N, 74.5°W", status: "Active", event: "Feed Event" },
  { id: "S-207", location: "30.0°N, 75.0°W", status: "Idle", event: "No Feed Event" },
  { id: "S-203", location: "27.5°N, 72.3°W", status: "Active", event: "Danger Event" },
  { id: "S-204", location: "28.0°N, 73.0°W", status: "Idle", event: "Normal" },
  { id: "S-205", location: "26.8°N, 71.5°W", status: "Active", event: "Feed Event" },
  { id: "S-206", location: "29.1°N, 74.5°W", status: "Active", event: "Feed Event" },
  { id: "S-207", location: "30.0°N, 75.0°W", status: "Idle", event: "No Feed Event" },
  { id: "S-203", location: "27.5°N, 72.3°W", status: "Active", event: "Danger Event" },
  { id: "S-204", location: "28.0°N, 73.0°W", status: "Idle", event: "Normal" },
  { id: "S-205", location: "26.8°N, 71.5°W", status: "Active", event: "Feed Event" },
  { id: "S-206", location: "29.1°N, 74.5°W", status: "Active", event: "Feed Event" },
  { id: "S-207", location: "30.0°N, 75.0°W", status: "Idle", event: "No Feed Event" },
  { id: "S-203", location: "27.5°N, 72.3°W", status: "Active", event: "Danger Event" },
  { id: "S-204", location: "28.0°N, 73.0°W", status: "Idle", event: "Normal" },
  { id: "S-205", location: "26.8°N, 71.5°W", status: "Active", event: "Feed Event" },
  { id: "S-206", location: "29.1°N, 74.5°W", status: "Active", event: "Feed Event" },
  { id: "S-207", location: "30.0°N, 75.0°W", status: "Idle", event: "No Feed Event" },
  { id: "S-203", location: "27.5°N, 72.3°W", status: "Active", event: "Danger Event" },
  { id: "S-204", location: "28.0°N, 73.0°W", status: "Idle", event: "Normal" },
  { id: "S-205", location: "26.8°N, 71.5°W", status: "Active", event: "Feed Event" },
  { id: "S-206", location: "29.1°N, 74.5°W", status: "Active", event: "Feed Event" },
  { id: "S-207", location: "30.0°N, 75.0°W", status: "Idle", event: "No Feed Event" },
];

function getRandomSharkData(shark) {
  return {
    ...shark,
    tagBattery: Math.floor(Math.random() * 40) + 60 + "%",
    floaterBattery: Math.floor(Math.random() * 40) + 40 + "%",
    depth: Math.floor(Math.random() * 100) + 100 + " m",
    temp: (Math.random() * 10 + 20).toFixed(1) + " °C",
    pressure: Math.floor(Math.random() * 5) + 12 + " bar",
    light: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
    lastSignal: `${Math.floor(Math.random() * 60)} min ago`,
  };
}

const SharkCard = ({ shark }) => {
  const statusColors = {
    Active: "bg-green-600 border border-green-200",
    Idle: "bg-yellow-600 border-yellow-300",
  };
  const eventColors = {
    "Danger Event": "bg-red-600",
    "Feed Event": "bg-blue-600",
    "No Feed Event": "bg-gray-600",
    Normal: "bg-gray-500",
  };

  return (
    <div className="bg-midnight border border-gray-700 rounded-lg p-5 shadow-md text-white flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Shark ID: {shark.id}</h2>
        <span className="text-xs text-gray-400">Last Signal: {shark.lastSignal}</span>
      </div>
      <p className="text-sm text-gray-300">Location: {shark.location}</p>

      {/* Badges */}
      <div className="flex gap-2 text-xs">
        <span className={`px-2 py-1 rounded-4xl border ${statusColors[shark.status]}`}>
          {shark.status}
        </span>
        <span className={`px-2 py-1 rounded-4xl ${eventColors[shark.event]}`}>
          {shark.event}
        </span>
      </div>

      {/* Data grid */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-[#0C2A3A]  flex justify-between rounded-lg p-2"><span>Tag Battery</span> <span>{shark.tagBattery}</span></div>
        <div className="bg-[#0C2A3A]  flex justify-between rounded-lg p-2"><span>Floater Battery </span> <span>
          {shark.floaterBattery}</span></div>
        <div className="bg-[#0C2A3A]  flex justify-between rounded-lg p-2"><span>
          Depth</span>  <span>{shark.depth}</span></div>
        <div className="bg-[#0C2A3A]  flex justify-between rounded-lg p-2"><span>Temp</span>  <span>{shark.temp}</span></div>
        <div className="bg-[#0C2A3A]  flex justify-between rounded-lg p-2"><span>Pressure</span> <span> {shark.pressure}</span></div>
        <div className="bg-[#0C2A3A]  flex justify-between rounded-lg p-2"><span>Light</span>  <span>{shark.light}</span></div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-3">
        <Link to={`/livemap`} className="px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded text-sm">
          Track on Map
        </Link>
        <Link to={`/livemap/${shark.id}`} className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded text-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default function TagDetails() {
  const [sharks, setSharks] = useState(sharksInit.map(getRandomSharkData));

  useEffect(() => {
    const interval = setInterval(() => {
      setSharks(sharksInit.map(getRandomSharkData));
    }, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6  min-h-screen text-white">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Tag details</h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-1/3 px-3 py-2 rounded bg-[#152642] border border-gray-600 text-sm"
        />
        <div className="flex gap-3">
          <select className="px-3 py-2 rounded bg-[#152642] border border-gray-600 text-sm">
            <option>All Event</option>
            <option>Danger Event</option>
            <option>Feed Event</option>
            <option>No Feed Event</option>
            <option>Normal</option>
          </select>
          <select className="px-3 py-2 rounded bg-[#152642] border border-gray-600 text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Idle</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sharks.map((shark, index) => (
          <SharkCard key={index} shark={shark} />
        ))}
      </div>
  
    </div>
  );
}

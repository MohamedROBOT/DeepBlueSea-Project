"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchSharkData } from "./dashboardApi";

// Icons
import { FaSignal, FaBatteryHalf } from "react-icons/fa";
import { MdOutlineWaves, MdWavingHand } from "react-icons/md";
import { GiSharkFin } from "react-icons/gi";
import { IoWarning } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";

export default function Dashboard() {
  const [sharks, setSharks] = useState([]);
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { sharks, signals } = await fetchSharkData();
      setSharks(sharks);
      setSignals(signals);
    };
    loadData();

    // Auto-refresh every 10s
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Stats
  const stats = [
    {
      label: "Active Sharks",
      value: sharks.length,
      icon: <FaSignal className='text-green-400' size={22} />,
    },
    {
      label: "Tag Battery AVG.",
      value:
        sharks.length > 0
          ? `${(
              sharks.reduce((acc, s) => acc + s.battery, 0) / sharks.length
            ).toFixed(0)}%`
          : "0%",
      icon: <FaBatteryHalf className='text-red-400' size={22} />,
    },
    {
      label: "Floaters online",
      value: 2,
      icon: <MdOutlineWaves className='text-sky-400' size={22} />,
    },
    {
      label: "Feed/Danger Events",
      value: Math.floor(Math.random() * 10),
      icon: <IoWarning className='text-yellow-400' size={22} />,
    },
    {
      label: "Last signal",
      value: sharks[0]?.lastSignal || "--",
      icon: <BsClockHistory className='text-purple-400' size={22} />,
    },
    {
      label: "Total Tags",
      value: sharks.length,
      icon: <GiSharkFin className='text-teal-400' size={22} />,
    },
  ];

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <span className='text-xl lg:text-3xl flex justify-start items-center mb-8 font-bold'>
          Welcome back, Dr.Noura 👋
        </span>
        <span className='text-xl font-semibold'>Overview</span>
      </div>
      {/* Top Stats */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
        {stats.map((s, i) => (
          <div
            key={i}
            className='bg-[#091C2D] rounded-xl p-4 flex flex-col gap-y-2  items-center shadow'>
            {s.icon}
            <span className='text-white font-bold text-lg'>{s.value}</span>
            <span className='text-silver text-sm'>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Map */}
      <span className='text-xl font-semibold'>Live Map</span>

      <div className='bg-[#091C2D] p-4 rounded-xl z-10'>
        <MapContainer
          center={[20, -40]}
          zoom={2}
          scrollWheelZoom={true}
          zoomControl={true}
          className='h-[400px] rounded-lg'>
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            subdomains={["a", "b", "c"]}
            className='z-10'
          />

          {sharks.map((shark) => (
            <CircleMarker
              key={shark.id}
              center={shark.location}
              radius={6}
              pathOptions={{
                color:
                  shark.battery < 20
                    ? "red"
                    : shark.status === "Active"
                    ? "lime"
                    : "orange",
              }}>
              <Popup>
                <b>{shark.name}</b>
                <br />
                Species: {shark.species}
                <br />
                Battery: {shark.battery}%
                <br />
                Last Signal: {shark.lastSignal}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className='flex gap-4 text-sm text-white mt-3'>
          <span className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-lime-400 rounded-full inline-block'></span>{" "}
            Active
          </span>
          <span className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-red-500 rounded-full inline-block'></span>{" "}
            Low Battery
          </span>
          <span className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-yellow-400 rounded-full inline-block'></span>{" "}
            Idle
          </span>
        </div>
      </div>

      {/* Signals + Quick Tag View */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Shark Signals */}
        <div className='bg-[#091C2D] p-4 rounded-xl'>
          <h3 className='text-white font-bold mb-3'>
            Shark Signals
            <span className='text-teal-400 ms-2 cursor-pointer text-sm'>
              View All Activities
            </span>
          </h3>
          <ul className='space-y-2 text-silver'>
            {signals.map((sig, i) => (
              <li
                key={i}
                className='bg-[#1A2332] p-2 rounded-lg hover:bg-[#1e2a3d] transition'>
                {sig}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Tag View */}
        <div className='bg-[#091C2D] p-4 rounded-xl'>
          <h3 className='text-white font-bold mb-3'>Quick Tag View</h3>
          <div className='space-y-3 max-h-[250px] overflow-y-auto'>
            {sharks.map((shark) => (
              <div
                key={shark.id}
                className='bg-[#1A2332] p-3 rounded-lg flex flex-col gap-1'>
                <div className='flex justify-between'>
                  <span className='text-white font-semibold'>
                    Tag ID {shark.id}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      shark.status === "Active"
                        ? "bg-green-500 text-black"
                        : "bg-gray-500 text-white"
                    }`}>
                    {shark.status}
                  </span>
                </div>
                <span className='text-silver text-sm'>
                  Species: {shark.species}
                </span>
                <span className='text-silver text-sm'>
                  Length: {shark.length}
                </span>
                <span className='text-silver text-sm'>
                  Battery: {shark.battery}%
                </span>
                <span className='text-silver text-sm'>
                  Last signal: {shark.lastSignal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

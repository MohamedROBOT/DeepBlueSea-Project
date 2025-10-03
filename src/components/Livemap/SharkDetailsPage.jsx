import React, { useEffect } from "react";
import { useSharks } from "../../context/SharksContext";
import { Link } from "react-router-dom";
import fvHammerShark from "../../assets/images/sharksfirstvew/hammer-shark.jpg"
import fvWhiteShark from "../../assets/images/sharksfirstvew/white-shark.jpg"
export default function SharkDetailsPage() {
  const { selectedShark,setSelectedShark } = useSharks();
  console.log(selectedShark);


  const sharkImages = import.meta.glob('../../assets/images/*.{jpg,webp,png}', { eager: true });
const imagesArray = Object.values(sharkImages).map(img => img.default);

    const sharkImage = imagesArray.find((img) =>
        img.toLowerCase().includes(selectedShark?.species.replace(/\s/g, "").toLowerCase())
      );


useEffect(() => {
    if (selectedShark) {
      setSelectedShark(selectedShark);
      localStorage.setItem("selectedShark", JSON.stringify(selectedShark));
    } else {
      const storedShark = localStorage.getItem("selectedShark");
      if (storedShark) {
        setSelectedShark(JSON.parse(storedShark));
      }
    }
  }, [selectedShark]);


  return (
    selectedShark ? (
      <div className=' bg-[#0d1b2a] text-white rounded-2xl p-8'>
      <h1 className='text-2xl font-bold mb-6'>Shark Tag Details</h1>

      <div className='flex flex-col lg:flex-row gap-6 mb-8'>
        {/* Shark Image */}
        <div className='w-full lg:w-1/3 bg-gray-800 rounded-xl p-4 flex justify-center items-center'>
     <img
          src={sharkImage}
          alt={selectedShark.species}
          className=' rounded-xl shadow-lg'
        />
        </div>

        {/* Shark Information */}
        <div className='flex-1 bg-gray-800 rounded-xl p-6 space-y-3'>
          <h2 className='text-xl font-semibold text-teal-400 mb-3'>
            Shark Information
          </h2>
          <div>
            <span className='text-gray-400'>Shark ID:</span> {selectedShark.id}
          </div>
          <div>
            <span className='text-gray-400'>Species:</span>
            {selectedShark.species}
          </div>
          <div>
            <span className='text-gray-400'>Lng:</span> {selectedShark.lng}
          </div>
          <div>
            <span className='text-gray-400'>Lat:</span> {selectedShark.lat}
          </div>
        </div>
      </div>

      {/* Tag Information */}
      <h2 className='text-xl font-semibold text-teal-400 mb-3'>
        Tag Information
      </h2>
      <div className='bg-gray-800 rounded-xl p-6 mb-6'>
        <div>
          <span className='text-gray-400'>Tag ID:</span> {selectedShark.id}
        </div>
        <div>
          <span className='text-gray-400'>Model:</span> OceanTrack Pro
        </div>
        <div>
          <span className='text-gray-400'>Signal Frequency:</span> Every 30 mins
        </div>
        <div>
          <span className='text-gray-400'>Depth:</span> 150m
        </div>
        <div>
          <span className='text-gray-400'>Pressure:</span> 14 bar
        </div>
        <div>
          <span className='text-gray-400'>ECG:</span> 14 mV
        </div>
        <div>
          <span className='text-gray-400'>Light:</span> Medium
        </div>
        <div>
          <span className='text-gray-400'>Temperature:</span> {selectedShark.temperature
}
        <div>
          <span className='text-gray-400'>Battery Status:</span>
          {selectedShark.battery}%
        </div>
        </div>
        <div>
          <span className='text-gray-400'>Last Signal:</span>
          {new Date(selectedShark.datetime).toLocaleString("en-US", {
            weekday: "short", 
            year: "numeric",
            month: "short", 
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, 
          })}
        </div>
      </div>

      {/* Floater Information */}
      <h2 className='text-xl font-semibold text-teal-400 mb-3'>
        Floater Information
      </h2>
      <div className='bg-gray-800 rounded-xl p-6 mb-6'>
        <div>
          <span className='text-gray-400'>Floater ID:</span> #12
        </div>
        <div>
          <span className='text-gray-400'>Location:</span> {selectedShark.region}
        </div>
        <div>
          <span className='text-gray-400'>Signal Strength:</span> Strong
        </div>
        <div>
          <span className='text-gray-400'>Last Sync:</span> 1h ago
        </div>
      </div>

      {/* Last Media Capture */}
      <h2 className='text-xl font-semibold text-teal-400 mb-3'>
        Last Media Capture
      </h2>
      <div className='bg-gray-800 rounded-xl p-6 mb-6'>
        <div className='flex flex-col lg:flex-row  gap-4'>
          <img src={fvHammerShark} alt="sharkfirstview" className="lg:w-1/4 w-full object-contain rounded-xl" />
          <img src={fvWhiteShark} alt="sharktiger" className="lg:w-1/4 w-fullobject-contain rounded-xl"/>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex gap-4'>
        <Link
          to={"/"}
          className='bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg'>
          ← Back to Dashboard
        </Link>
        <Link
          to={"/livemap"}
          className='bg-teal-500 hover:bg-teal-400 px-4 py-2 rounded-lg'>
          Track the Live Map
        </Link>
      </div>
    </div>
    ) : (
     <div className="h-screen flex justify-center items-center">
            <Link className="bg-teal-500 hover:bg-teal-400  px-4 py-2 rounded-lg" to={"/livemap"}>Select a Shark first</Link>

     </div>
    )
  );
}

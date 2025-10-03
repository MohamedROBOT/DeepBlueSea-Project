import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3-geo";
import Globe from "react-globe.gl";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSharks } from "../../context/SharksContext";

const COUNTRIES_URL =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const FACTORS_URL = "./factors.json";
// ... imports and constants remain the same

export default function MapField() {
  const globeRef = useRef();
  const [countries, setCountries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [formData, setFormData] = useState({
    region: "Atlantic Ocean",
    environmental: {
      seaTemperature: { enabled: false, value: "Moderate 16-25 °C" },
      chlorophyll: { enabled: false, value: "High" },
      currents: { enabled: false, value: "Weak" },
    },
  });

  const [factors, setFactors] = useState([]);
  const [sharks, setSharks] = useState([]);

  const { selectedShark, setSelectedShark } = useSharks();

  const updateEnvironmental = (key, field, newValue) => {
    const updated = {
      ...formData,
      environmental: {
        ...formData.environmental,
        [key]: {
          ...formData.environmental[key],
          [field]: newValue,
        },
      },
    };
    setFormData(updated);

    // Save to localStorage
    localStorage.setItem("sharkMapFilters", JSON.stringify(updated));
  };

  // localstorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("sharkMapFilters");
    if (savedFilters) {
      setFormData(JSON.parse(savedFilters));
    }
  }, []);

  const handleRegionChange = (region) => {
    const updated = { ...formData, region };
    setFormData(updated);
    localStorage.setItem("sharkMapFilters", JSON.stringify(updated));
  };

  // Load countries and labels
  useEffect(() => {
    fetch(COUNTRIES_URL)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.features);
        const lbls = data.features.map((feat) => ({
          lat: d3.geoCentroid(feat)[1],
          lng: d3.geoCentroid(feat)[0],
          text: feat.properties.name,
          type: "country",
        }));
        const oceanLabels = [
          { lat: 0, lng: -30, text: "Atlantic Ocean", type: "ocean" },
          { lat: 15, lng: -150, text: "Pacific Ocean", type: "ocean" },
          { lat: -20, lng: 80, text: "Indian Ocean", type: "ocean" },
          { lat: 70, lng: 0, text: "Arctic Ocean", type: "ocean" },
          { lat: -70, lng: 0, text: "Southern Ocean", type: "ocean" },
        ];
        setLabels([...lbls, ...oceanLabels]);
      });
  }, []);

  // Load factors
  useEffect(() => {
    fetch(FACTORS_URL)
      .then((res) => res.json())
      .then((data) => setFactors(data));
  }, []);

  // Generate sharks around the selected factor(s)
  useEffect(() => {
    if (!factors.length) return;

    const factorKey = Object.keys(formData.environmental).find(
      (k) => formData.environmental[k].enabled
    );
    if (!factorKey) return;

    const activeFactors = factors.filter(
      (f) =>
        f.ocean === formData.region &&
        f[factorKey] === formData.environmental[factorKey].value
    );

    const sharkSpeciesByTemperature = {
      "Cold 0-15 °C": ["Greenland Shark", "Basking Shark"],
      "Moderate 16-25 °C": ["Great White", "Tiger Shark", "Blue Shark"],
      "Warm 26-30 °C": ["Hammerhead", "Bull Shark", "Mako Shark"],
    };

    const newSharks = activeFactors.flatMap((factor) =>
      Array.from({ length: 5 }).map((_, i) => {
        let lat =
          factor.lat +
          (Math.random() * 2 + 0.5) * (Math.random() > 0.5 ? 1 : -1);
        let lng =
          factor.lng +
          (Math.random() * 2 + 0.5) * (Math.random() > 0.5 ? 1 : -1);

        const speciesList = sharkSpeciesByTemperature[
          factor.seaTemperature
        ] || ["Great White"];
        const species =
          speciesList[Math.floor(Math.random() * speciesList.length)];

        return {
          id: `SHK-${factor.lat}-${factor.lng}-${i}`,
          lat,
          lng,
          species,
          temperature: factor.seaTemperature,
          chlorophyll: factor.chlorophyll,
          currents: factor.currents,
          status: "Active",
          battery: Math.floor(Math.random() * 100),
          datetime: new Date().toISOString(),
          region: formData.region,
        };
      })
    );

    setSharks(newSharks);

    // Fly to the first active factor
    if (activeFactors.length && globeRef.current) {
      const f = activeFactors[0];
      globeRef.current.pointOfView(
        { lat: f.lat, lng: f.lng, altitude: 2.5 },
        1500
      );
    }
  }, [formData, factors]);

  // Color for factor circles
  const factorCircleColor = (factor, factorKey) => {
    if (!factor) return "rgba(255,255,255,0.3)";
    if (factorKey === "seaTemperature") {
      if (factor.seaTemperature.includes("Cold")) return "rgba(255,0,0,0.4)";
      if (factor.seaTemperature.includes("Moderate"))
        return "rgba(255,165,0,0.4)";
      if (factor.seaTemperature.includes("Warm")) return "rgba(255,255,0,0.4)";
    }
    if (factorKey === "chlorophyll") {
      if (factor.chlorophyll === "High") return "rgba(0,128,0,0.4)";
      if (factor.chlorophyll === "Medium") return "rgba(144,238,144,0.4)";
      if (factor.chlorophyll === "Low") return "rgba(200,255,200,0.4)";
    }
    if (factorKey === "currents") {
      if (factor.currents === "Strong") return "rgba(0,0,255,0.4)";
      if (factor.currents === "Medium") return "rgba(173,216,230,0.4)";
      if (factor.currents === "Weak") return "rgba(200,220,255,0.4)";
    }
    return "rgba(200,200,200,0.4)";
  };

  const factorKey = Object.keys(formData.environmental).find(
    (k) => formData.environmental[k].enabled
  );
  const activeFactors = factors.filter(
    (f) =>
      factorKey &&
      f.ocean === formData.region &&
      f[factorKey] === formData.environmental[factorKey].value
  );

  return (
    <div className='relative w-screen h-screen'>
      {/* Legend / Instructions Panel */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "70px",
          zIndex: 10,
          backgroundColor: "rgba(30,30,30,0.85)",
          padding: "15px",
          borderRadius: "10px",
          color: "white",
          maxWidth: "400px",
          fontSize: "14px",
        }}>
        <h2 className='text-lg font-semibold mb-2'>Map Instructions</h2>

        <div className='mb-2'>
          <strong>Region Filter:</strong> Select an ocean to focus on a specific
          area.
        </div>

        <div className='mb-2'>
          <strong>Environmental Factors:</strong>
          <ul className='ml-4 list-disc'>
            <li>
              <span className='text-red-400'>Sea Temperature:</span>
              <span className='ml-1 text-red-300'>Cold 0-15 °C</span> /
              <span className='ml-1 text-orange-400'>Moderate 16-25 °C</span> /
              <span className='ml-1 text-yellow-400'>Warm 26-30 °C</span>
            </li>
            <li>
              <span className='text-green-400'>Chlorophyll:</span>
              <span className='ml-1 text-green-700'>High</span> /
              <span className='ml-1 text-green-300'>Medium</span> /
              <span className='ml-1 text-green-100'>Low</span>
            </li>
            <li>
              <span className='text-blue-400'>Currents:</span>
              <span className='ml-1'>Weak</span> /
              <span className='ml-1'>Medium</span> /
              <span className='ml-1'>Strong</span>
            </li>
          </ul>
        </div>

        <div className='mb-2'>
          <strong>Sharks:</strong> Small red dots represent sharks in the
          filtered area. Click to view details.
        </div>

        <div>
          <strong>Factor Highlight:</strong> Colored ring shows the selected
          factor’s area.
        </div>
      </div>

      {/* Filter Panel */}
      <div
        style={{ position: "absolute", top: "20px", left: "63px", zIndex: 10 }}>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between rounded-lg bg-gray-800 px-4 py-2 text-left text-lg font-semibold text-white hover:bg-gray-700'>
                <span className='w-100'>Filter</span>
                {open ? (
                  <ChevronUpIcon className='h-5 w-5 text-teal-400' />
                ) : (
                  <ChevronDownIcon className='h-5 w-5 text-teal-400' />
                )}
              </Disclosure.Button>
              <Disclosure.Panel className='mt-2 rounded-lg bg-gray-900/90 p-6 text-white shadow-lg'>
                <h2 className='text-lg font-semibold mb-4'>Region</h2>
                <select
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  className='bg-gray-800 text-sm px-3 py-2 rounded-lg border border-gray-600 w-full'>
                  <option>Atlantic Ocean</option>
                  <option>Pacific Ocean</option>
                  <option>Indian Ocean</option>
                  <option>Southern Ocean</option>
                  <option>Arctic Ocean</option>
                </select>
                <h2 className='text-lg font-semibold mt-4 mb-3'>
                  Environmental Factors
                </h2>
                <div className='space-y-3  text-sm'>
                  {["seaTemperature", "chlorophyll", "currents"].map((key) => (
                    <div key={key} className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        checked={formData.environmental[key].enabled}
                        onChange={(e) =>
                          updateEnvironmental(key, "enabled", e.target.checked)
                        }
                        className='accent-teal-500'
                        style={{ transform: "scale(1.5)", marginRight: "8px" }}
                      />
                      <span>{key}</span>
                      <select
                        value={formData.environmental[key].value}
                        onChange={(e) =>
                          updateEnvironmental(key, "value", e.target.value)
                        }
                        className='ml-auto bg-gray-800 px-2 py-1 rounded-lg border border-gray-600 text-xs'>
                        {key === "seaTemperature" ? (
                          <>
                            <option>Cold 0-15 °C</option>
                            <option>Moderate 16-25 °C</option>
                            <option>Warm 26-30 °C</option>
                          </>
                        ) : key === "chlorophyll" ? (
                          <>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                          </>
                        ) : (
                          <>
                            <option>Weak</option>
                            <option>Medium</option>
                            <option>Strong</option>
                          </>
                        )}
                      </select>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      {/* Globe */}
      <Globe
        ref={globeRef}
        width={window.innerWidth}
        height={window.innerHeight}
        globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
        polygonsData={countries}
        polygonCapColor={() => "rgba(0,0,0,0)"}
        polygonSideColor={() => "rgba(0,0,0,0)"}
        polygonStrokeColor={() => "#222"}
        labelsData={labels}
        labelText='text'
        labelSize={(d) => (d.type === "ocean" ? 1.0 : 0.35)}
        labelDotRadius={0}
        labelColor={(d) => (d.type === "ocean" ? "lightblue" : "white")}
        labelResolution={2}
        pointsData={sharks}
        pointLat='lat'
        pointLng='lng'
        pointColor={(shark) =>
          selectedShark && shark.id === selectedShark.id ? "red" : "green"
        }
        pointAltitude={0}
        pointRadius={0.15}
        onPointClick={(shark) => setSelectedShark(shark)}
        ringsData={activeFactors.map((f) => ({
          lat: f.lat,
          lng: f.lng,
          altitude: 0.05,
          radius: 1,
          color: factorCircleColor(f, factorKey),
        }))}
        ringColor={(r) => r.color}
        ringAltitude={(r) => r.altitude}
        ringRadius={(r) => r.radius}
      />

      {/* Shark Details */}
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          right: "20px",
          zIndex: 10,
        }}>
        <div className='max-h-max bg-gray-900/80 text-white rounded-xl shadow-lg p-5 border border-gray-700'>
          <h2 className='text-lg font-semibold mb-4'>Details</h2>
          {selectedShark ? (
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Tag ID:</span>{" "}
                <span>{selectedShark.id}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Species:</span>{" "}
                <span>{selectedShark.species}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Date & Time:</span>{" "}
                <span>
                  {" "}
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
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Temperature:</span>{" "}
                <span>{selectedShark.temperature}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Chlorophyll:</span>{" "}
                <span>{selectedShark.chlorophyll}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Currents:</span>{" "}
                <span>{selectedShark.currents}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Region:</span>{" "}
                <span>{selectedShark.region}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Status:</span>{" "}
                <span className='text-green-400 font-semibold'>
                  {selectedShark.status}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Battery:</span>{" "}
                <span>{selectedShark.battery}%</span>
              </div>
              <div className=' flex justify-center cursor-pointer '>
                <Link
                  to={`/livemap/${selectedShark.id}`}
                  className='text-teal-400'>
                  View Shark full profile
                </Link>
              </div>
            </div>
          ) : (
            <div className='text-gray-400 '>Click a shark to see details</div>
          )}
        </div>
      </div>
    </div>
  );
}

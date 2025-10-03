// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// export default function Dashboard() {
//   // Sample chlorophyll trend data
//   const lineData = [
//     { day: "-6d", value: 0.9 },
//     { day: "-5d", value: 1.1 },
//     { day: "-4d", value: 1.4 },
//     { day: "-3d", value: 1.8 },
//     { day: "-2d", value: 2.0 },
//     { day: "-1d", value: 1.9 },
//     { day: "Now", value: 2.1 },
//   ];

//   // Probability distribution
//   const pieData = [
//     { name: "High (>0.7)", value: 40, color: "#f87171" },
//     { name: "Medium (0.4-0.7)", value: 35, color: "#fbbf24" },
//     { name: "Low (<0.4)", value: 25, color: "#22d3ee" },
//   ];

//   // Hotspot list
//   const hotspots = [
//     {
//       rank: 1,
//       location: "25.00, -70.00",
//       chi: 2.1,
//       prob: "92%",
//       update: "2025-10-01",
//     },
//     {
//       rank: 2,
//       location: "23.50, -68.20",
//       chi: 1.8,
//       prob: "86%",
//       update: "2025-10-01",
//     },
//     {
//       rank: 3,
//       location: "-10.20, 130.40",
//       chi: 1.6,
//       prob: "78%",
//       update: "2025-10-01",
//     },
//     {
//       rank: 4,
//       location: "18.60, -64.30",
//       chi: 1.4,
//       prob: "72%",
//       update: "2025-10-01",
//     },
//     {
//       rank: 5,
//       location: "12.30, -45.20",
//       chi: 1.1,
//       prob: "65%",
//       update: "2025-10-01",
//     },
//     {
//       rank: 6,
//       location: "30.20, -76.10",
//       chi: 0.9,
//       prob: "55%",
//       update: "2025-10-01",
//     },
//     {
//       rank: 7,
//       location: "-22.30, -18.20",
//       chi: 0.8,
//       prob: "49%",
//       update: "2025-10-01",
//     },
//     {
//       rank: 8,
//       location: "5.50, -40.50",
//       chi: 0.5,
//       prob: "34%",
//       update: "2025-10-01",
//     },
//   ];

//   return (
//     <div className='bg-slate-900 justify-end grid grid-cols-1 gap-4  lg:grid-cols-3 '>
//       {/* Sidebar */}
//       <div className=' bg-midnight rounded-xl p-12 flex flex-col gap-4'>
//         <h2 className='text-lg font-semibold text-teal-400'>
//           SharkGuard — Hotspots
//         </h2>
//         <p className='text-sm text-teal-200'>
//           Predictive feeding zones (prototype)
//         </p>

//         {/* Filters */}
//         <div className='flex flex-col gap-6'>
//           <div>
//             <label className='block text-sm font-medium'>Time window</label>
//             <select className='w-full mt-1 p-2 rounded border border-cyan-950'>
//               <option className='bg-slate-700'>Last Day</option>
//               <option className='bg-slate-700'>Last Week</option>
//               <option className='bg-slate-700'>Last Month</option>
//             </select>
//           </div>
//           <div>
//             <label className='block text-sm font-medium'>Data Layer</label>
//             <select className='w-full mt-1 p-2 rounded border border-cyan-950'>
//               <option className='bg-slate-700'>Chlorophyll</option>
//               <option className='bg-slate-700'>SST</option>
//               <option className='bg-slate-700'>Currents</option>
//             </select>
//           </div>

//           <div>
//             <label className='block text-sm font-medium'>
//               Prediction threshold
//             </label>
//             <input type='range' min='0' max='100' className='w-full mt-2' />
//             <button className='mt-2 w-full bg-cyan-600 hover:bg-cyan-500 py-2 rounded'>
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Charts */}
//       <div className=' flex gap-4 flex-col'>
//         {/* Line chart */}
//         <div className='bg-slate-800 p-4 rounded-xl'>
//           <h3 className='text-md text-teal-400 font-medium mb-2'>
//             Chlorophyll trend (sample)
//           </h3>
//           <ResponsiveContainer width='100%' height={200}>
//             <LineChart data={lineData}>
//               <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
//               <XAxis dataKey='day' stroke='#94a3b8' />
//               <YAxis stroke='#94a3b8' />
//               <Tooltip />
//               <Line
//                 type='monotone'
//                 dataKey='value'
//                 stroke='#22d3ee'
//                 strokeWidth={2}
//                 dot
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie chart */}
//         <div className='bg-slate-800 p-4 rounded-xl'>
//           <h3 className='text-md font-medium mb-2 text-teal-400'>
//             Probability distribution
//           </h3>
//           <ResponsiveContainer width='100%' height={250}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey='value'
//                 cx='50%'
//                 cy='50%'
//                 outerRadius={80}
//                 innerRadius={50}>
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Hotspots Table */}
//       <div className=' bg-slate-800 p-4 rounded-xl'>
//         <h3 className='text-md font-medium mb-3 text-teal-400'>
//           Top Predicted Hotspots
//         </h3>
//         <table className='w-full border-separate border-spacing-y-4  text-sm'>
//           <thead className='text-slate-400'>
//             <tr className=' border-slate-700'>
//               <th className="border-b border-gray-300">Rank</th>
//               <th className="border-b border-gray-300">Location</th>
//               <th className="border-b border-gray-300">Chl</th>
//               <th className="border-b border-gray-300">Prob%</th>
//               <th className="border-b border-gray-300">Last Update</th>
//             </tr>
//           </thead>
//           <tbody>
//             {hotspots.map((h) => (
//               <tr
//                 key={h.rank}
//                 className='border-t text-center border-slate-700'>
//                 <td className="border-b border-gray-300">{h.rank}</td>
//                 <td className="border-b border-gray-300">{h.location}</td>
//                 <td className="border-b border-gray-300">{h.chi}</td>
//                 <td className="border-b border-gray-300">{h.prob}</td>
//                 <td className="border-b border-gray-300">{h.update}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  // --- Dummy datasets from NASA-style values ---
  const datasets = {
    Chlorophyll: {
      lineData: {
        day: [
          { day: "-6h", value: 1.2 },
          { day: "-4h", value: 1.6 },
          { day: "-2h", value: 2.0 },
          { day: "Now", value: 2.3 },
        ],
        week: [
          { day: "-6d", value: 0.9 },
          { day: "-5d", value: 1.1 },
          { day: "-4d", value: 1.4 },
          { day: "-3d", value: 1.8 },
          { day: "-2d", value: 2.0 },
          { day: "-1d", value: 1.9 },
          { day: "Now", value: 2.1 },
        ],
        month: [
          { day: "-30d", value: 0.6 },
          { day: "-20d", value: 1.0 },
          { day: "-10d", value: 1.5 },
          { day: "-5d", value: 1.9 },
          { day: "Now", value: 2.3 },
        ],
      },
      pieData: [
        { name: "High (>0.7)", value: 40, color: "#f87171" },
        { name: "Medium (0.4-0.7)", value: 35, color: "#fbbf24" },
        { name: "Low (<0.4)", value: 25, color: "#22d3ee" },
      ],
      hotspots: [
        { rank: 1, location: "25.00, -70.00", chi: 2.1, prob: 92, update: "2025-10-01" },
        { rank: 2, location: "23.50, -68.20", chi: 1.8, prob: 86, update: "2025-10-01" },
        { rank: 3, location: "-10.20, 130.40", chi: 1.6, prob: 78, update: "2025-10-01" },
        { rank: 4, location: "18.60, -64.30", chi: 1.4, prob: 72, update: "2025-10-01" },
        { rank: 5, location: "12.30, -45.20", chi: 1.1, prob: 65, update: "2025-10-01" },
        { rank: 6, location: "30.20, -76.10", chi: 0.9, prob: 55, update: "2025-10-01" },
        { rank: 7, location: "-22.30, -18.20", chi: 0.8, prob: 49, update: "2025-10-01" },
        { rank: 8, location: "5.50, -40.50", chi: 0.5, prob: 34, update: "2025-10-01" },
      ],
    },
    SST: {
      lineData: {
        day: [
          { day: "-6h", value: 27.0 },
          { day: "-4h", value: 27.5 },
          { day: "-2h", value: 28.0 },
          { day: "Now", value: 28.3 },
        ],
        week: [
          { day: "-6d", value: 26.5 },
          { day: "-5d", value: 26.8 },
          { day: "-4d", value: 27.1 },
          { day: "-3d", value: 27.6 },
          { day: "-2d", value: 28.0 },
          { day: "-1d", value: 27.9 },
          { day: "Now", value: 28.2 },
        ],
        month: [
          { day: "-30d", value: 25.6 },
          { day: "-20d", value: 26.3 },
          { day: "-10d", value: 27.1 },
          { day: "-5d", value: 27.8 },
          { day: "Now", value: 28.3 },
        ],
      },
      pieData: [
        { name: "Warm (>28°C)", value: 50, color: "#f87171" },
        { name: "Moderate (26-28°C)", value: 30, color: "#fbbf24" },
        { name: "Cool (<26°C)", value: 20, color: "#22d3ee" },
      ],
      hotspots: [
        { rank: 1, location: "14.00, -60.00", chi: 28.2, prob: 90, update: "2025-10-01" },
        { rank: 2, location: "-20.30, 150.40", chi: 27.9, prob: 83, update: "2025-10-01" },
        { rank: 3, location: "5.60, -40.20", chi: 27.1, prob: 70, update: "2025-10-01" },
      ],
    },
    Currents: {
      lineData: {
        day: [
          { day: "-6h", value: 0.6 },
          { day: "-4h", value: 0.8 },
          { day: "-2h", value: 1.0 },
          { day: "Now", value: 1.3 },
        ],
        week: [
          { day: "-6d", value: 0.5 },
          { day: "-5d", value: 0.6 },
          { day: "-4d", value: 0.8 },
          { day: "-3d", value: 1.0 },
          { day: "-2d", value: 1.2 },
          { day: "-1d", value: 1.1 },
          { day: "Now", value: 1.3 },
        ],
        month: [
          { day: "-30d", value: 0.4 },
          { day: "-20d", value: 0.7 },
          { day: "-10d", value: 0.9 },
          { day: "-5d", value: 1.1 },
          { day: "Now", value: 1.3 },
        ],
      },
      pieData: [
        { name: "Strong (>1 m/s)", value: 45, color: "#f87171" },
        { name: "Moderate (0.5-1 m/s)", value: 35, color: "#fbbf24" },
        { name: "Weak (<0.5 m/s)", value: 20, color: "#22d3ee" },
      ],
      hotspots: [
        { rank: 1, location: "30.00, -76.10", chi: 1.3, prob: 88, update: "2025-10-01" },
        { rank: 2, location: "12.30, -45.20", chi: 1.1, prob: 77, update: "2025-10-01" },
        { rank: 3, location: "-22.30, -18.20", chi: 0.8, prob: 65, update: "2025-10-01" },
      ],
    },
  };

  // --- State ---
  const [layer, setLayer] = useState("Chlorophyll");
  const [timeWindow, setTimeWindow] = useState("week");
  const [threshold, setThreshold] = useState(0);

  const { lineData, pieData, hotspots } = datasets[layer];

  // Apply threshold filter
  const filteredHotspots = hotspots.filter((h) => h.prob >= threshold);

  return (
    <div className="bg-slate-900 justify-end grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Sidebar */}
      <div className="bg-midnight rounded-xl p-12 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-teal-400">
          SharkGuard — Hotspots
        </h2>
        <p className="text-sm text-teal-200">
          Predictive feeding zones (prototype)
        </p>

        {/* Filters */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium">Time window</label>
            <select
              className="w-full mt-1 p-2 rounded border border-cyan-950"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
            >
              <option value="day" className="bg-slate-700">Last Day</option>
              <option value="week" className="bg-slate-700">Last Week</option>
              <option value="month" className="bg-slate-700">Last Month</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Data Layer</label>
            <select
              className="w-full mt-1 p-2 rounded border border-cyan-950"
              value={layer}
              onChange={(e) => setLayer(e.target.value)}
            >
              <option value="Chlorophyll" className="bg-slate-700">Chlorophyll</option>
              <option value="SST" className="bg-slate-700">SST</option>
              <option value="Currents" className="bg-slate-700">Currents</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Prediction threshold: {threshold}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="flex gap-4 flex-col">
        {/* Line chart */}
        <div className="bg-slate-800 p-4 rounded-xl">
          <h3 className="text-md text-teal-400 font-medium mb-2">
            {layer} trend ({timeWindow})
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData[timeWindow]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22d3ee"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-slate-800 p-4 rounded-xl">
          <h3 className="text-md font-medium mb-2 text-teal-400">
            Probability distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hotspots Table */}
      <div className="bg-slate-800 p-4 rounded-xl">
        <h3 className="text-md font-medium mb-3 text-teal-400">
          Top Predicted Hotspots
        </h3>
        <table className="w-full border-separate border-spacing-y-3 text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="border-b border-gray-700">Rank</th>
              <th className="border-b border-gray-700">Location</th>
              <th className="border-b border-gray-700">
                {layer === "SST" ? "Temp (°C)" : layer === "Currents" ? "Speed (m/s)" : "Chl"}
              </th>
              <th className="border-b border-gray-700">Prob%</th>
              <th className="border-b border-gray-700">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotspots.length > 0 ? (
              filteredHotspots.map((h) => (
                <tr key={h.rank} className="border text-center border-slate-700 rounded">
                  <td className="border-b border-slate-700">{h.rank}</td>
                  <td className="border-b border-slate-700">{h.location}</td>
                  <td className="border-b border-slate-700">{h.chi}</td>
                  <td className="border-b border-slate-700">{h.prob}%</td>
                  <td className="border-b border-slate-700">{h.update}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-slate-400">
                  No hotspots above threshold
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

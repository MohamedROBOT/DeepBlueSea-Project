export async function fetchSharkData() {

const randomOceanCoords = () => {
  let lat, lng;
  do {
    lat = (Math.random() * 120 - 60).toFixed(2);   // -60 to +60
    lng = (Math.random() * 360 - 180).toFixed(2);  // -180 to +180
  } while (
    // Filter: Africa
    (lat > -40 && lat < 35 && lng > -20 && lng < 55) ||
    // Filter: North America
    (lat > 5 && lat < 60 && lng > -130 && lng < -60) ||
    // Filter: South America
    (lat > -60 && lat < 15 && lng > -90 && lng < -30) ||
    // Filter: Europe
    (lat > 35 && lat < 70 && lng > -10 && lng < 40) ||
    // Filter: Asia (big landmass)
    (lat > 5 && lat < 60 && lng > 55 && lng < 150) ||
    // Filter: Australia
    (lat > -45 && lat < -10 && lng > 110 && lng < 155)
  );
  return [parseFloat(lat), parseFloat(lng)];
};
const sharkSpecies = [
  "Great White Shark",
  "Tiger Shark",
  "Hammerhead Shark",
  "Bull Shark",
  "Whale Shark",
  "Mako Shark",
  "Sandbar Shark",
  "Nurse Shark",
  "Goblin Shark",
  "Thresher Shark",
  "Blue Shark",
  "Blacktip Shark",
  "Zebra Shark",
  "Basking Shark",
  "Oceanic Whitetip Shark"
];

  const sharks = Array.from({ length: 32 }).map((_, i) => {
    const species =
  sharkSpecies[Math.floor(Math.random() * sharkSpecies.length)];

    const [lat, lng] = randomOceanCoords();
    return {
      id: `C${50 + i}`,
      name: `Shark #${100 + i}`,
      species,
      length: `${(Math.random() * 3 + 2).toFixed(1)}m`,
      battery: Math.floor(Math.random() * 100),
      status: Math.random() > 0.5 ? "Active" : "Idle",
      lastSignal: `${Math.floor(Math.random() * 10)} min ago`,
      location: [lat, lng],
    };
  });

  const signals = [
    `${sharks[0].name} entered Bahamas Hotspot (${Math.floor(Math.random() * 20)} min ago)`,
    `${sharks[1].id} battery low (${sharks[1].battery}%)`,
    "New chlorophyll bloom detected (Atlantic)",
    `${sharks[2].name} migrated near Cuba`,
    "Predictive alert: high probability of shark presence near Florida",
  ];

  return { sharks, signals };
}

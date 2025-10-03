import { createContext, useContext, useState } from "react";

// 1. Create context
const SharksContext = createContext();

// 2. Provider
export function SharksProvider({ children }) {
  const [sharks, setSharks] = useState([]); // all sharks
  const [selectedShark, setSelectedShark] = useState(null); // currently selected shark

  return (
    <SharksContext.Provider value={{ sharks, setSharks, selectedShark, setSelectedShark }}>
      {children}
    </SharksContext.Provider>
  );
}

// 3. Custom hook
export const useSharks = () => useContext(SharksContext);

import React from "react";
import { BattlePage } from "./components/BattlePage";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[url('/bg-dark-texture.png')] bg-repeat bg-top text-white font-epic">
      <BattlePage />
    </div>
  );
};

export default App;

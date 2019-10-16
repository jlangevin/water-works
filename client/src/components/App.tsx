import React from "react";
import FloorList from "./FloorList";
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        Water Works ...or does it?
      </div>
      <div>
        <FloorList />
      </div>
    </div>
  );
}

export default App;

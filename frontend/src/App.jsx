import { useState } from "react";

function App() {

  const [incidentNumber, setIncidentNumber] = useState("");

  const handleResolve = () => {
    alert(`Resolving incident ${incidentNumber}`);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      
      <h2>AI Incident Resolver</h2>

      <br />

      <input
        type="text"
        placeholder="Enter Incident Number"
        value={incidentNumber}
        onChange={(e) => setIncidentNumber(e.target.value)}
        style={{
          padding: "10px",
          width: "300px"
        }}
      />

      <br /><br />

      <button
        onClick={handleResolve}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Resolve
      </button>

    </div>
  );
}

export default App;
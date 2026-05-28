import { useState } from "react";

function App() {

  const [incidentNumber, setIncidentNumber] = useState("");

  const [results, setResults] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {

    setErrorMessage("");

    try {

      let url = "http://127.0.0.1:8000/incidents";

      if (incidentNumber.trim() !== "") {

        url += `?incident_number=${incidentNumber}`;

      }

      const response = await fetch(url);

      const data = await response.json();

      if (data.length === 0) {

        setResults([]);

        setErrorMessage("No matching incident found.");

      } else {

        setResults(data);

      }

    } catch (error) {

      console.error(error);

      setErrorMessage("Backend connection failed.");

    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

      <h2>AI Incident Resolver</h2>

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
        onClick={handleSearch}>
        Search
      </button>

      <br /><br />

      {errorMessage && (
        <div style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}

      {results.length > 0 && (

        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            width: "100%"
          }}
        >

          <thead>
            <tr>
              <th>Incident Number</th>
              <th>Short Description</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>

            {results.map((incident, index) => (

              <tr key={index}>
                <td>{incident["Incident Number"]}</td>
                <td>{incident["Short Description"]}</td>
                <td>{incident["Priority"]}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default App;
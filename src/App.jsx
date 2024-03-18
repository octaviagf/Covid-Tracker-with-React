import { useState, useEffect } from "react";
import Swal from "sweetalert";
import "./index.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [country, setCountry] = useState([]);

  useEffect(() => {
    setLoading(true);

    async function getData() {
      const response = await fetch(`https://coronavirus.m.pipedream.net/`);
      const result = await response.json();
      console.log(result.rawData);
      setData(result.rawData);
      setLoading(false);
    }
    getData();
  }, []);

  function searchCountry(countryName) {
    if (countryName) {
      const countrySearch = data.filter((country) =>
        country.Country_Region.toLowerCase().includes(countryName.toLowerCase())
      );
      setCountry(countrySearch);
    } else {
      alert("Your input field is empty.");
    }
  }

  return (
    <div>
      <Navbar />
      <HeaderForm
        loading={loading}
        input={input}
        setInput={setInput}
        onSearchCountry={searchCountry}
      />
      <ShowData country={country} setInput={setInput} />
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <h1>⚫ Monitor Virus Trend</h1>
    </div>
  );
}

function HeaderForm({ loading, input, setInput, onSearchCountry }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearchCountry(input);
  }

  return (
    <div className="header">
      <h2>Covid Tracker</h2>
      <p>Stay updated with real-time COVID-19 tracking.</p>
      <form onSubmit={handleSubmit}>
        {loading ? (
          alert("Loading...")
        ) : (
          <>
            <input
              type="text"
              placeholder="Country"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn">
              Start tracking
            </button>
          </>
        )}
      </form>
    </div>
  );
}

/*function Form({ input, setInput, onSearchCountry }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearchCountry(input);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Country"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button type="submit" className="btn">
          Search Country
        </button>
      </form>
    </div>
  );
}

function ShowData({ country }) {
  return (
    <div className="data">
      {country.map((item, index) => (
        <div key={index}>
          <h3>{item.Country_Region}</h3>
          <p>Confirmed cases: {item.Confirmed}</p>
          <p>Deaths: {item.Deaths}</p>
        </div>
      ))}
    </div>
  );
}*/

function ShowData({ country, setInput }) {
  useEffect(() => {
    showDataWithAlert(country);
  }, [country]);

  function showDataWithAlert(countryData) {
    countryData.map((item) => {
      Swal({
        icon: "info",
        title: item.Country_Region,
        text: ` ${item.Confirmed} confirmed cases and ${item.Deaths} deaths.`,
      });
    });
    setInput("");
  }
}

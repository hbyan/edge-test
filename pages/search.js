import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedFixture, setSelectedFixture] = useState(null);

  // Fetch fixtures from the database when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setSelectedFixture(null); 
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/retrieve?query=${query}`);
        const data = await res.json();
        setResults(data);
        setSelectedFixture(null);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFixtureClick = (fixture) => {
    setSelectedFixture(fixture);
  };

  return (
    <div>
      <h1>Search Fixtures</h1>
      <input
        type="text"
        placeholder="Search for a team"
        value={query}
        onChange={handleSearchChange}
      />
      
        <div className={styles.fixturesContainer}>
            <div>
              <h3>Search Results</h3>
              (Click item to view the details)
              <ul>
                {results.map((fixture) => (
                  <li 
                    key={fixture._id} 
                    onClick={() => handleFixtureClick(fixture)} 
                    className={`${styles.fixtureItem} 
                        ${selectedFixture?._id === fixture._id ? styles.fixtureSelectedItem : ''}`}
                  >
                    {fixture.home_team} - {fixture.away_team}
                  </li>
                ))}
              </ul>
            </div>

          {query && results.length > 0 && selectedFixture && (
            <div className={styles.fixtureDetails}>
            <div className={styles.fixtureDetailsHeader}>
              Fixture Details
                <button onClick={() => setSelectedFixture(null)} className={styles.closeButton}>&times;</button>
            </div>
              <p><strong>Season:</strong> {selectedFixture.season}</p>
              <p><strong>Competition:</strong> {selectedFixture.competition_name}</p>
              <p><strong>Round:</strong> {selectedFixture.fixture_round}</p>
              <p><strong>Date & Time:</strong> {selectedFixture.fixture_datetime}</p>
              <p><strong>Home Team:</strong> {selectedFixture.home_team}</p>
              <p><strong>Opponent:</strong> {selectedFixture.away_team}</p>
            </div>
          )}
        </div>
    </div>
  );
}

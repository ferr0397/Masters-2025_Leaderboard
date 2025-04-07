import React, { useEffect, useState } from 'react';

export default function EntryList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZRYVfTCyD1V-ZkpAJALuN7fUNWz-GRTCY4p-Ci1U84O3ahn0if36VecchzN3k6Xjt1IYXHF6aKNYJ/pub?output=csv'
        );
        const text = await response.text();
        const rows = text.split('\n').map(row => row.split(','));
        const entryNames = rows.slice(1).map(row => row[0]).filter(name => name && name.trim() !== '');
        setEntries(entryNames);
      } catch (error) {
        console.error('Error fetching entry list:', error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🏌️‍♂️ Current Entries</h1>
      <ul className="space-y-2 text-center">
        {entries.map((entry, index) => (
          <li key={index} className="border-b pb-2">
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
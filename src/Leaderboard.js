import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZRYVfTCyD1V-ZkpAJALuN7fUNWz-GRTCY4p-Ci1U84O3ahn0if36VecchzN3k6Xjt1IYXHF6aKNYJ/pub?output=csv"
    )
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1);
        const data = rows.map((row) => row.split(","));
        const parsed = data.map((r) => ({
          name: r[0],
          score: parseFloat(r[15]) || 0,
          golfers: [r[1], r[3], r[5], r[7], r[9], r[11], r[13]],
          golferScores: [r[2], r[4], r[6], r[8], r[10], r[12], r[14]],
        }));
        const sorted = parsed.filter(e => e.name).sort((a, b) => a.score - b.score);
        setEntries(sorted);
      });
  }, []);

  const filtered = entries.filter((entry) =>
    entry.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Masters Pool Leaderboard</h1>
      <input
        placeholder="Search by entry name..."
        className="mb-6 border p-2 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {filtered.map((entry, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{index + 1}. {entry.name}</h2>
              <div className="text-lg font-bold">{entry.score}</div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {entry.golfers.map((g, i) => (
                <div key={i} className="flex justify-between">
                  <span>{g}</span>
                  <span className="font-mono">{entry.golferScores[i]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPokemonStats } from "./services/pogoApiService";
import PokemonCard from "./components/PokemonCard";
import PokemonDetail from "./components/PokemonDetail";
import "./App.css";
import type { PokemonStats } from "./types/pokemon";

function calculateCP(
  baseAttack: number,
  baseDefense: number,
  baseStamina: number
): number {
  return Math.floor(
    ((baseAttack + 15) *
      Math.sqrt(baseDefense + 15) *
      Math.sqrt(baseStamina + 15)) /
      10
  );
}

function App() {
  const [pokemonStats, setPokemonStats] = useState<PokemonStats[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchPokemonStats();
        const statsWithCP = stats.map((pokemon) => ({
          ...pokemon,
          cp: calculateCP(
            pokemon.base_attack,
            pokemon.base_defense,
            pokemon.base_stamina
          ),
        }));
        setPokemonStats(statsWithCP);
      } catch (error) {
        console.error("Error fetching Pokémon stats:", error);
      }
    };

    fetchData();
  }, []);

  const filteredPokemon = pokemonStats.filter((pokemon) => {
    const matchesSearch = pokemon.pokemon_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLeague =
      selectedLeague === "All" ||
      (selectedLeague === "Great" && pokemon.cp <= 1500) ||
      (selectedLeague === "Ultra" && pokemon.cp > 1500 && pokemon.cp <= 2500) ||
      (selectedLeague === "Master" && pokemon.cp > 2500);

    return matchesSearch && matchesLeague;
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div id="root">
              <h1>Pokémon Stats</h1>
              <div>
                <input
                  type="text"
                  placeholder="Search Pokémon"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  value={selectedLeague}
                  onChange={(e) => setSelectedLeague(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Great">Great League (≤1500 CP)</option>
                  <option value="Ultra">Ultra League (1501-2500 CP)</option>
                  <option value="Master">Master League (&gt;2500 CP)</option>
                </select>
              </div>
              <div className="pokemon-list">
                {filteredPokemon.map((pokemon) => (
                  <a
                    key={pokemon.pokemon_name}
                    href={`/${pokemon.pokemon_name}`}
                  >
                    <PokemonCard
                      stats={pokemon}
                      types={{ pokemon_name: pokemon.pokemon_name, type: [] }}
                    />
                  </a>
                ))}
              </div>
            </div>
          }
        />
        <Route path="/:pokemonName" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

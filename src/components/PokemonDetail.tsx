import React from "react";
import { useParams } from "react-router-dom";
import { fetchMoves, fetchPokemonStats } from "../services/pogoApiService";
import { useEffect, useState } from "react";
import type { PokemonStats, PokemonMoves } from "../types/pokemon";

const PokemonDetail: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [pokemonStats, setPokemonStats] = useState<PokemonStats | null>(null);
  const [moves, setMoves] = useState<PokemonMoves[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchPokemonStats();
        const pokemon = stats.find((p) => p.pokemon_name === pokemonName);
        setPokemonStats(pokemon || null);

        const allMoves = await fetchMoves();

        const currentPokemonMoves = allMoves.filter(
          (move) => move.pokemon_name === pokemonName
        );

        setMoves(currentPokemonMoves);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchData();
  }, [pokemonName]);

  if (!pokemonStats) {
    return <p>Loading...</p>;
  }

  console.log("Pokemon Stats and Moves:", {
    pokemonStats,
    moves,
  });

  return (
    <div>
      <h1>{pokemonStats.pokemon_name}</h1>
      <p>Form: {pokemonStats.form}</p>
      <p>Attack: {pokemonStats.base_attack}</p>
      <p>Defense: {pokemonStats.base_defense}</p>
      <p>Stamina: {pokemonStats.base_stamina}</p>
      <h2>Fast Moves</h2>
      <ul>
        {moves
          .filter((move) => move.fast_moves.length > 0)
          .map((move) => (
            <li key={move.pokemon_id}>{move.fast_moves.join(", ")}</li>
          ))}
      </ul>
      <h2>Charged Moves</h2>
      <ul>
        {moves
          .filter((move) => move.charged_moves.length > 0)
          .map((move) => (
            <li key={move.pokemon_id}>{move.charged_moves.join(", ")}</li>
          ))}
      </ul>
      {moves
        .filter((move) => move.elite_fast_moves.length > 0)
        .map((move) => (
          <div key={move.pokemon_id}>
            <h2>Elite Fast Moves</h2>
            <ul>
              {move.elite_fast_moves.map((fastMove) => (
                <li key={fastMove}>{fastMove}</li>
              ))}
            </ul>
          </div>
        ))}

      {moves
        .filter((move) => move.elite_charged_moves.length > 0)
        .map((move) => (
          <div key={move.pokemon_id}>
            <h2>Elite Charged Moves</h2>
            <ul>
              {move.elite_charged_moves.map((chargedMove) => (
                <li key={chargedMove}>{chargedMove}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default PokemonDetail;

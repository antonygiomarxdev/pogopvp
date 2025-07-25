import React from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemonStats,
  fetchFastMoves,
  fetchChargedMoves,
} from "../services/pogoApiService";
import { useEffect, useState } from "react";
import type { PokemonStats, Move } from "../types/pokemon";

const PokemonDetail: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [pokemonStats, setPokemonStats] = useState<PokemonStats | null>(null);
  const [fastMoves, setFastMoves] = useState<Move[]>([]);
  const [chargedMoves, setChargedMoves] = useState<Move[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchPokemonStats();
        const pokemon = stats.find((p) => p.pokemon_name === pokemonName);
        setPokemonStats(pokemon || null);

        const fast = await fetchFastMoves();
        setFastMoves(fast);

        const charged = await fetchChargedMoves();
        setChargedMoves(charged);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchData();
  }, [pokemonName]);

  if (!pokemonStats) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{pokemonStats.pokemon_name}</h1>
      <p>Form: {pokemonStats.form}</p>
      <p>Attack: {pokemonStats.base_attack}</p>
      <p>Defense: {pokemonStats.base_defense}</p>
      <p>Stamina: {pokemonStats.base_stamina}</p>
      <h2>Fast Moves</h2>
      <ul>
        {fastMoves.map((move) => (
          <li key={move.move_id}>
            {move.move_name} - Power: {move.power}
          </li>
        ))}
      </ul>
      <h2>Charged Moves</h2>
      <ul>
        {chargedMoves.map((move) => (
          <li key={move.move_id}>
            {move.move_name} - Power: {move.power}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetail;

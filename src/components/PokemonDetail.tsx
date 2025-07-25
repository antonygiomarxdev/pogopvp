import React from "react";
import { useParams } from "react-router-dom";
import { usePokemonStats, useMoves } from "../services/pogoApiService";

const PokemonDetail: React.FC = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();

  const {
    data: pokemonStats,
    isLoading: statsLoading,
    error: statsError,
  } = usePokemonStats();
  const {
    data: moves,
    isLoading: movesLoading,
    error: movesError,
  } = useMoves();

  if (statsLoading || movesLoading) {
    return <p>Loading...</p>;
  }

  if (statsError || movesError) {
    return <p>Error loading data.</p>;
  }

  const pokemon = Array.isArray(pokemonStats)
    ? pokemonStats.find((p) => p.pokemon_name === pokemonName)
    : undefined;
  const currentPokemonMoves = Array.isArray(moves)
    ? moves.filter((move) => move.pokemon_name === pokemonName)?.[0]
    : undefined;

  if (!pokemon) {
    return <p>Pokemon not found.</p>;
  }

  return (
    <div>
      <h1>{pokemon.pokemon_name}</h1>
      <p>Form: {pokemon.form}</p>
      <p>Attack: {pokemon.base_attack}</p>
      <p>Defense: {pokemon.base_defense}</p>
      <p>Stamina: {pokemon.base_stamina}</p>
      <h2>Fast Moves</h2>
      <ul>
        {currentPokemonMoves?.fast_moves.map((move) => (
          <li key={move}>{move}</li>
        ))}
      </ul>
      <h2>Charged Moves</h2>
      <ul>
        {currentPokemonMoves?.charged_moves.map((move) => (
          <li key={move}>{move}</li>
        ))}
      </ul>
      {(currentPokemonMoves?.elite_fast_moves ?? []).length > 0 && (
        <div>
          <h2>Elite Fast Moves</h2>
          <ul>
            {currentPokemonMoves?.elite_fast_moves?.map((fastMove) => (
              <li key={fastMove}>{fastMove}</li>
            ))}
          </ul>
        </div>
      )}

      {(currentPokemonMoves?.elite_charged_moves ?? []).length > 0 && (
        <div>
          <h2>Elite Charged Moves</h2>
          <ul>
            {currentPokemonMoves?.elite_charged_moves.map((chargedMove) => (
              <li key={chargedMove}>{chargedMove}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;

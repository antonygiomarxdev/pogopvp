import React from "react";
import type { PokemonStats, PokemonType } from "../types/pokemon";

interface PokemonCardProps {
  stats: PokemonStats;
  types: PokemonType;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ stats, types }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold">{stats.pokemon_name}</h2>
      <p>Form: {stats.form}</p>
      <p>Attack: {stats.base_attack}</p>
      <p>Defense: {stats.base_defense}</p>
      <p>Stamina: {stats.base_stamina}</p>
      <div className="flex gap-2 mt-2">
        {types.type.map((type) => (
          <span
            key={type}
            className="px-2 py-1 bg-blue-200 rounded-full text-sm"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;

import React from 'react';

export const PokemonPreview = ({ pokemon }) => {
  return (
    <article className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
      <div className="space-y-2">
        <p>Number: {pokemon.nationalNumber}</p>
        <p>Type: {pokemon.primaryType} {pokemon.secondaryType && `/ ${pokemon.secondaryType}`}</p>
        <p>Height: {pokemon.height}m</p>
        <p>Weight: {pokemon.weight}kg</p>
      </div>
    </article>
  );
};

export const PokemonList = ({ pokemons }) => {
  return (
    <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-4">
      {pokemons.map((pokemon) => (
        <PokemonPreview key={pokemon.nationalNumber} pokemon={pokemon} />
      ))}
    </section>
  );
};
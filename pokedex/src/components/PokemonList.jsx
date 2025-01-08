import React from 'react';
import PokemonPreview from './PokemonPreview';

const PokemonList = ({ pokemons }) => {
  return (
    <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] p-4">
      {pokemons.map((pokemon) => (
        <PokemonPreview key={pokemon.nationalNumber} pokemon={pokemon} />
      ))}
    </section>
  );
};

export default PokemonList;
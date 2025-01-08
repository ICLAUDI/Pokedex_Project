import React from 'react';

const PokemonPreview = ({ pokemon, onSelect }) => {
  if (!pokemon) return null;

  const pokemonId = pokemon.nationalNumber;
  
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const fallbackImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = fallbackImageUrl;
  };

  return (
    <div
      className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 bg-white"
      onClick={() => onSelect(pokemon)}
    >
      <p className="text-right text-gray-500 text-sm mb-2">#{String(pokemonId).padStart(3, '0')}</p>
      <img
        src={imageUrl}
        onError={handleImageError}
        alt={pokemon.englishName}
        className="w-full h-40 object-contain mb-3"
        loading="lazy"
      />
      <h2 className="text-center text-lg font-semibold capitalize mb-2">{pokemon.englishName}</h2>
      <div className="flex justify-center gap-2">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(pokemon.primaryType)}`}>
          {pokemon.primaryType}
        </span>
        {pokemon.secondaryType && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(pokemon.secondaryType)}`}>
            {pokemon.secondaryType}
          </span>
        )}
      </div>
    </div>
  );
};

const getTypeColor = (type) => {
  const typeColors = {
    normale: 'bg-gray-400 text-white',
    fuoco: 'bg-red-500 text-white',
    acqua: 'bg-blue-500 text-white',
    elettro: 'bg-yellow-400 text-black',
    erba: 'bg-green-500 text-white',
    ghiaccio: 'bg-blue-200 text-black',
    lotta: 'bg-red-700 text-white',
    veleno: 'bg-purple-500 text-white',
    terra: 'bg-yellow-600 text-white',
    volante: 'bg-indigo-400 text-white',
    psico: 'bg-pink-500 text-white',
    coleottero: 'bg-green-600 text-white',
    roccia: 'bg-yellow-800 text-white',
    spettro: 'bg-purple-700 text-white',
    drago: 'bg-indigo-700 text-white',
    buio: 'bg-gray-800 text-white',
    acciaio: 'bg-gray-500 text-white',
    folletto: 'bg-pink-300 text-black',
  };

  return typeColors[type?.toLowerCase()] || 'bg-gray-400 text-white';
};

export default PokemonPreview;
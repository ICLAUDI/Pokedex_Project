import React, { useEffect, useState } from 'react';

// Mappa dei colori per tipo di Pokemon
const TYPE_COLORS = {
  // Italiano
  Normale: 'bg-gray-400',
  Fuoco: 'bg-red-500',
  Acqua: 'bg-blue-500',
  Elettro: 'bg-yellow-400',
  Erba: 'bg-green-500',
  Ghiaccio: 'bg-blue-200',
  Lotta: 'bg-red-700',
  Veleno: 'bg-purple-500',
  Terra: 'bg-yellow-600',
  Volante: 'bg-indigo-400',
  Psico: 'bg-pink-500',
  Coleottero: 'bg-lime-500',
  Roccia: 'bg-yellow-800',
  Spettro: 'bg-purple-700',
  Drago: 'bg-indigo-700',
  Buio: 'bg-gray-700',
  Acciaio: 'bg-gray-500',
  Folletto: 'bg-pink-300'
};

const Aside = ({ selectedPokemon, onClose, onSelect }) => {
  const [specialStats, setSpecialStats] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  const handleEvolutionClick = async (pokemonId) => {
    try {
      // Fetch dei dettagli del Pokemon cliccato
      const response = await fetch(`http://localhost:8080/api/pokemon/${pokemonId}`);
      if (!response.ok) throw new Error('Pokemon non trovato');
      const pokemonData = await response.json();
      
      // Aggiorna il Pokemon selezionato
      onSelect(pokemonData);
    } catch (error) {
      console.error('Errore nel recupero del Pokemon:', error);
    }
  };

  useEffect(() => {
    if (selectedPokemon) {
      // Fetch delle statistiche speciali e della catena evolutiva
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.nationalNumber}`)
        .then(response => response.json())
        .then(data => {
          const stats = {
            special_attack: data.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
            special_defense: data.stats.find(stat => stat.stat.name === 'special-defense').base_stat
          };
          setSpecialStats(stats);

          return fetch(data.species.url);
        })
        .then(response => response.json())
        .then(speciesData => {
          return fetch(speciesData.evolution_chain.url);
        })
        .then(response => response.json())
        .then(evolutionData => {
          const chain = [];
          let evoData = evolutionData.chain;

          const getEvoDetails = (evoData) => {
            const speciesName = evoData.species.name;
            const speciesUrl = evoData.species.url;
            const id = parseInt(speciesUrl.split('/').slice(-2, -1)[0]);
            
            return {
              name: speciesName.charAt(0).toUpperCase() + speciesName.slice(1),
              id: id
            };
          };

          chain.push(getEvoDetails(evoData));

          if (evoData.evolves_to.length > 0) {
            chain.push(getEvoDetails(evoData.evolves_to[0]));
            
            if (evoData.evolves_to[0].evolves_to.length > 0) {
              chain.push(getEvoDetails(evoData.evolves_to[0].evolves_to[0]));
            }
          }

          setEvolutionChain(chain);
        })
        .catch(error => {
          console.error('Errore nel recupero dei dati:', error);
        });
    }
  }, [selectedPokemon]);

  if (!selectedPokemon) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 w-[45%] h-full bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">#{selectedPokemon.nationalNumber}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Immagine principale e tipi */}
          <div className="bg-gray-50 rounded-lg p-4">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.nationalNumber}.png`}
              alt={selectedPokemon.englishName}
              className="w-full h-64 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.png';
              }}
            />
            <h3 className="text-3xl font-bold text-center mt-4">{selectedPokemon.englishName}</h3>
            
            <div className="flex justify-center gap-2 mt-2">
              <span className={`px-3 py-1 rounded text-white ${TYPE_COLORS[selectedPokemon.primaryType] || 'bg-gray-400'}`}>
                {selectedPokemon.primaryType}
              </span>
              {selectedPokemon.secondaryType && (
                <span className={`px-3 py-1 rounded text-white ${TYPE_COLORS[selectedPokemon.secondaryType] || 'bg-gray-400'}`}>
                  {selectedPokemon.secondaryType}
                </span>
              )}
            </div>
          </div>

          {/* Descrizione */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-xl font-semibold mb-2">Descrizione</h4>
            <p className="text-gray-600">{selectedPokemon.description}</p>
          </div>

          {/* Statistiche */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-xl font-semibold mb-4">Statistiche</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-24 text-gray-600">HP</span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${(selectedPokemon.hp / 255) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right ml-3">{selectedPokemon.hp}</span>
              </div>
              
              <div className="flex items-center">
                <span className="w-24 text-gray-600">Attacco</span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${(selectedPokemon.attack / 255) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right ml-3">{selectedPokemon.attack}</span>
              </div>

              <div className="flex items-center">
                <span className="w-24 text-gray-600">Difesa</span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${(selectedPokemon.defense / 255) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right ml-3">{selectedPokemon.defense}</span>
              </div>

              {/* Attacco Speciale */}
              {specialStats && (
                <div className="flex items-center">
                  <span className="w-24 text-gray-600">Att. Spec.</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{ width: `${(specialStats.special_attack / 255) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right ml-3">{specialStats.special_attack}</span>
                </div>
              )}

              {/* Difesa Speciale */}
              {specialStats && (
                <div className="flex items-center">
                  <span className="w-24 text-gray-600">Dif. Spec.</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500" 
                      style={{ width: `${(specialStats.special_defense / 255) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right ml-3">{specialStats.special_defense}</span>
                </div>
              )}

              <div className="flex items-center">
                <span className="w-24 text-gray-600">Velocità</span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500" 
                    style={{ width: `${(selectedPokemon.speed / 255) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right ml-3">{selectedPokemon.speed}</span>
              </div>
            </div>
          </div>

          {/* Evoluzioni */}
          {evolutionChain && evolutionChain.length > 1 && (
            <div>
              <h4 className="text-xl font-semibold mb-3">Evoluzioni</h4>
              <div className="flex items-center justify-center gap-4">
                {evolutionChain.map((evolution, index) => (
                  <React.Fragment key={evolution.id}>
                    {index > 0 && <span className="text-gray-400 text-2xl">→</span>}
                    <div 
                      className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleEvolutionClick(evolution.id)}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`}
                        alt={evolution.name}
                        className="w-24 h-24 object-contain"
                      />
                      <p className="mt-2">{evolution.name}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Aside;
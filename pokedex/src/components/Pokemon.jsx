import React, { useState, useEffect } from 'react';
import PokemonPreview from './PokemonPreview';
import Aside from './Aside';

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        console.log('Iniziando la chiamata API...');
        
        const response = await fetch('http://localhost:8080/api/pokemon');
        console.log('Status risposta:', response.status);
        
        if (!response.ok) {
          throw new Error(`Errore HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Primi 3 pokemon ricevuti:', data.slice(0, 3));
        console.log('Struttura del primo pokemon:', {
          keys: Object.keys(data[0] || {}),
          values: data[0]
        });

        // Verifica che i dati siano validi
        if (!Array.isArray(data)) {
          throw new Error('I dati ricevuti non sono un array');
        }

        // Filtra i pokemon non validi e logga ogni pokemon invalido
        const validPokemons = data.filter(pokemon => {
          console.log('Verificando pokemon:', {
            pokemon,
            hasName: !!pokemon?.englishName,
            hasNumber: !!pokemon?.nationalNumber,
            name: pokemon?.englishName,
            number: pokemon?.nationalNumber
          });

          if (!pokemon) {
            console.log('Pokemon nullo');
            return false;
          }
          
          if (!pokemon.englishName) {
            console.log('Pokemon senza nome:', pokemon);
            return false;
          }
          
          if (!pokemon.nationalNumber) {
            console.log('Pokemon senza numero:', pokemon);
            return false;
          }

          return true;
        });

        console.log('Pokemon validi trovati:', validPokemons.length);
        console.log('Esempio di pokemon valido:', validPokemons[0]);

        setPokemons(validPokemons);
      } catch (error) {
        console.error('Errore nel recupero dei Pokemon:', error);
        setError('Errore nel caricamento dei Pokemon. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  // Aggiungi controllo per pokemon validi nel filtro
  const filteredPokemons = pokemons.filter((pokemon) => 
    pokemon && 
    pokemon.englishName && 
    pokemon.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Aggiungi log per debug
  console.log('Pokemon totali:', pokemons.length);
  console.log('Pokemon filtrati:', filteredPokemons.length);

  const handlePokemonClick = (pokemon) => {
    console.log('Pokemon cliccato:', pokemon);
    setSelectedPokemon(pokemon);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Pokeball in alto a sinistra */}
      <div className="fixed top-[-50px] left-[-50px] w-[200px] h-[200px] z-0 opacity-5" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48 96C74.5097 96 96 74.5097 96 48C96 21.4903 74.5097 0 48 0C21.4903 0 0 21.4903 0 48C0 74.5097 21.4903 96 48 96Z' fill='%23000000' fill-opacity='0.05'/%3E%3Cpath d='M48 84C67.8823 84 84 67.8823 84 48C84 28.1177 67.8823 12 48 12C28.1177 12 12 28.1177 12 48C12 67.8823 28.1177 84 48 84Z' fill='white'/%3E%3Cpath d='M48 76C63.464 76 76 63.464 76 48C76 32.536 63.464 20 48 20C32.536 20 20 32.536 20 48C20 63.464 32.536 76 48 76Z' fill='%23000000' fill-opacity='0.05'/%3E%3Cpath d='M48 64C56.8366 64 64 56.8366 64 48C64 39.1634 56.8366 32 48 32C39.1634 32 32 39.1634 32 48C32 56.8366 39.1634 64 48 64Z' fill='white'/%3E%3C/svg%3E")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        transform: 'rotate(-15deg)'
      }}/>

      {/* Pokeball in basso a destra */}
      <div className="fixed bottom-[-50px] right-[-50px] w-[200px] h-[200px] z-0 opacity-5" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48 96C74.5097 96 96 74.5097 96 48C96 21.4903 74.5097 0 48 0C21.4903 0 0 21.4903 0 48C0 74.5097 21.4903 96 48 96Z' fill='%23000000' fill-opacity='0.05'/%3E%3Cpath d='M48 84C67.8823 84 84 67.8823 84 48C84 28.1177 67.8823 12 48 12C28.1177 12 12 28.1177 12 48C12 67.8823 28.1177 84 48 84Z' fill='white'/%3E%3Cpath d='M48 76C63.464 76 76 63.464 76 48C76 32.536 63.464 20 48 20C32.536 20 20 32.536 20 48C20 63.464 32.536 76 48 76Z' fill='%23000000' fill-opacity='0.05'/%3E%3Cpath d='M48 64C56.8366 64 64 56.8366 64 48C64 39.1634 56.8366 32 48 32C39.1634 32 32 39.1634 32 48C32 56.8366 39.1634 64 48 64Z' fill='white'/%3E%3C/svg%3E")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        transform: 'rotate(15deg)'
      }}/>

      <div className="relative z-10">
        {/* Titolo */}
        <div className="pt-8 pb-6">
          <h1 className="text-5xl font-bold text-center text-gray-800 relative">
            Pokédex
            <div className="w-32 h-1 bg-red-500 mx-auto mt-3 rounded-full"></div>
          </h1>
        </div>

        {/* Barra di ricerca */}
        <div className="p-4 max-w-3xl mx-auto relative">
          <input
            type="text"
            placeholder="Cerca un Pokémon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 pl-12 bg-white/90 backdrop-blur-sm"
          />
          <svg 
            className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Griglia dei Pokemon */}
        <div className="p-4 max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              {/* Loader personalizzato con Tailwind */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-8 border-gray-200 border-t-red-500 animate-spin"></div>
              <p className="text-xl text-gray-600">Caricamento Pokémon...</p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 py-20">{error}</p>
          ) : filteredPokemons.length > 0 ? (
            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              {filteredPokemons.map((pokemon) => (
                <PokemonPreview
                  key={pokemon.nationalNumber}
                  pokemon={pokemon}
                  onSelect={handlePokemonClick}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-600 py-20">Nessun Pokémon trovato</p>
          )}
        </div>
      </div>

      {selectedPokemon && (
        <Aside
          selectedPokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onSelect={setSelectedPokemon}
        />
      )}
    </div>
  );
};

export default Pokemon;

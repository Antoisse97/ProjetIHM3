import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import GameDetails from './components/GameDetails';
import gamesData from './data/games.json';

export default function App() {
  const [games, setGames] = useState(gamesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = (id: string) => setGames(games.filter(game => game.id !== id));
  
  const handleAddGame = (newGame: any) => {
    setGames([...games, newGame]);
    setIsFormOpen(false);
  };

  const filteredGames = games.filter(game => 
    game.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BrowserRouter>
      <Layout title="Ma Collection de Jeux" searchTerm={searchTerm} onSearch={setSearchTerm}>
        <Routes>
          <Route path="/" element={
            <>
              <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-warning fw-bold" onClick={() => setIsFormOpen(true)}>
                  <i className="fa-solid fa-plus me-2"></i> Ajouter un jeu
                </button>
              </div>
              <GameList games={filteredGames} onDelete={handleDelete} />
            </>
          } />
          <Route path="/game/:id" element={<GameDetails games={games} />} />
        </Routes>

        {isFormOpen && <GameForm onClose={() => setIsFormOpen(false)} onSubmit={handleAddGame} />}
      </Layout>
    </BrowserRouter>
  );
}
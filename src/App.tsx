import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import GameDetails from './components/GameDetails';
import gamesData from './data/games.json';

export interface Game {
  id: string;
  titre: string;
  genre: string;
  plateforme: string;
  annee: number;
  imageUrl?: string;
}

export default function App() {
  // état typé avec Game[]
  const [games, setGames] = useState<Game[]>(gamesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  // fonctions typées
  const handleDelete = (id: string) => {
    const ok = window.confirm(
      'Voulez-vous vraiment supprimer ce jeu ? Cette action est irréversible.'
    );
    if (!ok) return;

    setGames((prev) => prev.filter((game) => game.id !== id));
  };

  const handleSubmitGame = (game: Game) => {
    if (editingGame) {
      // mode édition : on remplace le jeu existant
      setGames((prev) =>
        prev.map((g) => (g.id === game.id ? game : g))
      );
    } else {
      // mode création : on ajoute à la liste
      setGames((prev) => [...prev, game]);
    }

    setIsFormOpen(false);
    setEditingGame(null);
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setIsFormOpen(true);
  };

  const handleClearCollection = () => {
  const ok = window.confirm(
    'Êtes-vous sûr de vouloir vider toute la collection ? Cette action est irréversible.'
  );
  if (!ok) return;

  setGames([]);
  setSearchTerm('');
  };

  const filteredGames = games.filter((game) =>
    game.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BrowserRouter>
      <Layout
        title="Ma Collection de Jeux"
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="d-flex justify-content-end mb-4">
                  <button
                    className="btn btn-warning fw-bold"
                    onClick={() => {
                      setEditingGame(null);
                      setIsFormOpen(true);
                    }}
                  >
                    <i className="fa-solid fa-plus me-2"></i> Ajouter un jeu
                  </button>
                </div>

                <GameList
                  games={filteredGames}
                  onDelete={handleDelete}
                  onEdit={handleEditGame}
                />

                {games.length > 0 && (
                  <div className="d-flex justify-content-end mt-4">
                    <button
                      className="btn btn-outline-danger fa-trash fw-bold"
                      onClick={handleClearCollection}
                    >
                      Vider toute la collection
                    </button>
                  </div>
                )}
              </>
            }
          />

          <Route path="/game/:id" element={<GameDetails games={games} />} />
        </Routes>

        {isFormOpen && (
          <GameForm onClose={() => {setIsFormOpen(false); setEditingGame(null);}} onSubmit={handleSubmitGame} initialGame={editingGame}/>
        )}
      </Layout>
    </BrowserRouter>
  );
}
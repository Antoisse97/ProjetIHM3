import { useNavigate } from 'react-router-dom';
import type { Game } from '../App';

interface GameListProps {
  games: Game[];
  onDelete: (id: string) => void;
}

export default function GameList({ games, onDelete }: GameListProps) {
  const navigate = useNavigate();

  if (games.length === 0)
    return <p className="text-secondary">Aucun jeu trouvé.</p>;

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {games.map((game) => (
        <div key={game.id} className="col">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title fw-bold text-dark">{game.titre}</h5>
              <h6 className="card-subtitle mb-3 text-muted">{game.genre}</h6>
            </div>
            <div className="card-footer bg-white border-0 d-flex justify-content-between pb-3">
              <button
                onClick={() => navigate(`/game/${game.id}`)}
                className="btn btn-outline-primary btn-sm"
              >
                Détails
              </button>
              <button
                onClick={() => onDelete(game.id)}
                className="btn btn-outline-danger btn-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
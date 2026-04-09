import { useParams, useNavigate } from 'react-router-dom';
import type { Game } from '../App';

interface GameDetailsProps {
  games: Game[];
}

export default function GameDetails({ games }: GameDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <div>
        <p className="text-danger mb-3">Jeu introuvable.</p>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Retour à la collection
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      {game.imageUrl && (
        <img
          src={game.imageUrl}
          alt={game.titre}
          className="card-img-top"
          style={{ maxHeight: '320px', objectFit: 'cover' }}
        />
      )}

      <div className="card-body">
        <h3 className="card-title fw-bold text-dark mb-3">{game.titre}</h3>
        <p className="mb-1">
          <strong>Genre :</strong> {game.genre}
        </p>
        <p className="mb-1">
          <strong>Plateforme :</strong> {game.plateforme}
        </p>
        <p className="mb-1">
          <strong>Année :</strong> {game.annee}
        </p>
      </div>
      <div className="card-footer bg-white border-0">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/')}
        >
          Retour à la collection
        </button>
      </div>
    </div>
  );
}
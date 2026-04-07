import { useParams, Link } from 'react-router-dom';

export default function GameDetails({ games }: { games: any[] }) {
  const { id } = useParams();
  const game = games.find(g => g.id === id);

  if (!game) return <p className="text-danger">Jeu introuvable.</p>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <Link to="/" className="btn btn-sm btn-outline-secondary mb-4">
        <i className="fa-solid fa-arrow-left me-2"></i>Retour à la collection
      </Link>
      <h2 className="fw-bold">{game.titre}</h2>
      <hr />
      <p><strong>Genre :</strong> {game.genre}</p>
      <p><strong>Plateforme :</strong> {game.plateforme}</p>
      <p><strong>Année :</strong> {game.annee}</p>
    </div>
  );
}
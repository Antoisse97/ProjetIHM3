import { useState } from 'react';
import type { Game } from '../App';

interface GameFormProps {
  onClose: () => void;
  onSubmit: (game: Game) => void;
}

export default function GameForm({ onClose, onSubmit }: GameFormProps) {
  const [titre, setTitre] = useState('');
  const [genre, setGenre] = useState('');
  const [plateforme, setPlateforme] = useState('');
  const [annee, setAnnee] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titre || !genre || !plateforme || annee === '') return;

    const newGame: Game = {
      id: crypto.randomUUID(), // ou autre logique d'id
      titre,
      genre,
      plateforme,
      annee: Number(annee),
    };

    onSubmit(newGame);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <form onSubmit={handleSubmit} className="card p-3">
          {/* champs du formulaire */}
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import type { Game } from '../App';

interface GameFormProps {
  onClose: () => void;
  onSubmit: (data: Game) => void;
  initialGame?: Game | null;
}

export default function GameForm({ onClose, onSubmit, initialGame }: GameFormProps) {
  const [formData, setFormData] = useState({
    titre: initialGame?.titre ?? '',
    genre: initialGame?.genre ?? '',
    plateforme: initialGame?.plateforme ?? '',
    annee: initialGame ? String(initialGame.annee) : '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialGame?.imageUrl ?? null
  );

  const [errors, setErrors] = useState({
    titre: '',
    genre: '',
    plateforme: '',
    annee: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      // si on enlève le fichier, on garde éventuellement l'image existante
      setImagePreview(initialGame?.imageUrl ?? null);
      return;
    }
    setImagePreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const newErrors = { titre: '', genre: '', plateforme: '', annee: '' };
    const currentYear = new Date().getFullYear();

    if (formData.titre.trim().length < 3)
      newErrors.titre = 'Le titre doit contenir au moins 3 caractères.';

    if (formData.genre.trim().length < 3)
      newErrors.genre = 'Le genre doit contenir au moins 3 caractères.';

    if (formData.plateforme.trim().length < 2)
      newErrors.plateforme = 'La plateforme doit contenir au moins 2 caractères.';

    const anneeNum = Number(formData.annee);
    if (!formData.annee || isNaN(anneeNum) || anneeNum < 1970 || anneeNum > currentYear)
      newErrors.annee = `L'année doit être comprise entre 1970 et ${currentYear}.`;

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newGame: Game = {
      // si on édite, on garde l'id existant, sinon on en génère un nouveau
      id: initialGame?.id ?? Date.now().toString(),
      titre: formData.titre,
      genre: formData.genre,
      plateforme: formData.plateforme,
      annee: Number(formData.annee),
      imageUrl: imagePreview || undefined,
    };
    onSubmit(newGame);
  };

  const title = initialGame ? 'Modifier un jeu' : 'Ajouter un jeu';
  const submitLabel = initialGame ? 'Mettre à jour' : 'Enregistrer';

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white rounded p-4 shadow w-100" style={{ maxWidth: '500px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="h5 fw-bold text-warning mb-0">{title}</h3>
          <button type="button" onClick={onClose} className="btn-close"></button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* TITRE */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary text-uppercase mb-0">
              Titre
            </label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.titre ? 'is-invalid' : ''}`}
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            />
            <div className="form-text">
              Nom complet du jeu. Minimum 3 caractères. Exemple : Elden Ring.
            </div>
            {errors.titre && (
              <div className="invalid-feedback">{errors.titre}</div>
            )}
          </div>

          {/* GENRE */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary text-uppercase mb-0">
              Genre
            </label>
            <input
              type="text"
              className={`form-control mt-1 ${errors.genre ? 'is-invalid' : ''}`}
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            />
            <div className="form-text">
              Catégorie du jeu. Minimum 3 caractères. Exemples : Aventure, Action-RPG, Metroidvania.
            </div>
            {errors.genre && (
              <div className="invalid-feedback">{errors.genre}</div>
            )}
          </div>

          {/* PLATEFORME + ANNÉE */}
          <div className="row mb-3">
            <div className="col">
              <label className="form-label small fw-bold text-secondary text-uppercase mb-0">
                Plateforme
              </label>
              <input
                type="text"
                className={`form-control mt-1 ${errors.plateforme ? 'is-invalid' : ''}`}
                value={formData.plateforme}
                onChange={(e) =>
                  setFormData({ ...formData, plateforme: e.target.value })
                }
              />
              <div className="form-text">
                Support du jeu. Exemple : PC, PS5, Xbox Series X, Nintendo Switch.
              </div>
              {errors.plateforme && (
                <div className="invalid-feedback">{errors.plateforme}</div>
              )}
            </div>

            <div className="col">
              <label className="form-label small fw-bold text-secondary text-uppercase mb-0">
                Année
              </label>
              <input
                type="number"
                className={`form-control mt-1 ${errors.annee ? 'is-invalid' : ''}`}
                value={formData.annee}
                onChange={(e) =>
                  setFormData({ ...formData, annee: e.target.value })
                }
              />
              <div className="form-text">
                Année de sortie. Entre 1970 et {new Date().getFullYear()}.
              </div>
              {errors.annee && (
                <div className="invalid-feedback">{errors.annee}</div>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary text-uppercase mb-0">
              Image (optionnelle)
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control mt-1"
              onChange={handleImageChange}
            />
            <div className="form-text">
              Jaquette ou illustration du jeu (JPG, PNG, WEBP). Optionnelle.
            </div>
          </div>

          {imagePreview && (
            <div className="mb-3">
              <img
                src={imagePreview}
                alt="Aperçu du jeu"
                className="img-fluid rounded border"
              />
            </div>
          )}

          <div className="d-flex justify-content-end gap-2 border-top pt-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-light text-secondary fw-bold"
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-warning fw-bold">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
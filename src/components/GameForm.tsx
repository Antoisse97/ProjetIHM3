import React, { useState } from 'react';

interface GameFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function GameForm({ onClose, onSubmit }: GameFormProps) {
  const [formData, setFormData] = useState({
    titre: '',
    genre: '',
    plateforme: '',
    annee: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: Date.now().toString() });
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
      <div className="bg-white rounded p-4 shadow w-100" style={{ maxWidth: '500px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="h5 fw-bold text-warning mb-0">Ajouter un jeu</h3>
          <button type="button" onClick={onClose} className="btn-close"></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary text-uppercase">Titre</label>
            <input type="text" required className="form-control"
              value={formData.titre}
              onChange={(e) => setFormData({...formData, titre: e.target.value})} />
          </div>
          
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary text-uppercase">Genre</label>
            <input type="text" required className="form-control"
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})} />
          </div>

          <div className="row mb-4">
            <div className="col">
              <label className="form-label small fw-bold text-secondary text-uppercase">Plateforme</label>
              <input type="text" required className="form-control"
                value={formData.plateforme}
                onChange={(e) => setFormData({...formData, plateforme: e.target.value})} />
            </div>
            <div className="col">
              <label className="form-label small fw-bold text-secondary text-uppercase">Année</label>
              <input type="number" required className="form-control"
                value={formData.annee}
                onChange={(e) => setFormData({...formData, annee: e.target.value})} />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 border-top pt-3">
            <button type="button" onClick={onClose} className="btn btn-light text-secondary fw-bold">Annuler</button>
            <button type="submit" className="btn btn-warning fw-bold">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
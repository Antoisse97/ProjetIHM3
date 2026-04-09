# GameShowcase

Site vitrine de collection de jeux vidéo développé en React avec Vite.  
Il permet de lister, rechercher, ajouter, modifier et supprimer des jeux, avec affichage des détails et d’une image pour chaque jeu.

## 1. Prérequis

- Node.js (version 18+ recommandée)
- npm (installé avec Node)

## 2. Installation et exécution

Dans un terminal, à la racine du projet :

```bash
npm install
npm run dev
```

Le site est accessible à l’adresse indiquée par Vite (en général http://localhost:5173).

Pour construire une version de production :

```bash
npm run build
npm run preview
```

## 3. Structure du projet

```text
.
├── package.json
├── package-lock.json
├── index.html
├── vite.config.ts
└── src
    ├── main.tsx          # Point d'entrée React (ReactDOM.createRoot + <App />)
    ├── App.tsx           # Composant racine : état global, routing, logique des jeux
    ├── index.css         # Styles globaux
    ├── data
    │   └── games.json    # Données initiales des jeux (titre, genre, plateforme, année, imageUrl)
    └── components
        ├── Layout.tsx    # Mise en page générale : sidebar + header + zone de contenu
        ├── Sidebar.tsx   # Menu latéral (navigation principale)
        ├── GameList.tsx  # Liste des jeux (cartes + recherche + actions Détails / Modifier / Supprimer)
        ├── GameDetails.tsx # Page de détails d’un jeu (infos complètes + image)
        └── GameForm.tsx  # Formulaire d’ajout / modification de jeu (validation + upload d’image)
```

### 3.1. Comportement de l’application

- **Page principale (`/`)**
  - Affiche la collection sous forme de cartes.
  - Barre de recherche par titre.
  - Bouton “Ajouter un jeu” ouvrant un formulaire modale.
  - Boutons sur chaque carte :
    - **Détails** : navigation vers la page de détails du jeu.
    - **Modifier** : ouvre le formulaire pré-rempli pour ce jeu.
    - **Supprimer** : demande confirmation avant suppression.
  - Bouton “Vider toute la collection” en bas de page avec confirmation.

- **Formulaire d’ajout / modification**
  - Champs : titre, genre, plateforme, année, image (optionnelle).
  - Validation côté client :
    - longueur minimale pour titre / genre / plateforme
    - année entre 1970 et l’année courante
  - Messages d’aide sous les champs et messages d’erreur intégrés.
  - En mode édition, le formulaire est pré-rempli et conserve l’identifiant du jeu.

- **Page détails (`/game/:id`)**
  - Affiche l’image du jeu (si fournie), le titre, le genre, la plateforme et l’année.
  - Si l’identifiant n’existe pas, affiche un message “Jeu introuvable” avec un bouton de retour.

## 4. Technologies

- React + TypeScript
- Vite
- React Router DOM (navigation entre liste et détails)
- Bootstrap 5 (mise en page et styles)
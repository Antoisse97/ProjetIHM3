
import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  searchTerm?: string;
  onSearch?: (value: string) => void;
}

export default function Layout({ children, title, searchTerm, onSearch }: LayoutProps) {
  return (
    <div className="d-flex vh-100 w-100 bg-light">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <header className="bg-white shadow-sm d-flex align-items-center justify-content-between px-4 py-3">
          <h2 className="fs-5 fw-semibold text-dark mb-0">{title}</h2>
          
          {onSearch !== undefined && (
            <div className="position-relative">
              <i className="fa-solid fa-magnifying-glass position-absolute text-secondary" style={{ top: '12px', left: '15px' }}></i>
              <input 
                type="text" 
                placeholder="Rechercher un jeu..." 
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="form-control rounded-pill bg-light border-0 shadow-none" 
                style={{ paddingLeft: '40px', width: '250px' }}
              />
            </div>
          )}
        </header>
        
        <main className="flex-grow-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();
  
  const linkClass = (path: string) => 
    `d-flex align-items-center p-3 rounded text-decoration-none ${
      pathname === path ? 'bg-warning text-dark shadow-sm' : 'text-light'
    }`;

  return (
    <div className="d-none d-md-flex flex-column bg-dark text-white vh-100 sticky-top" style={{ width: '260px' }}>
      <div className="p-4 fs-4 fw-bold text-warning">
        <i className="fa-solid fa-gamepad me-2" /> GameShowcase
      </div>
      
      <nav className="flex-grow-1 px-3 d-flex flex-column gap-2 mt-3 overflow-auto">
        <p className="small fw-bold text-secondary text-uppercase mb-1 px-2">Menu Principal</p>
        
        <Link to="/" className={linkClass('/')}>
          <i className="fa-solid fa-layer-group me-3" /> Ma Collection
        </Link>
      </nav>

      <div className="p-3 border-top border-secondary d-flex align-items-center">
        <div className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px' }}>
          C
        </div>
        <div className="ms-3">
          <p className="mb-0 small fw-bold">Collectionneur</p>
          <p className="mb-0 text-secondary" style={{ fontSize: '11px' }}>Admin</p>
        </div>
      </div>
    </div>
  );
}

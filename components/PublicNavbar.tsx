import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const PublicNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/features', label: 'Funcionalidades' },
    { path: '/management', label: 'Gestão' },
    { path: '/pricing', label: 'Investimento' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-serif italic font-bold text-zinc-900 tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Perfect Salon
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  isActive(link.path)
                    ? 'text-zinc-900 border-b-2 border-amber-500 pb-1'
                    : 'text-stone-500 hover:text-zinc-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10 inline-block"
            >
              Area do Cliente
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-900 hover:text-zinc-600 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Drawer */}
          <div className="fixed top-20 left-0 right-0 bg-white border-b border-stone-200 shadow-xl z-50 md:hidden">
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 text-base font-medium transition-colors rounded-lg ${
                    isActive(link.path)
                      ? 'text-zinc-900 bg-amber-50 border-l-4 border-amber-500'
                      : 'text-stone-600 hover:text-zinc-900 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Button */}
              <div className="pt-4 mt-4 border-t border-stone-200">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition text-center"
                >
                  Area do Cliente
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default PublicNavbar;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Link2, Users, Scissors, LogOut, Star, Bell } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, isOpen, setIsOpen }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/connections', label: 'Conexões', icon: Link2 },
    { path: '/professionals', label: 'Equipe & Agenda', icon: Users },
    { path: '/services', label: 'Menu de Serviços', icon: Scissors },
    { path: '/reviews', label: 'Feedback', icon: Star },
    { path: '/notifications', label: 'Notificações', icon: Bell },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-zinc-950 text-white transform transition-transform duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}
      >
        <div className="flex items-center justify-center h-24 border-b border-white/5">
          <div className="text-center">
            <h1 className="text-2xl font-serif italic tracking-wider text-white">
              Perfect Salon
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/80 mt-1">SaaS de Beleza</p>
          </div>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3.5 rounded-md transition-all duration-300 group ${
                  isActive
                    ? 'bg-white/5 text-amber-500 border-l-2 border-amber-500 shadow-inner'
                    : 'text-stone-400 hover:bg-white/5 hover:text-stone-100'
                }`
              }
            >
              <item.icon className={`w-5 h-5 mr-3 transition-colors ${ ({ isActive }: {isActive: boolean}) => isActive ? 'text-amber-500' : 'text-stone-500 group-hover:text-stone-300' }`} />
              <span className="font-light tracking-wide text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-white/5 bg-zinc-950">
          <button
            onClick={onLogout}
            className="flex items-center justify-center w-full px-4 py-3 text-stone-400 hover:text-white hover:bg-white/5 rounded-md transition-all duration-300 border border-transparent hover:border-white/10"
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span className="font-light text-sm tracking-wide">Encerrar Sessão</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Link2, Users, Scissors, LogOut, Star, Bell, Calendar } from 'lucide-react';
import type { NotificationLog } from '../types';

interface SidebarProps {
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Função para contar notificações novas (últimas 24h)
const getNewNotificationsCount = (): number => {
  // Mock das notificações mais recentes (mesmas do Notifications.tsx)
  const mockLogs: NotificationLog[] = [
    { id: '1', type: 'CLIENT_REMINDER', title: 'Lembrete Enviado', message: 'Olá Fernanda, seu agendamento é amanhã às 14h.', recipient: 'Fernanda Lima (11) 99999-9999', sentAt: 'Hoje, 10:30', status: 'SENT' },
    { id: '2', type: 'PROFESSIONAL_ALERT', title: 'Novo Agendamento', message: 'Novo corte agendado para Sexta, 15h.', recipient: 'Ana Souza', sentAt: 'Hoje, 09:15', status: 'SENT' },
    { id: '3', type: 'CLIENT_CONFIRMATION', title: 'Confirmação Recebida', message: 'Cliente confirmou presença via botão.', recipient: 'Sistema', sentAt: 'Ontem, 18:00', status: 'SENT' },
    { id: '4', type: 'CLIENT_REMINDER', title: 'Falha no Envio', message: 'Número inválido ou bloqueado.', recipient: 'Marcos (11) 00000-0000', sentAt: 'Ontem, 14:00', status: 'FAILED' },
  ];

  // Contar notificações enviadas "Hoje" ou "Ontem" (últimas 48h)
  return mockLogs.filter(log => {
    const sentAt = log.sentAt.toLowerCase();
    return sentAt.startsWith('hoje') || sentAt.startsWith('ontem');
  }).length;
};

const Sidebar = ({ onLogout, isOpen, setIsOpen }: SidebarProps) => {
  const newNotificationsCount = useMemo(() => getNewNotificationsCount(), []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/calendar', label: 'Calendário', icon: Calendar },
    { path: '/connections', label: 'Conexões', icon: Link2 },
    { path: '/professionals', label: 'Equipe & Agenda', icon: Users },
    { path: '/services', label: 'Menu de Serviços', icon: Scissors },
    { path: '/reviews', label: 'Feedback', icon: Star },
    { path: '/notifications', label: 'Notificações', icon: Bell, badgeCount: newNotificationsCount },
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
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3.5 rounded-md transition-all duration-300 group ${
                    isActive
                      ? 'bg-white/5 text-amber-500 border-l-2 border-amber-500 shadow-inner'
                      : 'text-stone-400 hover:bg-white/5 hover:text-stone-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center flex-1">
                      <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-amber-500' : 'text-stone-500 group-hover:text-stone-300'}`} />
                      <span className="font-light tracking-wide text-sm">{item.label}</span>
                    </div>
                    {item.badgeCount !== undefined && item.badgeCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full min-w-[20px] text-center">
                        {item.badgeCount > 99 ? '99+' : item.badgeCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
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
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import type { NotificationLog } from '../types';

// Gerar dados mock mais extensos para paginação
const generateMockLogs = (): NotificationLog[] => {
  const types: NotificationLog['type'][] = ['CLIENT_REMINDER', 'CLIENT_CONFIRMATION', 'PROFESSIONAL_ALERT', 'SYSTEM'];
  const statuses: NotificationLog['status'][] = ['SENT', 'FAILED', 'PENDING'];
  const clients = ['Fernanda Lima', 'João Silva', 'Maria Santos', 'Carlos Oliveira', 'Ana Costa', 'Pedro Souza', 'Juliana Lima', 'Roberto Alves'];
  const professionals = ['Ana Souza', 'Carlos Oliveira', 'Mariana Lima'];
  
  const logs: NotificationLog[] = [];
  const now = new Date();
  
  for (let i = 0; i < 150; i++) {
    const daysAgo = Math.floor(i / 5);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const isClient = type.includes('CLIENT');
    const recipient = isClient 
      ? `${clients[Math.floor(Math.random() * clients.length)]} (11) ${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}`
      : professionals[Math.floor(Math.random() * professionals.length)];
    
    const messages = {
      CLIENT_REMINDER: `Olá ${recipient.split(' ')[0]}, seu agendamento é ${daysAgo === 0 ? 'hoje' : `em ${daysAgo} dia${daysAgo > 1 ? 's' : ''}`} às ${Math.floor(Math.random() * 12) + 9}h.`,
      CLIENT_CONFIRMATION: 'Cliente confirmou presença via botão.',
      PROFESSIONAL_ALERT: `Novo agendamento para ${['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][Math.floor(Math.random() * 6)]}, ${Math.floor(Math.random() * 12) + 9}h.`,
      SYSTEM: 'Sistema de notificações sincronizado com sucesso.'
    };
    
    const titles = {
      CLIENT_REMINDER: 'Lembrete Enviado',
      CLIENT_CONFIRMATION: 'Confirmação Recebida',
      PROFESSIONAL_ALERT: 'Novo Agendamento',
      SYSTEM: 'Notificação do Sistema'
    };
    
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    let sentAtStr = '';
    if (daysAgo === 0) {
      sentAtStr = `Hoje, ${timeStr}`;
    } else if (daysAgo === 1) {
      sentAtStr = `Ontem, ${timeStr}`;
    } else if (daysAgo < 7) {
      sentAtStr = `${daysAgo} dias atrás, ${timeStr}`;
    } else {
      const weekAgo = Math.floor(daysAgo / 7);
      sentAtStr = `${weekAgo} semana${weekAgo > 1 ? 's' : ''} atrás`;
    }
    
    logs.push({
      id: (i + 1).toString(),
      type,
      title: titles[type],
      message: messages[type],
      recipient,
      sentAt: sentAtStr,
      status
    });
  }
  
  // Ordenar por índice (mais recentes primeiro - índices menores são mais recentes)
  return logs;
};

const ITEMS_PER_PAGE = 20;

const NotificationHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const allLogs = useMemo(() => generateMockLogs(), []);

  const totalPages = Math.ceil(allLogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentLogs = allLogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/notifications"
            className="flex items-center gap-2 text-stone-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Voltar</span>
          </Link>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-serif text-zinc-900">Histórico Completo de Notificações</h2>
          <p className="text-stone-500 font-light mt-1">
            {allLogs.length} notificações registradas
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
          <h3 className="font-serif text-lg text-zinc-900">Todas as Notificações</h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200">
            Página {currentPage} de {totalPages}
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {currentLogs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-stone-50 transition-colors flex items-center justify-between">
              <div className="flex items-start space-x-5 flex-1">
                <div className={`mt-1 p-2 rounded-full flex-shrink-0 ${
                  log.status === 'SENT' ? 'bg-zinc-100 text-zinc-900' : 
                  log.status === 'FAILED' ? 'bg-red-50 text-red-900' : 'bg-blue-50 text-blue-900'
                }`}>
                  {log.status === 'SENT' ? <CheckCircle className="w-4 h-4" /> : 
                   log.status === 'FAILED' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-zinc-900">{log.title}</h4>
                  <p className="text-sm text-stone-600 font-light mt-1">{log.message}</p>
                  <p className="text-xs text-stone-400 mt-2">Destino: {log.recipient}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <span className="text-xs text-stone-400 font-medium block">{log.sentAt}</span>
                <div className="mt-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded border ${
                    log.type.includes('CLIENT') ? 'bg-stone-100 border-stone-200 text-stone-600' : 
                    log.type === 'SYSTEM' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                    'bg-amber-50 border-amber-100 text-amber-700'
                  }`}>
                    {log.type.split('_')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
            <div className="text-sm text-stone-500">
              Mostrando {startIndex + 1} a {Math.min(endIndex, allLogs.length)} de {allLogs.length} notificações
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Mostrar primeira página, última página, página atual e páginas adjacentes
                    return page === 1 || 
                           page === totalPages || 
                           (page >= currentPage - 1 && page <= currentPage + 1);
                  })
                  .map((page, index, array) => {
                    // Adicionar ellipsis quando necessário
                    const showEllipsisBefore = index > 0 && array[index - 1] < page - 1;
                    return (
                      <div key={page} className="flex items-center gap-1">
                        {showEllipsisBefore && (
                          <span className="px-2 text-stone-400">...</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-zinc-900 text-white'
                              : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Próxima página"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, CheckCircle, AlertTriangle, Clock, Smartphone } from 'lucide-react';
import type { NotificationLog } from '../types';

const mockLogs: NotificationLog[] = [
  { id: '1', type: 'CLIENT_REMINDER', title: 'Lembrete Enviado', message: 'Olá Fernanda, seu agendamento é amanhã às 14h.', recipient: 'Fernanda Lima (11) 99999-9999', sentAt: 'Hoje, 10:30', status: 'SENT' },
  { id: '2', type: 'PROFESSIONAL_ALERT', title: 'Novo Agendamento', message: 'Novo corte agendado para Sexta, 15h.', recipient: 'Ana Souza', sentAt: 'Hoje, 09:15', status: 'SENT' },
  { id: '3', type: 'CLIENT_CONFIRMATION', title: 'Confirmação Recebida', message: 'Cliente confirmou presença via botão.', recipient: 'Sistema', sentAt: 'Ontem, 18:00', status: 'SENT' },
  { id: '4', type: 'CLIENT_REMINDER', title: 'Falha no Envio', message: 'Número inválido ou bloqueado.', recipient: 'Marcos (11) 00000-0000', sentAt: 'Ontem, 14:00', status: 'FAILED' },
];

const Notifications: React.FC = () => {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [profAlertsEnabled, setProfAlertsEnabled] = useState(true);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-200 pb-6">
        <div>
          <h2 className="text-3xl font-serif text-zinc-900">Central de Alertas</h2>
          <p className="text-stone-500 font-light mt-1">Histórico de comunicações e configurações de push.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 h-fit">
          <div className="flex items-center space-x-3 mb-8 text-zinc-900">
             <Settings className="w-5 h-5" />
             <h3 className="font-serif text-lg">Preferências</h3>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-zinc-900">Lembretes para Clientes</p>
                <p className="text-xs text-stone-500 font-light mt-1">Notificação 24h via WhatsApp.</p>
              </div>
              <button 
                type="button"
                onClick={() => setRemindersEnabled(!remindersEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${remindersEnabled ? 'bg-zinc-900' : 'bg-stone-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${remindersEnabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-zinc-900">Alertas para Staff</p>
                <p className="text-xs text-stone-500 font-light mt-1">Push em tempo real.</p>
              </div>
              <button 
                type="button"
                onClick={() => setProfAlertsEnabled(!profAlertsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${profAlertsEnabled ? 'bg-zinc-900' : 'bg-stone-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${profAlertsEnabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="p-5 bg-stone-50 rounded-lg border border-stone-100">
               <div className="flex items-start space-x-3">
                 <Smartphone className="w-5 h-5 text-stone-400 mt-0.5" />
                 <div>
                   <p className="text-sm font-bold text-zinc-900">Status dos Dispositivos</p>
                   <p className="text-xs text-stone-500 mt-2 font-light leading-relaxed">
                     3 Profissionais ativos no App. <br/>
                     105 Clientes optaram por notificações.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Logs Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
             <h3 className="font-serif text-lg text-zinc-900 flex items-center">
               Histórico de Envios
             </h3>
             <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200">Última Semana</span>
          </div>
          
          <div className="divide-y divide-stone-100">
            {mockLogs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-stone-50 transition-colors flex items-center justify-between">
                 <div className="flex items-start space-x-5">
                    <div className={`mt-1 p-2 rounded-full ${
                      log.status === 'SENT' ? 'bg-zinc-100 text-zinc-900' : 
                      log.status === 'FAILED' ? 'bg-red-50 text-red-900' : 'bg-blue-50 text-blue-900'
                    }`}>
                       {log.status === 'SENT' ? <CheckCircle className="w-4 h-4" /> : 
                        log.status === 'FAILED' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">{log.title}</h4>
                      <p className="text-sm text-stone-600 font-light mt-1">{log.message}</p>
                      <p className="text-xs text-stone-400 mt-2">Destino: {log.recipient}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-stone-400 font-medium">{log.sentAt}</span>
                    <div className="mt-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded border ${
                        log.type.includes('CLIENT') ? 'bg-stone-100 border-stone-200 text-stone-600' : 'bg-amber-50 border-amber-100 text-amber-700'
                      }`}>
                        {log.type.split('_')[0]}
                      </span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-stone-50 border-t border-stone-100 text-center">
             <Link
               to="/notifications/history"
               className="inline-block text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-amber-600 transition-colors"
             >
               Ver histórico completo
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
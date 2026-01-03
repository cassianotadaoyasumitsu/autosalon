import React, { useState } from 'react';
import { Bell, Settings, CheckCircle, AlertTriangle, Clock, Smartphone } from 'lucide-react';
import { NotificationLog } from '../types';

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Central de Notificações</h2>
          <p className="text-slate-500 mt-1">Configure alertas automáticos e veja o histórico de envios.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
          <div className="flex items-center space-x-2 mb-6 text-slate-800">
             <Settings className="w-5 h-5" />
             <h3 className="font-bold">Configuração Push</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Lembretes para Clientes</p>
                <p className="text-xs text-slate-500">Enviar push/WhatsApp 24h antes.</p>
              </div>
              <button 
                onClick={() => setRemindersEnabled(!remindersEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${remindersEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${remindersEnabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Alertas para Profissionais</p>
                <p className="text-xs text-slate-500">Notificar equipe sobre novos cortes.</p>
              </div>
              <button 
                onClick={() => setProfAlertsEnabled(!profAlertsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${profAlertsEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${profAlertsEnabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
               <div className="flex items-start space-x-3">
                 <Smartphone className="w-5 h-5 text-slate-400 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-slate-900">Dispositivos Conectados</p>
                   <p className="text-xs text-slate-500 mt-1">
                     3 Profissionais com App instalado. <br/>
                     105 Clientes aceitaram Web Push.
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Logs Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
             <h3 className="font-semibold text-slate-800 flex items-center">
               <Bell className="w-4 h-4 mr-2" />
               Histórico de Envios
             </h3>
             <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border">Últimos 7 dias</span>
          </div>
          
          <div className="divide-y divide-slate-100">
            {mockLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                 <div className="flex items-start space-x-4">
                    <div className={`mt-1 p-2 rounded-lg ${
                      log.status === 'SENT' ? 'bg-emerald-100 text-emerald-600' : 
                      log.status === 'FAILED' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                       {log.status === 'SENT' ? <CheckCircle className="w-4 h-4" /> : 
                        log.status === 'FAILED' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{log.title}</h4>
                      <p className="text-sm text-slate-600">{log.message}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Para: {log.recipient}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium">{log.sentAt}</span>
                    <div className="mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        log.type.includes('CLIENT') ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {log.type.split('_')[0]}
                      </span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
             <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Ver todo o histórico</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
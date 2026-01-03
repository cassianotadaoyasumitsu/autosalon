import React, { useState } from 'react';
import { Smartphone, Calendar, RefreshCw, CheckCircle, XCircle, QrCode, Key, Server } from 'lucide-react';
import { ConnectionStatus } from '../types';

const Connections: React.FC = () => {
  const [waStatus, setWaStatus] = useState<ConnectionStatus>(ConnectionStatus.CONNECTED);
  const [calStatus, setCalStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  
  // n8n Integration Fields
  const [instanceName, setInstanceName] = useState('salao-premium-01');
  const [apiKey, setApiKey] = useState('evo_global_key_123456');

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <div className="border-b border-stone-200 pb-6">
        <h2 className="text-3xl font-serif text-zinc-900">Integrações</h2>
        <p className="text-stone-500 font-light mt-1">Gerencie a conexão do seu Concierge Virtual e Agenda Master.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Evolution API Configuration (Tenant ID) */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-100 bg-stone-50 flex items-center">
            <Server className="w-5 h-5 mr-3 text-amber-600" />
            <div>
               <h3 className="font-serif text-lg text-zinc-900">Configuração do Sistema</h3>
               <p className="text-xs text-stone-500 uppercase tracking-wide">Identificação do Tenant</p>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Nome da Instância</label>
              <input
                type="text"
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
                className="block w-full rounded-lg border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900 transition-all"
                placeholder="ex: salao-centro"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">API Key</label>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full rounded-lg border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900 transition-all font-mono text-sm"
                  placeholder="••••••••••••"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden group hover:border-amber-200 transition-colors">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-zinc-900" />
                <h3 className="font-serif text-lg text-zinc-900">WhatsApp Business</h3>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                waStatus === ConnectionStatus.CONNECTED ? 'bg-zinc-900 text-white' : 'bg-red-50 text-red-800'
              }`}>
                {waStatus === ConnectionStatus.CONNECTED ? (
                  <><CheckCircle className="w-3 h-3 mr-1" /> Online</>
                ) : (
                  <><XCircle className="w-3 h-3 mr-1" /> Offline</>
                )}
              </div>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center space-y-8 min-h-[300px]">
              {waStatus === ConnectionStatus.DISCONNECTED ? (
                <>
                  <div className="w-48 h-48 bg-white p-2 rounded-none border border-stone-200 flex items-center justify-center shadow-inner">
                     <QrCode className="w-32 h-32 text-stone-300" />
                  </div>
                  <p className="text-center text-sm text-stone-500 max-w-xs font-light">
                    Escaneie o código para vincular seu número comercial.
                  </p>
                  <button 
                    onClick={() => setWaStatus(ConnectionStatus.CONNECTED)}
                    className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
                  >
                    Gerar Código
                  </button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center border border-stone-100">
                    <CheckCircle className="w-10 h-10 text-zinc-900" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-serif text-xl text-zinc-900">Conectado</h4>
                    <p className="text-sm text-stone-500 mt-2 font-light">O Concierge está ativo e respondendo.</p>
                  </div>
                  <button 
                    onClick={() => setWaStatus(ConnectionStatus.DISCONNECTED)}
                    className="text-red-800 text-xs font-bold uppercase tracking-widest hover:text-red-900 border-b border-red-200 pb-1"
                  >
                    Desconectar Sessão
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Google Calendar Connection Card */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden group hover:border-amber-200 transition-colors">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-zinc-900" />
                <h3 className="font-serif text-lg text-zinc-900">Google Calendar</h3>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                calStatus === ConnectionStatus.CONNECTED ? 'bg-zinc-900 text-white' : 'bg-stone-200 text-stone-500'
              }`}>
                 {calStatus === ConnectionStatus.CONNECTED ? 'Sincronizado' : 'Pendente'}
              </div>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center space-y-8 min-h-[300px]">
               <p className="text-center text-sm text-stone-500 font-light max-w-xs">
                 Agenda Master do estabelecimento. Agendas individuais são configuradas na seção de Equipe.
               </p>
               
               {calStatus === ConnectionStatus.DISCONNECTED ? (
                 <button 
                   onClick={() => setCalStatus(ConnectionStatus.CONNECTED)}
                   className="flex items-center bg-white border border-stone-300 text-zinc-900 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition shadow-sm"
                 >
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" className="w-4 h-4 mr-3" alt="Google" />
                   Conectar Google
                 </button>
               ) : (
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 w-full text-center">
                    <RefreshCw className="w-6 h-6 text-amber-500 mx-auto mb-3 animate-spin-slow" />
                    <p className="text-sm font-bold text-zinc-900">Sincronização Ativa</p>
                    <p className="text-xs text-stone-500 mt-1 font-mono">ID: salaoprincipal@gmail.com</p>
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
import React, { useState, useEffect, useCallback, useId } from 'react';
import { Smartphone, Calendar, CheckCircle, XCircle, QrCode, Key, Server, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ConnectionStatus } from '../types';
import { calendarApi } from '../services/calendarApi';

const Connections: React.FC = () => {
  const navigate = useNavigate();
  const instanceNameId = useId();
  const apiKeyId = useId();
  const [waStatus, setWaStatus] = useState<ConnectionStatus>(ConnectionStatus.CONNECTED);
  const [calStatus, setCalStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [calendarEmail, setCalendarEmail] = useState<string | null>(null);
  
  // Security Improvement: Initialize with empty strings, never hardcode secrets in source
  const [instanceName, setInstanceName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const checkCalendarStatus = useCallback(async () => {
    const connected = await calendarApi.isConnected();
    setCalStatus(connected ? ConnectionStatus.CONNECTED : ConnectionStatus.DISCONNECTED);
    if (connected) {
      setCalendarEmail(calendarApi.getConnectedEmail());
    }
  }, []);

  useEffect(() => {
    // Verificar status da conexão do calendário
    checkCalendarStatus();
  }, [checkCalendarStatus]);

  const handleCalendarConnect = async () => {
    try {
      await calendarApi.connect();
      await checkCalendarStatus();
    } catch (error) {
      console.error('Erro ao conectar calendário:', error);
    }
  };

  const handleCalendarDisconnect = async () => {
    try {
      await calendarApi.disconnect();
      await checkCalendarStatus();
    } catch (error) {
      console.error('Erro ao desconectar calendário:', error);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <div className="border-b border-stone-200 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif text-zinc-900">Integrações Seguras</h2>
          <p className="text-stone-500 font-light mt-1">Gerencie chaves de API e conexões criptografadas.</p>
        </div>
        <div className="hidden md:flex items-center text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
           <ShieldCheck className="w-3 h-3 mr-1" />
           Ambiente Seguro (SSL)
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Evolution API Configuration (Tenant ID) */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-100 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center">
              <Server className="w-5 h-5 mr-3 text-amber-600" />
              <div>
                 <h3 className="font-serif text-lg text-zinc-900">Configuração do Gateway</h3>
                 <p className="text-xs text-stone-500 uppercase tracking-wide">Evolution API (WhatsApp)</p>
              </div>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor={instanceNameId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Nome da Instância</label>
              <input
                id={instanceNameId}
                type="text"
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
                className="block w-full rounded-lg border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900 transition-all placeholder:text-stone-300"
                placeholder="Insira o nome da instância"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor={apiKeyId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">API Key (Global)</label>
              <div className="relative">
                <input
                  id={apiKeyId}
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full rounded-lg border-stone-200 bg-stone-50 px-4 py-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900 transition-all font-mono text-sm placeholder:text-stone-300 pr-10"
                  placeholder="Insira sua chave de API"
                  autoComplete="new-password"
                />
                <button 
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-stone-400 mt-2 flex items-center">
                 <Key className="w-3 h-3 mr-1" />
                 Nunca compartilhe sua chave API.
              </p>
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
                  <div className="w-48 h-48 bg-white p-2 rounded-none border border-stone-200 flex items-center justify-center shadow-inner relative overflow-hidden">
                     {/* Blurred QR Code for Security UI demo */}
                     <QrCode className="w-32 h-32 text-stone-300" />
                     <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                        <span className="text-xs font-bold text-zinc-900 bg-white px-2 py-1 shadow-sm border rounded">Clique para gerar</span>
                     </div>
                  </div>
                  <p className="text-center text-sm text-stone-500 max-w-xs font-light">
                    Token de sessão único. Válido por 30 segundos.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setWaStatus(ConnectionStatus.CONNECTED)}
                    className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
                  >
                    Gerar Novo QR Code
                  </button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center border border-stone-100">
                    <CheckCircle className="w-10 h-10 text-zinc-900" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-serif text-xl text-zinc-900">Conectado</h4>
                    <p className="text-sm text-stone-500 mt-2 font-light">Sessão criptografada ponta-a-ponta.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setWaStatus(ConnectionStatus.DISCONNECTED)}
                    className="text-red-800 text-xs font-bold uppercase tracking-widest hover:text-red-900 border-b border-red-200 pb-1"
                  >
                    Revogar Acesso
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
                 Utilizamos OAuth 2.0 para garantir que apenas os dados de calendário sejam acessados.
               </p>
               
               {calStatus === ConnectionStatus.DISCONNECTED ? (
                 <>
                   <button 
                     type="button"
                     onClick={handleCalendarConnect}
                     className="flex items-center bg-white border border-stone-300 text-zinc-900 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition shadow-sm"
                   >
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" className="w-4 h-4 mr-3" alt="Google" />
                     Autorizar Acesso
                   </button>
                   <p className="text-xs text-stone-400 text-center max-w-xs">
                     Ao conectar, você poderá visualizar e gerenciar seus agendamentos diretamente no calendário.
                   </p>
                 </>
               ) : (
                  <div className="w-full space-y-4">
                    <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 text-center">
                      <CheckCircle className="w-8 h-8 text-zinc-900 mx-auto mb-3" />
                      <p className="text-sm font-bold text-zinc-900">Sincronização Ativa</p>
                      <p className="text-xs text-stone-500 mt-1 font-mono">{calendarEmail || 'salaoprincipal@gmail.com'}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => navigate('/calendar')}
                        className="flex-1 bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Ver Calendário
                      </button>
                      <button
                        type="button"
                        onClick={handleCalendarDisconnect}
                        className="px-6 py-3 text-red-600 border border-red-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition"
                      >
                        Desconectar
                      </button>
                    </div>
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
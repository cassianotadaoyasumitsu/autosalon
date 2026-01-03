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
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Conexões e Integrações</h2>
        <p className="text-slate-500 mt-1">Gerencie a conexão do WhatsApp e da Agenda Principal do salão.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Evolution API Configuration (Tenant ID) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-semibold text-slate-900 flex items-center">
              <Server className="w-5 h-5 mr-2 text-purple-600" />
              Configuração Evolution API (WhatsApp)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Esses dados identificam seu salão no n8n (Tabela Saloes).
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Instância</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Server className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={instanceName}
                  onChange={(e) => setInstanceName(e.target.value)}
                  className="block w-full pl-10 rounded-md border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm bg-slate-50 border p-2.5"
                  placeholder="ex: salao-centro"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">API Key Evolution</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="block w-full pl-10 rounded-md border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm bg-slate-50 border p-2.5"
                  placeholder="••••••••••••"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900">Status da Conexão</h3>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                waStatus === ConnectionStatus.CONNECTED ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {waStatus === ConnectionStatus.CONNECTED ? (
                  <><CheckCircle className="w-3 h-3 mr-1" /> Conectado</>
                ) : (
                  <><XCircle className="w-3 h-3 mr-1" /> Desconectado</>
                )}
              </div>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center space-y-6">
              {waStatus === ConnectionStatus.DISCONNECTED ? (
                <>
                  <div className="w-48 h-48 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                     <QrCode className="w-16 h-16 text-slate-400" />
                  </div>
                  <p className="text-center text-sm text-slate-500 max-w-xs">
                    Abra seu WhatsApp, vá em Aparelhos Conectados e escaneie o código acima.
                  </p>
                  <button 
                    onClick={() => setWaStatus(ConnectionStatus.CONNECTED)}
                    className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition"
                  >
                    Gerar QR Code
                  </button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-bounce-slow">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-slate-900">Tudo pronto!</h4>
                    <p className="text-sm text-slate-500 mt-1">Sua IA está respondendo mensagens.</p>
                  </div>
                  <button 
                    onClick={() => setWaStatus(ConnectionStatus.DISCONNECTED)}
                    className="text-red-500 text-sm hover:text-red-600 font-medium border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition"
                  >
                    Desconectar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Google Calendar Connection Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900">Agenda Principal (Google)</h3>
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                calStatus === ConnectionStatus.CONNECTED ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
              }`}>
                 {calStatus === ConnectionStatus.CONNECTED ? 'Sincronizado' : 'Não Vinculado'}
              </div>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center space-y-6">
               <p className="text-center text-sm text-slate-500 mb-4">
                 Conecte a agenda "Mestre" do salão. As agendas individuais dos profissionais são configuradas na aba "Profissionais".
               </p>
               
               {calStatus === ConnectionStatus.DISCONNECTED ? (
                 <button 
                   onClick={() => setCalStatus(ConnectionStatus.CONNECTED)}
                   className="flex items-center bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition shadow-sm"
                 >
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" className="w-5 h-5 mr-3" alt="Google" />
                   Conectar Google Calendar
                 </button>
               ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 w-full">
                    <div className="flex items-start">
                      <RefreshCw className="w-5 h-5 text-blue-500 mt-0.5 mr-3 animate-spin-slow" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Sincronização Ativa</p>
                        <p className="text-xs text-blue-700 mt-1">Última atualização: Há 2 minutos</p>
                        <p className="text-xs text-blue-600 mt-2 break-all">ID: salaoprincipal@gmail.com</p>
                      </div>
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
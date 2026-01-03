import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, Shield, AlertTriangle, Loader2 } from 'lucide-react';

const ProfessionalSetup: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [step, setStep] = useState<'WELCOME' | 'CONNECTING' | 'SUCCESS' | 'ERROR'>('WELCOME');
  
  useEffect(() => {
    if (!token) {
      setStep('ERROR');
    }
  }, [token]);

  const handleGoogleConnect = () => {
    setStep('CONNECTING');
    
    // Simulate API call to Google and Backend Callback
    setTimeout(() => {
      // In a real app, this would redirect to Google's OAuth URL
      // Google would redirect back to your backend, which verifies the code, 
      // gets the refresh_token, updates the DB based on the 'state' (which contains the invite token),
      // and then redirects the user here.
      setStep('SUCCESS');
    }, 2000);
  };

  if (step === 'ERROR') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Link Inválido</h1>
          <p className="text-slate-500 mb-6">
            O token de convite não foi encontrado ou expirou. Por favor, solicite um novo link ao administrador do salão.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'SUCCESS') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Tudo Pronto!</h1>
          <p className="text-slate-500 mb-8">
            Sua agenda do Google foi conectada com sucesso. Agora a IA do salão já pode gerenciar seus agendamentos.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left text-sm text-slate-600 mb-6">
            <p className="font-semibold mb-1">Próximos passos:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Aguarde novos agendamentos no seu Calendar.</li>
              <li>Mantenha seus horários de bloqueio atualizados no Google.</li>
            </ul>
          </div>
          <button 
             onClick={() => navigate('/')}
             className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition"
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Conectar Agenda</h1>
        <p className="text-slate-500 mb-8">
          Você foi convidado para integrar sua agenda ao <strong>AutoSalon</strong>.
        </p>

        {step === 'CONNECTING' ? (
          <div className="py-4">
             <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
             <p className="mt-4 text-sm text-slate-500">Conectando ao Google...</p>
          </div>
        ) : (
          <>
            <button 
              onClick={handleGoogleConnect}
              className="w-full flex items-center justify-center bg-white border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition shadow-sm mb-4 group"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" alt="Google" />
              Entrar com Google
            </button>
            
            <div className="flex items-center justify-center text-xs text-slate-400 mt-6">
              <Shield className="w-3 h-3 mr-1" />
              Acesso seguro e restrito apenas para gestão de eventos.
            </div>
          </>
        )}
      </div>
      <p className="mt-8 text-xs text-slate-400">
        Token: {token}
      </p>
    </div>
  );
};

export default ProfessionalSetup;
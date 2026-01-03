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
    setTimeout(() => {
      setStep('SUCCESS');
    }, 2000);
  };

  if (step === 'ERROR') {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center border border-stone-200">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-800" />
          </div>
          <h1 className="text-2xl font-serif text-zinc-900 mb-2">Acesso Inválido</h1>
          <p className="text-stone-500 font-light mb-6">
            O token de convite não foi encontrado ou expirou. Por favor, solicite um novo link ao administrador.
          </p>
        </div>
      </div>
    );
  }

  if (step === 'SUCCESS') {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center animate-fade-in border border-stone-200">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-zinc-900" />
          </div>
          <h1 className="text-3xl font-serif text-zinc-900 mb-2">Bem-vindo</h1>
          <p className="text-stone-500 font-light mb-8">
            Sua agenda foi sincronizada com sucesso. A partir de agora, o Perfect Salon gerenciará seus horários.
          </p>
          <div className="bg-stone-50 border border-stone-100 rounded-lg p-6 text-left text-sm text-stone-600 mb-8">
            <p className="font-bold text-zinc-900 mb-2 uppercase tracking-wide text-xs">Instruções</p>
            <ul className="list-disc pl-5 space-y-2 font-light">
              <li>Novos agendamentos aparecerão automaticamente.</li>
              <li>Bloqueios pessoais devem ser feitos na sua agenda Google.</li>
            </ul>
          </div>
          <button 
             onClick={() => navigate('/')}
             className="w-full bg-zinc-900 text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
          >
            Acessar Plataforma
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center border border-stone-200">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-8 h-8 text-zinc-900" />
        </div>
        
        <h1 className="text-3xl font-serif text-zinc-900 mb-2">Conectar Agenda</h1>
        <p className="text-stone-500 font-light mb-10">
          Você foi convidado para integrar a equipe <strong>Perfect Salon</strong>.
        </p>

        {step === 'CONNECTING' ? (
          <div className="py-8">
             <Loader2 className="w-10 h-10 text-zinc-900 animate-spin mx-auto" />
             <p className="mt-4 text-sm text-stone-500 font-light">Estabelecendo conexão segura...</p>
          </div>
        ) : (
          <>
            <button 
              onClick={handleGoogleConnect}
              className="w-full flex items-center justify-center bg-white border border-stone-300 text-zinc-900 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-stone-50 transition shadow-sm mb-6 group"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" alt="Google" />
              Entrar com Google
            </button>
            
            <div className="flex items-center justify-center text-xs text-stone-400 mt-8">
              <Shield className="w-3 h-3 mr-1" />
              Conexão criptografada e segura.
            </div>
          </>
        )}
      </div>
      <p className="mt-8 text-[10px] text-stone-300 font-mono">
        SECURE TOKEN: {token}
      </p>
    </div>
  );
};

export default ProfessionalSetup;
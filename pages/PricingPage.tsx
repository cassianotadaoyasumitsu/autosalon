import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PricingPage: React.FC = () => {
  const { login } = useAuth();
  
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-serif italic font-bold text-zinc-900 tracking-wide">Perfect Salon</Link>
            </div>
            <div className="hidden md:flex space-x-10">
              <Link to="/features" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Funcionalidades</Link>
              <Link to="/management" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Gestão</Link>
              <Link to="/pricing" className="text-sm uppercase tracking-widest text-zinc-900 border-b-2 border-amber-500 pb-1">Investimento</Link>
            </div>
            <div>
              <button 
                onClick={login}
                className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10"
              >
                Area do Cliente
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-serif text-zinc-900 mb-6">Plano Único, Benefícios Completos</h1>
              <p className="text-xl text-stone-500 font-light">
                Simplificamos nossa oferta. Sem custos ocultos, sem fidelidade forçada. Apenas a melhor tecnologia para o seu salão.
              </p>
           </div>

           <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-stone-100">
             <div className="p-12 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-stone-100">
                <h3 className="text-amber-600 text-sm font-bold uppercase tracking-[0.2em] mb-2">Perfect Salon Pro</h3>
                <div className="flex items-baseline text-zinc-900 mb-6">
                  <span className="text-6xl font-serif">R$149</span>
                  <span className="ml-2 text-stone-500 font-light">/mês</span>
                </div>
                <p className="text-stone-600 font-light leading-relaxed mb-8">
                  Acesso irrestrito a todas as funcionalidades de gestão, automação e inteligência artificial.
                </p>
                <button 
                   onClick={login}
                   className="w-full bg-zinc-900 text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg"
                >
                  Assinar Agora
                </button>
                <p className="text-center text-xs text-stone-400 mt-4">14 dias de garantia ou seu dinheiro de volta.</p>
             </div>
             <div className="p-12 md:w-1/2 bg-stone-50">
                <h4 className="font-serif text-lg mb-6">O que está incluso:</h4>
                <ul className="space-y-6">
                  {[
                    'Conexão WhatsApp Business API',
                    'Até 10 Profissionais/Agendas',
                    'Sincronização Google Calendar',
                    'Dashboard Avançado',
                    'Sistema de Avaliação de Clientes',
                    'Suporte Prioritário'
                  ].map((feat) => (
                    <li key={feat} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-zinc-900 mt-0.5 flex-shrink-0" />
                      <p className="ml-4 text-stone-600 font-light">{feat}</p>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-24">
             <h2 className="text-3xl font-serif text-zinc-900 mb-10 text-center">Perguntas Frequentes</h2>
             <div className="space-y-6">
                {[
                  { q: 'Preciso pagar a mais pelo WhatsApp?', a: 'Não. A conexão com o Evolution API está inclusa no plano. Você só precisa manter seu número ativo.' },
                  { q: 'Como funciona o pagamento?', a: 'Trabalhamos com cartão de crédito ou PIX recorrente. A cobrança é automática mensalmente.' },
                  { q: 'Posso adicionar mais profissionais?', a: 'O plano base cobre até 10 profissionais. Para equipes maiores, entre em contato para um plano Enterprise.' },
                ].map((item, idx) => (
                   <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200">
                      <div className="flex items-start">
                         <HelpCircle className="w-5 h-5 text-amber-500 mt-1 mr-4 flex-shrink-0" />
                         <div>
                            <h4 className="font-bold text-zinc-900 mb-2">{item.q}</h4>
                            <p className="text-stone-600 font-light">{item.a}</p>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

        </div>
      </div>

       {/* Footer */}
       <footer className="bg-zinc-950 text-stone-400 border-t border-white/5">
        <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
               <span className="text-2xl font-serif italic text-white">Perfect Salon</span>
            </div>
            <div className="flex space-x-8 text-xs uppercase tracking-widest">
               <Link to="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
               <Link to="/terms" className="hover:text-white transition-colors">Termos</Link>
               <Link to="/contact" className="hover:text-white transition-colors">Contato</Link>
            </div>
            <div className="mt-8 md:mt-0 text-xs font-light">
              &copy; 2024 Perfect Salon. Excellence in Management.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
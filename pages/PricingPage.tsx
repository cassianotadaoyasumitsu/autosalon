import type React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, HelpCircle } from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* Navigation */}
      <PublicNavbar />

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-serif text-zinc-900 mb-6">Escolha o Plano Ideal</h1>
              <p className="text-xl text-stone-500 font-light">
                Planos flexíveis para salões de todos os tamanhos. Sem custos ocultos, sem fidelidade forçada.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
             {/* Starter Plan */}
             <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200 flex flex-col">
               <div className="p-8 flex flex-col flex-1">
                 <h3 className="text-stone-600 text-sm font-bold uppercase tracking-[0.2em] mb-2">Starter</h3>
                 <div className="flex items-baseline text-zinc-900 mb-4">
                   <span className="text-5xl font-serif">R$149</span>
                   <span className="ml-2 text-stone-500 font-light text-lg">/mês</span>
                 </div>
                 <p className="text-stone-600 font-light text-sm mb-6">
                   Ideal para salões pequenos começando sua jornada digital.
                 </p>
                 <ul className="space-y-4 mb-8 flex-1">
                   {[
                     'Conexão WhatsApp Business API',
                     'Até 3 Profissionais/Agendas',
                     'Sincronização Google Calendar',
                     'Dashboard Básico',
                     'Sistema de Avaliação de Clientes',
                     'Suporte por Email'
                   ].map((feat) => (
                     <li key={feat} className="flex items-start">
                       <CheckCircle className="h-4 w-4 text-zinc-900 mt-1 flex-shrink-0" />
                       <p className="ml-3 text-stone-600 font-light text-sm">{feat}</p>
                     </li>
                   ))}
                 </ul>
                 <button 
                   type="button"
                   onClick={() => navigate('/signup')}
                   className="w-full bg-stone-200 text-zinc-900 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-300 transition-colors"
                 >
                   Assinar Agora
                 </button>
               </div>
             </div>

             {/* Pro Plan - Featured */}
             <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500 flex flex-col relative">
               <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">
                 Mais Popular
               </div>
               <div className="p-8 flex flex-col flex-1 pt-12">
                 <h3 className="text-amber-600 text-sm font-bold uppercase tracking-[0.2em] mb-2">Pro</h3>
                 <div className="flex items-baseline text-zinc-900 mb-4">
                   <span className="text-5xl font-serif">R$299</span>
                   <span className="ml-2 text-stone-500 font-light text-lg">/mês</span>
                 </div>
                 <p className="text-stone-600 font-light text-sm mb-6">
                   A escolha perfeita para salões em crescimento.
                 </p>
                 <ul className="space-y-4 mb-8 flex-1">
                   {[
                     'Conexão WhatsApp Business API',
                     'Até 6 Profissionais/Agendas',
                     'Sincronização Google Calendar',
                     'Dashboard Avançado',
                     'Sistema de Avaliação de Clientes',
                     'Suporte Prioritário'
                   ].map((feat) => (
                     <li key={feat} className="flex items-start">
                       <CheckCircle className="h-4 w-4 text-zinc-900 mt-1 flex-shrink-0" />
                       <p className="ml-3 text-stone-600 font-light text-sm">{feat}</p>
                     </li>
                   ))}
                 </ul>
                 <button 
                   type="button"
                   onClick={() => navigate('/signup')}
                   className="w-full bg-zinc-900 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg"
                 >
                   Assinar Agora
                 </button>
               </div>
             </div>

             {/* Premium Plan */}
             <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200 flex flex-col">
               <div className="p-8 flex flex-col flex-1">
                 <h3 className="text-stone-600 text-sm font-bold uppercase tracking-[0.2em] mb-2">Premium</h3>
                 <div className="flex items-baseline text-zinc-900 mb-4">
                   <span className="text-5xl font-serif">R$599</span>
                   <span className="ml-2 text-stone-500 font-light text-lg">/mês</span>
                 </div>
                 <p className="text-stone-600 font-light text-sm mb-6">
                   Para salões grandes que precisam de máxima capacidade.
                 </p>
                 <ul className="space-y-4 mb-8 flex-1">
                   {[
                     'Conexão WhatsApp Business API',
                     'Até 12 Profissionais/Agendas',
                     'Sincronização Google Calendar',
                     'Dashboard Avançado',
                     'Sistema de Avaliação de Clientes',
                     'Suporte Prioritário 24/7'
                   ].map((feat) => (
                     <li key={feat} className="flex items-start">
                       <CheckCircle className="h-4 w-4 text-zinc-900 mt-1 flex-shrink-0" />
                       <p className="ml-3 text-stone-600 font-light text-sm">{feat}</p>
                     </li>
                   ))}
                 </ul>
                 <button 
                   type="button"
                   onClick={() => navigate('/signup')}
                   className="w-full bg-zinc-900 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-lg"
                 >
                   Assinar Agora
                 </button>
               </div>
             </div>
          </div>

          <div className="text-center mb-16">
            <p className="text-stone-500 text-sm">14 dias de garantia ou seu dinheiro de volta em todos os planos.</p>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-24">
             <h2 className="text-3xl font-serif text-zinc-900 mb-10 text-center">Perguntas Frequentes</h2>
             <div className="space-y-6">
                {[
                  { q: 'Preciso pagar a mais pelo WhatsApp?', a: 'Não. A conexão com o Evolution API está inclusa no plano. Você só precisa manter seu número ativo.' },
                  { q: 'Como funciona o pagamento?', a: 'Trabalhamos com cartão de crédito ou PIX recorrente. A cobrança é automática mensalmente.' },
                  { q: 'Posso adicionar mais profissionais?', a: 'Cada plano tem um limite de profissionais. Se precisar de mais, você pode fazer upgrade para um plano superior ou entrar em contato para um plano Enterprise personalizado.' },
                ].map((item) => (
                   <div key={item.q} className="bg-white p-6 rounded-xl border border-stone-200">
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
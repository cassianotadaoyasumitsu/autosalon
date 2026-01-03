import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, Users, TrendingUp, Star, Bell, Shield, Smartphone, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const FeaturesPage: React.FC = () => {
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
              <Link to="/features" className="text-sm uppercase tracking-widest text-zinc-900 border-b-2 border-amber-500 pb-1">Funcionalidades</Link>
              <Link to="/management" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Gestão</Link>
              <Link to="/pricing" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Investimento</Link>
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

      {/* Header */}
      <div className="bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
           <h1 className="text-4xl font-serif text-zinc-900 sm:text-5xl mb-6">Funcionalidades Premium</h1>
           <p className="max-w-2xl mx-auto text-xl text-stone-500 font-light">
             Descubra como o ecossistema Perfect Salon transforma cada aspecto da gestão do seu salão, da recepção ao pós-venda.
           </p>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section 1: Automation */}
          <div className="mb-20">
             <div className="flex items-center space-x-4 mb-10">
                <div className="h-px bg-stone-300 flex-1"></div>
                <h2 className="text-amber-600 text-sm font-bold uppercase tracking-[0.2em]">Automação Inteligente</h2>
                <div className="h-px bg-stone-300 flex-1"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
                   <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center mb-6 text-white">
                      <MessageCircle className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-serif text-zinc-900 mb-3">Concierge WhatsApp 24/7</h3>
                   <p className="text-stone-600 font-light leading-relaxed">
                     Uma IA treinada para agir como sua recepcionista. Ela entende linguagem natural, verifica disponibilidade e agenda horários sem intervenção humana.
                   </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
                   <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center mb-6 text-white">
                      <Bell className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-serif text-zinc-900 mb-3">Lembretes Anti-No-Show</h3>
                   <p className="text-stone-600 font-light leading-relaxed">
                     Reduza as faltas em até 80%. O sistema envia lembretes automáticos e solicita confirmação do cliente antes do horário marcado.
                   </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
                   <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center mb-6 text-white">
                      <Star className="w-6 h-6" />
                   </div>
                   <h3 className="text-xl font-serif text-zinc-900 mb-3">Gestão de Reputação</h3>
                   <p className="text-stone-600 font-light leading-relaxed">
                     Após o serviço, enviamos uma pesquisa de satisfação elegante. Clientes felizes são convidados a avaliar no Google.
                   </p>
                </div>
             </div>
          </div>

          {/* Section 2: Management */}
          <div>
             <div className="flex items-center space-x-4 mb-10">
                <div className="h-px bg-stone-300 flex-1"></div>
                <h2 className="text-amber-600 text-sm font-bold uppercase tracking-[0.2em]">Gestão & Equipe</h2>
                <div className="h-px bg-stone-300 flex-1"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
                   <Calendar className="w-8 h-8 text-zinc-900 mb-4" />
                   <h3 className="font-bold text-zinc-900 mb-2">Sync Google Calendar</h3>
                   <p className="text-sm text-stone-500">Sincronização bidirecional em tempo real para evitar conflitos de horário.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
                   <Users className="w-8 h-8 text-zinc-900 mb-4" />
                   <h3 className="font-bold text-zinc-900 mb-2">Múltiplos Profissionais</h3>
                   <p className="text-sm text-stone-500">Cada especialista tem seu acesso, sua agenda e suas configurações personalizadas.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
                   <TrendingUp className="w-8 h-8 text-zinc-900 mb-4" />
                   <h3 className="font-bold text-zinc-900 mb-2">Relatórios Financeiros</h3>
                   <p className="text-sm text-stone-500">Visualize faturamento estimado, ticket médio e performance por serviço.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
                   <Smartphone className="w-8 h-8 text-zinc-900 mb-4" />
                   <h3 className="font-bold text-zinc-900 mb-2">Mobile First</h3>
                   <p className="text-sm text-stone-500">Acesse sua agenda e métricas de qualquer lugar, em qualquer dispositivo.</p>
                </div>
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

export default FeaturesPage;
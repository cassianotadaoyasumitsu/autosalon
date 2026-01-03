import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Users, Smartphone, BarChart3, Lock, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ManagementPage: React.FC = () => {
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
              <Link to="/management" className="text-sm uppercase tracking-widest text-zinc-900 border-b-2 border-amber-500 pb-1">Gestão</Link>
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

      {/* Hero Content */}
      <div className="bg-zinc-950 text-white pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="max-w-3xl">
              <h1 className="text-4xl font-serif sm:text-5xl mb-6">Controle Total do Seu Negócio</h1>
              <p className="text-xl text-stone-400 font-light leading-relaxed">
                Nossa suíte de gestão oferece diferentes níveis de visualização para proprietários e profissionais, garantindo transparência e autonomia.
              </p>
           </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20">
         
         {/* Feature 1: Owner View */}
         <div className="bg-white rounded-2xl shadow-xl p-10 mb-12 border border-stone-200">
            <div className="md:flex items-start gap-10">
               <div className="md:w-1/3 mb-8 md:mb-0">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-amber-600">
                     <PieChart className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-serif text-zinc-900 mb-4">Visão do Proprietário</h2>
                  <p className="text-stone-600 font-light leading-relaxed mb-6">
                    O painel administrativo consolida dados de toda a operação. Acompanhe o crescimento do salão com métricas globais.
                  </p>
                  <ul className="space-y-3">
                    {['Faturamento Total Diário/Mensal', 'Taxa de Ocupação Global', 'Ranking de Serviços Mais Vendidos', 'Controle de Todas as Agendas'].map((item) => (
                      <li key={item} className="flex items-center text-sm font-medium text-zinc-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="md:w-2/3 bg-stone-50 rounded-xl border border-stone-100 p-6 min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                     <BarChart3 className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                     <p className="text-stone-400 font-serif italic">Interface do Dashboard Global</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Feature 2: Professional View */}
         <div className="bg-white rounded-2xl shadow-xl p-10 mb-12 border border-stone-200">
            <div className="md:flex items-start gap-10 flex-row-reverse">
               <div className="md:w-1/3 mb-8 md:mb-0">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                     <Users className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-serif text-zinc-900 mb-4">Portal do Especialista</h2>
                  <p className="text-stone-600 font-light leading-relaxed mb-6">
                    Respeitamos a autonomia dos seus talentos. Cada profissional tem acesso filtrado aos seus próprios dados.
                  </p>
                  <ul className="space-y-3">
                    {['Agenda Individual Sincronizada', 'Histórico de Clientes Próprios', 'Feedback e Avaliações Pessoais', 'Comissões Estimadas'].map((item) => (
                      <li key={item} className="flex items-center text-sm font-medium text-zinc-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="md:w-2/3 bg-stone-50 rounded-xl border border-stone-100 p-6 min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                     <Smartphone className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                     <p className="text-stone-400 font-serif italic">Visualização Mobile para Profissionais</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Privacy & Security */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div className="bg-zinc-900 text-white p-10 rounded-2xl">
               <Lock className="w-8 h-8 text-amber-500 mb-6" />
               <h3 className="text-xl font-serif mb-4">Privacidade de Dados</h3>
               <p className="font-light text-stone-400 leading-relaxed">
                 O sistema permite configurar permissões granulares. Você decide se um profissional pode ver a agenda dos colegas ou apenas a sua própria.
               </p>
            </div>
            <div className="bg-stone-200 p-10 rounded-2xl">
               <Eye className="w-8 h-8 text-zinc-900 mb-6" />
               <h3 className="text-xl font-serif text-zinc-900 mb-4">Transparência</h3>
               <p className="font-light text-stone-600 leading-relaxed">
                 Logs de atividades registram quem agendou, alterou ou cancelou compromissos, garantindo segurança operacional.
               </p>
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

export default ManagementPage;
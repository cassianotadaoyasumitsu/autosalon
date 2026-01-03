import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, Calendar, Shield, ArrowRight, Star, Users, Sparkles, TrendingUp, Bell, Smartphone, PieChart } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const testimonials = [
  {
    id: 1,
    name: 'Isabella Fontana',
    role: 'Proprietária, Belle Époque',
    content: 'A sofisticação do sistema combina perfeitamente com meu salão. Meus clientes VIPs adoram a conveniência do agendamento via WhatsApp.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    name: 'Ricardo Almeida',
    role: 'Hair Stylist',
    content: 'Profissionalismo em cada detalhe. A gestão da agenda é impecável, permitindo que eu foque apenas na minha arte.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 3,
    name: 'Juliana Costa',
    role: 'Gerente, L´Absolu',
    content: 'O sistema de avaliação elevou nosso padrão de qualidade. Uma ferramenta indispensável para salões de alto nível.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
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
              <Link to="/pricing" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Investimento</Link>
            </div>
            <div>
              <button 
                onClick={onLogin}
                className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10"
              >
                Area do Cliente
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center space-x-2 mb-8">
                 <Sparkles className="w-5 h-5 text-amber-500" />
                 <span className="text-amber-600 font-medium text-sm tracking-widest uppercase">Exclusividade para o seu negócio</span>
              </div>
              <h1 className="text-5xl tracking-tight font-serif text-zinc-900 sm:text-6xl md:text-7xl leading-tight">
                Sua recepção, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 italic">elevada à perfeição.</span>
              </h1>
              <p className="mt-6 text-lg text-stone-600 leading-relaxed font-light">
                O Perfect Salon oferece uma experiência de agendamento premium via WhatsApp com Inteligência Artificial. 
                Sofisticação e tecnologia para salões que exigem o melhor.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <button 
                  onClick={onLogin}
                  className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-full text-white bg-zinc-900 hover:bg-zinc-800 shadow-xl transition-all"
                >
                  Iniciar Experiência
                  <ArrowRight className="ml-3 w-4 h-4" />
                </button>
                <Link to="/features" className="inline-flex items-center justify-center px-10 py-4 border border-stone-300 text-sm font-bold uppercase tracking-widest rounded-full text-zinc-900 bg-transparent hover:bg-stone-100 transition-all">
                  Saiba Mais
                </Link>
              </div>
            </div>
            
            {/* Elegant Image Composition */}
            <div className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6">
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden border border-white/50">
                 <img 
                    className="w-full object-cover" 
                    src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop" 
                    alt="Luxury Salon Interior" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Card */}
                  <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/40">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-amber-400" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-wider text-stone-500 font-medium mb-1">Status da IA</p>
                        <p className="text-lg font-serif italic text-zinc-900">"Agendamento confirmado para Sra. Albuquerque às 16h."</p>
                      </div>
                    </div>
                  </div>
              </div>
               {/* Decorative Element */}
               <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview - Short Version for Home */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">Destaques</h2>
            <p className="text-4xl font-serif text-zinc-900 mb-6">
              Excelência em cada interação
            </p>
            <Link to="/features" className="text-sm font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors">
               Ver todas as funcionalidades
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { title: 'Concierge WhatsApp', desc: 'IA que responde 24/7, agenda horários e tira dúvidas.', icon: MessageCircle },
              { title: 'Multi-Agendas', desc: 'Sincronização individual com Google Calendar para cada especialista.', icon: Calendar },
              { title: 'Dashboard Financeiro', desc: 'Faturamento estimado e métricas de conversão em tempo real.', icon: TrendingUp },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 bg-stone-50 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-stone-100 group-hover:bg-zinc-900 transition-colors">
                  <feature.icon className="h-6 w-6 text-zinc-900 group-hover:text-amber-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold font-serif text-zinc-900 mb-3">{feature.title}</h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
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
               <a href="#" className="hover:text-white transition-colors">Privacidade</a>
               <a href="#" className="hover:text-white transition-colors">Termos</a>
               <a href="#" className="hover:text-white transition-colors">Contato</a>
            </div>
            <div className="mt-8 md:mt-0 text-xs font-light">
              &copy; 2024 Perfect Salon. Excellence in Management.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
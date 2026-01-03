import React from 'react';
import { CheckCircle, MessageCircle, Calendar, Shield, ArrowRight, Star, Users, Sparkles } from 'lucide-react';

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
              <span className="text-2xl font-serif italic font-bold text-zinc-900 tracking-wide">Perfect Salon</span>
            </div>
            <div className="hidden md:flex space-x-10">
              <a href="#features" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Investimento</a>
              <a href="#testimonials" className="text-sm uppercase tracking-widest text-stone-500 hover:text-zinc-900 transition-colors">Cases</a>
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
                <button className="inline-flex items-center justify-center px-10 py-4 border border-stone-300 text-sm font-bold uppercase tracking-widest rounded-full text-zinc-900 bg-transparent hover:bg-stone-100 transition-all">
                  Falar com Consultor
                </button>
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

      {/* Features - Clean & Minimalist */}
      <div id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">Diferenciais</h2>
            <p className="text-4xl font-serif text-zinc-900 mb-6">
              A excelência que seu salão merece
            </p>
            <p className="text-stone-500 font-light text-lg">
              Ferramentas desenhadas para maximizar a eficiência sem sacrificar a elegância do atendimento pessoal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Concierge Virtual',
                desc: 'Nossa IA atua como uma recepcionista de luxo no WhatsApp, gerenciando sua agenda 24h por dia.',
                icon: MessageCircle
              },
              {
                title: 'Gestão de Talentos',
                desc: 'Sincronização individual para cada especialista da sua equipe, respeitando a autonomia de cada profissional.',
                icon: Users
              },
              {
                title: 'Jornada do Cliente',
                desc: 'Lembretes elegantes e solicitações de feedback que fidelizam e encantam sua clientela.',
                icon: Star
              },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 bg-stone-50 rounded-2xl hover:bg-zinc-900 transition-all duration-500 cursor-default">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-white/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-zinc-900 group-hover:text-amber-400 transition-colors" />
                </div>
                <h3 className="text-xl font-serif text-zinc-900 group-hover:text-white mb-4 transition-colors">{feature.title}</h3>
                <p className="text-stone-600 group-hover:text-stone-400 leading-relaxed font-light transition-colors">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials - Editorial Style */}
      <div id="testimonials" className="py-32 bg-stone-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-serif italic text-zinc-900">"Simplesmente indispensável."</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-10 shadow-xl shadow-stone-200/50 rounded-none border-l-4 border-amber-500">
                <div className="flex items-center mb-6 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 mb-8 font-light italic text-lg leading-relaxed">"{t.content}"</p>
                <div className="flex items-center">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full mr-4 grayscale" />
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm uppercase tracking-wider">{t.name}</h4>
                    <span className="text-xs text-stone-500 tracking-wide">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing - Minimalist */}
      <div id="pricing" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-zinc-900">Membership</h2>
            <p className="mt-4 text-stone-500 font-light">Acesso exclusivo à plataforma completa.</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
             <div className="p-12 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
                <h3 className="text-amber-500 text-sm font-bold uppercase tracking-[0.2em] mb-2">Perfect Salon Pro</h3>
                <div className="flex items-baseline text-white mb-6">
                  <span className="text-6xl font-serif">R$149</span>
                  <span className="ml-2 text-stone-400 font-light">/mês</span>
                </div>
                <p className="text-stone-400 font-light leading-relaxed mb-8">
                  Tudo o que você precisa para automatizar sua recepção com classe e eficiência.
                </p>
                <button 
                   onClick={onLogin}
                   className="w-full bg-white text-zinc-950 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors"
                >
                  Tornar-se Membro
                </button>
             </div>
             <div className="p-12 md:w-1/2 bg-zinc-900">
                <ul className="space-y-6">
                  {['Concierge WhatsApp Ilimitado', 'Até 10 Especialistas', 'Integração Google Calendar', 'Suite de Avaliações', 'Notificações Premium'].map((feat) => (
                    <li key={feat} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="ml-4 text-stone-300 font-light">{feat}</p>
                    </li>
                  ))}
                </ul>
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
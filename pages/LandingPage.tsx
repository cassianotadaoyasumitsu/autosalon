import type React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, Calendar, ArrowRight, Star, Users, Sparkles, TrendingUp, Bell, Smartphone, PieChart } from 'lucide-react';

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

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      {/* Navigation - Linked to dedicated pages */}
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
              <Link 
                to="/login"
                className="bg-zinc-900 text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-lg shadow-zinc-900/10 inline-block"
              >
                Area do Cliente
              </Link>
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
                  type="button"
                  onClick={() => navigate('/login')}
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

      {/* Features Grid - Full Content */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">Ecossistema Completo</h2>
            <p className="text-4xl font-serif text-zinc-900 mb-6">
              Tudo o que você precisa para liderar
            </p>
            <p className="text-stone-500 font-light text-lg">
              Centralize a gestão do seu salão em uma plataforma única, desenhada para estética e performance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Concierge WhatsApp',
                desc: 'IA que responde 24/7, agenda horários e tira dúvidas, integrada diretamente ao seu número comercial.',
                icon: MessageCircle
              },
              {
                title: 'Multi-Agendas',
                desc: 'Sincronização individual com Google Calendar para cada especialista, mantendo a privacidade e organização.',
                icon: Calendar
              },
              {
                title: 'Gestão de Equipe',
                desc: 'Perfis detalhados para cada profissional, com especialidades, métricas individuais e histórico.',
                icon: Users
              },
              {
                title: 'Dashboard Financeiro',
                desc: 'Acompanhe faturamento estimado, ticket médio e volume de vendas com gráficos intuitivos.',
                icon: TrendingUp
              },
              {
                title: 'Reputação & Feedback',
                desc: 'Coleta automatizada de avaliações pós-serviço para manter o padrão de qualidade nas alturas.',
                icon: Star
              },
              {
                title: 'Anti-No-Show',
                desc: 'Lembretes automáticos e solicitações de confirmação reduzem drasticamente as faltas.',
                icon: Bell
              },
            ].map((feature) => (
              <div key={feature.title} className="group p-8 bg-stone-50 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-stone-100 group-hover:bg-zinc-900 transition-colors">
                  <feature.icon className="h-6 w-6 text-zinc-900 group-hover:text-amber-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold font-serif text-zinc-900 mb-3">{feature.title}</h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/features" className="text-sm font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors">
               Ver todas as funcionalidades
            </Link>
          </div>
        </div>
      </div>

      {/* Management / Dashboard Highlight Section - Full Content */}
      <div className="py-24 bg-zinc-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            
            <div className="mb-12 lg:mb-0">
               <h2 className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Inteligência de Negócios</h2>
               <h3 className="text-4xl font-serif mb-6 text-white">
                 Visão Macro e Micro <br/>do seu Faturamento
               </h3>
               <p className="text-stone-400 font-light text-lg mb-8 leading-relaxed">
                 O Perfect Salon oferece um <strong>Dashboard Dinâmico</strong> que se adapta à sua necessidade de análise.
               </p>

               <div className="space-y-6">
                 <div className="flex">
                   <div className="flex-shrink-0">
                     <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 text-amber-500">
                       <PieChart className="h-5 w-5" />
                     </div>
                   </div>
                   <div className="ml-4">
                     <h4 className="text-lg font-bold font-serif text-white">Visão Geral (Owner)</h4>
                     <p className="mt-2 text-sm text-stone-400 font-light">
                       Monitore o faturamento total do salão, taxa de ocupação global e performance comparativa entre serviços.
                     </p>
                   </div>
                 </div>

                 <div className="flex">
                   <div className="flex-shrink-0">
                     <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 text-amber-500">
                       <Users className="h-5 w-5" />
                     </div>
                   </div>
                   <div className="ml-4">
                     <h4 className="text-lg font-bold font-serif text-white">Filtro por Especialista</h4>
                     <p className="mt-2 text-sm text-stone-400 font-light">
                       Selecione um membro da equipe para visualizar métricas isoladas: agendamentos específicos, receita gerada e conversão individual.
                     </p>
                   </div>
                 </div>

                 <div className="flex">
                   <div className="flex-shrink-0">
                     <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 text-amber-500">
                       <Smartphone className="h-5 w-5" />
                     </div>
                   </div>
                   <div className="ml-4">
                     <h4 className="text-lg font-bold font-serif text-white">Acesso Mobile</h4>
                     <p className="mt-2 text-sm text-stone-400 font-light">
                       Layout responsivo para que você ou seus profissionais consultem a agenda e metas de qualquer lugar.
                     </p>
                   </div>
                 </div>
               </div>
               
               <div className="mt-10">
                 <Link to="/management" className="text-amber-500 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center">
                    Explorar Gestão <ArrowRight className="ml-2 w-4 h-4" />
                 </Link>
               </div>
            </div>

            {/* Abstract Representation of Dashboard */}
            <div className="relative rounded-2xl bg-zinc-900 border border-white/10 p-2 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-2xl pointer-events-none"></div>
               <div className="bg-stone-50 rounded-xl overflow-hidden h-full min-h-[400px] p-6 relative">
                  {/* Mock UI Elements */}
                  <div className="flex justify-between items-center mb-6 border-b border-stone-200 pb-4">
                     <div className="h-4 w-32 bg-zinc-200 rounded"></div>
                     <div className="h-8 w-24 bg-zinc-900 rounded-lg"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 h-24"></div>
                     <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 h-24"></div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 h-40 mb-4"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900/90 backdrop-blur text-white px-6 py-4 rounded-xl shadow-xl border border-white/20 text-center">
                     <p className="text-xs uppercase tracking-widest text-amber-500 mb-1">Performance</p>
                     <p className="font-serif text-2xl">R$ 14.250</p>
                     <p className="text-[10px] text-stone-400">Esta semana</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-32 bg-stone-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-serif italic text-zinc-900">"Simplesmente indispensável."</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-10 shadow-xl shadow-stone-200/50 rounded-none border-l-4 border-amber-500">
                <div className="flex items-center mb-6 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`${t.id}-star-${i}`} className="w-4 h-4 fill-current" />
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

      {/* Pricing - Full Content */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-zinc-900">Membership</h2>
            <p className="mt-4 text-stone-500 font-light">Acesso exclusivo à plataforma completa.</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
             <div className="p-12 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
                <h3 className="text-amber-500 text-sm font-bold uppercase tracking-[0.2em] mb-2">Perfect Salon Pro</h3>
                <div className="flex items-baseline text-white mb-6">
                  <span className="text-6xl font-serif">R$299</span>
                  <span className="ml-2 text-stone-400 font-light">/mês</span>
                </div>
                <p className="text-stone-400 font-light leading-relaxed mb-8">
                  Tudo o que você precisa para automatizar sua recepção com classe e eficiência.
                </p>
                <div className="flex space-x-4">
                  <button 
                     type="button"
                     onClick={() => navigate('/signup')}
                     className="flex-1 bg-white text-zinc-950 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors"
                  >
                    Tornar-se Membro
                  </button>
                  <Link to="/pricing" className="flex items-center justify-center px-6 py-4 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
                     Detalhes
                  </Link>
                </div>
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

export default LandingPage;
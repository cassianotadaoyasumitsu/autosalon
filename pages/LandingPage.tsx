import React from 'react';
import { CheckCircle, MessageCircle, Calendar, Shield, ArrowRight, Star, Users } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const testimonials = [
  {
    id: 1,
    name: 'Fernanda Lima',
    role: 'Cliente Recorrente',
    content: 'Nunca mais esqueci um horário! O lembrete no WhatsApp é perfeito e o agendamento é super rápido.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/fernanda/100'
  },
  {
    id: 2,
    name: 'Ricardo Alves',
    role: 'Cliente',
    content: 'Profissionais excelentes e o sistema de avaliação me ajudou a escolher o melhor especialista para meu corte.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/ricardo/100'
  },
  {
    id: 3,
    name: 'Juliana Costa',
    role: 'Cliente Nova',
    content: 'Adorei a facilidade de ver os horários livres sem precisar ligar. Experiência 10/10.',
    rating: 4,
    avatar: 'https://picsum.photos/seed/juliana/100'
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-slate-900">AutoSalon</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-500 hover:text-slate-900 transition">Funcionalidades</a>
              <a href="#pricing" className="text-slate-500 hover:text-slate-900 transition">Preços</a>
              <a href="#testimonials" className="text-slate-500 hover:text-slate-900 transition">Depoimentos</a>
            </div>
            <div>
              <button 
                onClick={onLogin}
                className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-900/20"
              >
                Entrar / Teste Grátis
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold text-xs uppercase tracking-wide mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                Nova Integração com WhatsApp
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                Sua recepção 
                <span className="block text-emerald-600">24h no WhatsApp</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Automatize agendamentos, reduza faltas e aumente seu faturamento. Deixe a IA cuidar da agenda enquanto você cuida dos clientes.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <button 
                  onClick={onLogin}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10 shadow-xl shadow-emerald-600/20 transition-all hover:scale-105"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <p className="mt-3 text-sm text-slate-400">
                  Teste grátis por 7 dias. Sem cartão de crédito.
                </p>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img 
                    className="w-full" 
                    src="https://picsum.photos/seed/salon/800/600" 
                    alt="Salon Dashboard App" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Novo Agendamento Confirmado</p>
                        <p className="text-xs text-slate-500">Via WhatsApp • Maria Silva • Corte • 14:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Funcionalidades</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Tudo o que seu salão precisa
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Agendamento Automático',
                  desc: 'A IA conversa com seu cliente no WhatsApp e agenda horários diretamente no Google Calendar.',
                  icon: MessageCircle
                },
                {
                  title: 'Gestão de Profissionais',
                  desc: 'Cada profissional sincroniza sua própria agenda. Sem conflitos de horários.',
                  icon: Users
                },
                {
                  title: 'Lembretes via Push',
                  desc: 'Reduza o no-show enviando lembretes automáticos e notificações para os clientes.',
                  icon: Calendar
                },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition border border-slate-100">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white mb-6">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-medium text-slate-900">{feature.title}</h3>
                  <p className="mt-4 text-base text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 skew-y-3 origin-top-left transform -translate-y-12"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Quem usa, recomenda</h2>
            <p className="mt-4 text-lg text-slate-500">
              Veja o que os clientes estão falando sobre a experiência com o AutoSalon.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-xl shadow-lg p-8 border border-slate-100 relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{t.content}"</p>
                <div className="flex items-center">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <span className="text-xs text-slate-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Planos Simples</h2>
            <p className="mt-4 text-lg text-slate-500">Comece a crescer hoje mesmo.</p>
          </div>
          <div className="max-w-lg mx-auto rounded-3xl shadow-2xl overflow-hidden lg:max-w-none lg:flex bg-slate-900">
            <div className="flex-1 px-6 py-8 lg:p-12 bg-slate-900 text-white">
              <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Plano Pro</h3>
              <p className="mt-6 text-base text-slate-300">
                Acesso completo a todas as funcionalidades de automação e gestão.
              </p>
              <div className="mt-8">
                <div className="flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">R$149</span>
                  <span className="ml-1 text-xl font-semibold">/mês</span>
                </div>
              </div>
            </div>
            <div className="flex-1 px-6 py-8 lg:p-12 bg-slate-800 lg:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-700">
              <ul className="space-y-4">
                {['WhatsApp Ilimitado', 'Até 10 Profissionais', 'Sincronização Google Calendar', 'Sistema de Avaliações', 'Notificações Push'].map((feat) => (
                  <li key={feat} className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                    </div>
                    <p className="ml-3 text-base text-slate-300">{feat}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button 
                   onClick={onLogin}
                   className="w-full bg-emerald-600 border border-transparent rounded-lg py-3 px-5 text-center font-semibold text-white hover:bg-emerald-700 transition"
                >
                  Assinar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Footer */}
       <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-slate-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
               <span className="text-slate-400 text-sm">Termos de Uso</span>
               <span className="text-slate-400 text-sm">Privacidade</span>
            </div>
            <p className="mt-8 text-base text-slate-400 md:mt-0 md:order-1">
              &copy; 2024 AutoSalon SaaS. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
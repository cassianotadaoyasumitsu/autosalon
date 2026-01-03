import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, DollarSign, MessageCircle, CheckCircle2, ArrowUpRight, Users, Filter } from 'lucide-react';

// Mock Data for specific professionals to simulate filtering
const PROFESSIONALS = [
  { id: 'all', name: 'Visão Geral (Equipe)' },
  { id: '1', name: 'Ana Souza' },
  { id: '2', name: 'Carlos Oliveira' },
  { id: '3', name: 'Mariana Lima' }
];

const generateData = (factor: number) => [
  { name: 'Seg', appointments: Math.floor(12 * factor), revenue: Math.floor(1200 * factor) },
  { name: 'Ter', appointments: Math.floor(19 * factor), revenue: Math.floor(2100 * factor) },
  { name: 'Qua', appointments: Math.floor(15 * factor), revenue: Math.floor(1800 * factor) },
  { name: 'Qui', appointments: Math.floor(22 * factor), revenue: Math.floor(2400 * factor) },
  { name: 'Sex', appointments: Math.floor(28 * factor), revenue: Math.floor(3200 * factor) },
  { name: 'Sab', appointments: Math.floor(35 * factor), revenue: Math.floor(4500 * factor) },
  { name: 'Dom', appointments: Math.floor(10 * factor), revenue: Math.floor(900 * factor) },
];

const Dashboard: React.FC = () => {
  const [selectedPro, setSelectedPro] = useState('all');

  // Logic to simulate different data based on selection
  const dashboardData = useMemo(() => {
    let factor = 1;
    let appointmentsTotal = 141;
    let revenueTotal = '14k';
    let conversionRate = '85%';
    
    switch (selectedPro) {
      case '1': // Ana (High ticket)
        factor = 0.4;
        appointmentsTotal = 42;
        revenueTotal = '6.8k';
        conversionRate = '92%';
        break;
      case '2': // Carlos (Volume)
        factor = 0.35;
        appointmentsTotal = 58;
        revenueTotal = '4.2k';
        conversionRate = '78%';
        break;
      case '3': // Mariana (Nails)
        factor = 0.25;
        appointmentsTotal = 41;
        revenueTotal = '3.0k';
        conversionRate = '88%';
        break;
      default: // All
        factor = 1;
        appointmentsTotal = 141;
        revenueTotal = '14k';
        conversionRate = '85%';
    }

    return {
      chartData: generateData(factor),
      metrics: {
        appointments: appointmentsTotal,
        revenue: revenueTotal,
        conversion: conversionRate
      }
    };
  }, [selectedPro]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-zinc-900">Dashboard</h2>
          <p className="text-stone-500 font-light mt-1">Acompanhe a performance em tempo real.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Professional Filter */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-4 w-4 text-zinc-500" />
            </div>
            <select
              value={selectedPro}
              onChange={(e) => setSelectedPro(e.target.value)}
              className="pl-10 pr-10 py-2.5 bg-white border border-stone-200 rounded-lg text-sm font-medium text-zinc-900 shadow-sm focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none appearance-none cursor-pointer hover:border-zinc-300 transition-colors min-w-[200px]"
              style={{ backgroundImage: 'none' }} // Remove default arrow to style custom one if needed, but keeping simple for now
            >
              {PROFESSIONALS.map((pro) => (
                <option key={pro.id} value={pro.id}>
                  {pro.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-3 w-3 text-stone-400" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-sm bg-zinc-900 text-white px-4 py-2.5 rounded-lg shadow-md">
             <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
             <span className="font-bold text-xs uppercase tracking-wider">Ao Vivo</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Agendamentos</p>
            <h3 className="text-4xl font-serif text-zinc-900 mt-2">{dashboardData.metrics.appointments}</h3>
            <span className="text-xs font-medium text-amber-600 flex items-center mt-3">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              Esta semana
            </span>
          </div>
          <div className="h-14 w-14 bg-stone-50 rounded-full flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Faturamento Est.</p>
            <h3 className="text-4xl font-serif text-zinc-900 mt-2">R$ {dashboardData.metrics.revenue}</h3>
            <span className="text-xs font-medium text-amber-600 flex items-center mt-3">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +8% vs mês anterior
            </span>
          </div>
          <div className="h-14 w-14 bg-stone-50 rounded-full flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-stone-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Conversão IA</p>
            <h3 className="text-4xl font-serif text-zinc-900 mt-2">{dashboardData.metrics.conversion}</h3>
            <span className="text-xs font-medium text-stone-400 mt-3 block">
              Agendamentos Automáticos
            </span>
          </div>
          <div className="h-14 w-14 bg-stone-50 rounded-full flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-serif text-zinc-900">Performance Financeira</h3>
             <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 border border-stone-200 px-2 py-1 rounded">Últimos 7 dias</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 11, fontFamily: 'Inter'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 11, fontFamily: 'Inter'}} tickFormatter={(val) => `R$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderRadius: '0px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#fbbf24' }}
                  labelStyle={{ color: '#a1a1aa' }}
                  formatter={(value: number) => [`R$ ${value}`, 'Receita']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#d97706" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-serif text-zinc-900">Volume de Clientes</h3>
             <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 border border-stone-200 px-2 py-1 rounded">Últimos 7 dias</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 11, fontFamily: 'Inter'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 11, fontFamily: 'Inter'}} />
                <Tooltip 
                   cursor={{fill: '#f5f5f4'}}
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e7e5e4' }}
                   formatter={(value: number) => [value, 'Clientes']}
                />
                <Bar dataKey="appointments" fill="#18181b" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions / Status */}
      <div className="bg-zinc-900 rounded-xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-start space-x-5 mb-6 md:mb-0">
            <div className="p-3 bg-white/5 rounded-full border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-serif text-xl">
                {selectedPro === 'all' ? 'Status Geral do Salão' : `Status: ${PROFESSIONALS.find(p => p.id === selectedPro)?.name}`}
              </h3>
              <p className="text-stone-400 font-light text-sm mt-1 leading-relaxed max-w-md">
                {selectedPro === 'all' 
                  ? 'Todos os sistemas operando com eficiência máxima. Agenda unificada sincronizada.'
                  : 'Sincronização individual ativa. Agenda do Google conectada e recebendo eventos.'}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
             <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition border border-white/10">
               Logs de {selectedPro === 'all' ? 'Sistema' : 'Usuário'}
             </button>
             <button className="px-6 py-3 bg-white text-zinc-900 hover:bg-stone-200 rounded-lg text-xs font-bold uppercase tracking-widest transition shadow-lg">
               Ver Agenda {selectedPro === 'all' ? 'Completa' : ''}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
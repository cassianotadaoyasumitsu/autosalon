import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, DollarSign, MessageCircle, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const data = [
  { name: 'Seg', appointments: 12, revenue: 1200 },
  { name: 'Ter', appointments: 19, revenue: 2100 },
  { name: 'Qua', appointments: 15, revenue: 1800 },
  { name: 'Qui', appointments: 22, revenue: 2400 },
  { name: 'Sex', appointments: 28, revenue: 3200 },
  { name: 'Sab', appointments: 35, revenue: 4500 },
  { name: 'Dom', appointments: 10, revenue: 900 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Visão Geral</h2>
        <div className="flex items-center space-x-2 text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-slate-600 font-medium">IA do WhatsApp Ativa</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Agendamentos Hoje</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">12</h3>
            <span className="text-xs font-medium text-emerald-600 flex items-center mt-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% que ontem
            </span>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Faturamento Estimado</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">R$ 14.3k</h3>
            <span className="text-xs font-medium text-emerald-600 flex items-center mt-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% esse mês
            </span>
          </div>
          <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Conversão IA</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">85%</h3>
            <span className="text-xs font-medium text-slate-400 mt-2 block">
              Dos contatos agendaram
            </span>
          </div>
          <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
            <MessageCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Faturamento Semanal</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `R$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Agendamentos por Dia</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="appointments" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions / Status */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-start space-x-4 mb-4 md:mb-0">
            <div className="p-3 bg-white/10 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Sistema Operando Normalmente</h3>
              <p className="text-slate-400 text-sm mt-1">
                WhatsApp conectado. Agenda do proprietário sincronizada.
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
             <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition">
               Ver Logs da IA
             </button>
             <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition shadow-lg shadow-emerald-900/20">
               Abrir Agenda
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
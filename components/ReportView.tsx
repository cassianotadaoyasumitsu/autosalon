import React, { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, DollarSign, MessageCircle, CheckCircle2 } from 'lucide-react';
import { ReportData } from '../services/reportService';

interface ReportViewProps {
  reportData: ReportData;
  onClose: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ reportData, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger print after component mounts and charts are rendered
    const timer = setTimeout(() => {
      window.print();
    }, 1000); // Increased delay to ensure charts are fully rendered

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          @page {
            margin: 1.5cm;
            size: A4 portrait;
          }
          
          body * {
            visibility: hidden;
          }
          
          .report-container,
          .report-container * {
            visibility: visible;
          }
          
          .report-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
          }
          
          .no-print {
            display: none !important;
          }
          
          .report-header,
          .report-footer {
            page-break-inside: avoid;
          }
          
          .report-section {
            page-break-inside: avoid;
            margin-bottom: 1.5cm;
          }
          
          .report-chart {
            page-break-inside: avoid;
            margin-bottom: 1cm;
          }
          
          /* Ensure charts are visible in print */
          svg {
            visibility: visible !important;
            display: block !important;
          }
        }
        
        @media screen {
          .report-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 2rem;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            min-height: 100vh;
          }
        }
      `}</style>

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 no-print">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-white text-zinc-900 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition"
        >
          Fechar
        </button>
      </div>

      <div ref={printRef} className="report-container bg-white">
        {/* Header */}
        <div className="report-header border-b border-stone-200 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-serif text-zinc-900 mb-2">Perfect Salon</h1>
              <p className="text-sm text-stone-500">Relatório de Performance</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-400 uppercase tracking-widest">Gerado em</p>
              <p className="text-sm font-medium text-zinc-900 mt-1">{formatDate(new Date())}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Período</p>
                <p className="text-lg font-serif text-zinc-900 mt-1">{reportData.period.label}</p>
              </div>
              {reportData.professionalName && (
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Profissional</p>
                  <p className="text-lg font-serif text-zinc-900 mt-1">{reportData.professionalName}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="report-section grid grid-cols-3 gap-4 mb-8">
          <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-zinc-900" />
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Agendamentos</p>
            </div>
            <h3 className="text-3xl font-serif text-zinc-900">{reportData.metrics.appointments}</h3>
          </div>

          <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-zinc-900" />
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Faturamento Est.</p>
            </div>
            <h3 className="text-3xl font-serif text-zinc-900">R$ {reportData.metrics.revenue}</h3>
          </div>

          <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-5 h-5 text-zinc-900" />
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Conversão IA</p>
            </div>
            <h3 className="text-3xl font-serif text-zinc-900">{reportData.metrics.conversion}</h3>
          </div>
        </div>

        {/* Charts */}
        <div className="report-section grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="report-chart">
            <h3 className="text-lg font-serif text-zinc-900 mb-4">Performance Financeira</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reportData.chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#78716c', fontSize: 10, fontFamily: 'Inter'}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#78716c', fontSize: 10, fontFamily: 'Inter'}} 
                    tickFormatter={(val) => `R$${val}`} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderRadius: '4px', border: 'none' }}
                    itemStyle={{ color: '#fbbf24' }}
                    labelStyle={{ color: '#a1a1aa' }}
                    formatter={(value: number) => [`R$ ${value}`, 'Receita']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#d97706" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="report-chart">
            <h3 className="text-lg font-serif text-zinc-900 mb-4">Volume de Clientes</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#78716c', fontSize: 10, fontFamily: 'Inter'}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#78716c', fontSize: 10, fontFamily: 'Inter'}} 
                  />
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

        {/* Status */}
        <div className="report-section bg-zinc-900 rounded-lg p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-full border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-serif text-xl mb-2">
                {reportData.professionalId === 'all' ? 'Status Geral do Salão' : `Status: ${reportData.professionalName}`}
              </h3>
              <p className="text-stone-400 font-light text-sm leading-relaxed">
                {reportData.status}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="report-footer mt-8 pt-6 border-t border-stone-200 text-center">
          <p className="text-xs text-stone-400">
            Relatório gerado automaticamente pelo sistema Perfect Salon
          </p>
          <p className="text-xs text-stone-400 mt-1">
            Período: {formatDate(reportData.period.startDate)} - {formatDate(reportData.period.endDate)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReportView;


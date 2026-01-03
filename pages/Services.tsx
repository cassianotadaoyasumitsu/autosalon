import React from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { Service, BusinessHours } from '../types';

const mockServices: Service[] = [
  { id: '1', name: 'Corte Masculino Premium', price: 80, durationMinutes: 45, professionalIds: ['2'] },
  { id: '2', name: 'Corte Feminino & Styling', price: 150, durationMinutes: 60, professionalIds: ['1'] },
  { id: '3', name: 'Manicure Spa', price: 60, durationMinutes: 45, professionalIds: ['3'] },
  { id: '4', name: 'Pedicure Spa', price: 70, durationMinutes: 45, professionalIds: ['3'] },
  { id: '5', name: 'Tratamento Capilar', price: 250, durationMinutes: 90, professionalIds: ['1'] },
];

const mockSchedule: BusinessHours = {
  open: '09:00',
  close: '19:00',
  lunchStart: '12:00',
  lunchEnd: '13:00',
  days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
};

const Services: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Services Section */}
      <section>
        <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-6">
          <div>
            <h2 className="text-3xl font-serif text-zinc-900">Menu de Serviços</h2>
            <p className="text-stone-500 font-light mt-1">Catálogo de experiências disponíveis para agendamento.</p>
          </div>
          <button className="flex items-center bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Item
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-100">
              <thead className="bg-stone-50">
                <tr>
                  <th scope="col" className="px-8 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">Serviço</th>
                  <th scope="col" className="px-8 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">Duração</th>
                  <th scope="col" className="px-8 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">Investimento</th>
                  <th scope="col" className="px-8 py-5 text-right text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em]">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-100">
                {mockServices.map((service) => (
                  <tr key={service.id} className="hover:bg-stone-50 transition-colors group">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-sm font-serif text-zinc-900">{service.name}</div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center text-xs font-medium text-stone-500">
                        <Clock className="w-3 h-3 mr-2" />
                        {service.durationMinutes} min
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-sm font-medium text-amber-700">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price)}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-stone-300 hover:text-red-800 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section>
         <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-serif text-zinc-900">Horário de Funcionamento</h2>
            <p className="text-stone-500 font-light">Disponibilidade geral do estabelecimento.</p>
          </div>
          <button className="text-zinc-900 text-xs font-bold uppercase tracking-widest hover:text-amber-600 border-b border-zinc-200 pb-1">
            Salvar Alterações
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Dias de Operação</label>
              <div className="flex flex-wrap gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <button
                    key={day}
                    className={`px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                      mockSchedule.days.includes(day)
                        ? 'bg-zinc-900 text-white shadow-md'
                        : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Abertura</label>
                   <input 
                      type="time" 
                      defaultValue={mockSchedule.open}
                      className="block w-full rounded-lg border-stone-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900 bg-stone-50 text-stone-800 p-3"
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Fechamento</label>
                   <input 
                      type="time" 
                      defaultValue={mockSchedule.close}
                      className="block w-full rounded-lg border-stone-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900 bg-stone-50 text-stone-800 p-3"
                   />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Início Pausa</label>
                   <input 
                      type="time" 
                      defaultValue={mockSchedule.lunchStart}
                      className="block w-full rounded-lg border-stone-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900 bg-stone-50 text-stone-800 p-3"
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Fim Pausa</label>
                   <input 
                      type="time" 
                      defaultValue={mockSchedule.lunchEnd}
                      className="block w-full rounded-lg border-stone-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900 bg-stone-50 text-stone-800 p-3"
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
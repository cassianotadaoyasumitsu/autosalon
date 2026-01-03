import React from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { Service, BusinessHours } from '../types';

const mockServices: Service[] = [
  { id: '1', name: 'Corte Masculino', price: 50, durationMinutes: 30, professionalIds: ['2'] },
  { id: '2', name: 'Corte Feminino', price: 90, durationMinutes: 60, professionalIds: ['1'] },
  { id: '3', name: 'Manicure', price: 40, durationMinutes: 45, professionalIds: ['3'] },
  { id: '4', name: 'Pedicure', price: 45, durationMinutes: 45, professionalIds: ['3'] },
  { id: '5', name: 'Hidratação', price: 120, durationMinutes: 45, professionalIds: ['1'] },
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
    <div className="space-y-8 animate-fade-in">
      
      {/* Services Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Serviços</h2>
            <p className="text-slate-500">Configure os serviços que a IA pode oferecer e agendar.</p>
          </div>
          <button className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition shadow-sm">
            <Plus className="w-5 h-5 mr-2" />
            Novo Serviço
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Serviço</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Duração</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Preço</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {mockServices.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{service.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-slate-500">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {service.durationMinutes} min
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-emerald-600">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
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
            <h2 className="text-2xl font-bold text-slate-800">Grade de Horários</h2>
            <p className="text-slate-500">Defina o funcionamento geral do estabelecimento.</p>
          </div>
          <button className="text-emerald-600 font-medium hover:text-emerald-700">
            Salvar Alterações
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Dias de Funcionamento</label>
              <div className="flex flex-wrap gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <button
                    key={day}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      mockSchedule.days.includes(day)
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Abertura</label>
                   <input 
                      type="time" 
                      defaultValue={mockSchedule.open}
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-slate-50 border p-2.5"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Fechamento</label>
                   <input 
                      type="time" 
                      defaultValue={mockSchedule.close}
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-slate-50 border p-2.5"
                   />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Início Almoço</label>
                   <input 
                      type="time" 
                      defaultValue={mockSchedule.lunchStart}
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-slate-50 border p-2.5"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Fim Almoço</label>
                   <input 
                      type="time" 
                      defaultValue={mockSchedule.lunchEnd}
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-slate-50 border p-2.5"
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
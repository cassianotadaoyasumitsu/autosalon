import { useState, useId } from 'react';
import { Clock, Plus, Trash2, X, Edit } from 'lucide-react';
import type { Service, DaySchedule } from '../types';

const initialServices: Service[] = [
  { id: '1', name: 'Corte Masculino Premium', description: 'Corte moderno com técnicas profissionais e acabamento impecável.', price: 80, durationMinutes: 45, professionalIds: ['2'] },
  { id: '2', name: 'Corte Feminino & Styling', description: 'Corte personalizado seguido de escova e finalização profissional.', price: 150, durationMinutes: 60, professionalIds: ['1'] },
  { id: '3', name: 'Manicure Spa', description: 'Cuidado completo das unhas com hidratação e esmaltação.', price: 60, durationMinutes: 45, professionalIds: ['3'] },
  { id: '4', name: 'Pedicure Spa', description: 'Tratamento completo dos pés com relaxamento e hidratação.', price: 70, durationMinutes: 45, professionalIds: ['3'] },
  { id: '5', name: 'Tratamento Capilar', description: 'Tratamento profundo para recuperação e hidratação dos fios.', price: 250, durationMinutes: 90, professionalIds: ['1'] },
];

const mockProfessionals = [
  { id: '1', name: 'Ana Souza' },
  { id: '2', name: 'Carlos Oliveira' },
  { id: '3', name: 'Mariana Lima' },
];

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const initialDaySchedules: DaySchedule[] = daysOfWeek.map((day) => ({
  day,
  enabled: day !== 'Dom',
  open: '09:00',
  close: '19:00',
  lunchStart: '12:00',
  lunchEnd: '13:00',
}));

const Services: React.FC = () => {
  const serviceNameId = useId();
  const serviceDescriptionId = useId();
  const servicePriceId = useId();
  const serviceDurationId = useId();

  const [services, setServices] = useState<Service[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServicePrice, setNewServicePrice] = useState<number>(0);
  const [newServiceDuration, setNewServiceDuration] = useState<number>(30);
  const [selectedProfessionalIds, setSelectedProfessionalIds] = useState<string[]>([]);
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>(initialDaySchedules);

  const resetForm = () => {
    setNewServiceName('');
    setNewServiceDescription('');
    setNewServicePrice(0);
    setNewServiceDuration(30);
    setSelectedProfessionalIds([]);
    setEditingServiceId(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setNewServiceName(service.name);
    setNewServiceDescription(service.description || '');
    setNewServicePrice(service.price);
    setNewServiceDuration(service.durationMinutes);
    setSelectedProfessionalIds(service.professionalIds);
    setIsModalOpen(true);
  };

  const handleSaveService = () => {
    if (!newServiceName || newServicePrice <= 0 || newServiceDuration <= 0) {
      return;
    }

    if (editingServiceId) {
      // Editar serviço existente
      setServices(services.map(service =>
        service.id === editingServiceId
          ? {
              ...service,
              name: newServiceName,
              description: newServiceDescription || undefined,
              price: newServicePrice,
              durationMinutes: newServiceDuration,
              professionalIds: selectedProfessionalIds,
            }
          : service
      ));
    } else {
      // Adicionar novo serviço
      const newService: Service = {
        id: Date.now().toString(),
        name: newServiceName,
        description: newServiceDescription || undefined,
        price: newServicePrice,
        durationMinutes: newServiceDuration,
        professionalIds: selectedProfessionalIds,
      };
      setServices([...services, newService]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      setServices(services.filter(service => service.id !== serviceId));
    }
  };

  const handleToggleProfessional = (professionalId: string) => {
    setSelectedProfessionalIds(prev =>
      prev.includes(professionalId)
        ? prev.filter(id => id !== professionalId)
        : [...prev, professionalId]
    );
  };

  const handleToggleDay = (day: string) => {
    setDaySchedules(prev =>
      prev.map(schedule =>
        schedule.day === day
          ? { ...schedule, enabled: !schedule.enabled }
          : schedule
      )
    );
  };

  const handleUpdateDaySchedule = (day: string, field: keyof DaySchedule, value: string | boolean) => {
    setDaySchedules(prev =>
      prev.map(schedule =>
        schedule.day === day
          ? { ...schedule, [field]: value }
          : schedule
      )
    );
  };

  const handleSaveSchedule = () => {
    // Aqui você pode salvar os horários no backend
    console.log('Horários salvos:', daySchedules);
    // Pode adicionar uma notificação de sucesso aqui
  };

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Services Section */}
      <section>
        <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-6">
          <div>
            <h2 className="text-3xl font-serif text-zinc-900">Menu de Serviços</h2>
            <p className="text-stone-500 font-light mt-1">Catálogo de experiências disponíveis para agendamento.</p>
          </div>
          <button 
            type="button"
            onClick={handleOpenModal}
            className="flex items-center bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar
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
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-stone-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="text-sm font-serif text-zinc-900">{service.name}</div>
                      {service.description && (
                        <div className="text-xs text-stone-500 mt-1 max-w-md">{service.description}</div>
                      )}
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
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          type="button"
                          onClick={() => handleEditService(service)}
                          className="text-stone-300 hover:text-zinc-900 transition-colors"
                          title="Editar serviço"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleDeleteService(service.id)}
                          className="text-stone-300 hover:text-red-800 transition-colors"
                          title="Excluir serviço"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
            <p className="text-stone-500 font-light">Configure horários individuais para cada dia da semana.</p>
          </div>
          <button 
            type="button" 
            onClick={handleSaveSchedule}
            className="text-zinc-900 text-xs font-bold uppercase tracking-widest hover:text-amber-600 border-b border-zinc-200 pb-1"
          >
            Salvar Alterações
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
          <div className="space-y-6">
            {daySchedules.map((schedule) => {
              const dayKey = schedule.day.toLowerCase();
              const openId = `open-${dayKey}`;
              const closeId = `close-${dayKey}`;
              const lunchStartId = `lunch-start-${dayKey}`;
              const lunchEndId = `lunch-end-${dayKey}`;

              return (
                <div 
                  key={schedule.day} 
                  className={`p-6 rounded-lg border-2 transition-all ${
                    schedule.enabled 
                      ? 'border-zinc-900 bg-stone-50' 
                      : 'border-stone-200 bg-stone-50/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={() => handleToggleDay(schedule.day)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                        schedule.enabled
                          ? 'bg-zinc-900 text-white shadow-md hover:bg-zinc-800'
                          : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
                      }`}
                    >
                      {schedule.day}
                    </button>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={() => handleToggleDay(schedule.day)}
                        className="rounded border-stone-300 text-zinc-900 focus:ring-zinc-900"
                      />
                      <span className="ml-2 text-xs font-bold uppercase tracking-widest text-stone-500">
                        Ativo
                      </span>
                    </label>
                  </div>

                  {schedule.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={openId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                            Abertura
                          </label>
                          <input
                            id={openId}
                            type="time"
                            value={schedule.open}
                            onChange={(e) => handleUpdateDaySchedule(schedule.day, 'open', e.target.value)}
                            className="block w-full rounded-lg border-stone-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900 bg-white text-stone-800 p-3"
                          />
                        </div>
                        <div>
                          <label htmlFor={closeId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                            Fechamento
                          </label>
                          <input
                            id={closeId}
                            type="time"
                            value={schedule.close}
                            onChange={(e) => handleUpdateDaySchedule(schedule.day, 'close', e.target.value)}
                            className="block w-full rounded-lg border-stone-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900 bg-white text-stone-800 p-3"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={lunchStartId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                            Início Pausa
                          </label>
                          <input
                            id={lunchStartId}
                            type="time"
                            value={schedule.lunchStart}
                            onChange={(e) => handleUpdateDaySchedule(schedule.day, 'lunchStart', e.target.value)}
                            className="block w-full rounded-lg border-stone-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900 bg-white text-stone-800 p-3"
                          />
                        </div>
                        <div>
                          <label htmlFor={lunchEndId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                            Fim Pausa
                          </label>
                          <input
                            id={lunchEndId}
                            type="time"
                            value={schedule.lunchEnd}
                            onChange={(e) => handleUpdateDaySchedule(schedule.day, 'lunchEnd', e.target.value)}
                            className="block w-full rounded-lg border-stone-200 shadow-sm focus:border-zinc-900 focus:ring-zinc-900 bg-white text-stone-800 p-3"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in border border-stone-200">
            <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h3 className="font-serif text-xl text-zinc-900">
                {editingServiceId ? 'Editar Serviço' : 'Adicionar Serviço'}
              </h3>
              <button 
                type="button" 
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }} 
                className="text-stone-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-5">
              <div>
                <label htmlFor={serviceNameId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Nome do Serviço</label>
                <input 
                  id={serviceNameId}
                  type="text" 
                  className="w-full rounded-lg border-stone-200 p-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Ex: Corte Masculino Premium"
                />
              </div>
              <div>
                <label htmlFor={serviceDescriptionId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Descrição</label>
                <textarea 
                  id={serviceDescriptionId}
                  rows={3}
                  className="w-full rounded-lg border-stone-200 p-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900 resize-none"
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  placeholder="Descreva o serviço oferecido..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={servicePriceId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Preço (R$)</label>
                  <input 
                    id={servicePriceId}
                    type="number" 
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border-stone-200 p-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900"
                    value={newServicePrice || ''}
                    onChange={(e) => setNewServicePrice(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label htmlFor={serviceDurationId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Duração (min)</label>
                  <input 
                    id={serviceDurationId}
                    type="number" 
                    min="1"
                    className="w-full rounded-lg border-stone-200 p-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900"
                    value={newServiceDuration || ''}
                    onChange={(e) => setNewServiceDuration(parseInt(e.target.value) || 30)}
                    placeholder="30"
                  />
                </div>
              </div>
              <div>
                <div className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Profissionais Disponíveis</div>
                <div className="space-y-2 mt-2">
                  {mockProfessionals.map((prof) => (
                    <label key={prof.id} className="flex items-center p-3 rounded-lg border border-stone-200 hover:bg-stone-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedProfessionalIds.includes(prof.id)}
                        onChange={() => handleToggleProfessional(prof.id)}
                        className="rounded border-stone-300 text-zinc-900 focus:ring-zinc-900"
                      />
                      <span className="ml-3 text-sm text-stone-800">{prof.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="px-6 py-3 text-stone-500 text-xs font-bold uppercase tracking-widest hover:text-zinc-900 transition"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleSaveService}
                disabled={!newServiceName || newServicePrice <= 0 || newServiceDuration <= 0}
                className="px-6 py-3 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition disabled:opacity-50"
              >
                {editingServiceId ? 'Salvar Alterações' : 'Adicionar Serviço'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
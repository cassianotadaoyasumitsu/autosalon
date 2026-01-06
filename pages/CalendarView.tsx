import { useState, useEffect, useCallback, useId } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import type { View, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Plus, Trash2, X, Filter } from 'lucide-react';
import { calendarApi } from '../services/calendarApi';
import type { CalendarEvent } from '../services/calendarApi';
import type { Professional } from '../types';

const localizer = momentLocalizer(moment);

// Mock de profissionais (em produção, viria de um contexto ou API)
const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Ana Souza',
    specialty: 'Colorista Senior',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    email: 'ana@salao.com',
    calendarConnected: true,
    googleCalendarId: 'ana.work@gmail.com',
    status: 'ACTIVE',
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    specialty: 'Master Barber',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    email: 'carlos@salao.com',
    calendarConnected: false,
    status: 'PENDING_SETUP',
    inviteToken: 'abc123xyz',
    rating: 4.8,
    reviewCount: 42
  },
  {
    id: '3',
    name: 'Mariana Lima',
    specialty: 'Nail Artist',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    email: 'mari@salao.com',
    calendarConnected: true,
    googleCalendarId: 'mari.nails@gmail.com',
    status: 'ACTIVE',
    rating: 5.0,
    reviewCount: 89
  }
];

// Tradução para português
const messages = {
  allDay: 'Dia inteiro',
  previous: 'Anterior',
  next: 'Próximo',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há eventos neste período.',
  showMore: (total: number) => `+ Ver mais ${total}`,
};

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>('all');
  const professionalFilterId = useId();
  const titleInputId = useId();
  const clientNameInputId = useId();
  const clientPhoneInputId = useId();
  const startDateTimeId = useId();
  const endDateTimeId = useId();
  const descriptionTextareaId = useId();

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      // Calcular range de datas baseado na view atual
      let startDate: Date | undefined;
      let endDate: Date | undefined;

      if (currentView === 'month') {
        startDate = moment(currentDate).startOf('month').toDate();
        endDate = moment(currentDate).endOf('month').toDate();
      } else if (currentView === 'week') {
        startDate = moment(currentDate).startOf('week').toDate();
        endDate = moment(currentDate).endOf('week').toDate();
      } else if (currentView === 'day') {
        startDate = moment(currentDate).startOf('day').toDate();
        endDate = moment(currentDate).endOf('day').toDate();
      }

      const loadedEvents = await calendarApi.getEvents(startDate, endDate);
      setEvents(loadedEvents);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentDate, currentView]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    // Filtrar eventos baseado no profissional selecionado
    if (selectedProfessionalId === 'all') {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.professionalId === selectedProfessionalId));
    }
  }, [events, selectedProfessionalId]);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    // Criar novo evento ao clicar em um slot vazio
    setSelectedEvent({
      id: '',
      title: '',
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setIsModalOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    // Editar evento existente
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleSaveEvent = async () => {
    if (!selectedEvent || !selectedEvent.title.trim()) {
      alert('Por favor, preencha o título do evento');
      return;
    }

    try {
      if (selectedEvent.id && selectedEvent.id !== '') {
        // Atualizar evento existente
        await calendarApi.updateEvent(selectedEvent.id, selectedEvent);
      } else {
        // Criar novo evento
        await calendarApi.createEvent({
          title: selectedEvent.title,
          start: selectedEvent.start,
          end: selectedEvent.end,
          description: selectedEvent.description,
          clientName: selectedEvent.clientName,
          clientPhone: selectedEvent.clientPhone,
          serviceName: selectedEvent.serviceName,
          professionalId: selectedEvent.professionalId,
        });
      }

      setIsModalOpen(false);
      setSelectedEvent(null);
      loadEvents(); // Recarregar eventos
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      alert('Erro ao salvar evento. Tente novamente.');
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent?.id) return;

    if (!confirm('Tem certeza que deseja deletar este agendamento?')) {
      return;
    }

    try {
      await calendarApi.deleteEvent(selectedEvent.id);
      setIsModalOpen(false);
      setSelectedEvent(null);
      loadEvents();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      alert('Erro ao deletar evento. Tente novamente.');
    }
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return (
    <div className="h-full bg-stone-50 flex flex-col">
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-serif text-zinc-900">Calendário de Agendamentos</h2>
              <p className="text-sm text-stone-500 mt-1">Gerencie todos os seus agendamentos em um só lugar</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                setSelectedEvent({
                  id: '',
                  title: '',
                  start: now,
                  end: new Date(now.getTime() + 60 * 60 * 1000), // +1 hora
                });
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
            >
              <Plus className="w-4 h-4" />
              Novo
            </button>
          </div>
          
          {/* Filtro de Profissional */}
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-stone-500" />
            <label htmlFor={professionalFilterId} className="text-xs font-bold uppercase tracking-widest text-stone-500">
              Filtrar por:
            </label>
            <select
              id={professionalFilterId}
              value={selectedProfessionalId}
              onChange={(e) => setSelectedProfessionalId(e.target.value)}
              className="px-4 py-2 rounded-lg border-stone-200 bg-white text-stone-800 text-sm font-medium focus:border-zinc-900 focus:ring-zinc-900 focus:outline-none cursor-pointer"
            >
              <option value="all">Todos os Profissionais</option>
              {mockProfessionals.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.name} - {prof.specialty}
                </option>
              ))}
            </select>
            {selectedProfessionalId !== 'all' && (
              <span className="text-xs text-stone-500">
                ({filteredEvents.length} {filteredEvents.length === 1 ? 'agendamento' : 'agendamentos'})
              </span>
            )}
          </div>
        </div>

        {/* Calendar */}
        <div className="flex-1 p-6 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-stone-500">Carregando eventos...</div>
            </div>
          ) : (
            <Calendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%', minHeight: '500px' }}
              view={currentView}
              onView={setCurrentView}
              date={currentDate}
              onNavigate={handleNavigate}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              selectable
              culture="pt-BR"
              messages={messages}
              eventPropGetter={(event) => {
                // Cores diferentes por profissional
                const professional = mockProfessionals.find(p => p.id === event.professionalId);
                const colors = {
                  '1': { bg: '#18181b', border: '#f59e0b' }, // Ana - amber
                  '2': { bg: '#1e293b', border: '#3b82f6' }, // Carlos - blue
                  '3': { bg: '#1e293b', border: '#ec4899' }, // Mariana - pink
                  default: { bg: '#18181b', border: '#fbbf24' } // default - amber
                };
                const color = professional ? colors[professional.id as keyof typeof colors] || colors.default : colors.default;
                
                return {
                  style: {
                    backgroundColor: color.bg,
                    borderColor: color.border,
                    color: 'white',
                    borderLeftWidth: '4px',
                  },
                };
              }}
            />
          )}
        </div>
      </div>

      {/* Modal de Edição/Criação */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-zinc-900">
                {selectedEvent.id ? 'Editar Agendamento' : 'Novo Agendamento'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedEvent(null);
                }}
                className="text-stone-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor={titleInputId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Título / Cliente
                </label>
                <input
                  id={titleInputId}
                  type="text"
                  value={selectedEvent.title}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, title: e.target.value })
                  }
                  className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900"
                  placeholder="Ex: Corte - João Silva"
                />
              </div>

              <div>
                <label htmlFor={clientNameInputId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Nome do Cliente
                </label>
                <input
                  id={clientNameInputId}
                  type="text"
                  value={selectedEvent.clientName || ''}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, clientName: e.target.value })
                  }
                  className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900"
                  placeholder="Nome completo do cliente"
                />
              </div>

              <div>
                <label htmlFor={clientPhoneInputId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Telefone
                </label>
                <input
                  id={clientPhoneInputId}
                  type="tel"
                  value={selectedEvent.clientPhone || ''}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, clientPhone: e.target.value })
                  }
                  className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900"
                  placeholder="+55 11 99999-9999"
                />
              </div>

              <div>
                <label htmlFor={startDateTimeId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Data/Hora Início
                </label>
                <input
                  id={startDateTimeId}
                  type="datetime-local"
                  value={moment(selectedEvent.start).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      start: new Date(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900"
                />
              </div>

              <div>
                <label htmlFor={endDateTimeId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Data/Hora Fim
                </label>
                <input
                  id={endDateTimeId}
                  type="datetime-local"
                  value={moment(selectedEvent.end).format('YYYY-MM-DDTHH:mm')}
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      end: new Date(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900"
                />
              </div>

              <div>
                <label htmlFor={descriptionTextareaId} className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Descrição / Observações
                </label>
                <textarea
                  id={descriptionTextareaId}
                  value={selectedEvent.description || ''}
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900"
                  placeholder="Observações adicionais sobre o agendamento"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={handleSaveEvent}
                  className="flex-1 bg-zinc-900 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
                >
                  Salvar
                </button>
                {selectedEvent.id && (
                  <button
                    type="button"
                    onClick={handleDeleteEvent}
                    className="px-6 py-3 text-red-600 border border-red-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-50 transition flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedEvent(null);
                  }}
                  className="px-6 py-3 text-stone-600 border border-stone-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;


import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, View, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Plus, Edit, Trash2, X, User, Phone, Clock } from 'lucide-react';
import { calendarApi, CalendarEvent } from '../services/calendarApi';

const localizer = momentLocalizer(moment);

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
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEvents();
  }, [currentDate, currentView]);

  const loadEvents = async () => {
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
  };

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
        <div className="p-6 border-b border-stone-200 flex justify-between items-center flex-shrink-0">
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

        {/* Calendar */}
        <div className="flex-1 p-6 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-stone-500">Carregando eventos...</div>
            </div>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
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
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: '#18181b', // zinc-900
                  borderColor: '#fbbf24', // amber-400
                  color: 'white',
                },
              })}
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
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Título / Cliente
                </label>
                <input
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
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Nome do Cliente
                </label>
                <input
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
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Telefone
                </label>
                <input
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
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Data/Hora Início
                </label>
                <input
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
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Data/Hora Fim
                </label>
                <input
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
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                  Descrição / Observações
                </label>
                <textarea
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


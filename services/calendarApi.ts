// Mock API Service for Google Calendar
// TODO: Replace with real API calls when backend is ready
// Example: const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  clientName?: string;
  clientPhone?: string;
  serviceName?: string;
  professionalId?: string;
  googleEventId?: string; // ID do evento no Google Calendar
}

// Mock data storage (simula banco de dados)
let mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Corte Masculino - João Silva',
    start: new Date(2025, 0, 15, 10, 0), // 15 Jan 2025, 10:00
    end: new Date(2025, 0, 15, 10, 45),
    description: 'Corte masculino premium',
    clientName: 'João Silva',
    clientPhone: '+5511999999999',
    serviceName: 'Corte Masculino Premium',
    professionalId: '2',
    googleEventId: 'mock_google_event_1',
  },
  {
    id: '2',
    title: 'Manicure - Maria Santos',
    start: new Date(2025, 0, 15, 14, 0),
    end: new Date(2025, 0, 15, 14, 45),
    description: 'Manicure spa',
    clientName: 'Maria Santos',
    clientPhone: '+5511888888888',
    serviceName: 'Manicure Spa',
    professionalId: '3',
    googleEventId: 'mock_google_event_2',
  },
  {
    id: '3',
    title: 'Corte Feminino - Ana Costa',
    start: new Date(2025, 0, 16, 9, 0),
    end: new Date(2025, 0, 16, 10, 0),
    description: 'Corte feminino e styling',
    clientName: 'Ana Costa',
    clientPhone: '+5511777777777',
    serviceName: 'Corte Feminino & Styling',
    professionalId: '1',
    googleEventId: 'mock_google_event_3',
  },
];

// Simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const calendarApi = {
  // Buscar eventos do calendário
  async getEvents(startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    await delay(300); // Simular chamada de API
    
    let filteredEvents = [...mockEvents];
    
    if (startDate) {
      filteredEvents = filteredEvents.filter(event => event.start >= startDate);
    }
    
    if (endDate) {
      filteredEvents = filteredEvents.filter(event => event.end <= endDate);
    }
    
    return filteredEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
  },

  // Criar novo evento
  async createEvent(eventData: Omit<CalendarEvent, 'id' | 'googleEventId'>): Promise<CalendarEvent> {
    await delay(500);
    
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
      googleEventId: `mock_google_event_${Date.now()}`,
    };
    
    mockEvents.push(newEvent);
    return newEvent;
  },

  // Atualizar evento existente
  async updateEvent(eventId: string, eventData: Partial<CalendarEvent>): Promise<CalendarEvent> {
    await delay(500);
    
    const index = mockEvents.findIndex(e => e.id === eventId);
    if (index === -1) {
      throw new Error('Evento não encontrado');
    }
    
    mockEvents[index] = { ...mockEvents[index], ...eventData };
    return mockEvents[index];
  },

  // Deletar evento
  async deleteEvent(eventId: string): Promise<void> {
    await delay(300);
    
    const index = mockEvents.findIndex(e => e.id === eventId);
    if (index === -1) {
      throw new Error('Evento não encontrado');
    }
    
    mockEvents.splice(index, 1);
  },

  // Verificar se Google Calendar está conectado
  async isConnected(): Promise<boolean> {
    await delay(200);
    // Verificar no localStorage se há conexão ativa
    return localStorage.getItem('ps_calendar_connected') === 'true';
  },

  // Conectar Google Calendar (mock)
  async connect(): Promise<void> {
    await delay(1000);
    localStorage.setItem('ps_calendar_connected', 'true');
    localStorage.setItem('ps_calendar_email', 'salaoprincipal@gmail.com');
  },

  // Desconectar Google Calendar
  async disconnect(): Promise<void> {
    await delay(300);
    localStorage.removeItem('ps_calendar_connected');
    localStorage.removeItem('ps_calendar_email');
  },

  // Obter email do calendário conectado
  getConnectedEmail(): string | null {
    return localStorage.getItem('ps_calendar_email');
  },
};

// TODO: Quando backend estiver pronto, substituir por:
/*
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const calendarApi = {
  async getEvents(startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    const params = new URLSearchParams();
    if (startDate) params.append('start', startDate.toISOString());
    if (endDate) params.append('end', endDate.toISOString());
    
    const response = await fetch(`${API_BASE_URL}/calendar/events?${params}`);
    if (!response.ok) throw new Error('Erro ao buscar eventos');
    return response.json();
  },

  async createEvent(eventData: Omit<CalendarEvent, 'id' | 'googleEventId'>): Promise<CalendarEvent> {
    const response = await fetch(`${API_BASE_URL}/calendar/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Erro ao criar evento');
    return response.json();
  },

  async updateEvent(eventId: string, eventData: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const response = await fetch(`${API_BASE_URL}/calendar/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error('Erro ao atualizar evento');
    return response.json();
  },

  async deleteEvent(eventId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/calendar/events/${eventId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar evento');
  },

  async isConnected(): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/calendar/status`);
    const data = await response.json();
    return data.connected;
  },

  async connect(): Promise<void> {
    // Redirecionar para OAuth do Google
    window.location.href = `${API_BASE_URL}/auth/google/calendar`;
  },

  async disconnect(): Promise<void> {
    await fetch(`${API_BASE_URL}/calendar/disconnect`, { method: 'POST' });
  },
};
*/


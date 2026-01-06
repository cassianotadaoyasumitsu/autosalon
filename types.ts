export interface Professional {
  id: string;
  name: string;
  specialty: string;
  photoUrl: string;
  email: string;
  // Integration fields
  inviteToken?: string;
  googleCalendarId?: string;
  googleRefreshToken?: string; // In a real app, never expose this to frontend, but we track status here
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING_SETUP';
  
  calendarConnected: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface SalonConfig {
  id: string;
  name: string;
  evolutionInstanceName: string;
  evolutionApiKey: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  durationMinutes: number;
  professionalIds: string[];
}

export interface Metric {
  label: string;
  value: string | number;
  trend?: number; // percentage
  trendUp?: boolean;
}

export enum ConnectionStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  PENDING = 'PENDING',
}

export interface DaySchedule {
  day: string;
  enabled: boolean;
  open: string;
  close: string;
  lunchStart: string;
  lunchEnd: string;
}

export interface BusinessHours {
  open: string;
  close: string;
  lunchStart: string;
  lunchEnd: string;
  days: string[];
  daySchedules?: DaySchedule[];
}

export interface Review {
  id: string;
  clientName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  professionalId: string;
  serviceName: string;
}

export interface NotificationLog {
  id: string;
  type: 'CLIENT_REMINDER' | 'CLIENT_CONFIRMATION' | 'PROFESSIONAL_ALERT' | 'SYSTEM';
  title: string;
  message: string;
  recipient: string;
  sentAt: string;
  status: 'SENT' | 'FAILED' | 'PENDING';
}
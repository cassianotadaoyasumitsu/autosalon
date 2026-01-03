// Report Service - Mock implementation for generating report data
// TODO: Replace with real API calls when backend is ready

export interface ReportPeriod {
  type: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';
  startDate: Date;
  endDate: Date;
  label: string; // Ex: "Janeiro 2025", "Q1 2025", "2025"
}

export interface ReportMetrics {
  appointments: number;
  revenue: string;
  conversion: string;
}

export interface ReportChartData {
  name: string;
  appointments: number;
  revenue: number;
}

export interface ReportData {
  period: ReportPeriod;
  professionalId?: string;
  professionalName?: string;
  metrics: ReportMetrics;
  chartData: ReportChartData[];
  status: string;
}

// Mock data factors for different professionals
const PROFESSIONAL_FACTORS: Record<string, { factor: number; appointments: number; revenue: string; conversion: string; name?: string }> = {
  'all': { factor: 1, appointments: 141, revenue: '14k', conversion: '85%' },
  '1': { factor: 0.4, appointments: 42, revenue: '6.8k', conversion: '92%', name: 'Ana Souza' },
  '2': { factor: 0.35, appointments: 58, revenue: '4.2k', conversion: '78%', name: 'Carlos Oliveira' },
  '3': { factor: 0.25, appointments: 41, revenue: '3.0k', conversion: '88%', name: 'Mariana Lima' },
};

// Base weekly data template
const generateWeeklyData = (factor: number): ReportChartData[] => [
  { name: 'Seg', appointments: Math.floor(12 * factor), revenue: Math.floor(1200 * factor) },
  { name: 'Ter', appointments: Math.floor(19 * factor), revenue: Math.floor(2100 * factor) },
  { name: 'Qua', appointments: Math.floor(15 * factor), revenue: Math.floor(1800 * factor) },
  { name: 'Qui', appointments: Math.floor(22 * factor), revenue: Math.floor(2400 * factor) },
  { name: 'Sex', appointments: Math.floor(28 * factor), revenue: Math.floor(3200 * factor) },
  { name: 'Sab', appointments: Math.floor(35 * factor), revenue: Math.floor(4500 * factor) },
  { name: 'Dom', appointments: Math.floor(10 * factor), revenue: Math.floor(900 * factor) },
];

// Helper to get professional data
const getProfessionalData = (professionalId: string = 'all') => {
  return PROFESSIONAL_FACTORS[professionalId] || PROFESSIONAL_FACTORS['all'];
};

// Helper to format date ranges
const formatDateRange = (startDate: Date, endDate: Date, type: ReportPeriod['type']): string => {
  const start = startDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  const end = endDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  
  switch (type) {
    case 'weekly':
      return `${start} - ${end}`;
    case 'monthly':
      return startDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    case 'quarterly':
      const quarter = Math.floor(startDate.getMonth() / 3) + 1;
      return `Q${quarter} ${startDate.getFullYear()}`;
    case 'semiannual':
      const half = startDate.getMonth() < 6 ? 1 : 2;
      return `S${half} ${startDate.getFullYear()}`;
    case 'annual':
      return startDate.getFullYear().toString();
    default:
      return `${start} - ${end}`;
  }
};

// Calculate period dates
const calculatePeriodDates = (type: ReportPeriod['type'], referenceDate: Date = new Date()): { startDate: Date; endDate: Date } => {
  const now = new Date(referenceDate);
  let startDate: Date;
  let endDate: Date;

  switch (type) {
    case 'weekly':
      // Last 7 days
      endDate = new Date(now);
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 6);
      break;

    case 'monthly':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;

    case 'quarterly':
      const quarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
      endDate = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
      break;

    case 'semiannual':
      const half = now.getMonth() < 6 ? 0 : 6;
      startDate = new Date(now.getFullYear(), half, 1);
      endDate = new Date(now.getFullYear(), half + 6, 0);
      break;

    case 'annual':
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31);
      break;

    default:
      startDate = new Date(now);
      endDate = new Date(now);
  }

  return { startDate, endDate };
};

// Generate chart data for different periods
const generateChartDataForPeriod = (
  type: ReportPeriod['type'],
  factor: number,
  startDate: Date,
  endDate: Date
): ReportChartData[] => {
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  switch (type) {
    case 'weekly':
      return generateWeeklyData(factor);

    case 'monthly':
      // Generate data for ~4 weeks (monthly view)
      const weeksInMonth = Math.ceil(daysDiff / 7);
      const weeklyData = generateWeeklyData(factor);
      const monthlyData: ReportChartData[] = [];
      
      for (let week = 0; week < weeksInMonth; week++) {
        weeklyData.forEach((day, index) => {
          monthlyData.push({
            name: `Sem ${week + 1} - ${day.name}`,
            appointments: day.appointments,
            revenue: day.revenue,
          });
        });
      }
      return monthlyData.slice(0, Math.min(monthlyData.length, 30)); // Limit to 30 data points

    case 'quarterly':
      // Generate monthly aggregates for quarter
      const monthsInQuarter = 3;
      return Array.from({ length: monthsInQuarter }, (_, i) => {
        const monthData = generateWeeklyData(factor);
        const totalAppointments = monthData.reduce((sum, d) => sum + d.appointments, 0);
        const totalRevenue = monthData.reduce((sum, d) => sum + d.revenue, 0);
        return {
          name: `Mês ${i + 1}`,
          appointments: totalAppointments * 4, // Approximate monthly total
          revenue: totalRevenue * 4,
        };
      });

    case 'semiannual':
      // Generate monthly aggregates for half year
      return Array.from({ length: 6 }, (_, i) => {
        const monthData = generateWeeklyData(factor);
        const totalAppointments = monthData.reduce((sum, d) => sum + d.appointments, 0);
        const totalRevenue = monthData.reduce((sum, d) => sum + d.revenue, 0);
        return {
          name: `Mês ${i + 1}`,
          appointments: totalAppointments * 4,
          revenue: totalRevenue * 4,
        };
      });

    case 'annual':
      // Generate monthly aggregates for year
      return Array.from({ length: 12 }, (_, i) => {
        const monthData = generateWeeklyData(factor);
        const totalAppointments = monthData.reduce((sum, d) => sum + d.appointments, 0);
        const totalRevenue = monthData.reduce((sum, d) => sum + d.revenue, 0);
        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return {
          name: monthNames[i],
          appointments: totalAppointments * 4,
          revenue: totalRevenue * 4,
        };
      });

    default:
      return generateWeeklyData(factor);
  }
};

// Main service functions
export const reportService = {
  async getWeeklyMetrics(
    startDate: Date,
    endDate: Date,
    professionalId?: string
  ): Promise<ReportData> {
    const proData = getProfessionalData(professionalId);
    const period: ReportPeriod = {
      type: 'weekly',
      startDate,
      endDate,
      label: formatDateRange(startDate, endDate, 'weekly'),
    };

    return {
      period,
      professionalId,
      professionalName: professionalId === 'all' ? undefined : (proData.name || `Profissional ${professionalId}`),
      metrics: {
        appointments: proData.appointments,
        revenue: proData.revenue,
        conversion: proData.conversion,
      },
      chartData: generateChartDataForPeriod('weekly', proData.factor, startDate, endDate),
      status: professionalId === 'all' 
        ? 'Todos os sistemas operando com eficiência máxima. Agenda unificada sincronizada.'
        : 'Sincronização individual ativa. Agenda do Google conectada e recebendo eventos.',
    };
  },

  async getMonthlyMetrics(
    year: number,
    month: number,
    professionalId?: string
  ): Promise<ReportData> {
    const proData = getProfessionalData(professionalId);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const period: ReportPeriod = {
      type: 'monthly',
      startDate,
      endDate,
      label: formatDateRange(startDate, endDate, 'monthly'),
    };

    // Scale metrics for monthly (approximately 4x weekly)
    return {
      period,
      professionalId,
      professionalName: professionalId === 'all' ? undefined : (proData.name || `Profissional ${professionalId}`),
      metrics: {
        appointments: proData.appointments * 4,
        revenue: `${(parseFloat(proData.revenue.replace('k', '')) * 4).toFixed(1)}k`,
        conversion: proData.conversion,
      },
      chartData: generateChartDataForPeriod('monthly', proData.factor, startDate, endDate),
      status: professionalId === 'all' 
        ? 'Todos os sistemas operando com eficiência máxima. Agenda unificada sincronizada.'
        : 'Sincronização individual ativa. Agenda do Google conectada e recebendo eventos.',
    };
  },

  async getQuarterlyMetrics(
    year: number,
    quarter: number,
    professionalId?: string
  ): Promise<ReportData> {
    const proData = getProfessionalData(professionalId);
    const startDate = new Date(year, (quarter - 1) * 3, 1);
    const endDate = new Date(year, quarter * 3, 0);
    const period: ReportPeriod = {
      type: 'quarterly',
      startDate,
      endDate,
      label: formatDateRange(startDate, endDate, 'quarterly'),
    };

    // Scale metrics for quarterly (approximately 12x weekly)
    return {
      period,
      professionalId,
      professionalName: professionalId === 'all' ? undefined : (proData.name || `Profissional ${professionalId}`),
      metrics: {
        appointments: proData.appointments * 12,
        revenue: `${(parseFloat(proData.revenue.replace('k', '')) * 12).toFixed(0)}k`,
        conversion: proData.conversion,
      },
      chartData: generateChartDataForPeriod('quarterly', proData.factor, startDate, endDate),
      status: professionalId === 'all' 
        ? 'Todos os sistemas operando com eficiência máxima. Agenda unificada sincronizada.'
        : 'Sincronização individual ativa. Agenda do Google conectada e recebendo eventos.',
    };
  },

  async getSemiannualMetrics(
    year: number,
    half: number,
    professionalId?: string
  ): Promise<ReportData> {
    const proData = getProfessionalData(professionalId);
    const startDate = new Date(year, (half - 1) * 6, 1);
    const endDate = new Date(year, half * 6, 0);
    const period: ReportPeriod = {
      type: 'semiannual',
      startDate,
      endDate,
      label: formatDateRange(startDate, endDate, 'semiannual'),
    };

    // Scale metrics for semiannual (approximately 24x weekly)
    return {
      period,
      professionalId,
      professionalName: professionalId === 'all' ? undefined : (proData.name || `Profissional ${professionalId}`),
      metrics: {
        appointments: proData.appointments * 24,
        revenue: `${(parseFloat(proData.revenue.replace('k', '')) * 24).toFixed(0)}k`,
        conversion: proData.conversion,
      },
      chartData: generateChartDataForPeriod('semiannual', proData.factor, startDate, endDate),
      status: professionalId === 'all' 
        ? 'Todos os sistemas operando com eficiência máxima. Agenda unificada sincronizada.'
        : 'Sincronização individual ativa. Agenda do Google conectada e recebendo eventos.',
    };
  },

  async getAnnualMetrics(
    year: number,
    professionalId?: string
  ): Promise<ReportData> {
    const proData = getProfessionalData(professionalId);
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const period: ReportPeriod = {
      type: 'annual',
      startDate,
      endDate,
      label: formatDateRange(startDate, endDate, 'annual'),
    };

    // Scale metrics for annual (approximately 48x weekly)
    return {
      period,
      professionalId,
      professionalName: professionalId === 'all' ? undefined : (proData.name || `Profissional ${professionalId}`),
      metrics: {
        appointments: proData.appointments * 48,
        revenue: `${(parseFloat(proData.revenue.replace('k', '')) * 48).toFixed(0)}k`,
        conversion: proData.conversion,
      },
      chartData: generateChartDataForPeriod('annual', proData.factor, startDate, endDate),
      status: professionalId === 'all' 
        ? 'Todos os sistemas operando com eficiência máxima. Agenda unificada sincronizada.'
        : 'Sincronização individual ativa. Agenda do Google conectada e recebendo eventos.',
    };
  },

  // Helper to generate report based on period type
  async generateReport(
    periodType: ReportPeriod['type'],
    professionalId?: string,
    referenceDate?: Date
  ): Promise<ReportData> {
    const { startDate, endDate } = calculatePeriodDates(periodType, referenceDate);
    const now = referenceDate || new Date();

    switch (periodType) {
      case 'weekly':
        return this.getWeeklyMetrics(startDate, endDate, professionalId);
      
      case 'monthly':
        return this.getMonthlyMetrics(now.getFullYear(), now.getMonth() + 1, professionalId);
      
      case 'quarterly':
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return this.getQuarterlyMetrics(now.getFullYear(), quarter, professionalId);
      
      case 'semiannual':
        const half = now.getMonth() < 6 ? 1 : 2;
        return this.getSemiannualMetrics(now.getFullYear(), half, professionalId);
      
      case 'annual':
        return this.getAnnualMetrics(now.getFullYear(), professionalId);
      
      default:
        return this.getWeeklyMetrics(startDate, endDate, professionalId);
    }
  },
};

// TODO: When backend is ready, replace with:
/*
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const reportService = {
  async generateReport(periodType: ReportPeriod['type'], professionalId?: string, referenceDate?: Date): Promise<ReportData> {
    const params = new URLSearchParams();
    params.append('period', periodType);
    if (professionalId) params.append('professionalId', professionalId);
    if (referenceDate) params.append('date', referenceDate.toISOString());
    
    const response = await fetch(`${API_BASE_URL}/reports?${params}`);
    if (!response.ok) throw new Error('Erro ao gerar relatório');
    return response.json();
  },
};
*/


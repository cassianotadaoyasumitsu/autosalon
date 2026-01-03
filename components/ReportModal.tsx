import React, { useState } from 'react';
import { X, Calendar, Users } from 'lucide-react';
import { ReportPeriod } from '../services/reportService';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (periodType: ReportPeriod['type'], professionalId: string) => void;
  currentProfessionalId: string;
}

const PROFESSIONALS = [
  { id: 'all', name: 'Visão Geral (Equipe)' },
  { id: '1', name: 'Ana Souza' },
  { id: '2', name: 'Carlos Oliveira' },
  { id: '3', name: 'Mariana Lima' },
];

const PERIOD_OPTIONS: Array<{ value: ReportPeriod['type']; label: string }> = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
  { value: 'quarterly', label: 'Trimestral' },
  { value: 'semiannual', label: 'Semestral' },
  { value: 'annual', label: 'Anual' },
];

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  currentProfessionalId,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod['type']>('weekly');
  const [selectedProfessional, setSelectedProfessional] = useState<string>(currentProfessionalId);

  if (!isOpen) return null;

  const handleGenerate = () => {
    onGenerate(selectedPeriod, selectedProfessional);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-serif text-zinc-900">Gerar Relatório</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Period Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Período do Relatório
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PERIOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedPeriod(option.value)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    selectedPeriod === option.value
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-900 border-stone-200 hover:border-zinc-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Professional Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Profissional
            </label>
            <select
              value={selectedProfessional}
              onChange={(e) => setSelectedProfessional(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm font-medium text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none"
            >
              {PROFESSIONALS.map((pro) => (
                <option key={pro.id} value={pro.id}>
                  {pro.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-stone-600 border border-stone-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-50 transition"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              className="flex-1 bg-zinc-900 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
            >
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;


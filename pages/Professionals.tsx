import React, { useState } from 'react';
import { Mail, CalendarCheck, Plus, Trash2, Copy, Check, Star, X, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Professional } from '../types';

const initialProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Ana Souza',
    specialty: 'Colorista',
    photoUrl: 'https://picsum.photos/seed/ana/200',
    email: 'ana@salao.com',
    calendarConnected: true,
    googleCalendarId: 'ana.work@gmail.com',
    status: 'ACTIVE',
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    specialty: 'Corte Masculino',
    photoUrl: 'https://picsum.photos/seed/carlos/200',
    email: 'carlos@salao.com',
    calendarConnected: false,
    status: 'PENDING_SETUP',
    inviteToken: 'abc123xyz',
    rating: 4.5,
    reviewCount: 42
  },
  {
    id: '3',
    name: 'Mariana Lima',
    specialty: 'Manicure',
    photoUrl: 'https://picsum.photos/seed/mari/200',
    email: 'mari@salao.com',
    calendarConnected: true,
    googleCalendarId: 'mari.nails@gmail.com',
    status: 'ACTIVE',
    rating: 5.0,
    reviewCount: 89
  }
];

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfName, setNewProfName] = useState('');
  const [newProfEmail, setNewProfEmail] = useState('');
  const [newProfSpecialty, setNewProfSpecialty] = useState('');

  const handleCopyInvite = (inviteToken: string | undefined, id: string) => {
    if(!inviteToken) return;
    
    // Construct the invitation link (simulated)
    // In production: `https://app.seusaas.com/setup?token=${inviteToken}`
    const link = `${window.location.origin}/#/setup?token=${inviteToken}`;
    
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddProfessional = () => {
    // Generate a unique token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const newProf: Professional = {
      id: Date.now().toString(),
      name: newProfName,
      email: newProfEmail,
      specialty: newProfSpecialty,
      photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(newProfName)}&background=random`,
      calendarConnected: false,
      status: 'PENDING_SETUP',
      inviteToken: token
    };

    setProfessionals([...professionals, newProf]);
    setIsModalOpen(false);
    setNewProfName('');
    setNewProfEmail('');
    setNewProfSpecialty('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Profissionais</h2>
          <p className="text-slate-500 mt-1">Gerencie sua equipe e gere links para conexão de agenda.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 sm:mt-0 flex items-center bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Profissional
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((prof) => (
          <div key={prof.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={prof.photoUrl} 
                  alt={prof.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{prof.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium mb-1">{prof.specialty}</p>
                  
                  {/* Rating Badge */}
                  {prof.rating ? (
                    <div className="flex items-center space-x-1 bg-slate-50 inline-flex px-2 py-0.5 rounded-full border border-slate-100">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-slate-700">{prof.rating}</span>
                      <span className="text-xs text-slate-400">({prof.reviewCount})</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">Novo</span>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-slate-500">
                  <Mail className="w-4 h-4 mr-2" />
                  {prof.email}
                </div>
                
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Status Agenda</span>
                    {prof.calendarConnected ? (
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                         Conectada
                       </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                        Aguardando
                      </span>
                    )}
                  </div>
                  
                  {prof.calendarConnected ? (
                     <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 flex items-center">
                        <Check className="w-3 h-3 mr-1 text-green-500" />
                        ID: {prof.googleCalendarId}
                     </div>
                  ) : (
                    <div>
                      <div className="mb-2 text-xs text-slate-500 flex items-start">
                        <AlertCircle className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                        Envie o link para o profissional logar com Google.
                      </div>
                      <button 
                        onClick={() => handleCopyInvite(prof.inviteToken, prof.id)}
                        className={`w-full flex items-center justify-center px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                          copiedId === prof.id 
                            ? 'bg-green-50 border-green-200 text-green-700' 
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {copiedId === prof.id ? (
                          <><Check className="w-4 h-4 mr-2" /> Link Copiado</>
                        ) : (
                          <><LinkIcon className="w-4 h-4 mr-2" /> Copiar Link de Convite</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
               <button className="text-slate-400 hover:text-red-500 transition-colors">
                 <Trash2 className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Professional Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900">Adicionar Profissional</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={newProfName}
                  onChange={(e) => setNewProfName(e.target.value)}
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail (Login Google)</label>
                <input 
                  type="email" 
                  className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={newProfEmail}
                  onChange={(e) => setNewProfEmail(e.target.value)}
                  placeholder="Ex: joao@gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Especialidade</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border-slate-300 border p-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={newProfSpecialty}
                  onChange={(e) => setNewProfSpecialty(e.target.value)}
                  placeholder="Ex: Barbeiro"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 border border-blue-100">
                Ao salvar, um <strong>Token Único</strong> será gerado. Você deverá enviar o link para o profissional conectar a agenda dele.
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAddProfessional}
                disabled={!newProfName || !newProfEmail}
                className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Gerar Link de Convite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Professionals;
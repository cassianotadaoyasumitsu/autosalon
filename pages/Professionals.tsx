import React, { useState } from 'react';
import { Mail, Plus, Trash2, Copy, Check, Star, X, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Professional } from '../types';

const initialProfessionals: Professional[] = [
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

const Professionals: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfName, setNewProfName] = useState('');
  const [newProfEmail, setNewProfEmail] = useState('');
  const [newProfSpecialty, setNewProfSpecialty] = useState('');

  const handleCopyInvite = (inviteToken: string | undefined, id: string) => {
    if(!inviteToken) return;
    const link = `${window.location.origin}/#/setup?token=${inviteToken}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddProfessional = () => {
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-stone-200">
        <div>
          <h2 className="text-3xl font-serif text-zinc-900">Equipe</h2>
          <p className="text-stone-500 font-light mt-1">Gestão de especialistas e sincronização de agendas.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 sm:mt-0 flex items-center bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Especialista
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionals.map((prof) => (
          <div key={prof.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="p-8 text-center relative">
              <div className="relative inline-block mx-auto mb-4">
                 <img 
                  src={prof.photoUrl} 
                  alt={prof.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-stone-50 shadow-md grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {prof.rating && (
                   <div className="absolute -bottom-2 -right-2 bg-white px-2 py-1 rounded-full shadow-sm border border-stone-100 flex items-center">
                     <Star className="w-3 h-3 text-amber-500 fill-amber-500 mr-1" />
                     <span className="text-xs font-bold text-zinc-900">{prof.rating}</span>
                   </div>
                )}
              </div>
              
              <h3 className="font-serif text-xl text-zinc-900">{prof.name}</h3>
              <p className="text-xs text-amber-600 font-bold uppercase tracking-widest mb-6">{prof.specialty}</p>

              <div className="space-y-4 text-left">
                 <div className="flex items-center justify-center text-sm text-stone-500 bg-stone-50 py-2 rounded-lg">
                    <Mail className="w-3 h-3 mr-2" />
                    {prof.email}
                 </div>

                 <div className="border-t border-stone-100 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Agenda Google</span>
                      {prof.calendarConnected ? (
                         <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide bg-zinc-900 text-white">
                           Ativa
                         </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800">
                          Pendente
                        </span>
                      )}
                    </div>

                    {prof.calendarConnected ? (
                       <div className="text-xs text-stone-500 font-mono bg-stone-50 p-3 rounded border border-stone-100 flex items-center justify-between">
                          <span className="truncate max-w-[150px]">{prof.googleCalendarId}</span>
                          <Check className="w-4 h-4 text-zinc-900" />
                       </div>
                    ) : (
                      <button 
                        onClick={() => handleCopyInvite(prof.inviteToken, prof.id)}
                        className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                          copiedId === prof.id 
                            ? 'bg-zinc-900 text-white border-zinc-900' 
                            : 'bg-white border-stone-300 text-zinc-900 hover:bg-stone-50'
                        }`}
                      >
                        {copiedId === prof.id ? (
                          <><Check className="w-3 h-3 mr-2" /> Copiado</>
                        ) : (
                          <><LinkIcon className="w-3 h-3 mr-2" /> Link de Convite</>
                        )}
                      </button>
                    )}
                 </div>
              </div>
            </div>
            
            <div className="bg-stone-50 px-6 py-3 border-t border-stone-100 flex justify-end">
               <button className="text-stone-400 hover:text-red-800 transition-colors">
                 <Trash2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Professional Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in border border-stone-200">
            <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h3 className="font-serif text-xl text-zinc-900">Adicionar Especialista</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-zinc-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border-stone-200 p-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900"
                  value={newProfName}
                  onChange={(e) => setNewProfName(e.target.value)}
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Email Google</label>
                <input 
                  type="email" 
                  className="w-full rounded-lg border-stone-200 p-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900"
                  value={newProfEmail}
                  onChange={(e) => setNewProfEmail(e.target.value)}
                  placeholder="Ex: joao@gmail.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Especialidade</label>
                <input 
                  type="text" 
                  className="w-full rounded-lg border-stone-200 p-3 text-stone-800 focus:border-zinc-900 focus:ring-zinc-900"
                  value={newProfSpecialty}
                  onChange={(e) => setNewProfSpecialty(e.target.value)}
                  placeholder="Ex: Barbeiro"
                />
              </div>
              <div className="bg-amber-50 p-4 rounded-lg text-xs text-amber-900 border border-amber-100 leading-relaxed">
                Ao salvar, um <strong>Token de Segurança</strong> será gerado. Envie-o para o profissional realizar a conexão segura da agenda.
              </div>
            </div>
            <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex justify-end space-x-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 text-stone-500 text-xs font-bold uppercase tracking-widest hover:text-zinc-900 transition"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAddProfessional}
                disabled={!newProfName || !newProfEmail}
                className="px-6 py-3 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition disabled:opacity-50"
              >
                Gerar Convite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Professionals;
import React from 'react';
import { Star, Send, ThumbsUp, MessageSquare } from 'lucide-react';
import { Review } from '../types';

const mockReviews: Review[] = [
  { id: '1', clientName: 'Fernanda Lima', rating: 5, comment: 'Adorei o atendimento da Ana! O ambiente é sofisticado e o serviço impecável.', professionalId: '1', serviceName: 'Coloração', date: '2023-10-25' },
  { id: '2', clientName: 'Roberto Silva', rating: 4, comment: 'Corte excelente, tecnicamente perfeito.', professionalId: '2', serviceName: 'Corte Masculino', date: '2023-10-24' },
  { id: '3', clientName: 'Julia Campos', rating: 5, comment: 'As unhas ficaram perfeitas, e o café servido é delicioso.', professionalId: '3', serviceName: 'Manicure', date: '2023-10-24' },
  { id: '4', clientName: 'Patricia Abravanel', rating: 5, comment: 'Melhor experiência da cidade. Recomendo de olhos fechados.', professionalId: '1', serviceName: 'Hidratação', date: '2023-10-23' },
];

const Reviews: React.FC = () => {
  const averageRating = (mockReviews.reduce((acc, curr) => acc + curr.rating, 0) / mockReviews.length).toFixed(1);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-200 pb-6">
        <div>
          <h2 className="text-3xl font-serif text-zinc-900">Feedback</h2>
          <p className="text-stone-500 font-light mt-1">Reputação e controle de qualidade do atendimento.</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-md">
          <Send className="w-4 h-4 mr-2" />
          Solicitar Avaliação
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Nota Média</p>
            <div className="flex items-center mt-2">
               <span className="text-4xl font-serif text-zinc-900 mr-3">{averageRating}</span>
               <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current opacity-50" />
               </div>
            </div>
          </div>
          <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
            <Star className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Total</p>
            <h3 className="text-4xl font-serif text-zinc-900 mt-2">{mockReviews.length}</h3>
            <span className="text-xs text-amber-600 font-bold uppercase tracking-wide mt-1 block">+12 essa semana</span>
          </div>
          <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center text-zinc-600">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Satisfação</p>
            <h3 className="text-4xl font-serif text-zinc-900 mt-2">92%</h3>
            <span className="text-xs text-stone-400 mt-1 block font-light">Clientes promotores</span>
          </div>
          <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center text-zinc-600">
            <ThumbsUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-100 bg-stone-50">
           <h3 className="font-serif text-lg text-zinc-900">Avaliações Recentes</h3>
        </div>
        <div className="divide-y divide-stone-100">
          {mockReviews.map((review) => (
            <div key={review.id} className="p-8 hover:bg-stone-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                   <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-serif text-lg font-bold border border-stone-200">
                      {review.clientName.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-zinc-900">{review.clientName}</h4>
                      <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">{review.serviceName}</p>
                      <div className="flex items-center mb-3 space-x-1">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`} />
                        ))}
                      </div>
                      <p className="text-stone-600 text-sm italic font-light">
                        "{review.comment}"
                      </p>
                   </div>
                </div>
                <span className="text-xs text-stone-400 font-medium">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
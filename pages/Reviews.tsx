import React from 'react';
import { Star, Send, ThumbsUp, MessageSquare } from 'lucide-react';
import { Review } from '../types';

const mockReviews: Review[] = [
  { id: '1', clientName: 'Fernanda Lima', rating: 5, comment: 'Adorei o atendimento da Ana!', professionalId: '1', serviceName: 'Coloração', date: '2023-10-25' },
  { id: '2', clientName: 'Roberto Silva', rating: 4, comment: 'Corte muito bom, mas atrasou 5min.', professionalId: '2', serviceName: 'Corte Masculino', date: '2023-10-24' },
  { id: '3', clientName: 'Julia Campos', rating: 5, comment: 'As unhas ficaram perfeitas.', professionalId: '3', serviceName: 'Manicure', date: '2023-10-24' },
  { id: '4', clientName: 'Patricia Abravanel', rating: 5, comment: 'Melhor salão da cidade!', professionalId: '1', serviceName: 'Hidratação', date: '2023-10-23' },
];

const Reviews: React.FC = () => {
  const averageRating = (mockReviews.reduce((acc, curr) => acc + curr.rating, 0) / mockReviews.length).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Avaliações e Feedback</h2>
          <p className="text-slate-500 mt-1">Gerencie a reputação do salão e veja o que os clientes dizem.</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition shadow-sm">
          <Send className="w-4 h-4 mr-2" />
          Enviar Link de Avaliação
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Média Geral</p>
            <div className="flex items-center mt-1">
               <span className="text-3xl font-bold text-slate-900 mr-2">{averageRating}</span>
               <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current opacity-50" />
               </div>
            </div>
          </div>
          <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
            <Star className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Total de Avaliações</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{mockReviews.length}</h3>
            <span className="text-xs text-emerald-600 font-medium">+12 essa semana</span>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Elogios</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">92%</h3>
            <span className="text-xs text-slate-400">Taxa de aprovação</span>
          </div>
          <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
            <ThumbsUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
           <h3 className="font-semibold text-slate-800">Avaliações Recentes</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {mockReviews.map((review) => (
            <div key={review.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                   <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                      {review.clientName.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-medium text-slate-900">{review.clientName}</h4>
                      <p className="text-xs text-slate-500">Serviço: {review.serviceName}</p>
                      <div className="flex items-center mt-1 space-x-1">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                        ))}
                      </div>
                      <p className="text-slate-700 mt-2 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100 inline-block">
                        "{review.comment}"
                      </p>
                   </div>
                </div>
                <span className="text-xs text-slate-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
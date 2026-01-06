import { useState, useMemo } from 'react';
import { Star, Send, ThumbsUp, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Review } from '../types';

// Gerar dados mock mais extensos para paginação
const generateMockReviews = (): Review[] => {
  const clients = [
    'Fernanda Lima', 'Roberto Silva', 'Julia Campos', 'Patricia Abravanel', 'Carlos Oliveira',
    'Ana Costa', 'Pedro Souza', 'Mariana Santos', 'Lucas Alves', 'Beatriz Ferreira',
    'Rafael Mendes', 'Camila Rodrigues', 'Thiago Lima', 'Isabela Souza', 'Gabriel Martins',
    'Larissa Costa', 'Bruno Oliveira', 'Amanda Silva', 'Felipe Santos', 'Renata Almeida'
  ];
  
  const services = [
    'Coloração', 'Corte Masculino', 'Corte Feminino', 'Manicure', 'Pedicure',
    'Hidratação', 'Tratamento Capilar', 'Escova', 'Progressiva', 'Mechas',
    'Corte & Escova', 'Design de Sobrancelhas', 'Depilação', 'Massagem', 'Limpeza de Pele'
  ];
  
  const professionals = ['1', '2', '3'];
  
  const comments = [
    'Adorei o atendimento! O ambiente é sofisticado e o serviço impecável.',
    'Corte excelente, tecnicamente perfeito.',
    'As unhas ficaram perfeitas, e o café servido é delicioso.',
    'Melhor experiência da cidade. Recomendo de olhos fechados.',
    'Profissional muito atenciosa e competente.',
    'Resultado superou minhas expectativas!',
    'Ambiente acolhedor e serviço de primeira qualidade.',
    'Voltarei com certeza! Atendimento excepcional.',
    'Muito satisfeita com o resultado final.',
    'Equipe profissional e ambiente agradável.',
    'Serviço rápido e de qualidade.',
    'Recomendo para todos os meus amigos!',
    'Experiência incrível do início ao fim.',
    'Profissionalismo e atenção aos detalhes.',
    'Melhor salão da região, sem dúvidas!'
  ];
  
  const reviews: Review[] = [];
  const now = new Date();
  
  for (let i = 0; i < 150; i++) {
    const daysAgo = Math.floor(i / 5);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    const rating = Math.floor(Math.random() * 2) + 4; // 4 ou 5 estrelas (maioria positiva)
    const clientName = clients[Math.floor(Math.random() * clients.length)];
    const serviceName = services[Math.floor(Math.random() * services.length)];
    const professionalId = professionals[Math.floor(Math.random() * professionals.length)];
    const comment = comments[Math.floor(Math.random() * comments.length)];
    
    const dateStr = date.toISOString().split('T')[0];
    
    reviews.push({
      id: (i + 1).toString(),
      clientName,
      rating,
      comment,
      professionalId,
      serviceName,
      date: dateStr
    });
  }
  
  return reviews;
};

const ITEMS_PER_PAGE = 20;

const Reviews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const allReviews = useMemo(() => generateMockReviews(), []);

  const totalPages = Math.ceil(allReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentReviews = allReviews.slice(startIndex, endIndex);

  const averageRating = (allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length).toFixed(1);
  const positiveReviews = allReviews.filter(r => r.rating >= 4).length;
  const satisfactionRate = Math.round((positiveReviews / allReviews.length) * 100);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-200 pb-6">
        <div>
          <h2 className="text-3xl font-serif text-zinc-900">Feedback</h2>
          <p className="text-stone-500 font-light mt-1">Reputação e controle de qualidade do atendimento.</p>
        </div>
        <button 
          type="button"
          className="mt-4 md:mt-0 flex items-center bg-zinc-900 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition shadow-md"
        >
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
            <h3 className="text-4xl font-serif text-zinc-900 mt-2">{allReviews.length}</h3>
            <span className="text-xs text-amber-600 font-bold uppercase tracking-wide mt-1 block">+12 essa semana</span>
          </div>
          <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center text-zinc-600">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Satisfação</p>
            <h3 className="text-4xl font-serif text-zinc-900 mt-2">{satisfactionRate}%</h3>
            <span className="text-xs text-stone-400 mt-1 block font-light">Clientes promotores</span>
          </div>
          <div className="h-12 w-12 bg-stone-100 rounded-full flex items-center justify-center text-zinc-600">
            <ThumbsUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
          <h3 className="font-serif text-lg text-zinc-900">Avaliações Recentes</h3>
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200">
            Página {currentPage} de {totalPages}
          </span>
        </div>
        <div className="divide-y divide-stone-100">
          {currentReviews.map((review) => (
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
                           <Star key={`${review.id}-star-${i}`} className={`w-3 h-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`} />
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

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="px-8 py-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
            <div className="text-sm text-stone-500">
              Mostrando {startIndex + 1} a {Math.min(endIndex, allReviews.length)} de {allReviews.length} avaliações
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Mostrar primeira página, última página, página atual e páginas adjacentes
                    return page === 1 || 
                           page === totalPages || 
                           (page >= currentPage - 1 && page <= currentPage + 1);
                  })
                  .map((page, index, array) => {
                    // Adicionar ellipsis quando necessário
                    const showEllipsisBefore = index > 0 && array[index - 1] < page - 1;
                    return (
                      <div key={page} className="flex items-center gap-1">
                        {showEllipsisBefore && (
                          <span className="px-2 text-stone-400">...</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-zinc-900 text-white'
                              : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Próxima página"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
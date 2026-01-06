import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Star, Send, CheckCircle } from 'lucide-react';

interface FeedbackFormData {
  clientName: string;
  rating: number;
  comment: string;
  serviceName: string;
  professionalId: string;
}

const FeedbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    clientName: '',
    rating: 0,
    comment: '',
    serviceName: '',
    professionalId: '',
  });

  useEffect(() => {
    // Em produção, validar o token e buscar informações do agendamento
    if (!token) {
      // Redirecionar se não houver token
      setTimeout(() => navigate('/'), 3000);
    }
  }, [token, navigate]);

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName.trim() || formData.rating === 0 || !formData.comment.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      // Em produção, enviar para API
      console.log('Feedback enviado:', { ...formData, token });
      
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      alert('Erro ao enviar avaliação. Tente novamente.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 max-w-md text-center">
          <h2 className="text-2xl font-serif text-zinc-900 mb-4">Link Inválido</h2>
          <p className="text-stone-600 mb-6">Este link de avaliação não é válido ou expirou.</p>
          <p className="text-sm text-stone-400">Redirecionando...</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 max-w-md text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-serif text-zinc-900 mb-2">Obrigado pela sua Avaliação!</h2>
            <p className="text-stone-600">Sua opinião é muito importante para nós.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-zinc-900 text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 md:p-12 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-zinc-900 mb-2">Como foi sua Experiência?</h1>
          <p className="text-stone-500">Sua opinião nos ajuda a melhorar continuamente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="clientName" className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
              Seu Nome
            </label>
            <input
              id="clientName"
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900"
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">
              Avaliação
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  className={`p-3 rounded-lg transition-all ${
                    formData.rating >= rating
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-stone-50 text-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <Star
                    className={`w-8 h-8 ${
                      formData.rating >= rating ? 'fill-current' : ''
                    }`}
                  />
                </button>
              ))}
            </div>
            {formData.rating > 0 && (
              <p className="text-center text-sm text-stone-500 mt-2">
                {formData.rating === 5 && 'Excelente!'}
                {formData.rating === 4 && 'Muito bom!'}
                {formData.rating === 3 && 'Bom'}
                {formData.rating === 2 && 'Regular'}
                {formData.rating === 1 && 'Precisa melhorar'}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="serviceName" className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
              Serviço Realizado (opcional)
            </label>
            <input
              id="serviceName"
              type="text"
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900"
              placeholder="Ex: Corte, Coloração, Manicure..."
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
              Comentário
            </label>
            <textarea
              id="comment"
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full rounded-lg border-stone-200 p-3 bg-stone-50 focus:border-zinc-900 focus:ring-zinc-900 resize-none"
              placeholder="Conte-nos sobre sua experiência..."
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 text-white py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition"
            >
              <Send className="w-4 h-4" />
              Enviar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;

